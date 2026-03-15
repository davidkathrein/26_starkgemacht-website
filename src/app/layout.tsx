import type { Metadata } from 'next'
import { NEXT_PUBLIC_SITE_NAME } from '@/lib/seo'

export const metadata: Metadata = {
  title: `${NEXT_PUBLIC_SITE_NAME} - Empowerment, Gesundheit & Gemeinschaft`,
  description:
    'Verein StarkGemacht - Menschen stärken durch Workshops, Kurse und Projekte. Von Selbstverteidigung über Kochkurse bis zu Nachhaltigkeits-Workshops. Für ein selbstbewusstes, gesundes und gemeinschaftliches Leben.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
