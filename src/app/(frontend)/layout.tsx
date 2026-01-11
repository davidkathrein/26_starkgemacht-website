import React from 'react'
import { Familjen_Grotesk, Inter } from 'next/font/google'
import './styles.css'
import { Navbar } from './components/navigation/navbar'
import { Footer } from './components/navigation/footer'

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

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="de" className={`h-full flex${familjenGrotesk.variable} ${inter.variable}`}>
      <body className="flex h-full flex-col">
        <Navbar />
        <main className="flex grow flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
