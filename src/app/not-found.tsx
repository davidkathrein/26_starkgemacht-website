import React from 'react'
import { Familjen_Grotesk, Inter } from 'next/font/google'
import './(frontend)/styles.css'
import { Navbar } from './(frontend)/components/navigation/navbar'
import Link from 'next/link'
import Image from 'next/image'

const familjenGrotesk = Familjen_Grotesk({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-sans',
  display: 'swap',
})

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout() {
  return (
    <html lang="de" className={`h-full flex${familjenGrotesk.variable} ${inter.variable}`}>
      <body className="flex h-full flex-col">
        <Navbar />
        <main className="flex grow flex-col">
          <div className="grid grow grid-cols-1 grid-rows-[1fr_auto_1fr] bg-white lg:grid-cols-[max(50%,36rem)_1fr] dark:bg-gray-900">
            <div className="mx-auto h-full w-full max-w-7xl px-6 py-24 sm:py-32 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8">
              <div className="max-w-lg">
                <p className="text-olive-600 dark:text-olive-400 text-base/8 font-semibold">404</p>
                <h1 className="mt-4 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-6xl dark:text-white">
                  Seite nicht gefunden
                </h1>
                <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
                  Sorry, wir konnten die gewünschte Seite nicht finden.
                </p>
                <div className="mt-10">
                  <Link
                    href="/"
                    className="text-olive-600 dark:text-olive-400 text-sm/7 font-semibold"
                  >
                    <span aria-hidden="true">&larr;</span> Zurück zur Startseite
                  </Link>
                </div>
              </div>
            </div>
            {/* <footer className="self-end lg:col-span-2 lg:col-start-1 lg:row-start-3">
              <div className="border-t border-gray-100 bg-gray-50 py-10 dark:border-white/10 dark:bg-gray-800/50">
                <nav className="mx-auto flex w-full max-w-7xl items-center gap-x-4 px-6 text-sm/7 text-gray-600 lg:px-8 dark:text-gray-400">
                  <Link href="#">Contact support</Link>
                  <svg
                    viewBox="0 0 2 2"
                    aria-hidden="true"
                    className="size-0.5 fill-gray-300 dark:fill-gray-600"
                  >
                    <circle r={1} cx={1} cy={1} />
                  </svg>
                  <Link href="#">Status</Link>
                </nav>
              </div>
            </footer> */}
            <div className="hidden lg:relative lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:block">
              <Image
                alt="Jasmin Bösch draußen am Schaufeln."
                src="https://yp4yhupjx5bpamyq.public.blob.vercel-storage.com/IMG_5322.jpeg"
                className="absolute inset-0 size-full object-cover"
                width={760}
                height={1024}
              />
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
