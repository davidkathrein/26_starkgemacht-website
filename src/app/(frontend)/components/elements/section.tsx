import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from './container'
import { Eyebrow } from './eyebrow'
import { Subheading } from './subheading'
import { Text } from './text'

export function Section({
  eyebrow,
  headline,
  subheadline,
  cta,
  className,
  withoutContainer,
  children,
  ...props
}: {
  eyebrow?: ReactNode
  headline?: ReactNode
  subheadline?: ReactNode
  cta?: ReactNode
  withoutContainer?: boolean
} & ComponentProps<'section'>) {
  const content = (
    <>
      {headline && (
        <div className="flex max-w-2xl flex-col gap-6">
          <div className="flex flex-col gap-2">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <Subheading>{headline}</Subheading>
          </div>
          {subheadline && <Text className="text-pretty">{subheadline}</Text>}
          {cta}
        </div>
      )}
      <div>{children}</div>
    </>
  )

  return (
    <section className={clsx('py-12', className)} {...props}>
      {withoutContainer ? (
        <div className="flex flex-col gap-10 sm:gap-16">{content}</div>
      ) : (
        <Container className="flex flex-col gap-10 sm:gap-16">{content}</Container>
      )}
    </section>
  )
}
