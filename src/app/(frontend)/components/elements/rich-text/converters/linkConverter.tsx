import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedLinkNode } from '@payloadcms/richtext-lexical'
import Link from 'next/link'
import { internalDocToHref } from './internalLink'

export const linkConverter: JSXConverters<SerializedLinkNode> = {
  link: ({ node, nodesToJSX }) => {
    const fields = node?.fields
    const children = nodesToJSX({ nodes: node.children })

    // Guard against missing fields
    if (!fields) {
      console.warn('Link node has no fields', node)
      return <a href="#">{children}</a>
    }

    // Handle internal document links
    if (fields.linkType === 'internal' && fields.doc) {
      try {
        const href = internalDocToHref({ linkNode: node })

        const openInNewTab =
          fields.newTab ||
          href.includes('mailto:') ||
          href.includes('tel:') ||
          href.includes('/api/')

        return (
          <Link
            href={href}
            target={openInNewTab ? '_blank' : undefined}
            rel={openInNewTab ? 'noopener noreferrer' : undefined}
          >
            {children}
          </Link>
        )
      } catch (e) {
        // Log error for debugging
        console.error('Failed to process internal link:', e, { fields, doc: fields.doc })
        return <span className="text-red-500">{children}</span>
      }
    }

    // Handle external and custom links
    if (fields.linkType === 'custom' && fields.url) {
      const isExternal =
        fields.url.startsWith('http://') ||
        fields.url.startsWith('https://') ||
        fields.url.startsWith('//')

      return (
        <Link
          href={fields.url}
          target={isExternal ? '_blank' : undefined}
          rel="noopener noreferrer"
        >
          {children}
        </Link>
      )
    }

    // Fallback - log unhandled case
    console.warn('Unhandled link type:', { linkType: fields.linkType, fields })
    return <a href={fields.url || '#'}>{children}</a>
  },
}
