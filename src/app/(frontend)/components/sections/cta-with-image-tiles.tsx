import Image from 'next/image'
import { ButtonLink } from '@/app/(frontend)/components/elements/button'
import { ArrowNarrowRightIcon } from '@/app/(frontend)/components/icons/arrow-narrow-right-icon'

export default function CTAWithImageTiles() {
  return (
    <section className="overflow-hidden bg-olive-50 py-32 dark:bg-olive-950">
      <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:min-w-full lg:flex-none lg:gap-y-8">
          <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
            <h2 className="font-display text-3xl/9 font-medium tracking-[-0.03em] text-pretty text-olive-950 sm:text-[2.5rem]/10 dark:text-white">
              Unser Verein
            </h2>
            <p className="mt-6 text-xl/8 text-olive-800 dark:text-olive-200">
              Quasi est quaerat. Sit molestiae et. Provident ad dolorem occaecati eos iste. Soluta
              rerum quidem minus ut molestiae velit error quod. Excepturi quidem expedita molestias
              quas.
            </p>
            <p className="mt-6 text-base/7 text-olive-700 dark:text-olive-300">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
              commodo. Elit sunt amet fugiat veniam occaecat fugiat. Quasi aperiam sit non sit neque
              reprehenderit.
            </p>
            <div className="mt-10 flex">
              <ButtonLink href="#" size="lg">
                Jetzt Kurse entdecken <ArrowNarrowRightIcon />
              </ButtonLink>
            </div>
          </div>
          <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
            <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
              <Image
                alt=""
                src="https://yp4yhupjx5bpamyq.public.blob.vercel-storage.com/IMG_1686.jpeg"
                width={1152}
                height={823}
                className="aspect-7/5 w-148 max-w-none rounded-2xl bg-olive-100 object-cover max-sm:w-120 dark:bg-olive-900"
              />
            </div>
            <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-148 lg:items-start lg:justify-end lg:gap-x-8">
              <div className="order-first flex w-64 flex-none justify-end self-end max-sm:w-40 lg:w-auto">
                <img
                  alt=""
                  src="https://yp4yhupjx5bpamyq.public.blob.vercel-storage.com/IMG_9731.jpeg"
                  width={768}
                  height={604}
                  className="aspect-4/3 w-[24rem] max-w-none flex-none rounded-2xl bg-olive-100 object-cover dark:bg-olive-900"
                />
              </div>
              <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                <img
                  alt=""
                  src="https://yp4yhupjx5bpamyq.public.blob.vercel-storage.com/IMG_9738.jpeg"
                  width={1152}
                  height={842}
                  className="aspect-7/5 w-148 max-w-none flex-none rounded-2xl bg-olive-100 object-cover max-sm:w-120 dark:bg-olive-900"
                />
              </div>
              <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                <img
                  alt=""
                  src="https://yp4yhupjx5bpamyq.public.blob.vercel-storage.com/IMG_4216.jpeg"
                  width={768}
                  height={604}
                  className="aspect-4/3 w-[24rem] max-w-none rounded-2xl bg-olive-100 object-cover dark:bg-olive-900"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
