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
import { ArrowUpRight, Linkedin } from 'lucide-react'
import { Mail, Globe2 } from 'lucide-react'
import { Avatar } from '@/app/(frontend)/components/elements/avatar'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { Metadata } from 'next'
import Link from 'next/link'
import { withSiteName } from '@/lib/seo'
import { BlogPostCard } from '@/app/(frontend)/blog/blog-post-card'
import { SharePostButton } from '@/app/(frontend)/blog/share-post-button'
import {
  resolveLinkComponentHref,
  shouldOpenLinkInNewTab,
} from '@/app/(frontend)/utils/linkComponent'
import { estimateReadTimeMinutes } from '@/app/(frontend)/utils/readTime'
import { Button } from '@/components/ui/button'

const DEFAULT_DESCRIPTION =
  'Aktuelle Beiträge von StarkGemacht: Impulse, Geschichten und Wissen rund um Selbstverteidigung, Gesundheit und Gemeinschaft.'

const getLinkTooltip = (platform: string, url: string) => {
  if (url.startsWith('mailto:')) return 'Mailprogramm öffnen'

  return `${platform} öffnen`
}

async function getBlogPostBySlug(slug: string) {
  const payload = await getPayload({ config })

  const posts = await payload.find({
    collection: 'blog',
    overrideAccess: false,
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

async function resolveTeamAuthor(author: Blog['author']): Promise<Team | null> {
  if (author && typeof author !== 'number') {
    return author as Team
  }

  if (typeof author !== 'number') {
    return null
  }

  const payload = await getPayload({ config })

  const teamMember = await payload.findByID({
    collection: 'team',
    id: author,
    depth: 1,
  })

  return teamMember as Team
}

async function getSimilarBlogPosts(post: Blog, limit = 3) {
  const payload = await getPayload({ config })
  const categoryIds = (post.categories || [])
    .map((category) => {
      const item = category.item
      if (!item) return null
      return typeof item === 'number' ? item : item.id
    })
    .filter((id): id is number => typeof id === 'number')

  const relatedPosts = await payload.find({
    collection: 'blog',
    overrideAccess: false,
    depth: 2,
    limit,
    sort: '-publishedAt',
    where: {
      and: [
        {
          id: {
            not_equals: post.id,
          },
        },
        ...(categoryIds.length > 0
          ? [
              {
                'categories.item': {
                  in: categoryIds,
                },
              },
            ]
          : []),
      ],
    },
  })

  if (relatedPosts.docs.length >= limit || categoryIds.length > 0) {
    const docs = relatedPosts.docs as Blog[]
    return Promise.all(
      docs.map(async (doc) => ({
        ...doc,
        author: await resolveTeamAuthor(doc.author),
      })),
    ) as Promise<Blog[]>
  }

  const fallbackPosts = await payload.find({
    collection: 'blog',
    overrideAccess: false,
    depth: 2,
    limit,
    sort: '-publishedAt',
    where: {
      id: {
        not_equals: post.id,
      },
    },
  })

  const docs = fallbackPosts.docs as Blog[]
  return Promise.all(
    docs.map(async (doc) => ({
      ...doc,
      author: await resolveTeamAuthor(doc.author),
    })),
  ) as Promise<Blog[]>
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
      title: withSiteName('Blog'),
      description: DEFAULT_DESCRIPTION,
    }
  }

  const title = withSiteName(post.title)
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

function getAuthorCardLabel(author: Team) {
  const geschlecht =
    'geschlecht' in author && typeof author.geschlecht === 'string' ? author.geschlecht : null

  if (geschlecht === 'weiblich') return 'Über die Autorin'
  if (geschlecht === 'maennlich') return 'Über den Autor'

  return 'Über die Autor:in'
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

  const author = await resolveTeamAuthor(post.author)

  // Get categories
  const categories = post.categories || []

  // Get featured image
  const featuredImage = typeof post.featuredImage !== 'number' ? post.featuredImage : null
  const readTimeMinutes = estimateReadTimeMinutes(post.content)
  const similarPosts = await getSimilarBlogPosts(post)

  return (
    <div className="py-32">
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
                    className="bg-brand-100 text-brand-700 hover:bg-brand-200 dark:bg-brand-800 dark:text-brand-300 dark:hover:bg-brand-700 relative z-10 cursor-pointer rounded-full px-3 py-1.5 font-medium transition-colors"
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

          <div className="text-brand-600 dark:text-brand-300 mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
            {author && (
              <>
                <Avatar
                  media={author.photo && typeof author.photo !== 'number' ? author.photo : null}
                  alt={author.name}
                  fallbackId={author.id}
                  size="default"
                />
                <span className="text-brand-800 font-semibold dark:text-white">{author.name}</span>
                {author.role && (
                  <>
                    <span className="text-brand-400 dark:text-brand-500">·</span>
                    <span>{author.role}</span>
                  </>
                )}
                <span className="text-brand-400 dark:text-brand-500">·</span>
              </>
            )}
            <span>{readTimeMinutes} Min. Lesezeit</span>
          </div>

          {featuredImage && <ImageWithCaption media={featuredImage} className="mt-10" />}

          {post.content && (
            <RichText
              data={post.content}
              className="text-brand-600 dark:text-brand-300 mt-10 max-w-2xl space-y-6 text-base/7"
            />
          )}

          <SharePostButton title={post.title} />

          {/* Author card – full team member info */}
          {author && (
            <Card
              className="border-brand-950/10 bg-brand-50/80 dark:bg-brand-900/80 mt-16 dark:border-white/10"
              aria-label={getAuthorCardLabel(author)}
            >
              <CardHeader>
                <CardTitle className="font-display text-brand-950 text-lg font-semibold dark:text-white">
                  {getAuthorCardLabel(author)}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-6 sm:flex-row sm:gap-8">
                <div className="min-w-0 flex-1 space-y-4">
                  <div className="flex items-end gap-2">
                    <Avatar
                      media={author.photo && typeof author.photo !== 'number' ? author.photo : null}
                      alt={author.name}
                      fallbackId={author.id}
                      size="lg"
                      className="shrink-0"
                    />
                    <div>
                      <p className="text-brand-800 font-semibold dark:text-white">{author.name}</p>
                      {author.role && (
                        <p className="text-brand-600 dark:text-brand-300 mt-0.5 text-base/7">
                          {author.role}
                        </p>
                      )}
                    </div>
                  </div>
                  {author.bio &&
                    typeof author.bio === 'object' &&
                    author.bio !== null &&
                    'root' in author.bio && (
                      <div className="text-brand-600 dark:text-brand-400 text-base/7 [&_p]:mb-3 [&_p:last-child]:mb-0">
                        <RichText data={author.bio} className="[&_p]:mb-3 [&_p:last-child]:mb-0" />
                      </div>
                    )}
                  {author.links && author.links.length > 0 && (
                    <ul role="list" className="flex flex-wrap gap-x-6 gap-y-2">
                      {author.links.map((link, index) => {
                        const href = resolveLinkComponentHref(link)
                        if (!href) return null

                        const IconComponent = getSocialIcon(link.platform)
                        if (!IconComponent) return null
                        return (
                          <li key={link.id ?? index}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link
                                  href={href}
                                  className="text-brand-600 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-200 transition-colors"
                                  target={
                                    shouldOpenLinkInNewTab(href, link.newTab) ? '_blank' : undefined
                                  }
                                  rel={
                                    shouldOpenLinkInNewTab(href, link.newTab)
                                      ? 'noopener noreferrer'
                                      : undefined
                                  }
                                >
                                  <span className="sr-only">{link.platform}</span>
                                  <IconComponent className="size-5" />
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{getLinkTooltip(link.platform, href)}</p>
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

        {similarPosts.length > 0 && (
          <section className="mt-20" aria-labelledby="similar-posts-heading">
            <div className="mb-8 flex flex-col gap-5 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <h2
                  id="similar-posts-heading"
                  className="font-display text-foreground text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
                >
                  Ähnliche Beiträge
                </h2>
                <Text className="mt-2">
                  Weitere Artikel, die thematisch zu diesem Beitrag passen.
                </Text>
              </div>
              <Button variant="ghost" asChild className="w-fit">
                <Link href="/blog">
                  Alle Beiträge ansehen <ArrowUpRight />
                </Link>
              </Button>
            </div>
            <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
              {similarPosts.map((similarPost) => (
                <BlogPostCard
                  key={similarPost.id}
                  post={{
                    id: similarPost.id,
                    slug: similarPost.slug,
                    title: similarPost.title,
                    excerpt: similarPost.excerpt,
                    content: similarPost.content,
                    publishedAt: similarPost.publishedAt,
                    createdAt: similarPost.createdAt,
                    featuredImage: similarPost.featuredImage,
                    categories: similarPost.categories,
                    author: similarPost.author,
                  }}
                  headingLevel="h3"
                  categoriesVariant="first-only"
                  imageSize="aspect16x9"
                  imageClassName="mb-5 aspect-16/9 w-full"
                />
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  )
}
