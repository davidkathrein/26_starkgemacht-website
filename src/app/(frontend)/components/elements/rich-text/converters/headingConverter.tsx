import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedHeadingNode } from '@payloadcms/richtext-lexical'

export const headingConverter: JSXConverters<SerializedHeadingNode> = {
  heading: ({ node, nodesToJSX }) => {
    if (node.tag === 'h2') {
      const text = nodesToJSX({ nodes: node.children })

      const id = text
        .join('')
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')

      return (
        <h2
          id={id}
          className="text-foreground font-display text-3xl font-semibold tracking-tight text-balance"
        >
          {text}
        </h2>
      )
    } else if (node.tag === 'h3') {
      const text = nodesToJSX({ nodes: node.children })
      return (
        <h3 className="text-foreground font-display text-2xl font-semibold tracking-tight text-balance">
          {text}
        </h3>
      )
    } else if (node.tag === 'h4') {
      const text = nodesToJSX({ nodes: node.children })
      return (
        <h4 className="text-foreground font-display text-xl font-semibold tracking-tight text-balance">
          {text}
        </h4>
      )
    } else {
      const text = nodesToJSX({ nodes: node.children }).join('')
      const Tag = node.tag
      return <Tag>{text}</Tag>
    }
  },
}
