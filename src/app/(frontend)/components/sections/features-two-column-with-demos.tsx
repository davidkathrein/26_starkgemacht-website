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
        'rounded-3xl border border-border/80 bg-card p-2 text-card-foreground shadow-sm',
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-muted">
        {demo}
      </div>
      <div className="flex flex-col gap-4 p-4 sm:p-8 lg:p-6">
        <MaybeLink href={link}>
          <h3 className="text-base/8 font-medium">{headline}</h3>
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
  ...props
}: { features: ReactNode } & Omit<ComponentProps<typeof Section>, 'children'>) {
  return (
    <Section {...props}>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">{features}</div>
    </Section>
  )
}

function MaybeLink({ href, children }: { href?: string; children: ReactNode }) {
  if (href) {
    return <Link href={href}>{children}</Link>
  }

  return <div>{children}</div>
}
