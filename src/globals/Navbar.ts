import type { GlobalConfig } from 'payload'
import { buildLinkComponentFields } from '@/fields/linkComponent'

export const Navbar: GlobalConfig = {
  slug: 'navbar',
  label: 'Navbar',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'links',
      type: 'array',
      label: 'Links',
      labels: {
        singular: 'Link',
        plural: 'Links',
      },
      admin: {
        description: 'Diese Links werden identisch in Desktop- und Mobile-Navigation verwendet.',
      },
      fields: buildLinkComponentFields({
        includeLabel: true,
        labelRequired: true,
        relationTo: ['pages', 'blog', 'event', 'media'],
        includeNewTab: true,
      }),
    },
    {
      name: 'button',
      type: 'group',
      label: 'Button 1',
      admin: {
        description: 'Hauptbutton in der Navbar. Wird als primärer CTA dargestellt.',
      },
      fields: buildLinkComponentFields({
        includeLabel: true,
        labelRequired: true,
        relationTo: ['pages', 'blog', 'event', 'media'],
        includeNewTab: true,
      }),
    },
    {
      name: 'button2',
      type: 'group',
      label: 'Button 2',
      admin: {
        description:
          'Zweiter Button in der Navbar. Wird als sekundärer, dezenter Button dargestellt.',
      },
      fields: buildLinkComponentFields({
        includeLabel: true,
        labelRequired: true,
        relationTo: ['pages', 'blog', 'event', 'media'],
        includeNewTab: true,
      }),
    },
  ],
}
