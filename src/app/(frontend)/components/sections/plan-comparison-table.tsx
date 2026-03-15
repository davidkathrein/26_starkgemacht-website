'use client'

import { clsx } from 'clsx/lite'
import { type ComponentProps, type ReactNode } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Container } from '../elements/container'
import { CheckmarkIcon } from '../icons/checkmark-icon'
import { MinusIcon } from '../icons/minus-icon'

function FeatureGroup<Plan extends string>({
  group,
  plans,
}: {
  group: {
    title: ReactNode
    features: { name: ReactNode; value: ReactNode | Record<Plan, ReactNode> }[]
  }
  plans: Plan[]
}) {
  return (
    <tbody>
      <tr>
        <th
          colSpan={plans.length + 1}
          scope="colgroup"
          className="border-t-olive-950/5 border-b-olive-950/10 text-olive-950 border-t border-b pt-14 pb-4 font-semibold dark:border-t-white/5 dark:border-b-white/10 dark:text-white"
        >
          {group.title}
        </th>
      </tr>
      {group.features.map((feature) => (
        <tr key={String(feature.name)} className="group">
          <th
            scope="row"
            className="border-olive-950/5 text-olive-700 group-first:border-olive-950/10 dark:text-olive-400 border-t py-4 pr-3 font-normal dark:border-white/5 dark:group-first:border-white/10"
          >
            {feature.name}
          </th>
          {plans.map((plan) => {
            const value = ((value: unknown): value is Record<Plan, ReactNode> =>
              typeof value === 'object' && value !== null && plan in value)(feature.value)
              ? feature.value[plan]
              : feature.value

            return (
              <td
                key={plan}
                className="border-olive-950/5 text-olive-700 group-first:border-olive-950/10 dark:text-olive-400 border-t px-3 py-4 text-center dark:border-white/10 dark:group-first:border-white/10"
              >
                {value === true ? (
                  <CheckmarkIcon
                    aria-label="Included"
                    className="stroke-olive-950 dark:stroke-white"
                  />
                ) : value === false ? (
                  <MinusIcon
                    aria-label="Not included"
                    className="stroke-olive-950 dark:stroke-white"
                  />
                ) : (
                  value
                )}
              </td>
            )
          })}
        </tr>
      ))}
    </tbody>
  )
}

export function PlanComparisonTable<const Plan extends string>({
  plans,
  features,
  className,
  ...props
}: {
  plans: Plan[]
  features: {
    title: ReactNode
    features: { name: ReactNode; value: ReactNode | Record<Plan, ReactNode> }[]
  }[]
} & ComponentProps<'section'>) {
  const defaultPlan = plans[0]

  if (!defaultPlan) {
    return null
  }

  return (
    <section className={clsx('py-16', className)} {...props}>
      <Container>
        <table className="w-full border-collapse text-left text-sm/5 max-sm:hidden">
          <colgroup>
            <col className="w-2/5" />
            {plans.map((plan) => (
              <col key={plan} style={{ width: `calc(60% / ${plans.length})` }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th className="bg-olive-100 text-olive-950 dark:bg-olive-950 sticky top-(--scroll-padding-top) py-5 pr-3 text-base/7 font-medium dark:text-white">
                Compare features
              </th>
              {plans.map((plan, index) => (
                <th
                  key={index}
                  className="bg-olive-100 text-olive-950 dark:bg-olive-950 sticky top-(--scroll-padding-top) p-3 text-center font-semibold dark:text-white"
                >
                  {plan}
                </th>
              ))}
            </tr>
          </thead>
          {features.map((group, index) => (
            <FeatureGroup key={index} group={group} plans={plans} />
          ))}
        </table>

        <div className="sm:hidden">
          <Tabs defaultValue={defaultPlan}>
            <TabsList
              className="grid h-auto w-full rounded-none border-b border-b-olive-950/10 bg-transparent p-0 dark:border-b-white/10"
              style={{ gridTemplateColumns: `repeat(${plans.length}, minmax(0, 1fr))` }}
            >
              {plans.map((plan) => (
                <TabsTrigger
                  key={plan}
                  value={plan}
                  className="text-olive-500 relative -mb-px rounded-none border-b-2 border-b-transparent px-2 py-6 text-sm/5 font-medium data-[state=active]:border-olive-950 data-[state=active]:bg-transparent data-[state=active]:text-olive-950 data-[state=active]:shadow-none dark:data-[state=active]:border-white dark:data-[state=active]:text-white"
                >
                  {plan}
                </TabsTrigger>
              ))}
            </TabsList>
            <div>
              {plans.map((plan) => (
                <TabsContent key={plan} value={plan} className="mt-0">
                  <table className="w-full border-collapse text-left text-sm/5">
                    <colgroup>
                      <col className="w-3/4" />
                      <col className="w-1/4" />
                    </colgroup>
                    {features.map((group, index) => (
                      <FeatureGroup key={index} group={group} plans={[plan]} />
                    ))}
                  </table>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </Container>
    </section>
  )
}
