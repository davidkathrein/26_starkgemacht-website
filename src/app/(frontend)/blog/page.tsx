import { getPayload } from 'payload'
import config from '@payload-config'
import { Suspense } from 'react'
import { Container } from '@/app/(frontend)/components/elements/container'
import { Heading } from '@/app/(frontend)/components/elements/heading'
import { Text } from '@/app/(frontend)/components/elements/text'
import type { Category } from '@/payload-types'
import { BlogOverviewClient } from '@/app/(frontend)/blog/blog-overview-client'

export default async function BlogOverviewPage() {
  const payload = await getPayload({ config })

  const [categoriesResult, postsResult] = await Promise.all([
    payload.find({
      collection: 'category',
      limit: 100,
      depth: 0,
      sort: 'name',
    }),
    payload.find({
      collection: 'blog',
      where: { _status: { equals: 'published' } },
      limit: 50,
      depth: 2,
      sort: '-publishedAt',
    }),
  ])

  const categories = categoriesResult.docs as Category[]
  const posts = postsResult.docs

  return (
    <div className="w-full px-6 py-24 lg:px-8">
      <Container>
        <div className="mx-auto lg:mx-0">
          <Heading>Alle Blog Beiträge</Heading>
          <Text size="lg" className="mt-4">
            Neues aus unserem Verein, inspirierende Geschichten und praktische Tipps für ein
            starkes, selbstbestimmtes Leben.
          </Text>

          <Suspense fallback={<div className="mt-8">Lade Beiträge...</div>}>
            <BlogOverviewClient posts={posts} categories={categories} className="mt-8" />
          </Suspense>
        </div>
      </Container>
    </div>
  )
}
