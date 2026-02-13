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
        ? 'bg-olive-800 text-white dark:bg-olive-200 dark:text-olive-900'
        : 'bg-olive-100 text-olive-700 hover:bg-olive-200 dark:bg-olive-800 dark:text-olive-300 dark:hover:bg-olive-700',
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
