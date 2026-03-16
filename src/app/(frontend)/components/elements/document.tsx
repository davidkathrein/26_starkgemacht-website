import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function Document({ children, className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={clsx(
        'text-muted-foreground [&_a]:text-foreground [&_h2]:text-foreground [&_strong]:text-foreground [&_ul]:marker:text-muted-foreground/70 space-y-4 text-sm/7 [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-4 [&_h2]:text-base/8 [&_h2]:font-medium [&_h2]:not-first:mt-8 [&_li]:pl-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_strong]:font-semibold [&_ul]:list-[square] [&_ul]:pl-6',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
