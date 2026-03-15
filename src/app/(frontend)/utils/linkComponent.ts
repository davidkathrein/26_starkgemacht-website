type LinkDocReference = {
  relationTo?: string
  value?: unknown
}

type LinkLike = {
  linkType?: string | null
  label?: string | null
  doc?: unknown
  internalPath?: string | null
  href?: string | null
  url?: string | null
}

function getNestedString(doc: unknown, fieldPath: string): string | null {
  if (!doc || typeof doc !== 'object') return null

  const value = fieldPath.split('.').reduce<unknown>((acc, segment) => {
    if (!acc || typeof acc !== 'object') return null
    return Reflect.get(acc, segment)
  }, doc)

  if (typeof value !== 'string') return null

  const trimmed = value.trim()
  return trimmed ? trimmed : null
}

function resolveLocalDocHref(docRef: unknown): string | null {
  if (!docRef || typeof docRef !== 'object') return null

  const relationTo = getNestedString(docRef, 'relationTo')
  if (!relationTo) return null

  const value = Reflect.get(docRef as LinkDocReference, 'value')

  if (relationTo === 'media') {
    return getNestedString(value, 'url')
  }

  const slug = getNestedString(value, 'slug')
  if (!slug) return null

  switch (relationTo) {
    case 'pages':
      return `/${slug}`
    case 'blog':
      return `/blog/${slug}`
    case 'event':
      return `/angebot/${slug}`
    default:
      return null
  }
}

function resolveLocalDocLabel(docRef: unknown): string | null {
  if (!docRef || typeof docRef !== 'object') return null

  const relationTo = getNestedString(docRef, 'relationTo')
  if (!relationTo) return null

  const value = Reflect.get(docRef as LinkDocReference, 'value')

  switch (relationTo) {
    case 'pages':
    case 'blog':
      return getNestedString(value, 'title')
    case 'event':
      return getNestedString(value, 'name')
    case 'media':
      return getNestedString(value, 'alt') || getNestedString(value, 'filename')
    default:
      return null
  }
}

export function resolveLinkComponentHref(link: LinkLike): string | null {
  const linkType = link.linkType ?? 'url'

  if (linkType === 'doc') {
    return resolveLocalDocHref(link.doc)
  }

  if (linkType === 'others') {
    const internalPath = link.internalPath?.trim() || null
    return internalPath
  }

  const rawHref = link.href?.trim() || link.url?.trim()
  return rawHref || null
}

export function resolveLinkComponentLabel(link: LinkLike): string | null {
  const linkType = link.linkType ?? 'url'

  if (linkType === 'doc') {
    const localDocLabel = resolveLocalDocLabel(link.doc)
    if (localDocLabel) return localDocLabel
  }

  const rawLabel = link.label?.trim()
  return rawLabel || null
}

export function shouldOpenLinkInNewTab(href: string, explicitNewTab?: boolean | null): boolean {
  if (typeof explicitNewTab === 'boolean') return explicitNewTab
  return href.startsWith('http://') || href.startsWith('https://')
}
