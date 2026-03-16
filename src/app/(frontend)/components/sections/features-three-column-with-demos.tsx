import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Section } from '../elements/section'

export function FeatureThreeColumnWithDemos({
  demo,
  headline,
  subheadline,
  className,
  ...props
}: {
  demo: ReactNode
  headline: ReactNode
  subheadline: ReactNode
} & ComponentProps<'div'>) {
  return (
    <div className={clsx('bg-brand-950/2.5 rounded-lg p-2 dark:bg-white/5', className)} {...props}>
      <div className="relative overflow-hidden rounded-sm dark:after:absolute dark:after:inset-0 dark:after:rounded-sm dark:after:outline-1 dark:after:-outline-offset-1 dark:after:outline-white/10">
        {demo}
      </div>
      <div className="p-6 sm:p-10 lg:p-6">
        <h3 className="text-brand-950 text-base/8 font-medium dark:text-white">{headline}</h3>
        <div className="text-brand-700 dark:text-brand-400 mt-2 flex flex-col gap-4 text-sm/7">
          {subheadline}
        </div>
      </div>
    </div>
  )
}

export function Features({
  features,
  ...props
}: { features: ReactNode } & Omit<ComponentProps<typeof Section>, 'children'>) {
  return (
    <Section {...props}>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">{features}</div>
    </Section>
  )
}
