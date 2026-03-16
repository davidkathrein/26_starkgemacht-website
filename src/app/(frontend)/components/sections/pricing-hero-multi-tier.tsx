'use client'

import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Container } from '../elements/container'
import { Heading } from '../elements/heading'
import { Text } from '../elements/text'
import { CheckmarkIcon } from '../icons/checkmark-icon'

export function Plan({
  name,
  price,
  period,
  subheadline,
  badge,
  features,
  cta,
  className,
}: {
  name: ReactNode
  price: ReactNode
  period?: ReactNode
  subheadline: ReactNode
  badge?: ReactNode
  features: ReactNode[]
  cta: ReactNode
} & ComponentProps<'div'>) {
  return (
    <Card
      className={clsx(
        'border-brand-950/10 bg-brand-950/2.5 flex h-full flex-col justify-between gap-6 shadow-none dark:border-white/10 dark:bg-white/5',
        className,
      )}
    >
      <div className="self-stretch">
        <CardHeader className="p-6 pt-6">
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="font-display text-brand-950 text-2xl/8 tracking-tight dark:text-white">
              {name}
            </CardTitle>
            {badge && (
              <Badge className="bg-brand-950/10 text-brand-950 order-last dark:bg-white/10 dark:text-white">
                {badge}
              </Badge>
            )}
          </div>
          <p className="mt-1 inline-flex gap-1 text-base/7">
            <span className="text-brand-950 dark:text-white">{price}</span>
            {period && <span className="text-brand-500 dark:text-brand-500">{period}</span>}
          </p>
          <CardDescription className="text-brand-700 dark:text-brand-400 mt-4 flex flex-col gap-4 text-sm/6">
            {subheadline}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <ul className="text-brand-700 dark:text-brand-400 mt-4 space-y-2 text-sm/6">
            {features.map((feature, index) => (
              <li key={index} className="flex gap-4">
                <CheckmarkIcon className="stroke-brand-950 h-lh shrink-0 dark:stroke-white" />
                <p>{feature}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </div>
      <CardFooter className="p-6 pt-0">{cta}</CardFooter>
    </Card>
  )
}

export function PricingHeroMultiTier<T extends string>({
  eyebrow,
  headline,
  subheadline,
  options,
  plans,
  footer,
  className,
  ...props
}: {
  eyebrow?: ReactNode
  headline: ReactNode
  subheadline: ReactNode
  options: readonly T[]
  plans: Record<T, ReactNode>
  footer?: ReactNode
} & ComponentProps<'section'>) {
  const defaultOption = options[0]

  if (!defaultOption) {
    return null
  }

  return (
    <section className={clsx('py-16', className)} {...props}>
      <Tabs defaultValue={defaultOption} className="w-full">
        <Container className="flex flex-col gap-16">
          <div className="flex flex-col items-center gap-6">
            {eyebrow}
            <Heading>{headline}</Heading>
            <Text size="lg" className="flex max-w-xl flex-col gap-4 text-center">
              {subheadline}
            </Text>
            <TabsList className="bg-brand-950/5 h-auto rounded-full p-1 dark:bg-white/5">
              {options.map((option) => (
                <TabsTrigger
                  key={option}
                  value={option}
                  className="text-brand-950 data-[state=active]:bg-brand-950 rounded-full px-4 py-1 text-sm/7 font-medium data-[state=active]:text-white data-[state=active]:shadow-none dark:text-white dark:data-[state=active]:bg-white/10 dark:data-[state=active]:text-white"
                >
                  {option}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <div>
            {options.map((option) => (
              <TabsContent
                key={option}
                value={option}
                className="grid grid-cols-1 gap-2 sm:has-[>:nth-child(5)]:grid-cols-2 sm:max-lg:has-[>:last-child:nth-child(even)]:grid-cols-2 lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none lg:has-[>:nth-child(5)]:grid-flow-row lg:has-[>:nth-child(5)]:grid-cols-3"
              >
                {plans[option]}
              </TabsContent>
            ))}
          </div>
          {footer}
        </Container>
      </Tabs>
    </section>
  )
}
