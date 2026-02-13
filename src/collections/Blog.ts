import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

export const Blog: CollectionConfig = {
  slug: 'blog',
  labels: {
    singular: 'Blog Post',
    plural: 'Blog Posts',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'category', 'publishedAt', 'updatedAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      // Public: only published posts with publishedAt in the past
      if (!user) {
        return {
          _status: { equals: 'published' },
          publishedAt: { less_than_equal: new Date().toISOString() },
        }
      }
      // Authenticated users can see all
      return true
    },
  },
  defaultSort: 'publishedAt',
  versions: {
    drafts: {
      autosave: true,
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titel',
    },
    slugField({ fieldToUse: 'title' }),
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Zusammenfassung',
      admin: {
        description: 'Kurze Zusammenfassung für Vorschau und SEO',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Titelbild',
      admin: {
        description: 'Bild für Vorschau und Artikelkopf',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Inhalt',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'team',
      required: true,
      label: 'Autor',
      admin: {
        description: 'Autor des Blog Posts',
      },
    },
    {
      name: 'categories',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'relationship',
          relationTo: 'category',
          required: true,
          label: 'Kategorie',
        },
      ],
      label: 'Kategorien',
      admin: {
        description: 'Kategorien des Blog Posts',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Veröffentlichungsdatum',
      defaultValue: new Date(),
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description:
          'Beiträge werden nach diesem Datum sortiert. Ein Beitrag mit einem Datum in der Zukunft wird auf der Website erst ab diesem Zeitpunkt angezeigt.',
      },
    },
  ],
  timestamps: true,
}
