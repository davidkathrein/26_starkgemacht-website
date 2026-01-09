import { z } from 'zod'

const TicketTailorEventSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  start_at: z.number(),
  end_at: z.number(),
  status: z.enum(['published', 'draft', 'sales_closed']),
  venue: z
    .object({
      name: z.string(),
      postal_code: z.string().optional(),
    })
    .optional(),
  images: z
    .object({
      header: z.string().optional(),
    })
    .optional(),
  url: z.string().optional(),
})

const TicketTailorResponseSchema = z.object({
  data: z.array(TicketTailorEventSchema),
  links: z.object({
    next: z.string().optional(),
    previous: z.string().optional(),
  }),
})

export type TicketTailorEvent = z.infer<typeof TicketTailorEventSchema>

interface FetchEventsOptions {
  status?: 'published' | 'draft' | 'sales_closed' | string
  limit?: number
  startingAfter?: string
}

export async function fetchUpcomingEvents(
  options: FetchEventsOptions = {},
): Promise<TicketTailorEvent[]> {
  const apiKey = process.env.TICKETTAILOR_API_KEY

  if (!apiKey) {
    throw new Error('TICKETTAILOR_API_KEY is not configured')
  }

  // Get current Unix timestamp
  const now = Math.floor(Date.now() / 1000)

  // Build query parameters
  const params = new URLSearchParams({
    'start_at.gte': now.toString(), // Only events starting now or in the future
    status: options.status || 'published',
    limit: (options.limit || 100).toString(),
  })

  if (options.startingAfter) {
    params.append('starting_after', options.startingAfter)
  }

  const url = `https://api.tickettailor.com/v1/events?${params.toString()}`

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`,
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      throw new Error(`TicketTailor API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    const validated = TicketTailorResponseSchema.parse(data)

    return validated.data
  } catch (error) {
    console.error('Error fetching TicketTailor events:', error)
    throw error
  }
}

export async function fetchAllUpcomingEvents(
  options: FetchEventsOptions = {},
): Promise<TicketTailorEvent[]> {
  let allEvents: TicketTailorEvent[] = []
  let startingAfter: string | undefined

  // Fetch all pages
  while (true) {
    const events = await fetchUpcomingEvents({
      ...options,
      startingAfter,
    })

    if (events.length === 0) break

    allEvents = [...allEvents, ...events]

    // If we got less than the limit, we're done
    if (events.length < (options.limit || 100)) break

    // Set cursor for next page
    startingAfter = events[events.length - 1].id
  }

  return allEvents
}
