import type { ComponentProps } from 'react'
import { Button as BaseButton } from '@/components/ui/button'

const sizeMap = {
  md: 'default',
  lg: 'lg',
} as const

type LegacySize = keyof typeof sizeMap
type LegacyColor = 'dark/light' | 'light'

function getSolidVariant(color: LegacyColor) {
  return color === 'light' ? 'light' : 'default'
}

function getGhostVariant(color: LegacyColor) {
  return color === 'light' ? 'ghostLight' : 'ghost'
}

export function Button({
  size = 'md',
  type = 'button',
  color = 'dark/light',
  className,
  ...props
}: {
  size?: LegacySize
  color?: LegacyColor
} & ComponentProps<'button'>) {
  return (
    <BaseButton
      type={type}
      variant={getSolidVariant(color)}
      size={sizeMap[size]}
      className={className}
      {...props}
    />
  )
}

export function ButtonLink({
  size = 'md',
  color = 'dark/light',
  className,
  href,
  ...props
}: {
  href: string
  size?: LegacySize
  color?: LegacyColor
} & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <BaseButton asChild variant={getSolidVariant(color)} size={sizeMap[size]} className={className}>
      <a href={href} {...props} />
    </BaseButton>
  )
}

export function SoftButton({
  size = 'md',
  type = 'button',
  className,
  ...props
}: {
  size?: LegacySize
} & ComponentProps<'button'>) {
  return (
    <BaseButton
      type={type}
      variant="soft"
      size={sizeMap[size]}
      className={className}
      {...props}
    />
  )
}

export function SoftButtonLink({
  size = 'md',
  href,
  className,
  ...props
}: {
  href: string
  size?: LegacySize
} & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <BaseButton asChild variant="soft" size={sizeMap[size]} className={className}>
      <a href={href} {...props} />
    </BaseButton>
  )
}

export function PlainButton({
  size = 'md',
  color = 'dark/light',
  type = 'button',
  className,
  ...props
}: {
  size?: LegacySize
  color?: LegacyColor
} & ComponentProps<'button'>) {
  return (
    <BaseButton
      type={type}
      variant={getGhostVariant(color)}
      size={sizeMap[size]}
      className={className}
      {...props}
    />
  )
}

export function PlainButtonLink({
  size = 'md',
  color = 'dark/light',
  href,
  className,
  ...props
}: {
  href: string
  size?: LegacySize
  color?: LegacyColor
} & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <BaseButton asChild variant={getGhostVariant(color)} size={sizeMap[size]} className={className}>
      <a href={href} {...props} />
    </BaseButton>
  )
}
