import { clsx } from 'clsx/lite'
import { type ComponentProps } from 'react'

export function Subheading({ children, className, ...props }: ComponentProps<'h2'>) {
  return (
    <h2
      className={clsx(
        'font-display text-brand-950 text-3xl/9 font-medium tracking-[-0.03em] text-pretty sm:text-[2.5rem]/10 dark:text-white',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  )
}
