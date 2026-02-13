import type { CollectionConfig } from 'payload'

export const TeamMember: CollectionConfig = {
  slug: 'team',
  labels: {
    singular: 'Team Member',
    plural: 'Team Members',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'order'],
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first in the team list',
        position: 'sidebar',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'bio',
      type: 'textarea',
      required: true,
    },
    {
      type: 'array',
      name: 'links',
      fields: [
        {
          name: 'url',
          type: 'text',
          required: true,
          validate: (val: unknown) => {
            if (!val || typeof val !== 'string') return true // required handles empty
            const trimmed = val.trim()
            if (trimmed.startsWith('mailto:')) {
              const email = trimmed.slice(7).trim()
              if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return 'Invalid mailto URL. Use mailto:email@example.com'
              }
              return true
            }
            try {
              new URL(trimmed)
              if (!/^https?:\/\//i.test(trimmed)) {
                return 'URL must start with https:// or http://'
              }
              return true
            } catch {
              return 'Enter a valid URL (e.g. https://beispiel.com) or mailto:office@beispiel.com'
            }
          },
          admin: {
            description: 'Full URL including https://beispiel.com or mailto:office@beispiel.com',
          },
        },
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'mail', value: 'mail' },
            { label: 'website', value: 'website' },
            { label: 'instagram', value: 'instagram' },
            { label: 'facebook', value: 'facebook' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'X (Twitter)', value: 'x' },
          ],
          required: true,
        },
      ],
    },
  ],
}
