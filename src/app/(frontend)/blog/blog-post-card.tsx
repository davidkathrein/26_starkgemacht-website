'use client'

import Link from 'next/link'
import { ImageWithCaption } from '@/app/(frontend)/components/elements/image-with-caption'
import { Avatar } from '@/app/(frontend)/components/elements/avatar'
import { estimateReadTimeMinutes } from '@/app/(frontend)/utils/readTime'
import { Badge } from '@/components/ui/badge'
import type { Blog, Team } from '@/payload-types'

type PostWithRelations = Pick<
  Blog,
  | 'id'
  | 'slug'
  | 'title'
  | 'excerpt'
  | 'content'
  | 'publishedAt'
  | 'createdAt'
  | 'featuredImage'
  | 'categories'
> & {
  author: number | Team
}

type BlogPostCardProps = {
  post: PostWithRelations
  /** Heading level for the title. Use h2 on overview, h3 in sections. */
  headingLevel?: 'h2' | 'h3'
  /** Show all categories as filter links (overview) or only first as label (preview). */
  categoriesVariant?: 'links' | 'first-only'
  /** Image size variant and aspect class. */
  imageSize?: 'aspect16x9' | 'aspect4x3'
  imageClassName?: string
  /** When set, category chips call this instead of linking (for client-side filter). */
  onCategoryClick?: (slug: string) => void
}

export function BlogPostCard({
  post,
  headingLevel = 'h2',
  categoriesVariant = 'links',
  imageSize = 'aspect4x3',
  imageClassName = 'mb-5 aspect-4/3 w-full md:mb-4',
  onCategoryClick,
}: BlogPostCardProps) {
  const author = typeof post.author !== 'number' ? post.author : null
  const publishedDate = post.publishedAt ? new Date(post.publishedAt) : new Date(post.createdAt)
  const formattedDate = publishedDate.toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const readTimeMinutes = estimateReadTimeMinutes(post.content)

  const TitleTag = headingLevel

  return (
    <article className="flex h-full flex-col items-start">
      <Link href={`/blog/${post.slug}`} className="block w-full">
        <ImageWithCaption
          media={post.featuredImage}
          alt={post.title}
          imageSize={imageSize}
          className={imageClassName}
          captionVariant="overlay"
        />
      </Link>
      <div
        className={
          categoriesVariant === 'links'
            ? 'flex flex-wrap items-center gap-x-4 gap-y-1 text-xs'
            : 'flex items-center gap-x-4 text-xs'
        }
      >
        <time dateTime={publishedDate.toISOString()} className="text-muted-foreground">
          {formattedDate}
        </time>
        <div className="flex flex-wrap items-center gap-y-2">
          {categoriesVariant === 'links' &&
            post.categories?.map((cat, index) => {
              const c = typeof cat.item !== 'number' ? cat.item : null
              if (!c) return null
              const slug = c.slug
              if (onCategoryClick) {
                return (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="relative z-10 cursor-pointer rounded-full border border-border/70 bg-secondary px-3 py-1.5 font-medium text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    onClick={() => onCategoryClick(slug)}
                    role="button"
                    tabIndex={0}
                  >
                    {c.name}
                  </Badge>
                )
              }
              return (
                <Link key={index} href={`/blog?category=${encodeURIComponent(slug)}`}>
                  <Badge
                    variant="secondary"
                    className="relative z-10 cursor-pointer rounded-full border border-border/70 bg-secondary px-3 py-1.5 font-medium text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    {c.name}
                  </Badge>
                </Link>
              )
            })}
          {categoriesVariant === 'first-only' &&
            (() => {
              const category = post.categories?.[0]
              const categoryItem =
                category && typeof category.item !== 'number' ? category.item : null
              return categoryItem ? (
                <Badge
                  variant="secondary"
                  className="relative z-10 rounded-full border border-border/70 bg-secondary px-3 py-1.5 font-medium text-secondary-foreground"
                >
                  {categoryItem.name}
                </Badge>
              ) : null
            })()}
        </div>
      </div>
      <div className="group relative">
        <TitleTag className="text-foreground font-display mt-3 text-lg/6 font-semibold group-hover:text-primary md:text-xl/7">
          <Link href={`/blog/${post.slug}`}>
            <span className="absolute inset-0" />
            {post.title}
          </Link>
        </TitleTag>
        {post.excerpt && (
          <p className="text-muted-foreground mt-4 line-clamp-3 text-sm/6">
            {post.excerpt}
          </p>
        )}
      </div>
      <div
        className={
          headingLevel === 'h2'
            ? 'relative mt-6 flex items-center gap-x-4 md:mt-auto md:pt-6'
            : 'relative mt-8 flex items-center gap-x-4'
        }
      >
        {author && (
          <Avatar
            media={author.photo && typeof author.photo !== 'number' ? author.photo : null}
            alt={author.name}
            fallbackId={author.id}
            size="default"
          />
        )}
        <div className="min-w-0">
          {author && <p className="text-foreground truncate text-sm font-semibold">{author.name}</p>}
          <p className="text-muted-foreground text-xs/5">{readTimeMinutes} Min. Lesezeit</p>
        </div>
      </div>
    </article>
  )
}
