import Image from 'next/image'
import { BadgeInfoIcon } from 'lucide-react'
import { cn } from '@/app/(frontend)/utils/cn'
import type { Media } from '@/payload-types'

type CaptionVariant = 'below' | 'overlay'
const DEBUG_IMAGE_TRANSFORMS =
  process.env.NEXT_PUBLIC_DEBUG_IMAGE_TRANSFORMS === 'true' ||
  process.env.DEBUG_IMAGE_TRANSFORMS === 'true'

/** Use a specific image size variant when available (e.g. 'aspect16x9' for 16:9 crop, 'aspect4x3' for 4:3 crop). */
export type ImageSizeVariant = 'aspect16x9' | 'aspect4x3' | 'square' | 'aspect3x4'

interface ImageWithCaptionProps {
  media:
    | Pick<Media, 'url' | 'alt' | 'caption' | 'width' | 'height' | 'sizes'>
    | number
    | null
    | undefined
  alt?: string | undefined
  caption?: string | null
  captionVariant?: CaptionVariant
  /** Prefer this image size variant when available (e.g. 16:9 for Aktuelles section). */
  imageSize?: ImageSizeVariant
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
  imageSize,
  width,
  height,
  className,
  priority = false,
}: ImageWithCaptionProps) {
  // Handle null/undefined or numeric ID
  if (!media || typeof media === 'number') {
    return null
  }

  const sizeVariant = imageSize && media.sizes?.[imageSize]?.url ? media.sizes[imageSize] : null
  const url = sizeVariant?.url ?? media.url
  const alt = media.alt ?? altFallback ?? ''
  const caption = captionOverride !== undefined ? captionOverride : media.caption
  const finalWidth = width ?? sizeVariant?.width ?? media.width ?? 1200
  const finalHeight = height ?? sizeVariant?.height ?? media.height ?? 675

  if (DEBUG_IMAGE_TRANSFORMS) {
    console.info('[image-with-caption] Rendering image', {
      alt,
      requestedSizeVariant: imageSize ?? null,
      resolvedToVariant: sizeVariant ? imageSize : null,
      fellBackToOriginalUrl: !sizeVariant,
      originalUrl: media.url ?? null,
      resolvedUrl: url ?? null,
      originalWidth: media.width ?? null,
      originalHeight: media.height ?? null,
      variantWidth: sizeVariant?.width ?? null,
      variantHeight: sizeVariant?.height ?? null,
      finalWidth,
      finalHeight,
      captionVariant,
      className: className ?? null,
    })
  }

  if (!url) {
    if (DEBUG_IMAGE_TRANSFORMS) {
      console.warn('[image-with-caption] Skipping render because no URL was available', {
        requestedSizeVariant: imageSize ?? null,
      })
    }
    return null
  }

  if (captionVariant === 'overlay' && caption) {
    return (
      <figure
        className={cn(
          'border-border/70 bg-card relative overflow-hidden rounded-2xl border',
          className,
        )}
      >
        <Image
          src={url}
          alt={alt}
          width={finalWidth}
          height={finalHeight}
          priority={priority}
          className="bg-muted h-full w-full object-cover"
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
        className="bg-muted border-border/70 w-full rounded-2xl border object-cover"
      />
      {caption && captionVariant === 'below' && (
        <figcaption className="text-muted-foreground mt-4 flex gap-x-2 text-sm/6">
          <BadgeInfoIcon
            aria-hidden="true"
            className="text-muted-foreground/70 mt-0.5 size-5 flex-none"
          />
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
