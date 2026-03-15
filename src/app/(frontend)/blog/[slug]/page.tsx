import { Container } from '@/app/(frontend)/components/elements/container'
import { Eyebrow } from '@/app/(frontend)/components/elements/eyebrow'
import { Heading } from '@/app/(frontend)/components/elements/heading'
import { Text } from '@/app/(frontend)/components/elements/text'
import { RichText } from '@/app/(frontend)/components/elements/rich-text'
import { ImageWithCaption } from '@/app/(frontend)/components/elements/image-with-caption'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import type { Blog, Team } from '@/payload-types'
import { XIcon } from '@/app/(frontend)/components/icons/social/x-icon'
import { SiFacebook, SiInstagram } from 'react-icons/si'
import { Linkedin } from 'lucide-react'
import { Mail, Globe2 } from 'lucide-react'
import { Avatar } from '@/app/(frontend)/components/elements/avatar'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { Metadata } from 'next'
import Link from 'next/link'

const DEFAULT_DESCRIPTION =
  'Aktuelle Beiträge von Stark gemacht: Impulse, Geschichten und Wissen rund um Selbstverteidigung, Gesundheit und Gemeinschaft.'

const getLinkTooltip = (platform: string, url: string) => {
  if (url.startsWith('mailto:')) return 'Mailprogramm öffnen'

  return `${platform} öffnen`
}

async function getBlogPostBySlug(slug: string) {
  const payload = await getPayload({ config })

  const posts = await payload.find({
    collection: 'blog',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 2,
  })

  return posts.docs[0] as Blog | undefined
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: 'Blog - Stark gemacht',
      description: DEFAULT_DESCRIPTION,
    }
  }

  const title = `${post.title} - Stark gemacht`
  const description = post.excerpt || DEFAULT_DESCRIPTION
  const featuredImage = typeof post.featuredImage !== 'number' ? post.featuredImage : null
  const imageUrl = featuredImage?.sizes?.seoPreview?.url || featuredImage?.url || undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/blog/${slug}`,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: featuredImage?.alt || post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: imageUrl ? 'summary_large_image' : 'summary',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}

function getSocialIcon(platform: string) {
  switch (platform.toLowerCase()) {
    case 'x':
      return XIcon
    case 'linkedin':
      return Linkedin
    case 'facebook':
      return SiFacebook
    case 'mail':
      return Mail
    case 'website':
      return Globe2
    case 'instagram':
      return SiInstagram
    default:
      return null
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

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

  const author = typeof post.author !== 'number' ? (post.author as Team) : null

  // Get categories
  const categories = post.categories || []

  // Get featured image
  const featuredImage = typeof post.featuredImage !== 'number' ? post.featuredImage : null

  return (
    <div className="px-6 py-32 lg:px-8">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-x-4 text-xs">
            <Eyebrow>{formattedDate}</Eyebrow>
            {categories.map((cat) => {
              const category = cat.item && typeof cat.item !== 'number' ? cat.item : null
              return category ? (
                <a
                  key={cat.id}
                  href={`/blog?category=${encodeURIComponent(category.slug)}`}
                  className="inline-block"
                >
                  <Badge
                    variant="secondary"
                    className="relative z-10 cursor-pointer rounded-full bg-olive-100 px-3 py-1.5 font-medium text-olive-700 transition-colors hover:bg-olive-200 dark:bg-olive-800 dark:text-olive-300 dark:hover:bg-olive-700"
                  >
                    {category.name}
                  </Badge>
                </a>
              ) : null
            })}
          </div>

          <Heading className="mt-4">{post.title}</Heading>

          {post.excerpt && (
            <Text size="lg" className="mt-6">
              {post.excerpt}
            </Text>
          )}

          {/* Author byline */}
          {author && (
            <div className="mt-6 flex items-center gap-x-3 text-sm text-olive-600 dark:text-olive-300">
              <Avatar
                media={author.photo && typeof author.photo !== 'number' ? author.photo : null}
                alt={author.name}
                fallbackId={author.id}
                size="default"
              />
              <span className="font-semibold text-olive-800 dark:text-white">{author.name}</span>
              {author.role && (
                <>
                  <span className="text-olive-400 dark:text-olive-500">·</span>
                  <span>{author.role}</span>
                </>
              )}
            </div>
          )}

          {featuredImage && <ImageWithCaption media={featuredImage} className="mt-10" />}

          {post.content && (
            <RichText
              data={post.content}
              className="mt-10 max-w-2xl space-y-6 text-base/7 text-olive-600 dark:text-olive-300"
            />
          )}

          {/* Tags */}
          {categories && categories.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {categories.map((categoryItem, index) => {
                const cat = typeof categoryItem.item !== 'number' ? categoryItem.item : null
                return cat ? (
                  <a
                    key={index}
                    href={`/blog?category=${encodeURIComponent(cat.slug)}`}
                    className="inline-block"
                  >
                    <Badge
                      variant="secondary"
                      className="cursor-pointer rounded-full bg-olive-100 px-3 py-1 text-sm font-medium text-olive-700 transition-colors hover:bg-olive-200 dark:bg-olive-800 dark:text-olive-300 dark:hover:bg-olive-700"
                    >
                      {cat.name}
                    </Badge>
                  </a>
                ) : null
              })}
            </div>
          )}

          {/* Author card – full team member info */}
          {author && (
            <Card
              className="mt-16 border-olive-950/10 bg-olive-50/80 dark:border-white/10 dark:bg-olive-900/80"
              aria-label="Über den Autor"
            >
              <CardHeader>
                <CardTitle className="font-display text-lg font-semibold text-olive-950 dark:text-white">
                  Über den Autor
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-6 sm:flex-row sm:gap-8">
                <div className="shrink-0">
                  <Avatar
                    media={author.photo && typeof author.photo !== 'number' ? author.photo : null}
                    alt={author.name}
                    fallbackId={author.id}
                    size="xl"
                  />
                </div>
                <div className="min-w-0 flex-1 space-y-4">
                  <div>
                    <p className="font-semibold text-olive-800 dark:text-white">{author.name}</p>
                    {author.role && (
                      <p className="mt-0.5 text-base/7 text-olive-600 dark:text-olive-300">
                        {author.role}
                      </p>
                    )}
                  </div>
                  {author.bio &&
                    typeof author.bio === 'object' &&
                    author.bio !== null &&
                    'root' in author.bio && (
                      <div className="text-base/7 text-olive-600 dark:text-olive-400 [&_p]:mb-3 [&_p:last-child]:mb-0">
                        <RichText data={author.bio} className="[&_p]:mb-3 [&_p:last-child]:mb-0" />
                      </div>
                    )}
                  {author.links && author.links.length > 0 && (
                    <ul role="list" className="flex flex-wrap gap-x-6 gap-y-2">
                      {author.links.map((link, index) => {
                        const IconComponent = getSocialIcon(link.platform)
                        if (!IconComponent) return null
                        return (
                          <li key={link.id ?? index}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link
                                  href={link.url}
                                  className="text-olive-600 transition-colors hover:text-olive-800 dark:text-olive-400 dark:hover:text-olive-200"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <span className="sr-only">{link.platform}</span>
                                  <IconComponent className="size-5" />
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{getLinkTooltip(link.platform, link.url)}</p>
                              </TooltipContent>
                            </Tooltip>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </Container>
    </div>
  )
}
