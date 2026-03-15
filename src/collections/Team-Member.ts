import type { CollectionConfig } from 'payload'
import { buildLinkComponentFields } from '@/fields/linkComponent'

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
        ...buildLinkComponentFields({
          relationTo: ['pages', 'blog', 'event', 'media', 'team', 'category'],
          includeNewTab: true,
        }),
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
