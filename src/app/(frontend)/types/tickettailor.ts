import { z } from 'zod'

/**
 * Minimal fields useful for generating a blog post from a Ticket Tailor event.
 * - Validates only what you need
 * - Accepts extra fields and drops them via `.transform`
 */

const BoolStringSchema = z.union([z.literal('true'), z.literal('false')])

const TTImagesMinimalSchema = z
  .object({
    header: z.string().url().optional(),
    thumbnail: z.string().url().optional(),
  })
  .passthrough()

const TTStartMinimalSchema = z
  .object({
    iso: z.string(), // e.g. "2022-09-24T09:00:00+02:00"
    unix: z.number().int().optional(),
    date: z.string().optional(), // "YYYY-MM-DD"
    time: z.string().optional(), // "HH:mm"
  })
  .passthrough()

const TTVenueMinimalSchema = z
  .object({
    name: z.string().nullable().optional(),
    postal_code: z.string().nullable().optional(),
    country: z.string().nullable().optional(),
  })
  .passthrough()

const TTTicketTypeSchema = z
  .object({
    id: z.string(),
    name: z.string().optional(),
    price: z.number().optional(),
    status: z.string().optional(),
  })
  .passthrough()

const TTEventForBlogInSchema = z
  .object({
    object: z.literal('event').optional(),
    id: z.string(),
    name: z.string(),
    description: z.string().optional(), // HTML from TT
    call_to_action: z.string().optional(),
    checkout_url: z.string().url().optional(),
    url: z.string().url().optional(),
    images: TTImagesMinimalSchema.optional(),
    start: TTStartMinimalSchema,
    end: TTStartMinimalSchema.optional(),
    timezone: z.string().optional(),
    venue: TTVenueMinimalSchema.optional(),
    hidden: BoolStringSchema.optional(),
    status: z.string().optional(),
    ticket_types: z.array(TTTicketTypeSchema).optional(),
  })
  .passthrough()

export const TTEventsBlogResponseSchema = z
  .object({
    data: z.array(TTEventForBlogInSchema),
    links: z
      .object({
        next: z.string().nullable().optional(),
        previous: z.string().nullable().optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough()
  .transform((resp) => {
    // Throw everything else away and keep a clean app-facing shape
    return {
      events: resp.data.map((e) => {
        // Extract price information from ticket types
        const ticketTypes = e.ticket_types || []
        const prices = ticketTypes
          .filter((t) => typeof t.price === 'number')
          .map((t) => t.price as number)
        const minPrice = prices.length > 0 ? Math.min(...prices) : null
        const maxPrice = prices.length > 0 ? Math.max(...prices) : null
        const isFree = prices.length > 0 && prices.every((p) => p === 0)

        return {
          ticketTailorId: e.id,
          name: e.name,
          startsAtIso: e.start.iso,
          endsAtIso: e.end?.iso,
          timezone: e.timezone,
          descriptionHtml: e.description ?? '',
          ctaText: e.call_to_action,
          checkoutUrl: e.checkout_url,
          publicUrl: e.url,
          image: e.images?.header ?? e.images?.thumbnail,
          venueName: e.venue?.name,
          venuePostalCode: e.venue?.postal_code,
          venueCountry: e.venue?.country,
          minPrice,
          maxPrice,
          isFree,
        }
      }),
      next: resp.links?.next ?? null,
      previous: resp.links?.previous ?? null,
    }
  })

export type TTEventForBlog = z.infer<typeof TTEventsBlogResponseSchema>['events'][number]
export type TTEventsBlogResponse = z.infer<typeof TTEventsBlogResponseSchema>
