import React from 'react'
import { Familjen_Grotesk, Inter } from 'next/font/google'
import './(frontend)/styles.css'
import {
  NavbarLink,
  NavbarLogo,
  NavbarWithLinksActionsAndCenteredLogo,
} from '@/app/(frontend)/components/sections/navbar-with-links-actions-and-left-logo'
import Image from 'next/image'
import { ButtonLink, PlainButtonLink } from '@/app/(frontend)/components/elements/button'
import Link from 'next/link'

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
      <body className="h-full flex flex-col">
        <NavbarWithLinksActionsAndCenteredLogo
          id="navbar"
          links={
            <>
              <NavbarLink href="#">Pricing</NavbarLink>
              <NavbarLink href="#">About</NavbarLink>
              <NavbarLink href="#">Docs</NavbarLink>
              <NavbarLink href="#" className="sm:hidden">
                Log in
              </NavbarLink>
            </>
          }
          logo={
            <NavbarLogo href="/">
              <Image
                src="/api/media/file/starkgemacht-logologo.svg"
                alt="StarkGemacht Logo"
                width={128}
                height={32}
              ></Image>
            </NavbarLogo>
          }
          actions={
            <>
              <PlainButtonLink href="#" className="max-sm:hidden">
                Log in
              </PlainButtonLink>
              <ButtonLink href="#">Get started</ButtonLink>
            </>
          }
        />
        <main className="grow flex flex-col">
          <div className="grid grow grid-cols-1 grid-rows-[1fr_auto_1fr] bg-white lg:grid-cols-[max(50%,36rem)_1fr] dark:bg-gray-900">
            <div className="mx-auto w-full h-full max-w-7xl px-6 py-24 sm:py-32 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8">
              <div className="max-w-lg">
                <p className="text-base/8 font-semibold text-olive-600 dark:text-olive-400">404</p>
                <h1 className="mt-4 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-6xl dark:text-white">
                  Seite nicht gefunden
                </h1>
                <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
                  Sorry, wir konnten die gewünschte Seite nicht finden.
                </p>
                <div className="mt-10">
                  <Link
                    href="/"
                    className="text-sm/7 font-semibold text-olive-600 dark:text-olive-400"
                  >
                    <span aria-hidden="true">&larr;</span> Zurück zur Startseite
                  </Link>
                </div>
              </div>
            </div>
            {/* <footer className="self-end lg:col-span-2 lg:col-start-1 lg:row-start-3">
              <div className="border-t border-gray-100 bg-gray-50 py-10 dark:border-white/10 dark:bg-gray-800/50">
                <nav className="mx-auto flex w-full max-w-7xl items-center gap-x-4 px-6 text-sm/7 text-gray-600 lg:px-8 dark:text-gray-400">
                  <a href="#">Contact support</a>
                  <svg
                    viewBox="0 0 2 2"
                    aria-hidden="true"
                    className="size-0.5 fill-gray-300 dark:fill-gray-600"
                  >
                    <circle r={1} cx={1} cy={1} />
                  </svg>
                  <a href="#">Status</a>
                </nav>
              </div>
            </footer> */}
            <div className="hidden lg:relative lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:block">
              <img
                alt=""
                src="https://yp4yhupjx5bpamyq.public.blob.vercel-storage.com/IMG_5322.jpeg"
                className="absolute inset-0 size-full object-cover"
              />
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
