'use client'

import { useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { Category } from '@/payload-types'
import { BlogCategoryFilter } from '@/app/(frontend)/blog/blog-category-filter'
import { BlogPostCard } from '@/app/(frontend)/blog/blog-post-card'

type BlogPost = Parameters<typeof BlogPostCard>[0]['post']

type Props = {
  posts: BlogPost[]
  categories: Category[]
  className?: string
}

export function BlogOverviewClient({ posts, categories, className }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const selectedSlug = searchParams.get('category') ?? null

  const handleSelectCategory = (slug: string | null) => {
    const next = new URLSearchParams(searchParams.toString())
    if (slug) next.set('category', slug)
    else next.delete('category')
    const query = next.toString()
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  const filteredPosts = useMemo(() => {
    if (!selectedSlug) return posts
    return posts.filter((post) =>
      post.categories?.some((c) => {
        const item = typeof c.item !== 'number' ? c.item : null
        return item?.slug === selectedSlug
      }),
    )
  }, [posts, selectedSlug])

  return (
    <>
      <BlogCategoryFilter
        categories={categories}
        currentSlug={selectedSlug}
        onSelectCategory={handleSelectCategory}
        className={className}
      />

      <div className="border-olive-950/20 mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 border-t pt-10 md:max-w-5xl md:grid-cols-2 lg:mx-0 lg:max-w-none xl:grid-cols-3 dark:border-white/20">
        {filteredPosts.length === 0 ? (
          <p className="text-olive-600 dark:text-olive-400 col-span-full py-12 text-center">
            {selectedSlug
              ? 'Keine Beiträge in dieser Kategorie.'
              : 'Noch keine Beiträge veröffentlicht.'}
          </p>
        ) : (
          filteredPosts.map((post) => (
            <BlogPostCard
              key={post.id}
              post={post}
              headingLevel="h2"
              categoriesVariant="links"
              imageSize="aspect4x3"
              onCategoryClick={(slug) => handleSelectCategory(slug)}
            />
          ))
        )}
      </div>
    </>
  )
}
