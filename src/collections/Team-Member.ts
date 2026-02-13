import type { CollectionConfig } from 'payload'

/** Convert legacy textarea string to Lexical richText so existing data is preserved. */
function stringToLexicalBio(value: string): {
  root: {
    type: string
    children: unknown[]
    direction: string
    format: string
    indent: number
    version: number
  }
} {
  const paragraphs = value.split(/\n/).filter((line) => line.trim() !== '').length
    ? value.split(/\n/).map((line) => line.trim())
    : [value]
  return {
    root: {
      type: 'root',
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        children: [
          { type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        textFormat: 0,
        textStyle: '',
        version: 1,
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

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
  hooks: {
    afterRead: [
      ({ doc }) => {
        if (doc.bio != null && typeof doc.bio === 'string') {
          ;(doc as Record<string, unknown>).bio = stringToLexicalBio(doc.bio)
        }
        return doc
      },
    ],
  },
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
      type: 'richText',
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
