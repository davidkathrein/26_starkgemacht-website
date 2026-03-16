import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function Document({ children, className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={clsx(
        'text-brand-700 dark:text-brand-400 [&_a]:text-brand-950 [&_h2]:text-brand-950 [&_strong]:text-brand-950 [&_ul]:marker:text-brand-400 dark:[&_ul]:marker:text-brand-600 space-y-4 text-sm/7 [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-4 dark:[&_a]:text-white [&_h2]:text-base/8 [&_h2]:font-medium [&_h2]:not-first:mt-8 dark:[&_h2]:text-white [&_li]:pl-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_strong]:font-semibold dark:[&_strong]:text-white [&_ul]:list-[square] [&_ul]:pl-6',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
