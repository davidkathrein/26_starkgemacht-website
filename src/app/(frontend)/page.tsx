import { AnnouncementBadge } from '@/app/(frontend)/components/elements/announcement-badge'
import {
  ButtonLink,
  PlainButtonLink,
  SoftButtonLink,
} from '@/app/(frontend)/components/elements/button'
import Image from 'next/image'
import { Main } from '@/app/(frontend)/components/elements/main'
import { ArrowNarrowRightIcon } from '@/app/(frontend)/components/icons/arrow-narrow-right-icon'
import { ChevronIcon } from '@/app/(frontend)/components/icons/chevron-icon'
import { CallToActionSimple } from '@/app/(frontend)/components/sections/call-to-action-simple'
import {
  FAQsTwoColumnAccordion,
  Faq,
} from '@/app/(frontend)/components/sections/faqs-two-column-accordion'
import {
  Feature,
  FeaturesTwoColumnWithDemos,
} from '@/app/(frontend)/components/sections/features-two-column-with-demos'
import { HeroLeftAlignedWithDemo } from '@/app/(frontend)/components/sections/hero-left-aligned-with-demo'
import { Plan, PricingMultiTier } from '@/app/(frontend)/components/sections/pricing-multi-tier'
import { Stat, StatsWithGraph } from '@/app/(frontend)/components/sections/stats-with-graph'
import {
  Testimonial,
  TestimonialThreeColumnGrid,
} from '@/app/(frontend)/components/sections/testimonials-three-column-grid'
import CTAWithImageTiles from '@/app/(frontend)/components/sections/cta-with-image-tiles'
import TeamImageShortParagraph from '@/app/(frontend)/components/sections/team-image-short-paragraph'
import { fetchAllUpcomingEvents } from './utils/tickettailor'
import { Suspense } from 'react'
import { Wallpaper } from './components/elements/wallpaper'
import { ArrowUpRight, MoveRight } from 'lucide-react'
import { Link } from './components/elements/link'
import BlogThreeColumns from './components/sections/blog-three-columns'
import { ImageWithCaption } from './components/elements/image-with-caption'

