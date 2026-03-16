import { AnnouncementBadge } from '@/app/(frontend)/components/elements/announcement-badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Main } from '@/app/(frontend)/components/elements/main'
import { ArrowNarrowRightIcon } from '@/app/(frontend)/components/icons/arrow-narrow-right-icon'
import {
  Feature,
  FeaturesTwoColumnWithDemos,
} from '@/app/(frontend)/components/sections/features-two-column-with-demos'
import { HeroLeftAlignedWithDemo } from '@/app/(frontend)/components/sections/hero-left-aligned-with-demo'
import CTAWithImageTiles from '@/app/(frontend)/components/sections/cta-with-image-tiles'
import TeamImageShortParagraph from '@/app/(frontend)/components/sections/team-image-short-paragraph'
import { fetchAllUpcomingEvents } from './utils/tickettailor'
import { Suspense } from 'react'
import { Wallpaper } from './components/elements/wallpaper'
import { Link } from './components/elements/link'
import BlogThreeColumns from './components/sections/blog-three-columns'
import { ImageWithCaption } from './components/elements/image-with-caption'
import { getPriceDisplay } from './utils/preis'
import NextLink from 'next/link'

export default async function HomePage() {
  return (
    <>
      <Main>
        {/* Hero */}
        <HeroLeftAlignedWithDemo
          id="hero"
          eyebrow={
            <AnnouncementBadge
              href="mailto:kontakt@starkgemacht.com"
              text="Du willst ein Angebot für deine Schule/Organisation?"
              cta="Jetzt anfragen"
            />
          }
          headline="StarkGemacht: Menschen stärken, Gemeinschaft fördern, Zukunft gestalten."
          subheadline={
            <p>
              Mit Workshops, Kursen und Projekten rund um Selbstschutz, Gesundheit und
              Nachhaltigkeit bringen wir Menschen zusammen und stärken Selbstvertrauen, Gemeinschaft
              und Lebensfreude.
            </p>
          }
          cta={
            <div className="flex items-center gap-4">
              <Button size="lg" asChild>
                <NextLink href="#angebot">Angebote entdecken</NextLink>
              </Button>

              <Button variant="ghost" size="lg" asChild>
                <NextLink href="#uber">
                  Mehr über StarkGemacht <ArrowNarrowRightIcon />
                </NextLink>
              </Button>
            </div>
          }
        />

        {/* About */}
        <CTAWithImageTiles id="uber" />

        {/* Team */}
        <TeamImageShortParagraph />

        {/* Features / Events */}
        <Suspense
          fallback={
            <FeaturesTwoColumnWithDemos
              id="angebot"
              eyebrow="Unsere Angebote"
              headline="Workshops, Kurse und Veranstaltungen"
              subheadline={<p>Lade Veranstaltungen...</p>}
              features={<></>}
            />
          }
        >
          <EventsFeatureSection />
        </Suspense>

        {/* Blog Posts */}
        <BlogThreeColumns id="aktuelles" />
      </Main>
    </>
  )
}

async function EventsFeatureSection() {
  const events = await fetchAllUpcomingEvents()

  const wallpapers = ['purple', 'blue', 'green', 'brown'] as const

  return (
    <FeaturesTwoColumnWithDemos
      id="angebot"
      eyebrow="Unsere Angebote"
      headline="Workshops, Kurse und Veranstaltungen"
      subheadline={
        !events || events.length === 0 ? (
          <p>Aktuell sind keine Veranstaltungen verfügbar. Neue Events folgen in Kürze!</p>
        ) : (
          <p>
            Entdecke aktuelle Workshops, Kurse und Veranstaltungen, die Selbstvertrauen,
            Gesundheit, Nachhaltigkeit und gemeinschaftliches Erleben in den Mittelpunkt stellen.
          </p>
        )
      }
      features={
        <>
          {events.map((event, index) => {
            const imageUrl = typeof event.image === 'string' ? event.image : undefined
            const wallpaper = wallpapers[index % wallpapers.length]
            const startDate = new Date(event.startsAtIso)
            const formattedStartDate = startDate.toLocaleDateString('de-DE', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })

            // Format date display with end date if available
            let dateDisplay = formattedStartDate
            if (event.endsAtIso) {
              const endDate = new Date(event.endsAtIso)
              const formattedEndDate = endDate.toLocaleDateString('de-DE', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })

              // Check if same day
              if (formattedStartDate !== formattedEndDate) {
                dateDisplay = `${formattedStartDate} bis ${formattedEndDate}`
              }
            }

            return (
              <Feature
                key={event.ticketTailorId}
                link={'/angebot/' + event.slug}
                demo={
                  <Link href={'/angebot/' + event.slug} className="w-full">
                    {event.customImage &&
                    typeof event.customImage === 'object' &&
                    'url' in event.customImage &&
                    event.customImage.url ? (
                      <ImageWithCaption
                        media={event.customImage}
                        captionVariant="overlay"
                        width={1800}
                        height={1012}
                        className="aspect-video w-full"
                      />
                    ) : imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={event.name}
                        className="aspect-video w-full rounded-lg object-cover"
                        width={1800}
                        height={1012}
                      />
                    ) : (
                      <Wallpaper color={wallpaper} className="aspect-video w-full object-cover" />
                    )}
                  </Link>
                }
                headline={event.name}
                subheadline={
                  <div>
                    <p className="text-brand-600 dark:text-brand-300 mb-2 text-sm font-medium">
                      {(event.isFree || event.minPrice !== null) && (
                        <span className="text-brand-800 dark:text-brand-200 mb-2 font-semibold">
                          {getPriceDisplay({
                            isFree: event.isFree,
                            minPrice: event.minPrice,
                            maxPrice: event.maxPrice,
                          })}
                        </span>
                      )}
                      {' | '}
                      {dateDisplay}

                      {event.venueName && ` | ${event.venueName}`}
                    </p>
                    {event.descriptionHtml && <p>{event.previewDescription}</p>}
                  </div>
                }
                cta={
                  <div className="flex gap-2">
                    {event.checkoutUrl ? (
                      <Button asChild>
                        <NextLink href={'/angebot/' + event.slug}>
                          Mehr erfahren
                        </NextLink>
                      </Button>
                    ) : undefined}
                    <Button variant="ghost" asChild>
                      <NextLink
                        href={event.checkoutUrl ?? 'mailto:kontakt@starkgemacht.com'}
                        target={event.checkoutUrl ? '_blank' : undefined}
                        rel={event.checkoutUrl ? 'noopener noreferrer' : undefined}
                      >
                        {event.checkoutUrl ? 'Tickets sichern' : 'Jetzt kontaktieren'}
                      </NextLink>
                    </Button>
                  </div>
                }
              />
            )
          })}
        </>
      }
    />
  )
}
