import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stark gemacht - Empowerment, Gesundheit & Gemeinschaft',
  description:
    'Verein Stark gemacht - Menschen stärken durch Workshops, Kurse und Projekte. Von Selbstverteidigung über Kochkurse bis zu Nachhaltigkeits-Workshops. Für ein selbstbewusstes, gesundes und gemeinschaftliches Leben.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
