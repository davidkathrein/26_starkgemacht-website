import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Anmeldung erfolgreich - Newsletter - Stark gemacht',
  description: 'Deine Newsletter-Anmeldung war erfolgreich. Willkommen bei Stark gemacht!',
}

export default function NewsletterSuccessPage() {
  return (
    <div className="grid grow grid-cols-1 grid-rows-[1fr_auto_1fr] bg-white lg:grid-cols-[max(50%,36rem)_1fr] dark:bg-gray-900">
      <div className="mx-auto h-full w-full max-w-7xl px-6 py-24 sm:py-32 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8">
        <div className="max-w-lg">
          <p className="text-olive-600 dark:text-olive-400 text-base/8 font-semibold">
            Anmeldung erfolgreich 🍀💚
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-6xl dark:text-white">
            Willkommen an Bord!
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
            Deine Anmeldung war erfolgreich! Ab sofort erhältst du aktuelle Informationen zu unseren
            Workshops, Kursen und Veranstaltungen direkt in dein Postfach.
          </p>
          <p className="mt-4 text-base text-pretty text-gray-500 dark:text-gray-400">
            Wir freuen uns, dich in unserer Gemeinschaft willkommen zu heißen. Schau auch gerne bei
            unseren aktuellen Angeboten vorbei – vielleicht ist ja etwas Passendes für dich dabei!
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href="/#angebot">Angebote entdecken</Link>
            </Button>
            <Button size="lg" variant="light" asChild>
              <Link href="/">
                <span aria-hidden="true">&larr;</span> Zurück zur Startseite
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden lg:relative lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:block">
        <Image
          alt="Zwei Hände halten ein frisch geerntetes Bündel Karotten."
          src="https://yp4yhupjx5bpamyq.public.blob.vercel-storage.com/IMG_9738.jpeg"
          className="absolute inset-0 size-full object-cover"
          width={760}
          height={1024}
        />
      </div>
    </div>
  )
}
