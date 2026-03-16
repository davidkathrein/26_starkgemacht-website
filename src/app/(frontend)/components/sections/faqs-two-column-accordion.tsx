'use client'

import { clsx } from 'clsx/lite'
import { type ComponentProps, type ReactNode, useId } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Container } from '../elements/container'
import { Subheading } from '../elements/subheading'
import { Text } from '../elements/text'

export function Faq({
  id,
  question,
  answer,
  ...props
}: {
  question: ReactNode
  answer: ReactNode
} & Omit<ComponentProps<typeof AccordionItem>, 'children' | 'value'>) {
  const autoId = useId()
  const value = id || autoId

  return (
    <AccordionItem
      value={value}
      id={id}
      className="border-brand-950/10 dark:border-white/10"
      {...props}
    >
      <AccordionTrigger className="text-brand-950 py-4 text-left text-base/7 hover:no-underline dark:text-white">
        {question}
      </AccordionTrigger>
      <AccordionContent className="text-brand-700 dark:text-brand-400 -mt-2 flex flex-col gap-2 pr-12 pb-4 text-sm/7">
        {answer}
      </AccordionContent>
    </AccordionItem>
  )
}

export function FAQsTwoColumnAccordion({
  headline,
  subheadline,
  className,
  children,
  ...props
}: {
  headline?: ReactNode
  subheadline?: ReactNode
} & ComponentProps<'section'>) {
  return (
    <section className={clsx('py-16', className)} {...props}>
      <Container className="grid grid-cols-1 gap-x-2 gap-y-8 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <Subheading>{headline}</Subheading>
          {subheadline && <Text className="flex flex-col gap-4 text-pretty">{subheadline}</Text>}
        </div>
        <Accordion type="multiple">{children}</Accordion>
      </Container>
    </section>
  )
}
