import { Container } from '@/app/(frontend)/components/elements/container'
import { Heading } from '@/app/(frontend)/components/elements/heading'
import { RichText } from '@/app/(frontend)/components/elements/rich-text'
import { Text } from '@/app/(frontend)/components/elements/text'
import { withSiteName } from '@/lib/seo'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import config from '@payload-config'

import type { Media, Page } from '@/payload-types'

const DEFAULT_DESCRIPTION =
  'Verein StarkGemacht - Menschen staerken durch Workshops, Kurse und Projekte. Von Selbstverteidigung ueber Kochkurse bis zu Nachhaltigkeits-Workshops.'

async function getPageBySlug(slugString: string) {
  const payload = await getPayload({ config })

  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slugString,
      },
    },
    limit: 1,
    depth: 2,
  })

  return pages.docs[0] as Page | undefined
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const { slug } = await params
  const slugString = slug.join('/')
  const page = await getPageBySlug(slugString)

  if (!page) {
    return {
      title: withSiteName('Seite nicht gefunden'),
      description: DEFAULT_DESCRIPTION,
    }
  }

  const seoImage = typeof page.seo?.image !== 'number' ? (page.seo?.image as Media | null) : null
  const description = page.seo?.description || DEFAULT_DESCRIPTION
  const title = withSiteName(page.title)
  const imageUrl = seoImage?.sizes?.seoPreview?.url || seoImage?.url || undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `/${slugString}`,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: seoImage?.alt || page.title,
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

export default async function DynamicRootPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const slugString = slug.join('/')
  const page = await getPageBySlug(slugString)

  if (!page) {
    notFound()
  }

  return (
    <div className="px-6 py-32 lg:px-8">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Heading>{page.title}</Heading>

          {page.seo?.description ? (
            <Text size="lg" className="mt-6">
              {page.seo.description}
            </Text>
          ) : null}

          <RichText
            data={page.content}
            className="mt-10 max-w-2xl space-y-6 text-base/7 text-olive-600 dark:text-olive-300"
          />
        </div>
      </Container>
    </div>
  )
}
