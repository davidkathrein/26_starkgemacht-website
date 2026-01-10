import Image from 'next/image'
import { BadgeInfoIcon } from 'lucide-react'
import { cn } from '@/app/(frontend)/utils/cn'

type CaptionVariant = 'below' | 'overlay'

interface ImageWithCaptionProps {
  src: string
  alt: string
  caption?: string | null
  captionVariant?: CaptionVariant
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export function ImageWithCaption({
  src,
  alt,
  caption,
  captionVariant = 'below',
  width = 1200,
  height = 675,
  className,
  priority = false,
}: ImageWithCaptionProps) {
  if (captionVariant === 'overlay' && caption) {
    return (
      <figure className={cn('relative overflow-hidden rounded-lg', className)}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="bg-olive-200 dark:bg-olive-800 h-full w-full object-cover"
        />
        <div className="from-olive/80 via-olive/40 absolute inset-x-0 bottom-0 h-32 bg-linear-to-t to-transparent" />
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
        src={src}
        alt={alt}
        width={width}
        height={height}
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
