import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { CallToActionSimple } from '@/app/(frontend)/components/sections/call-to-action-simple'
import {
  Faq,
  FAQsTwoColumnAccordion,
} from '@/app/(frontend)/components/sections/faqs-two-column-accordion'

export function FooterFaqAndCta() {
  return (
    <>
      <FAQsTwoColumnAccordion id="faqs" headline="Häufige Fragen" className="mt-8 border-t pt-24">
        <Faq
          id="faq-1"
          question="Für wen sind eure Angebote gedacht?"
          answer="Unsere Workshops und Kurse sind für alle Menschen offen – unabhängig von Alter, Geschlecht oder Herkunft. Ob Singles, Familien, Senioren oder junge Menschen: Wir wollen verschiedene Gesellschaftsgruppen zusammenbringen und stärken."
        />
        <Faq
          id="faq-2"
          question="Wie kann ich mich für eine Veranstaltung anmelden?"
          answer="Schau dir unsere aktuellen Veranstaltungen an und klicke auf „Tickets sichern“. Du wirst dann direkt zu unserem Buchungssystem weitergeleitet. Falls keine Online-Buchung verfügbar ist, kannst du uns jederzeit kontaktieren."
        />
        <Faq
          id="faq-3"
          question="Bietet ihr auch Angebote für Schulen und Organisationen an?"
          answer="Ja! Wir bieten maßgeschneiderte Workshops und Projekte für Schulen, Unternehmen und Organisationen an. Kontaktiere uns einfach unter kontakt@starkgemacht.com für ein individuelles Angebot."
        />
        <Faq
          id="faq-4"
          question="Was ist die Vision von StarkGemacht?"
          answer="Wir wollen Menschen mental und physisch stärken, einen gesunden und nachhaltigen Lebensstil fördern, Gemeinschaft leben und Integration aktiv gestalten. Von Selbstverteidigung über Kochkurse bis zu Nachhaltigkeits-Workshops – wir schaffen Räume für Begegnung und persönliches Wachstum."
        />
      </FAQsTwoColumnAccordion>

      <CallToActionSimple
        className="mb-16"
        id="call-to-action"
        headline="Bereit, gemeinsam stark zu werden?"
        subheadline={
          <p>
            Entdecke Angebote, die dich stärken, inspirieren und mit anderen Menschen in Verbindung
            bringen.
          </p>
        }
        cta={
          <div className="flex items-center gap-4">
            <Button size="lg" asChild>
              <Link href="/#angebot">Angebote ansehen</Link>
            </Button>

            <Tooltip>
              <TooltipTrigger>
                <Button variant="ghost" size="lg" asChild>
                  <Link href="mailto:kontakt@starkgemacht.com">
                    Jetzt kontaktieren <ChevronRight />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Mailprogramm öffnen</p>
              </TooltipContent>
            </Tooltip>
          </div>
        }
      />
    </>
  )
}
