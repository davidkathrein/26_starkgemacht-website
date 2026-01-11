import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedUploadNode } from '@payloadcms/richtext-lexical'
import { ImageWithCaption } from '@/app/(frontend)/components/elements/image-with-caption'

export const uploadConverter: JSXConverters<SerializedUploadNode> = {
  upload: ({ node }) => {
    const { value, relationTo } = node

    if (relationTo === 'media' && typeof value === 'object' && value !== null) {
      const media = value as {
        url?: string
        alt?: string
        caption?: string
        width?: number
        height?: number
      }

      if (!media.url) return null

      return (
        <ImageWithCaption
          media={media as any}
          width={media.width || 1200}
          height={media.height || 675}
          className="my-8"
        />
      )
    }

    return null
  },
}
