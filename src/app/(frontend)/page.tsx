import { AnnouncementBadge } from '@/app/(frontend)/components/elements/announcement-badge'
import { Button } from '@/components/ui/button'
import { Main } from '@/app/(frontend)/components/elements/main'
import { ArrowNarrowRightIcon } from '@/app/(frontend)/components/icons/arrow-narrow-right-icon'
import { FeaturesTwoColumnWithDemos } from '@/app/(frontend)/components/sections/features-two-column-with-demos'
import { HeroLeftAlignedWithDemo } from '@/app/(frontend)/components/sections/hero-left-aligned-with-demo'
import CTAWithImageTiles from '@/app/(frontend)/components/sections/cta-with-image-tiles'
import TeamImageShortParagraph from '@/app/(frontend)/components/sections/team-image-short-paragraph'
import { fetchAllUpcomingEvents } from './utils/tickettailor'
import { Suspense } from 'react'
import BlogThreeColumns from './components/sections/blog-three-columns'
import NextLink from 'next/link'
import { EventsTwoColumnSection } from '@/app/(frontend)/components/sections/events-two-column-section'

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
            <div className="flex items-center">
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

  return (
    <EventsTwoColumnSection
      id="angebot"
      events={events}
      eyebrow="Unsere Angebote"
      headline="Workshops, Kurse und Veranstaltungen"
      subheadline={
        !events || events.length === 0 ? (
          <p>Aktuell sind keine Veranstaltungen verfügbar. Neue Events folgen in Kürze!</p>
        ) : (
          <p>
            Entdecke aktuelle Workshops, Kurse und Veranstaltungen, die Selbstvertrauen, Gesundheit,
            Nachhaltigkeit und gemeinschaftliches Erleben in den Mittelpunkt stellen.
          </p>
        )
      }
    />
  )
}
