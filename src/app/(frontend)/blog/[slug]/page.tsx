import { Container } from '@/app/(frontend)/components/elements/container'
import { Eyebrow } from '@/app/(frontend)/components/elements/eyebrow'
import { Heading } from '@/app/(frontend)/components/elements/heading'
import { Text } from '@/app/(frontend)/components/elements/text'
import { RichText } from '@/app/(frontend)/components/elements/rich-text'
import { ImageWithCaption } from '@/app/(frontend)/components/elements/image-with-caption'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import type { Blog } from '@/payload-types'

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const payload = await getPayload({ config })

  const posts = await payload.find({
    collection: 'blog',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 2, // Populate author and category relationships
  })

  const post = posts.docs[0] as Blog | undefined

  if (!post) {
    notFound()
  }

  // Format published date
  const publishedDate = post.publishedAt ? new Date(post.publishedAt) : new Date(post.createdAt)
  const formattedDate = publishedDate.toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  // Get author name
  const author = typeof post.author !== 'number' ? post.author : null
  const authorName = author?.fullName || 'Unbekannt'

  // Get categories
  const categories = post.categories || []

  // Get featured image
  const featuredImage = typeof post.featuredImage !== 'number' ? post.featuredImage : null

  return (
    <div className="bg-olive-100 px-6 py-32 lg:px-8 dark:bg-olive-950">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-x-4 text-xs">
            <Eyebrow>{formattedDate}</Eyebrow>
            {categories.map((cat) => (
              <span
                key={cat.id}
                className="relative z-10 rounded-full bg-white px-3 py-1.5 font-medium text-olive-700 dark:bg-olive-900 dark:text-olive-400"
              >
                {cat.item && typeof cat.item !== 'number' ? cat.item.name : 'Unkategorisiert'}
              </span>
            ))}
          </div>

          <Heading className="mt-4">{post.title}</Heading>

          {post.excerpt && (
            <Text size="lg" className="mt-6">
              {post.excerpt}
            </Text>
          )}

          {/* Author info */}
          <div className="mt-6 flex items-center gap-x-4 text-sm text-olive-700 dark:text-olive-400">
            <span className="font-semibold text-olive-950 dark:text-white">Von {authorName}</span>
          </div>

          {featuredImage?.url && (
            <ImageWithCaption
              src={featuredImage.url}
              alt={post.title}
              caption={featuredImage.caption}
              className="mt-10"
            />
          )}

          {post.content && (
            <RichText
              data={post.content}
              className="mt-10 max-w-2xl space-y-6 text-base/7 text-olive-700 dark:text-olive-400"
            />
          )}

          {/* Tags */}
          {categories && categories.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {categories.map((categoryItem, index) => {
                const cat = typeof categoryItem.item !== 'number' ? categoryItem.item : null
                return cat ? (
                  <span
                    key={index}
                    className="rounded-full bg-white px-3 py-1 text-sm font-medium text-olive-700 dark:bg-olive-900 dark:text-olive-400"
                  >
                    {cat.name}
                  </span>
                ) : null
              })}
            </div>
          )}

          {/* Author card */}
          {author && (
            <div className="mt-16 rounded-xl border border-olive-950/20 bg-white p-6 dark:border-white/20 dark:bg-olive-900">
              <h3 className="font-display text-xl font-semibold text-olive-950 dark:text-white">
                Über den Autor
              </h3>
              <div className="mt-4 space-y-2 text-olive-700 dark:text-olive-400">
                <p className="font-semibold text-olive-950 dark:text-white">{authorName}</p>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
