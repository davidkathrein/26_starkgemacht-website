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
      'cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors',
      isActive
        ? 'border-primary bg-primary text-primary-foreground'
        : 'border-border/70 bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground',
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
