import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stark Gemacht',
  description: 'Empowerment, Gesundheit und Selbstschutz',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
