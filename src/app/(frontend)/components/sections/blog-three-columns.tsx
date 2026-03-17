import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { Subheading } from '../elements/subheading'
import { Text } from '../elements/text'
import { Button } from '@/components/ui/button'
import { BlogPostCard } from '@/app/(frontend)/blog/blog-post-card'

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
    <section className="bg-brand-50 dark:bg-brand-900 py-20 sm:py-24" id={id}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <Subheading>Aktuelle Blog Beiträge</Subheading>
          <Text className="mt-6">
            Neues aus unserem Verein, inspirierende Geschichten und praktische Tipps für ein
            starkes, selbstbestimmtes Leben.
          </Text>
          <Button size="lg" asChild className="mt-6">
            <Link href="/blog">Alle Blog Beiträge</Link>
          </Button>
        </div>
        <div className="border-brand-950/20 mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 border-t pt-8 sm:mt-10 sm:pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3 dark:border-white/20">
          {posts.map((post) => (
            <BlogPostCard
              key={post.id}
              post={post}
              headingLevel="h3"
              categoriesVariant="first-only"
              imageSize="aspect4x3"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
