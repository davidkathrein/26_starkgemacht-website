import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Section } from '../elements/section'
import Link from 'next/link'

export function Feature({
  demo,
  headline,
  subheadline,
  cta,
  className,
  link,
}: {
  demo: ReactNode
  headline: ReactNode
  subheadline: ReactNode
  cta: ReactNode
  link?: string
} & Omit<ComponentProps<'div'>, 'children'>) {
  return (
    <div
      className={clsx(
        'border-border/80 bg-card text-card-foreground rounded-3xl border p-2 shadow-sm',
        className,
      )}
    >
      <div className="border-border/60 bg-muted relative overflow-hidden rounded-2xl border">
        {demo}
      </div>
      <div className="flex flex-col gap-4 p-4 sm:p-8 lg:p-6">
        <MaybeLink href={link}>
          <h3 className="text-base/normal font-medium">{headline}</h3>
          <div className="text-muted-foreground mt-2 flex flex-col gap-4 text-sm/7">
            {subheadline}
          </div>
        </MaybeLink>
        {cta}
      </div>
    </div>
  )
}

export function FeaturesTwoColumnWithDemos({
  features,
  featuresClassName,
  ...props
}: {
  features: ReactNode
  featuresClassName?: string
} & Omit<ComponentProps<typeof Section>, 'children'>) {
  return (
    <Section {...props}>
      <div className={clsx('grid grid-cols-1 gap-2 lg:grid-cols-2', featuresClassName)}>
        {features}
      </div>
    </Section>
  )
}

function MaybeLink({ href, children }: { href?: string; children: ReactNode }) {
  if (href) {
    return <Link href={href}>{children}</Link>
  }

  return <div>{children}</div>
}
