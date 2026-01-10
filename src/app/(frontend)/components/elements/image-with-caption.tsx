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
          className="h-full w-full bg-olive-200 object-cover dark:bg-olive-800"
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-olive/80 via-olive/40 to-transparent" />
        <figcaption>
          <p className="absolute bottom-4 left-4 right-4 text-sm font-medium text-white">
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
        className="w-full rounded-xl bg-olive-200 object-cover dark:bg-olive-800"
      />
      {caption && captionVariant === 'below' && (
        <figcaption className="mt-4 flex gap-x-2 text-sm/6 text-olive-600 dark:text-olive-500">
          <BadgeInfoIcon
            aria-hidden="true"
            className="mt-0.5 size-5 flex-none text-olive-400 dark:text-olive-600"
          />
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
