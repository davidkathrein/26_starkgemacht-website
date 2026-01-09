import { z } from 'zod'
import { TTEventsResponseSchema, TTEventSchema, type TTEvent } from '../types/tickettailor' // adjust path

export type TicketTailorEvent = z.infer<typeof TTEventSchema>

interface FetchEventsOptions {
  status?: 'published' | 'draft' | 'sales_closed' | string
  limit?: number
  startingAfter?: string
}

/**
 * Fetch one page of upcoming events.
 * Uses updated schemas:
 * - TTEventsResponseSchema (root)
 * - TTEventSchema (event)
 *
 * Ticket Tailor supports `start_at.gte` (unix seconds).
 */
export async function fetchUpcomingEvents(
  options: FetchEventsOptions = {},
): Promise<TicketTailorEvent[]> {
  const apiKey = process.env.TICKETTAILOR_API_KEY

  if (!apiKey) {
    throw new Error('TICKETTAILOR_API_KEY is not configured')
  }

  const now = Math.floor(Date.now() / 1000)

  const params = new URLSearchParams({
    'start_at.gte': now.toString(),
    status: options.status || 'published',
    limit: String(options.limit ?? 100),
  })

  if (options.startingAfter) {
    params.set('starting_after', options.startingAfter)
  }

  const url = `https://api.tickettailor.com/v1/events?status=published}`

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`,
    },
    // Next.js (optional). Remove if not in Next.
    next: { revalidate: 300 },
  })

  if (!response.ok) {
    throw new Error(`TicketTailor API error: ${response.status} ${response.statusText}`)
  }

  const data: unknown = await response.json()
  const validated = TTEventsResponseSchema.parse(data)

  return validated.data
}

/**
 * Fetch all pages of upcoming events.
 * Safer pagination than "events.length < limit":
 * - If the API returns less than limit, likely end.
 * - Otherwise, continue using the last event id as cursor.
 * - Also stop if the cursor doesn't advance (prevents infinite loops).
 */
export async function fetchAllUpcomingEvents(
  options: FetchEventsOptions = {},
): Promise<TicketTailorEvent[]> {
  const limit = options.limit ?? 100

  const all: TicketTailorEvent[] = []
  let startingAfter: string | undefined
  let lastCursor: string | undefined

  while (true) {
    const page = await fetchUpcomingEvents({ ...options, limit, startingAfter })

    if (page.length === 0) break

    all.push(...page)

    // End if this is the last page
    if (page.length < limit) break

    // Advance cursor
    startingAfter = page[page.length - 1]?.id

    // Guard against non-advancing cursor
    if (!startingAfter || startingAfter === lastCursor) break
    lastCursor = startingAfter
  }

  return all
}
