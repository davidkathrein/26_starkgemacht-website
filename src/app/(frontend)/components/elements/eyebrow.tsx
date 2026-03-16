import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function Eyebrow({ children, className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={clsx('text-brand-800 text-sm/7 font-semibold', className)} {...props}>
      {children}
    </div>
  )
}
