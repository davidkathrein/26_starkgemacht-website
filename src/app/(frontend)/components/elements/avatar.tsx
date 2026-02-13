import Image from 'next/image'
import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'
import { Wallpaper } from '@/app/(frontend)/components/elements/wallpaper'
import { getWallpaperColorFromIndex } from '@/app/(frontend)/utils/wallpaper'

const sizeMap = {
  default: {
    class: 'size-10 rounded-full',
    px: 128,
  },
  lg: {
    class:
      'size-24 rounded-2xl object-cover outline-1 -outline-offset-1 outline-black/5 dark:outline-white/10',
    px: 128,
  },
  xl: {
    class:
      'size-32 rounded-2xl object-cover outline-1 -outline-offset-1 outline-black/5 dark:outline-white/10',
    px: 256,
  },
} as const

export type AvatarSize = keyof typeof sizeMap

/** Media-like object with optional square size variant (preferred for avatars). */
export type AvatarMedia = {
  url?: string | null
  sizes?: { square?: { url?: string | null } } | null
}

export type AvatarProps = {
  /** Direct image URL. Ignored when media is provided. */
  src?: string | null
  /** Media document (e.g. from Payload). Prefer square variant when available. */
  media?: AvatarMedia | null
  /** Alt text for the image. */
  alt?: string
  /** When no image, used to pick a deterministic Wallpaper color. */
  fallbackId?: number
  /** Size variant. */
  size?: AvatarSize
  className?: string
}

function getAvatarUrl(props: { src?: string | null; media?: AvatarMedia | null }): string | null {
  if (props.media) {
    const square = props.media.sizes?.square?.url
    if (square) return square
    if (props.media.url) return props.media.url
  }
  return props.src ?? null
}

export function Avatar({
  src,
  media,
  alt = '',
  fallbackId = 0,
  size = 'default',
  className,
}: AvatarProps) {
  const { class: sizeClass, px } = sizeMap[size]
  const imageUrl = getAvatarUrl({ src, media })

  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt={alt}
        width={px}
        height={px}
        className={clsx(sizeClass, className)}
      />
    )
  }

  return (
    <Wallpaper
      color={getWallpaperColorFromIndex(fallbackId)}
      className={clsx(sizeClass, className)}
    />
  )
}
