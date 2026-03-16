'use client'

import { useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { Category } from '@/payload-types'
import { BlogCategoryFilter } from '@/app/(frontend)/blog/blog-category-filter'
import { BlogPostCard } from '@/app/(frontend)/blog/blog-post-card'
import { Heading } from '@/app/(frontend)/components/elements/heading'
import { Text } from '@/app/(frontend)/components/elements/text'
import { Separator } from '@radix-ui/react-separator'

type BlogPost = Parameters<typeof BlogPostCard>[0]['post']

type Props = {
  posts: BlogPost[]
  categories: Category[]
}

export function BlogOverviewClient({ posts, categories }: Props) {
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

  const selectedCategory = useMemo(
    () => categories.find((category) => category.slug === selectedSlug) ?? null,
    [categories, selectedSlug],
  )

  const headline = selectedCategory ? 'Blog: ' + selectedCategory.name : 'Alle Blog Beiträge'
  const subheadline = selectedCategory
    ? `Beiträge aus der Kategorie '${selectedCategory.name}'. Neues aus unserem Verein, inspirierende Geschichten und praktische Tipps für ein starkes, selbstbestimmtes Leben.`
    : 'Neues aus unserem Verein, inspirierende Geschichten und praktische Tipps für ein starkes, selbstbestimmtes Leben.'

  return (
    <>
      <Heading>{headline}</Heading>
      <Text size="lg" className="mt-4">
        {subheadline}
      </Text>

      <BlogCategoryFilter
        categories={categories}
        currentSlug={selectedSlug}
        onSelectCategory={handleSelectCategory}
        className="mt-8"
      />

      <div className="text-muted-foreground mt-10 mb-6 text-sm/6">
        Zeige {filteredPosts.length} {filteredPosts.length === 1 ? 'Beitrag' : 'Beiträge'}
        {selectedCategory ? ` in '${selectedCategory.name}'` : ''}
      </div>

      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 md:max-w-5xl md:grid-cols-2 lg:mx-0 lg:max-w-none xl:grid-cols-3">
        {filteredPosts.length === 0 ? (
          <p className="text-muted-foreground col-span-full py-12 text-center">
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
