'use client'

import { clsx } from 'clsx/lite'
import { Badge } from '@/components/ui/badge'
import type { Category } from '@/payload-types'

type Props = {
  categories: Category[]
  currentSlug: string | null
  onSelectCategory: (slug: string | null) => void
  className?: string
}

export function BlogCategoryFilter({
  categories,
  currentSlug,
  onSelectCategory,
  className,
}: Props) {
  const badgeClass = (isActive: boolean) =>
    clsx(
      'cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors',
      isActive
        ? 'bg-brand-800 text-white dark:bg-brand-200 dark:text-brand-900'
        : 'bg-brand-100 text-brand-700 hover:bg-brand-200 dark:bg-brand-800 dark:text-brand-300 dark:hover:bg-brand-700',
    )

  return (
    <nav
      aria-label="Blog nach Kategorie filtern"
      className={clsx('flex flex-wrap gap-2', className)}
    >
      <Badge
        variant="secondary"
        className={badgeClass(!currentSlug)}
        onClick={() => onSelectCategory(null)}
        role="button"
        tabIndex={0}
      >
        Alle
      </Badge>
      {categories.map((cat) => (
        <Badge
          key={cat.id}
          variant="secondary"
          className={badgeClass(currentSlug === cat.slug)}
          onClick={() => onSelectCategory(cat.slug)}
          role="button"
          tabIndex={0}
        >
          {cat.name}
        </Badge>
      ))}
    </nav>
  )
}
