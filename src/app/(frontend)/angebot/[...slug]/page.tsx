import { Container } from '@/app/(frontend)/components/elements/container'
import { Eyebrow } from '@/app/(frontend)/components/elements/eyebrow'
import { Heading } from '@/app/(frontend)/components/elements/heading'
import { Text } from '@/app/(frontend)/components/elements/text'
import { Button } from '@/components/ui/button'
import { RichText } from '@/app/(frontend)/components/elements/rich-text'
import { ImageWithCaption } from '@/app/(frontend)/components/elements/image-with-caption'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import type { Event, Media } from '@/payload-types'
import { Globe2, MapPin, MoveRight } from 'lucide-react'
import { getPriceDisplay } from '../../utils/preis'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { withSiteName } from '@/lib/seo'
import { EventsTwoColumnSection } from '@/app/(frontend)/components/sections/events-two-column-section'

import type { Metadata } from 'next'

const DEFAULT_DESCRIPTION =
  'Verein StarkGemacht - Menschen stärken durch Workshops, Kurse und Projekte. Von Selbstverteidigung über Kochkurse bis zu Nachhaltigkeits-Workshops. Für ein selbstbewusstes, gesundes und gemeinschaftliches Leben.'

async function getEventBySlug(slugString: string) {
  const payload = await getPayload({ config })

  const events = await payload.find({
    collection: 'event',
    where: {
      slug: {
        equals: slugString,
      },
    },
    limit: 1,
    depth: 2,
  })

  return events.docs[0] as Event | undefined
}

