import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function Eyebrow({ children, className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={clsx('text-olive-700 dark:text-olive-400 text-sm/7 font-semibold', className)}
      {...props}
    >
      {children}
    </div>
  )
}
