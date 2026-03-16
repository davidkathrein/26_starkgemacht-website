import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowNarrowRightIcon } from '@/app/(frontend)/components/icons/arrow-narrow-right-icon'
import { Subheading } from '../elements/subheading'
import Link from 'next/link'

export default function CTAWithImageTiles({ id }: { id?: string }) {
  return (
    <section className="bg-brand-50 dark:bg-brand-950 overflow-hidden py-32" id={id}>
      <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:min-w-full lg:flex-none lg:gap-y-8">
          <div className="flex flex-col justify-center lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
            <Subheading>Über StarkGemacht</Subheading>
            <p className="mt-6 text-xl/8">
              StarkGemacht ist aus den Erfahrungen der Jahre 2020 und 2021 entstanden, als soziale
              Nähe und gemeinschaftliches Erleben für viele Menschen schwieriger wurden.
            </p>
            <p className="text-muted-foreground mt-6 text-base/7">
              2022 gründeten Eva Kathrein und Jasmin Bösch den Verein „StarkGemacht“, um das
              Miteinander zu stärken und Menschen aus unterschiedlichen Lebensrealitäten zu
              verbinden.
            </p>
            <p className="text-muted-foreground mt-6 text-base/7">
              Mit Kursen, Workshops und Projekten rund um Selbstschutz, Gesundheit, Nachhaltigkeit
              und Begegnung schaffen wir Räume für persönliches Wachstum und gelebte Gemeinschaft.
            </p>
            <div className="mt-10 flex">
              <Button size="lg" asChild>
                <Link href="#angebot">
                  Angebote ansehen <ArrowNarrowRightIcon />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-start md:justify-end md:gap-8 lg:contents">
            <div className="order-first w-full md:order-0 md:w-0 md:flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
              <Image
                alt=""
                src="https://yp4yhupjx5bpamyq.public.blob.vercel-storage.com/IMG_1686.jpeg"
                width={1152}
                height={1200}
                className="bg-brand-100 dark:bg-brand-900 aspect-video w-full rounded-2xl object-cover object-left md:aspect-7/7 md:w-148 md:max-w-none"
              />
            </div>
            <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-148 lg:items-start lg:justify-end lg:gap-x-8">
              <div className="order-first w-full md:flex md:w-64 md:flex-none md:justify-end md:self-end lg:w-auto">
                <Image
                  alt=""
                  src="https://yp4yhupjx5bpamyq.public.blob.vercel-storage.com/IMG_9731.jpeg"
                  width={768}
                  height={604}
                  className="bg-brand-100 dark:bg-brand-900 aspect-video w-full rounded-2xl object-cover md:aspect-4/3 md:w-[24rem] md:max-w-none md:flex-none"
                />
              </div>
              <div className="w-full md:flex md:w-96 md:flex-auto md:justify-end lg:w-auto lg:flex-none">
                <Image
                  alt=""
                  src="https://yp4yhupjx5bpamyq.public.blob.vercel-storage.com/IMG_9738.jpeg"
                  width={1152}
                  height={842}
                  className="bg-brand-100 dark:bg-brand-900 aspect-video w-full rounded-2xl object-cover md:aspect-7/5 md:w-148 md:max-w-none md:flex-none"
                />
              </div>
              <div className="md:w-0 md:flex-auto lg:w-auto lg:flex-none">
                <Image
                  alt=""
                  src="https://yp4yhupjx5bpamyq.public.blob.vercel-storage.com/IMG_4216.jpeg"
                  width={768}
                  height={604}
                  className="bg-brand-100 dark:bg-brand-900 aspect-video w-full rounded-2xl object-cover md:aspect-4/3 md:w-[24rem] md:max-w-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
