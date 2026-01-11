import { Container } from '@/app/(frontend)/components/elements/container'
import { Eyebrow } from '@/app/(frontend)/components/elements/eyebrow'
import { Heading } from '@/app/(frontend)/components/elements/heading'
import { Text } from '@/app/(frontend)/components/elements/text'
import { ButtonLink } from '@/app/(frontend)/components/elements/button'
import { RichText } from '@/app/(frontend)/components/elements/rich-text'
import { ImageWithCaption } from '@/app/(frontend)/components/elements/image-with-caption'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import type { Event, Media } from '@/payload-types'
import { MoveRight } from 'lucide-react'
import { getPriceDisplay } from '../../utils/preis'

export default async function AngebotPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const slugString = slug.join('/')

  const payload = await getPayload({ config })

  const events = await payload.find({
    collection: 'event',
    where: {
      slug: {
        equals: slugString,
      },
    },
    limit: 1,
    depth: 2, // Populate relationships including customImage
  })

  const event = events.docs[0] as Event | undefined

  if (!event) {
    notFound()
  }

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

  return (
    <div className="px-6 py-32 lg:px-8">
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

          <ButtonLink
            href={event.checkoutUrl ?? '#'}
            className="mt-6"
            size="lg"
            rel="noopener noreferrer"
            target="_blank"
          >
            Jetzt Tickets sichern <MoveRight size={14} />
          </ButtonLink>

          {(customImage || event.image) && <ImageWithCaption media={media} className="mt-10" />}

          {event.content && (
            <RichText
              data={event.content}
              className="text-olive-600 dark:text-olive-300 mt-10 max-w-2xl space-y-6 text-base/7"
            />
          )}

          {event.venueName && (
            <div className="border-olive-950/20 dark:bg-olive-900 mt-10 rounded-xl border bg-white p-6 dark:border-white/20">
              <h3 className="font-display text-olive-800 text-xl font-semibold dark:text-white">
                Veranstaltungsort
              </h3>
              <div className="text-olive-600 dark:text-olive-300 mt-4 space-y-1">
                <p className="text-olive-800 font-semibold dark:text-white">{event.venueName}</p>
                {event.venuePostalCode && <p>{event.venuePostalCode}</p>}
                {event.venueCountry && <p>{event.venueCountry}</p>}
              </div>
            </div>
          )}

          {event.checkoutUrl && (
            <div className="mt-10 flex items-center gap-4">
              <ButtonLink
                href={event.checkoutUrl}
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Jetzt Tickets sichern <MoveRight size={14} />
              </ButtonLink>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
