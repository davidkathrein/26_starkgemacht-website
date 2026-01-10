import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      admin: {
        description: 'wird bei Blog-Beiträgen als Autor angezeigt',
      },
    },
    // Email added by default
    // Add more fields as needed
  ],
}
