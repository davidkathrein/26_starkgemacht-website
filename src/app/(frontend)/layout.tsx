import React from 'react'
import { Familjen_Grotesk, Inter } from 'next/font/google'
import './styles.css'
import { Navbar } from './components/navigation/navbar'
import { Footer } from './components/navigation/footer'
import { TooltipProvider } from '@/components/ui/tooltip'
import { SITE_NAME } from '@/lib/seo'

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
  description:
    'Verein StarkGemacht - Menschen stärken, Gemeinschaft fördern. Workshops, Kurse und Projekte für Empowerment, Gesundheit, Selbstschutz und Nachhaltigkeit.',
  title: `${SITE_NAME} - Empowerment, Gesundheit & Gemeinschaft`,
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="de" className={`h-full flex${familjenGrotesk.variable} ${inter.variable}`}>
      <body className="flex h-full flex-col">
        <TooltipProvider>
          <Navbar />
          <main className="flex grow flex-col">{children}</main>
          <Footer />
        </TooltipProvider>
      </body>
    </html>
  )
}
