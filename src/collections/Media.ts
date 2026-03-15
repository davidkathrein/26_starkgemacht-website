import type { CollectionConfig } from 'payload'
import { regenerateMissingImageSizes } from '@/hooks/regenerateMediaSizes'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Check if filename exists and is too long (macOS limit is 255 chars)
        if (data.filename && data.filename.length > 100) {
          // Extract file extension
          const lastDotIndex = data.filename.lastIndexOf('.')
          const extension = lastDotIndex > -1 ? data.filename.substring(lastDotIndex) : ''

          // Generate a random short filename
          const randomId = Math.random().toString(36).substring(2, 15)
          const timestamp = Date.now().toString(36)
          const newFilename = `${randomId}-${timestamp}${extension}`

          data.filename = newFilename
        }
        return data
      },
      async ({ collection, data, operation, originalDoc, req }) => {
        if (operation === 'update' && originalDoc) {
          await regenerateMissingImageSizes({
            collection,
            data,
            originalDoc: originalDoc as Record<string, unknown>,
            req,
          })
        }
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        description:
          'Optional caption displayed below the image (fully supported in rich text fields)',
      },
    },
  ],
  upload: {
    focalPoint: true,
    imageSizes: [
      {
        name: 'aspect16x9',
        width: 1280,
        height: 720,
      },
      {
        name: 'aspect4x3',
        width: 1280,
        height: 960,
      },
      {
        name: 'square',
        width: 1600,
        height: 1600,
      },
      {
        name: 'aspect3x4',
        width: 1280,
        height: 1707,
      },
      {
        name: 'seoPreview',
        width: 1200,
        height: 630,
        formatOptions: {
          format: 'jpeg',
          options: {
            quality: 84,
            progressive: true,
            mozjpeg: true,
          },
        },
        withoutEnlargement: true,
      },
    ],
    pasteURL: {
      allowList: [
        {
          protocol: 'https',
          hostname: 'yp4yhupjx5bpamyq.public.blob.vercel-storage.com',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'uploads.tickettailorassets.com',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'assets.tailwindplus.com',
          pathname: '/**',
        },
      ],
    },
  },
}
