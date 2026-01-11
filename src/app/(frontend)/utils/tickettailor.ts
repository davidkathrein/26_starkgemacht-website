import { TTEventsBlogResponseSchema, type TTEventForBlog } from '../types/tickettailor' // adjust path
import { generatePreviewText } from './ai'
import { getPayload } from 'payload'
import config from '@payload-config'
import { convertHtmlToRichText } from './richtext'
import { slugify } from 'payload/shared'

export type TicketTailorEvent = TTEventForBlog

interface FetchEventsOptions {
  status?: 'published' | 'draft' | 'sales_closed' | string
  limit?: number
  startingAfter?: string
}

/**
 * Fetch all pages of upcoming events (minimal, blog-ready).
 *
 * We can’t reliably use the last event id as cursor unless we know the API
 * ordering is stable. Since your response includes `links.next`, we’ll use that.
 */
export async function fetchAllUpcomingEvents(options: FetchEventsOptions = {}) {
  const apiKey = process.env.TICKETTAILOR_API_KEY

  if (!apiKey) {
    throw new Error('TICKETTAILOR_API_KEY is not configured')
  }

  const now = Math.floor(Date.now() / 1000)
  const limit = options.limit ?? 100

  const all: TicketTailorEvent[] = []
  let startingAfter: string | undefined
  let lastCursor: string | undefined

  while (true) {
    const params = new URLSearchParams({
      'end_at.gt': now.toString(),
      status: options.status || 'published',
      limit: String(limit),
    })

    if (startingAfter) params.set('starting_after', startingAfter)
    const url = `https://api.tickettailor.com/v1/events?${params.toString()}`

    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`,
      },
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      throw new Error(`TicketTailor API error: ${response.status} ${response.statusText}`)
    }

    const data: unknown = await response.json()
    const validated = TTEventsBlogResponseSchema.parse(data)

    const page = validated.events
    if (page.length === 0) break

    all.push(...page)

    // Prefer API-provided pagination
    const nextLink = validated.next
    if (!nextLink) break

    // `links.next` in your sample is a relative URL like:
    // "/events/?starting_after=ev_1516513&status%5B0%5D=published&limit=1"
    // Extract `starting_after` from it.
    const nextUrl = new URL(nextLink, 'https://api.tickettailor.com/v1')
    startingAfter = nextUrl.searchParams.get('starting_after') ?? undefined

    // Guard against non-advancing cursor
    if (!startingAfter || startingAfter === lastCursor) break
    lastCursor = startingAfter
  }

  // Process all events through Payload (save if new, generate preview description)
  const processedEvents = await Promise.all(all.map((event) => transformWithAIAndSaveIfNew(event)))

  return processedEvents
}

/**
 * Checks if event exists in Payload database by tickettailorId.
 * If it doesn't exist, generates a preview description using AI and saves the event.
 * Returns the created or existing event.
 */
export async function transformWithAIAndSaveIfNew(event: TTEventForBlog) {
  const payload = await getPayload({ config })

  // Check if event already exists
  const existing = await payload.find({
    collection: 'event',
    where: {
      ticketTailorId: {
        equals: event.ticketTailorId,
      },
    },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    const existingEvent = existing.docs[0]

    // Update price information if it has changed
    if (
      existingEvent.minPrice !== event.minPrice ||
      existingEvent.maxPrice !== event.maxPrice ||
      existingEvent.isFree !== event.isFree
    ) {
      const updated = await payload.update({
        collection: 'event',
        id: existingEvent.id,
        data: {
          minPrice: event.minPrice,
          maxPrice: event.maxPrice,
          isFree: event.isFree,
        },
      })
      return updated
    }

    return existingEvent
  }

  // Generate preview description with AI
  const description = event.descriptionHtml?.trim()
  let previewDescription = ''

  if (description) {
    const text = await generatePreviewText(
      `Erstelle einen kurzen Vorschautext für dieses Event (maximal 40 Wörter). ` +
        `Nutze eine freundliche, klare Sprache. Kein Markdown, keine Emojis, keine Wortanzahl.\n\n` +
        `Eventtitel: ${event.name}\n` +
        `Beschreibung (HTML): ${description}`,
    )
    previewDescription = String(text ?? '').trim()
  }

  const [parsedContent] = await Promise.all([convertHtmlToRichText(description || '')])

  const slug = slugify(event.name)

  if (!slug) {
    throw new Error('Failed to generate slug for event: ' + event.name)
  }

  // Save to Payload
  const saved = await payload.create({
    collection: 'event',
    data: {
      ticketTailorId: event.ticketTailorId,
      name: event.name,
      slug,
      startsAtIso: event.startsAtIso,
      endsAtIso: event.endsAtIso,
      timezone: event.timezone,
      descriptionHtml: event.descriptionHtml,
      previewDescription,
      content: parsedContent,
      ctaText: event.ctaText,
      checkoutUrl: event.checkoutUrl,
      publicUrl: event.publicUrl,
      image: event.image,
      venueName: event.venueName,
      venuePostalCode: event.venuePostalCode,
      venueCountry: event.venueCountry,
      minPrice: event.minPrice,
      maxPrice: event.maxPrice,
      isFree: event.isFree,
    },
  })

  return saved
}
