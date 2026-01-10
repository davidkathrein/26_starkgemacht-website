import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

export const Category: CollectionConfig = {
  slug: 'category',
  labels: {
    singular: 'Kategorie',
    plural: 'Kategorien',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Name',
    },
    slugField({ fieldToUse: 'name' }),
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschreibung',
      admin: {
        description: 'Kurze Beschreibung der Kategorie',
      },
    },
  ],
  timestamps: true,
}
