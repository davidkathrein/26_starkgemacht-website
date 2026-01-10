import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

export const Event: CollectionConfig = {
  slug: 'event',
  labels: {
    singular: 'Event',
    plural: 'Events',
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'ticketTailorId',
      type: 'text',
      unique: true,
      required: true,
      admin: {
        description: 'Unique ID from TicketTailor',
        readOnly: true,
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    slugField({ fieldToUse: 'name' }),
    {
      name: 'previewDescription',
      type: 'text',
      required: false,
      admin: {
        description: 'Short description for previews. AI generated on Event fetch.',
      },
    },
    {
      name: 'image',
      type: 'text',
      admin: {
        description: 'Event image URL (header or thumbnail)',
      },
    },
    {
      name: 'customImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional custom image to override the default event image from TicketTailor',
      },
    },
    {
      name: 'startsAtIso',
      type: 'text',
      required: true,
      admin: {
        description: 'ISO 8601 datetime string (e.g., "2022-09-24T09:00:00+02:00")',
      },
    },
    {
      name: 'endsAtIso',
      type: 'text',
      admin: {
        description: 'ISO 8601 datetime string for event end',
      },
    },
    {
      name: 'timezone',
      type: 'text',
      admin: {
        description: 'Event timezone (e.g., "Europe/Berlin")',
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'descriptionHtml',
      type: 'textarea',
      admin: {
        description: 'HTML description from TicketTailor',
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'content',
      type: 'richText',
      admin: {
        description:
          'Automatically parsed from descriptionHtml for better editing (auto-generated via tickettailor).',
      },
    },
    {
      name: 'ctaText',
      type: 'text',
      admin: {
        description: 'Call-to-action text',
      },
    },
    {
      name: 'checkoutUrl',
      type: 'text',
      admin: {
        description: 'TicketTailor checkout URL',
      },
    },
    {
      name: 'publicUrl',
      type: 'text',
      admin: {
        description: 'Public event URL',
      },
    },
    {
      name: 'venueName',
      type: 'text',
      admin: {
        description: 'Name of the venue',
      },
    },
    {
      name: 'venuePostalCode',
      type: 'text',
      admin: {
        description: 'Venue postal code',
      },
    },
    {
      name: 'venueCountry',
      type: 'text',
      admin: {
        description: 'Venue country',
      },
    },
  ],
}
