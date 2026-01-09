import React from 'react'
import { Familjen_Grotesk, Inter } from 'next/font/google'
import './styles.css'

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
    <html lang="en" className={`${familjenGrotesk.variable} ${inter.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
