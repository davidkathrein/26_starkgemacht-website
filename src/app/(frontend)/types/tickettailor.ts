import { z } from 'zod'

/**
 * Ticket Tailor list events response (based on the sample payload you posted).
 * Notes:
 * - Many fields come back as strings even when they look boolean ("false"/"true").
 * - We model those as string literals where possible, otherwise `z.string().nullable()`.
 * - If you want to accept *either* real booleans or "true"/"false", tell me and I’ll
 *   provide a coercing schema.
 */

export const TTEventDateTimeSchema = z
  .object({
    date: z.string(), // "YYYY-MM-DD"
    formatted: z.string(),
    iso: z.string(), // ISO 8601 w/ offset, e.g. "2022-09-24T09:00:00+02:00"
    time: z.string(), // "HH:mm"
    timezone: z.string(), // "+02:00" (note: not IANA tz here)
    unix: z.number().int(),
  })
  .strict()

export const TTPaymentMethodSchema = z
  .object({
    id: z.string(),
    external_id: z.string().nullable(),
    instructions: z.string().nullable(),
    name: z.string().nullable(),
    type: z.string(), // e.g. "stripe"
  })
  .strict()

export const TTImagesSchema = z
  .object({
    header: z.string().url(),
    thumbnail: z.string().url(),
  })
  .strict()

export const TTTicketTypeSchema = z
  .object({
    object: z.literal('ticket_type'),
    id: z.string(),
    access_code: z.string().nullable(),
    booking_fee: z.number().int(),
    description: z.string().nullable(),
    discounts: z.array(z.unknown()),
    group_id: z.string().nullable(),
    has_overrides: z.union([z.literal('true'), z.literal('false')]),
    hide_after: z.string().nullable(),
    hide_until: z.string().nullable(),
    hide_when_sold_out: z.union([z.literal('true'), z.literal('false')]),
    max_per_order: z.number().int(),
    min_per_order: z.number().int(),
    name: z.string(),
    override_id: z.string().nullable(),
    price: z.number().int(), // cents
    quantity: z.number().int(),
    quantity_held: z.number().int(),
    quantity_in_baskets: z.number().int(),
    quantity_issued: z.number().int(),
    quantity_total: z.number().int(),
    show_quantity_remaining: z.union([z.literal('true'), z.literal('false')]),
    show_quantity_remaining_less_than: z.number().int().nullable(),
    sort_order: z.number().int(),
    status: z.string(), // e.g. "on_sale"
    type: z.string(), // e.g. "GA"
  })
  .strict()

export const TTVenueSchema = z
  .object({
    country: z.string(),
    name: z.string().nullable(),
    postal_code: z.string().nullable().optional(),
  })
  .strict()

export const TTEventSchema = z
  .object({
    object: z.literal('event'),
    id: z.string(),

    access_code: z.string().nullable(),
    available_status: z.string().nullable(),

    bundles: z.array(z.unknown()),

    call_to_action: z.string(),
    checkout_url: z.string().url(),
    chk: z.string(),

    created_at: z.number().int(), // unix timestamp (seconds)

    currency: z.string(), // e.g. "eur"
    description: z.string(), // HTML

    end: TTEventDateTimeSchema,
    event_series_id: z.string().nullable(),

    hidden: z.union([z.literal('true'), z.literal('false')]),

    images: TTImagesSchema,

    max_tickets_sold_per_occurrence: z.number().int().nullable(),

    name: z.string(),

    online_event: z.union([z.literal('true'), z.literal('false')]),
    online_link: z.string().nullable(),

    override_id: z.string().nullable(),

    payment_methods: z.array(TTPaymentMethodSchema),

    private: z.union([z.literal('true'), z.literal('false')]),

    revenue: z.number(),

    sales_tax_label: z.string(),
    sales_tax_percentage: z.number().nullable(),
    sales_tax_treatment: z.string(),

    show_map: z.union([z.literal('true'), z.literal('false')]),

    start: TTEventDateTimeSchema,

    status: z.string(), // e.g. "published"

    ticket_groups: z.array(z.unknown()),
    ticket_types: z.array(TTTicketTypeSchema),

    tickets_available: z.union([z.literal('true'), z.literal('false')]),
    tickets_available_at: z.string().nullable(),
    tickets_available_at_message: z.string(),

    tickets_unavailable_at: z.string().nullable(),
    tickets_unavailable_at_message: z.string(),

    timezone: z.string(), // e.g. "Europe/Vienna"

    total_holds: z.number().int(),
    total_issued_tickets: z.number().int(),
    total_orders: z.number().int(),

    transaction_fee_fixed_amount: z.number().nullable(),
    transaction_fee_percentage: z.number().nullable(),

    unavailable: z.union([z.literal('true'), z.literal('false')]),
    unavailable_status: z.string().nullable(),

    url: z.string().url(),

    venue: TTVenueSchema,

    voucher_ids: z.array(z.unknown()),

    waitlist_active: z.union([
      z.literal('true'),
      z.literal('false'),
      z.literal('no_tickets_available'),
    ]),
    waitlist_call_to_action: z.string(),
    waitlist_confirmation_message: z.string(),
    waitlist_event_page_text: z.string(),
  })
  .strict()

export const TTLinksSchema = z
  .object({
    next: z.string().nullable(),
    previous: z.string().nullable(),
  })
  .strict()

export const TTEventsResponseSchema = z
  .object({
    data: z.array(TTEventSchema),
    links: TTLinksSchema,
  })
  .strict()

export type TTEventsResponse = z.infer<typeof TTEventsResponseSchema>
export type TTEvent = z.infer<typeof TTEventSchema>
