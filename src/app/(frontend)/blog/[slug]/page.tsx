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
    <div className="bg-olive-50 dark:bg-olive-900 px-6 py-32 lg:px-8">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-x-4 text-xs">
            <Eyebrow>{formattedDate}</Eyebrow>
            {categories.map((cat) => (
              <span
                key={cat.id}
                className="bg-olive-100 text-olive-700 dark:bg-olive-800 dark:text-olive-300 relative z-10 rounded-full px-3 py-1.5 font-medium"
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
          <div className="text-olive-600 dark:text-olive-300 mt-6 flex items-center gap-x-4 text-sm">
            <span className="text-olive-800 font-semibold dark:text-white">Von {authorName}</span>
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
              className="text-olive-600 dark:text-olive-300 mt-10 max-w-2xl space-y-6 text-base/7"
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
                    className="bg-olive-100 text-olive-700 dark:bg-olive-800 dark:text-olive-300 rounded-full px-3 py-1 text-sm font-medium"
                  >
                    {cat.name}
                  </span>
                ) : null
              })}
            </div>
          )}

          {/* Author card */}
          {author && (
            <div className="border-olive-950/20 dark:bg-olive-900 mt-16 rounded-xl border bg-white p-6 dark:border-white/20">
              <h3 className="font-display text-olive-800 text-xl font-semibold dark:text-white">
                Über den Autor
              </h3>
              <div className="text-olive-600 dark:text-olive-300 mt-4 space-y-2">
                <p className="text-olive-800 font-semibold dark:text-white">{authorName}</p>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