async function getMoreEvents(currentSlug: string) {
  const payload = await getPayload({ config })
  const now = new Date().toISOString()

  const events = await payload.find({
    collection: 'event',
    where: {
      and: [
        {
          slug: {
            not_equals: currentSlug,
          },
        },
        {
          or: [
            {
              endsAtIso: {
                greater_than_equal: now,
              },
            },
            {
              and: [
                {
                  endsAtIso: {
                    exists: false,
                  },
                },
                {
                  startsAtIso: {
                    greater_than_equal: now,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    limit: 4,
    depth: 2,
    sort: 'startsAtIso',
  })

  return events.docs as Event[]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const { slug } = await params
  const slugString = slug.join('/')
  const event = await getEventBySlug(slugString)

  if (!event) {
    return {
      title: withSiteName('Angebot'),
      description: DEFAULT_DESCRIPTION,
    }
  }

  const title = withSiteName(event.name)
  const description = event.previewDescription || DEFAULT_DESCRIPTION
  const customImage = typeof event.customImage !== 'number' ? event.customImage : null
  const imageUrl =
    customImage?.sizes?.seoPreview?.url || customImage?.url || event.image || undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/angebot/${slugString}`,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: customImage?.alt || event.name,
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

export default async function AngebotPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const slugString = slug.join('/')

  const event = await getEventBySlug(slugString)

  if (!event) {
    notFound()
  }

  const moreEvents = await getMoreEvents(slugString)

  // Get custom image with caption or fallback to event.image
  const customImage = typeof event.customImage !== 'number' ? event.customImage : null
  const media:
    | Pick<Media, 'url' | 'alt' | 'caption' | 'width' | 'height'>
    | number
    | null
    | undefined = customImage || {
    url: event.image,
    alt: event.name,
  }

  // Format date
  const startDate = new Date(event.startsAtIso)
  const formattedDate = startDate.toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const formattedTime = startDate.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  })

  // Format end date if available
  let endDateDisplay = ''
  if (event.endsAtIso) {
    const endDate = new Date(event.endsAtIso)
    const formattedEndDate = endDate.toLocaleDateString('de-DE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    const formattedEndTime = endDate.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
    })

    // Check if same day
    if (formattedDate === formattedEndDate) {
      endDateDisplay = ` - ${formattedEndTime} Uhr`
    } else {
      endDateDisplay = ` bis ${formattedEndDate} um ${formattedEndTime} Uhr`
    }
  }

  const venueCountryDisplay = event.venueCountry
    ? event.venueCountry.length === 2
      ? (new Intl.DisplayNames(['de'], { type: 'region' }).of(event.venueCountry.toUpperCase()) ??
        event.venueCountry)
      : event.venueCountry
    : null

  const CtaButton: React.ReactNode = event.checkoutUrl && (
    <div className="mt-10 flex items-center gap-4">
      <Button asChild size="lg">
        <Link href={event.checkoutUrl} target="_blank" rel="noopener noreferrer">
          Jetzt Tickets sichern <MoveRight size={14} />
        </Link>
      </Button>
    </div>
  )

  return (
    <div className="py-32">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Eyebrow>
            {getPriceDisplay(event)} | {formattedDate} um {formattedTime} Uhr{endDateDisplay}
            {event.venueName && ` | ${event.venueName}`}
          </Eyebrow>

          <Heading className="mt-2">{event.name}</Heading>

          {event.previewDescription && (
            <Text size="lg" className="mt-6">
              {event.previewDescription}
            </Text>
          )}

          <Button asChild className="mt-6" size="lg">
            <Link href={event.checkoutUrl ?? '#'} rel="noopener noreferrer" target="_blank">
              Jetzt Tickets sichern <MoveRight size={14} />
            </Link>
          </Button>

          {(customImage || event.image) && <ImageWithCaption media={media} className="mt-10" />}

          {event.content && (
            <RichText
              data={event.content}
              className="text-brand-600 dark:text-brand-300 mt-10 max-w-2xl space-y-6 text-base/7"
            />
          )}

          {event.venueName && (
            <>
              <Separator />

              <section className="border-brand-950/10 via-brand-50/80 to-brand-100/70 dark:from-brand-900 dark:via-brand-900 dark:to-brand-950 mt-12 overflow-hidden rounded-[1.75rem] border bg-linear-to-br from-white p-1 shadow-[0_24px_70px_-48px_rgba(39,48,28,0.55)] dark:border-white/10">
                <div className="dark:bg-brand-950/70 relative overflow-hidden rounded-[calc(1.75rem-1px)] bg-white/80 px-6 py-6 backdrop-blur-sm sm:px-8 sm:py-8">
                  <div className="bg-brand-200/50 dark:bg-brand-700/20 absolute -top-14 -right-14 h-32 w-32 rounded-full blur-3xl" />
                  <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-start">
                    <div className="flex flex-col items-start justify-between">
                      <div className="border-brand-950/10 text-brand-600 dark:text-brand-300 inline-flex items-center gap-2 rounded-full border bg-white/80 px-3 py-1 text-xs font-semibold tracking-[0.18em] uppercase dark:border-white/10 dark:bg-white/5">
                        <MapPin className="h-3.5 w-3.5" />
                        Veranstaltungsort
                      </div>

                      <h3 className="font-display text-brand-900 mt-4 text-2xl font-semibold tracking-tight sm:text-3xl dark:text-white">
                        {event.venueName}
                      </h3>

                      {event.checkoutUrl && (
                        <div className="mt-8">
                          <Button asChild size="lg">
                            <Link
                              href={event.checkoutUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Jetzt Tickets sichern <MoveRight size={14} />
                            </Link>
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                      <div className="border-brand-950/10 rounded-2xl border bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                        <p className="text-brand-500 dark:text-brand-400 text-xs font-semibold tracking-[0.18em] uppercase">
                          Adresse
                        </p>
                        <p className="text-brand-800 mt-2 text-sm leading-6 font-medium dark:text-white">
                          {event.venuePostalCode ?? event.venueName}
                        </p>
                      </div>

                      {venueCountryDisplay && (
                        <div className="border-brand-950/10 rounded-2xl border bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                          <div className="flex items-start gap-3">
                            <div className="bg-brand-100 text-brand-700 dark:bg-brand-800 dark:text-brand-200 flex h-9 w-9 items-center justify-center rounded-full">
                              <Globe2 className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-brand-500 dark:text-brand-400 text-xs font-semibold tracking-[0.18em] uppercase">
                                Land
                              </p>
                              <p className="text-brand-800 mt-1 text-sm leading-6 font-medium dark:text-white">
                                {venueCountryDisplay}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>

        {moreEvents.length > 0 && (
          <div className="mt-24">
            <EventsTwoColumnSection
              events={moreEvents}
              eyebrow="Weitere Angebote"
              headline="Das könnte dich auch interessieren"
              subheadline={
                <p>
                  Weitere Workshops, Kurse und Veranstaltungen von StarkGemacht, die gut zu diesem
                  Angebot passen.
                </p>
              }
            />
          </div>
        )}
      </Container>
    </div>
  )
}
