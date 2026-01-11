import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'
import { Wallpaper } from '../elements/wallpaper'
import { getWallpaperColorFromIndex } from '../../utils/wallpaper'
import { Subheading } from '../elements/subheading'
import { Text } from '../elements/text'
import { ImageWithCaption } from '../elements/image-with-caption'

export default async function BlogThreeColumns({ id }: { id?: string }) {
  const payload = await getPayload({ config })

  const { docs: posts } = await payload.find({
    collection: 'blog',
    where: {
      _status: {
        equals: 'published',
      },
    },
    limit: 3,
    depth: 2,
    sort: '-publishedAt',
  })

  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section className="bg-olive-50 dark:bg-olive-900 py-24 sm:py-32" id={id}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <Subheading>Aktuelles</Subheading>
          <Text className="mt-6">
            Neues aus unserem Verein, inspirierende Geschichten und praktische Tipps für ein starkes, selbstbestimmtes Leben.
          </Text>
        </div>
        <div className="border-olive-950/20 mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t pt-8 sm:mt-12 sm:pt-12 lg:mx-0 lg:max-w-none lg:grid-cols-3 dark:border-white/20">
          {posts.map((post) => {
            const author = typeof post.author !== 'number' ? post.author : null
            const publishedDate = post.publishedAt
              ? new Date(post.publishedAt)
              : new Date(post.createdAt)
            const formattedDate = publishedDate.toLocaleDateString('de-DE', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })
            const category = post.categories?.[0]
            const categoryItem =
              category && typeof category.item !== 'number' ? category.item : null

            return (
              <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
                <Link href={`/blog/${post.slug}`}>
                  <ImageWithCaption
                    media={post.featuredImage}
                    alt={post.title}
                    className="mb-6 aspect-video w-full"
                    captionVariant="overlay"
                  />
                </Link>
                <div className="flex items-center gap-x-4 text-xs">
                  <time
                    dateTime={publishedDate.toISOString()}
                    className="text-olive-600 dark:text-olive-500"
                  >
                    {formattedDate}
                  </time>
                  {categoryItem && (
                    <span className="bg-olive-100 text-olive-700 dark:bg-olive-800 dark:text-olive-300 relative z-10 rounded-full px-3 py-1.5 font-medium">
                      {categoryItem.name}
                    </span>
                  )}
                </div>
                <div className="group relative grow">
                  <h3 className="font-display text-olive-800 group-hover:text-olive-600 dark:group-hover:text-olive-200 mt-3 text-lg/6 font-semibold dark:text-white">
                    <Link href={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  {post.excerpt && (
                    <p className="text-olive-600 dark:text-olive-300 mt-5 line-clamp-3 text-sm/6">
                      {post.excerpt}
                    </p>
                  )}
                </div>
                {author && (
                  <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                    {author.photo && typeof author.photo !== 'number' && author.photo.url ? (
                      <Image
                        src={author.photo.url}
                        alt={author.name}
                        width={40}
                        height={40}
                        className="size-10 rounded-full"
                      />
                    ) : (
                      <Wallpaper
                        color={getWallpaperColorFromIndex(author.id)}
                        className="size-10 rounded-full"
                      />
                    )}

                    <div className="text-sm/6">
                      <p className="text-olive-800 font-semibold dark:text-white">
                        <span className="absolute inset-0" />
                        {author.name}
                      </p>
                    </div>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
