import type { GlobalConfig } from 'payload'
import { buildLinkComponentFields } from '@/fields/linkComponent'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'linkGroups',
      type: 'array',
      label: 'Link-Gruppen',
      labels: {
        singular: 'Link-Gruppe',
        plural: 'Link-Gruppen',
      },
      admin: {
        description: 'Jede Gruppe enthaelt manuelle Links.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titel',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          label: 'Manuelle Links',
          fields: buildLinkComponentFields({
            includeLabel: true,
            labelRequired: true,
            urlFieldName: 'href',
            relationTo: ['pages', 'blog', 'event', 'media'],
            includeNewTab: true,
          }),
        },
      ],
    },
    {
      name: 'newsletter',
      type: 'group',
      label: 'Newsletter',
      fields: [
        {
          name: 'headline',
          type: 'text',
          label: 'Titel',
          defaultValue: 'Newsletter anmelden',
        },
        {
          name: 'subheadline',
          type: 'textarea',
          label: 'Untertitel',
          defaultValue:
            'Erhalte aktuelle Informationen zu unseren Workshops, Kursen und Veranstaltungen direkt in dein Postfach.',
        },
        {
          name: 'hideNewsletter',
          type: 'checkbox',
          label: 'Newsletter-Formular ausblenden',
          defaultValue: false,
        },
      ],
    },
  ],
}
