import type { Field } from 'payload'

type LinkComponentOptions = {
  includeLabel?: boolean
  labelFieldName?: string
  labelFieldLabel?: string
  labelRequired?: boolean
  linkTypeFieldName?: string
  linkTypeFieldLabel?: string
  urlFieldName?: string
  urlFieldLabel?: string
  docFieldName?: string
  docFieldLabel?: string
  internalPathFieldName?: string
  internalPathFieldLabel?: string
  includeNewTab?: boolean
  newTabFieldName?: string
  newTabFieldLabel?: string
  relationTo?: string[]
}

function validateInternalPath(value: unknown): true | string {
  if (!value || typeof value !== 'string') {
    return 'Interner Pfad ist erforderlich.'
  }

  const trimmed = value.trim()

  if (!trimmed.startsWith('/')) {
    return 'Interner Pfad muss mit / beginnen (z. B. /blog).'
  }

  if (trimmed.startsWith('//')) {
    return 'Interner Pfad darf nicht mit // beginnen.'
  }

  if (/\s/.test(trimmed)) {
    return 'Interner Pfad darf keine Leerzeichen enthalten.'
  }

  return true
}

function validateExternalLink(value: unknown): true | string {
  if (!value || typeof value !== 'string') {
    return 'URL ist erforderlich.'
  }

  const trimmed = value.trim()

  if (trimmed.startsWith('mailto:')) {
    const email = trimmed.slice(7).trim()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Ungueltige Mailto-URL. Format: mailto:office@beispiel.com'
    }

    return true
  }

  try {
    const parsed = new URL(trimmed)
    if (!/^https?:$/i.test(parsed.protocol)) {
      return 'URL muss mit http:// oder https:// beginnen.'
    }

    return true
  } catch {
    return 'Bitte eine gueltige URL angeben (z. B. https://beispiel.com).'
  }
}

export function buildLinkComponentFields(options: LinkComponentOptions = {}): Field[] {
  const includeLabel = options.includeLabel ?? false
  const labelFieldName = options.labelFieldName ?? 'label'
  const labelFieldLabel = options.labelFieldLabel ?? 'Label'
  const labelRequired = options.labelRequired ?? false
  const linkTypeFieldName = options.linkTypeFieldName ?? 'linkType'
  const linkTypeFieldLabel = options.linkTypeFieldLabel ?? 'Link-Typ'
  const urlFieldName = options.urlFieldName ?? 'url'
  const urlFieldLabel = options.urlFieldLabel ?? 'URL'
  const docFieldName = options.docFieldName ?? 'doc'
  const docFieldLabel = options.docFieldLabel ?? 'Dokument'
  const internalPathFieldName = options.internalPathFieldName ?? 'internalPath'
  const internalPathFieldLabel = options.internalPathFieldLabel ?? 'Interner Pfad'
  const includeNewTab = options.includeNewTab ?? false
  const newTabFieldName = options.newTabFieldName ?? 'newTab'
  const newTabFieldLabel = options.newTabFieldLabel ?? 'In neuem Tab oeffnen'

  const relationTo = options.relationTo ?? ['pages', 'blog', 'event', 'media', 'team', 'category']

  const fields: Field[] = []

  if (includeLabel) {
    fields.push({
      name: labelFieldName,
      type: 'text',
      label: labelFieldLabel,
      required: labelRequired,
    })
  }

  fields.push(
    {
      name: linkTypeFieldName,
      type: 'select',
      label: linkTypeFieldLabel,
      required: true,
      defaultValue: 'url',
      options: [
        {
          label: 'URL',
          value: 'url',
        },
        {
          label: 'Lokales Dokument',
          value: 'doc',
        },
        {
          label: 'Andere interne Seite',
          value: 'others',
        },
      ],
    },
    {
      name: urlFieldName,
      type: 'text',
      label: urlFieldLabel,
      admin: {
        condition: (_, siblingData) => siblingData?.[linkTypeFieldName] === 'url',
      },
      validate: (value: unknown, { siblingData }: { siblingData?: Record<string, unknown> }) => {
        if (siblingData?.[linkTypeFieldName] !== 'url') return true
        return validateExternalLink(value)
      },
    },
    {
      name: docFieldName,
      type: 'relationship',
      label: docFieldLabel,
      relationTo: relationTo as any,
      admin: {
        condition: (_, siblingData) => siblingData?.[linkTypeFieldName] === 'doc',
      },
      required: false,
    },
    {
      name: internalPathFieldName,
      type: 'text',
      label: internalPathFieldLabel,
      admin: {
        condition: (_, siblingData) => siblingData?.[linkTypeFieldName] === 'others',
        description: 'Interner Pfad fuer statische Seiten, z. B. /blog oder /impressum.',
      },
      validate: (value: unknown, { siblingData }: { siblingData?: Record<string, unknown> }) => {
        if (siblingData?.[linkTypeFieldName] !== 'others') return true
        return validateInternalPath(value)
      },
    },
  )

  if (includeNewTab) {
    fields.push({
      name: newTabFieldName,
      type: 'checkbox',
      label: newTabFieldLabel,
      defaultValue: false,
    })
  }

  return fields
}
