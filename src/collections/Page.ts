import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

export const Page: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Seite', plural: 'Seiten' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user === undefined || user === null) return { _status: { equals: 'published' } }
      return true
    },
  },
  versions: { drafts: { autosave: true, schedulePublish: true }, maxPerDoc: 50 },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Titel' },
    slugField({ fieldToUse: 'title' }),
    {
      type: 'group',
      name: 'seo',
      label: 'SEO',
      admin: { description: 'Suchmaschinenoptimierung' },
      fields: [
        { name: 'description', type: 'textarea', label: 'Meta-Beschreibung' },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Vorschaubild (Open Graph)' },
      ],
    },
    { name: 'content', type: 'richText', required: true, label: 'Inhalt' },
  ],
  timestamps: true,
}