export default async function HomePage() {
  return (
    <>
      <Main>
        {/* Hero */}
        <HeroLeftAlignedWithDemo
          id="hero"
          eyebrow={
            <AnnouncementBadge
              href="#"
              text="Du willst ein Angebot für deine Schule/Organisation?"
              cta="Jetzt anfragen"
            />
          }
          headline="Stark gemacht: Empowerment, Gesundheit und Selbstschutz."
          subheadline={
            <p>
              Workshops, Kurse und Projekte für mehr Selbstvertrauen, Wissen und
              Handlungssicherheit.
            </p>
          }
          cta={
            <div className="flex items-center gap-4">
              <ButtonLink href="#" size="lg">
                Start free trial
              </ButtonLink>

              <PlainButtonLink href="#" size="lg">
                See how it works <ArrowNarrowRightIcon />
              </PlainButtonLink>
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
              headline="Workshops, Kurse und Projekte"
              subheadline={<p>Lade Veranstaltungen...</p>}
              features={<></>}
            />
          }
        >
          <EventsFeatureSection />
        </Suspense>

        {/* Blog Posts */}
        <BlogThreeColumns id="aktuelles" />

        {/* Stats */}
        <StatsWithGraph
          id="stats"
          eyebrow="Built for scale"
          headline="The inbox powering customer conversations everywhere."
          subheadline={
            <p>
              Oatmeal helps teams deliver personal, organized, and fast customer support across the
              world. From small startups to enterprise teams, we process millions of messages each
              month — using a massive network of low wage workers stationed around the globe.
            </p>
          }
        >
          <Stat stat="2M+" text="Emails manually processed every week across thousands of teams." />
          <Stat stat="99.98%" text="Uptime — because your customers never stop complaining." />
        </StatsWithGraph>

        {/* Testimonial */}
        {/* <TestimonialThreeColumnGrid
          id="testimonial"
          headline="What our customers are saying"
          subheadline={
            <p>
              We've given these customers a significant discount in exchange for their honest
              reviews.
            </p>
          }
        >
          <Testimonial
            quote={
              <p>
                Oatmeal has completely transformed our customer support operations. To be fair, we
                weren't doing any customer support at all so the bar was pretty low.
              </p>
            }
            img={
              <img
                src="https://assets.tailwindplus.com/avatars/10.webp?size=160"
                alt=""
                className="not-dark:bg-white/75 dark:bg-black/75"
                width={160}
                height={160}
              />
            }
            name="Jordan Rogers"
            byline="Founder at Anomaly"
          />
          <Testimonial
            quote={
              <p>
                We use Oatmeal's automation features to make cancellation requests disappear into a
                black hole, improving our retention rates by over 300%.
              </p>
            }
            img={
              <img
                src="https://assets.tailwindplus.com/avatars/15.webp?size=160"
                alt=""
                className="not-dark:bg-white/75 dark:bg-black/75"
                width={160}
                height={160}
              />
            }
            name="Lynn Marshall"
            byline="Founder at Pine Labs"
          />
          <Testimonial
            quote={
              <p>
                I've been using the spare time that Oatmeal has freed up to work not just one, but
                two other jobs, all while hitting my core KPIs. My bosses have no idea.
              </p>
            }
            img={
              <img
                src="https://assets.tailwindplus.com/avatars/13.webp?size=160"
                alt=""
                className="not-dark:bg-white/75 dark:bg-black/75"
                width={160}
                height={160}
              />
            }
            name="Rajat Singh"
            byline="Head of Support at Concise"
          />
          <Testimonial
            quote={
              <p>
                Oatmeal has given us key insights into how much our customers absolutely hate using
                our product and how we can improve it to stop them from leaving us.
              </p>
            }
            img={
              <img
                src="https://assets.tailwindplus.com/avatars/12.webp?size=160"
                alt=""
                className="not-dark:bg-white/75 dark:bg-black/75"
                width={160}
                height={160}
              />
            }
            name="John Walters"
            byline="CPO at Orbital"
          />
          <Testimonial
            quote={
              <p>
                As a solo founder, Oatmeal has been a lifesaver. It makes it look like Looply is an
                actual company with multiple employees, when in reality it's just me and an AI.
              </p>
            }
            img={
              <img
                src="https://assets.tailwindplus.com/avatars/11.webp?size=160"
                alt=""
                className="not-dark:bg-white/75 dark:bg-black/75"
                width={160}
                height={160}
              />
            }
            name="Noah Gold"
            byline="CEO at Looply"
          />
          <Testimonial
            quote={
              <p>
                Thanks to Oatmeal, we've managed to cut our support costs in half by laying off
                dozens of employees, while still improving response times and customer satisfaction.
              </p>
            }
            img={
              <img
                src="https://assets.tailwindplus.com/avatars/14.webp?size=160"
                alt=""
                className="not-dark:bg-white/75 dark:bg-black/75"
                width={160}
                height={160}
              />
            }
            name="Mark Levinson"
            byline="COO at Quirk"
          />
        </TestimonialThreeColumnGrid> */}

        {/* FAQs */}
        <FAQsTwoColumnAccordion id="faqs" headline="Questions & Answers">
          <Faq
            id="faq-1"
            question="Do I need a credit card to start the free trial?"
            answer="Yes, but don't worry, you won't be charged until the trial period is over. We won't send you an email reminding you when this happens because we are really hoping you'll forget and we can keep charging you until your cards expires"
          />
          <Faq
            id="faq-2"
            question="Can my whole team use the same inbox?"
            answer="Yes, the more the merrier! Oatmeal works best when your entire company has access. We will charge you per additional seat, but we won't tell you about this until you get your invoice."
          />
          <Faq
            id="faq-3"
            question="Is the AI agent actually a bunch of people in India?"
            answer="Not just India! We have people in lots of countries around the world pretending to be an AI, including some that are currently under sanctions, so we can't legally mention them here."
          />
          <Faq
            id="faq-4"
            question="Does Oatmeal replace my email client?"
            answer="Absolutely. The idea is that we transition you away from email entirely, so you become completely dependent on our service. Like a parasite living off a host."
          />
        </FAQsTwoColumnAccordion>

        {/* Pricing */}
        {/* <PricingMultiTier
          id="pricing"
          headline="Pricing to fit your business needs."
          plans={
            <>
              <Plan
                name="Starter"
                price="$12"
                period="/mo"
                subheadline={<p>Small teams getting started with shared inboxes</p>}
                features={[
                  'Shared inbox for up to 2 mailboxes',
                  'Tagging & assignment',
                  'Private notes',
                  'Automatic replies',
                  'Email support',
                ]}
                cta={
                  <SoftButtonLink href="#" size="lg">
                    Start free trial
                  </SoftButtonLink>
                }
              />
              <Plan
                name="Growth"
                price="$49"
                period="/mo"
                subheadline={<p>Growing teams needing collaboration and insights</p>}
                badge="Most popular"
                features={[
                  'Everything in Starter',
                  'Inbox Agent',
                  'Unlimited mailboxes',
                  'Collision detection',
                  'Snippets and templates',
                  'Reporting dashboard',
                  'Slack integration',
                ]}
                cta={
                  <ButtonLink href="#" size="lg">
                    Start free trial
                  </ButtonLink>
                }
              />
              <Plan
                name="Pro"
                price="$299"
                period="/mo"
                subheadline={<p>Support-focused organizations and larger teams</p>}
                features={[
                  'Everything in Growth',
                  'Custom roles & permissions',
                  'Automation engine',
                  'API access',
                  'SLA tracking',
                  'SSO support',
                  'SOC 2 compliance',
                ]}
                cta={
                  <SoftButtonLink href="#" size="lg">
                    Start free trial
                  </SoftButtonLink>
                }
              />
            </>
          }
        /> */}

        {/* Call To Action */}
        <CallToActionSimple
          id="call-to-action"
          headline="Ready to make customer support feel simple again?"
          subheadline={
            <p>
              Join hundreds of teams using Oatmeal to deliver faster, friendlier email support —
              using a massive network of low wage workers stationed around the globe
            </p>
          }
          cta={
            <div className="flex items-center gap-4">
              <ButtonLink href="#" size="lg">
                Start free trial
              </ButtonLink>

              <PlainButtonLink href="#" size="lg">
                Book a demo <ChevronIcon />
              </PlainButtonLink>
            </div>
          }
        />
      </Main>
    </>
  )
}

