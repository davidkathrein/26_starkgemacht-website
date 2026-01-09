import type { CollectionConfig } from 'payload'

export const TeamMember: CollectionConfig = {
  slug: 'team',
  labels: {
    singular: 'Team Member',
    plural: 'Team Members',
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
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
          admin: {
            description: 'Full URL including https:// or mailto:',
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
