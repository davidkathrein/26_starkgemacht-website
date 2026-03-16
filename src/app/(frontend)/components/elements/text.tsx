import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function Text({
  children,
  className,
  size = 'md',
  ...props
}: ComponentProps<'div'> & { size?: 'md' | 'lg' }) {
  return (
    <div
      className={clsx(
        size === 'md' && 'text-base/7',
        size === 'lg' && 'text-lg/8',
        'text-brand-900/80 dark:text-brand-200',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