async function EventsFeatureSection() {
  const events = await fetchAllUpcomingEvents()

  const wallpapers = ['purple', 'blue', 'green', 'brown'] as const

  return (
    <FeaturesTwoColumnWithDemos
      id="features"
      eyebrow="Unsere Angebote"
      headline="Workshops, Kurse und Veranstaltungen"
      subheadline={
        !events || events.length === 0 ? (
          <p>Aktuell sind keine Veranstaltungen verfügbar.</p>
        ) : (
          <p>
            Entdecke unsere aktuellen Veranstaltungen und finde das passende Angebot für dich und
            deine Gruppe.
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
                  <Link href={'/angebot/' + event.slug}>
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
                    <p className="text-olive-600 dark:text-olive-300 mb-2 text-sm font-medium">
                      {dateDisplay}

                      {event.venueName && ` - ${event.venueName}`}
                    </p>
                    {event.descriptionHtml && <p>{event.previewDescription}</p>}
                  </div>
                }
                cta={
                  <div className="flex gap-2">
                    {event.checkoutUrl ? (
                      <ButtonLink href={'/angebot/' + event.slug} rel="noopener noreferrer">
                        Mehr erfahren
                      </ButtonLink>
                    ) : undefined}
                    <PlainButtonLink
                      href={event.checkoutUrl ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Jetzt buchen <MoveRight size={14} />
                    </PlainButtonLink>
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
