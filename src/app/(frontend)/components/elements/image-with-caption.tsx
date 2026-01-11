import Image from 'next/image'
import { BadgeInfoIcon } from 'lucide-react'
import { cn } from '@/app/(frontend)/utils/cn'
import type { Media } from '@/payload-types'

type CaptionVariant = 'below' | 'overlay'

interface ImageWithCaptionProps {
  media: Media | number | null | undefined
  alt?: string
  caption?: string | null
  captionVariant?: CaptionVariant
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export function ImageWithCaption({
  media,
  alt: altFallback,
  caption: captionOverride,
  captionVariant = 'below',
  width,
  height,
  className,
  priority = false,
}: ImageWithCaptionProps) {
  // Handle null/undefined or numeric ID
  if (!media || typeof media === 'number') {
    return null
  }

  const url = media.url
  const alt = media.alt ?? altFallback ?? ''
  const caption = captionOverride !== undefined ? captionOverride : media.caption
  const finalWidth = width ?? media.width ?? 1200
  const finalHeight = height ?? media.height ?? 675

  if (!url) {
    return null
  }

  if (captionVariant === 'overlay' && caption) {
    return (
      <figure className={cn('relative overflow-hidden rounded-lg', className)}>
        <Image
          src={url}
          alt={alt}
          width={finalWidth}
          height={finalHeight}
          priority={priority}
          className="bg-olive-200 dark:bg-olive-800 h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
        <figcaption>
          <p className="absolute right-4 bottom-4 left-4 text-sm font-medium text-white">
            {caption}
          </p>
        </figcaption>
      </figure>
    )
  }

  return (
    <figure className={className}>
      <Image
        src={url}
        alt={alt}
        width={finalWidth}
        height={finalHeight}
        priority={priority}
        className="bg-olive-200 dark:bg-olive-800 w-full rounded-xl object-cover"
      />
      {caption && captionVariant === 'below' && (
        <figcaption className="text-olive-600 dark:text-olive-500 mt-4 flex gap-x-2 text-sm/6">
          <BadgeInfoIcon
            aria-hidden="true"
            className="text-olive-400 dark:text-olive-600 mt-0.5 size-5 flex-none"
          />
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
