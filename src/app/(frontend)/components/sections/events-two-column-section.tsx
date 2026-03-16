import Image from 'next/image'
import NextLink from 'next/link'
import { Button } from '@/components/ui/button'
import { Wallpaper } from '@/app/(frontend)/components/elements/wallpaper'
import { Link } from '@/app/(frontend)/components/elements/link'
import { ImageWithCaption } from '@/app/(frontend)/components/elements/image-with-caption'
import { getPriceDisplay } from '@/app/(frontend)/utils/preis'
import type { Event } from '@/payload-types'
import {
  Feature,
  FeaturesTwoColumnWithDemos,
} from '@/app/(frontend)/components/sections/features-two-column-with-demos'

type Props = {
  events: Event[]
  id?: string
  eyebrow: React.ReactNode
  headline: React.ReactNode
  subheadline: React.ReactNode
}

export function EventsTwoColumnSection({ events, id, eyebrow, headline, subheadline }: Props) {
  const wallpapers = ['purple', 'blue', 'green', 'brown'] as const

  return (
    <FeaturesTwoColumnWithDemos
      id={id}
      eyebrow={eyebrow}
      headline={headline}
      subheadline={subheadline}
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

            let dateDisplay = formattedStartDate
            if (event.endsAtIso) {
              const endDate = new Date(event.endsAtIso)
              const formattedEndDate = endDate.toLocaleDateString('de-DE', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })

              if (formattedStartDate !== formattedEndDate) {
                dateDisplay = `${formattedStartDate} bis ${formattedEndDate}`
              }
            }

            return (
              <Feature
                key={event.id}
                link={`/angebot/${event.slug}`}
                demo={
                  <Link href={`/angebot/${event.slug}`} className="w-full">
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
                    <p className="mb-2 text-sm font-medium text-muted-foreground">
                      {(event.isFree || event.minPrice !== null) && (
                        <span className="font-semibold text-foreground">
                          {getPriceDisplay(event)}
                        </span>
                      )}
                      {' | '}
                      {dateDisplay}
                      {event.venueName && ` | ${event.venueName}`}
                    </p>
                    {event.previewDescription && <p>{event.previewDescription}</p>}
                  </div>
                }
                cta={
                  <div className="flex gap-2">
                    <Button asChild>
                      <NextLink href={`/angebot/${event.slug}`}>Mehr erfahren</NextLink>
                    </Button>
                    {event.checkoutUrl ? (
                      <Button variant="ghost" asChild>
                        <NextLink
                          href={event.checkoutUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Tickets sichern
                        </NextLink>
                      </Button>
                    ) : (
                      <Button variant="ghost" asChild>
                        <NextLink href="mailto:kontakt@starkgemacht.com">
                          Jetzt kontaktieren
                        </NextLink>
                      </Button>
                    )}
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
