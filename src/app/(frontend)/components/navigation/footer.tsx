import React from 'react'
import {
  FooterCategory,
  FooterLink,
  FooterWithNewsletterFormCategoriesAndSocialIcons,
  NewsletterForm,
  SocialLink,
} from '@/app/(frontend)/components/sections/footer-with-newsletter-form-categories-and-social-icons'
import { FacebookIcon } from '@/app/(frontend)/components/icons/social/facebook-icon'
import { InstagramIcon } from '@/app/(frontend)/components/icons/social/instagram-icon'
import { Mail } from 'lucide-react'

export function Footer() {
  return (
    <FooterWithNewsletterFormCategoriesAndSocialIcons
      id="footer"
      cta={
        <NewsletterForm
          headline="Bleib auf dem Laufenden"
          subheadline={
            <p>
              Erhalte aktuelle Informationen zu unseren Workshops, Kursen und Veranstaltungen direkt
              in dein Postfach.
            </p>
          }
          action="#"
        />
      }
      links={
        <>
          <FooterCategory title="Verein">
            <FooterLink href="/#uber">Über uns</FooterLink>
            <FooterLink href="/#team">Team</FooterLink>
            <FooterLink href="/#aktuelles">Aktuelles</FooterLink>
          </FooterCategory>
          <FooterCategory title="Angebot">
            <FooterLink href="/#angebot">Workshops</FooterLink>
            <FooterLink href="/#angebot">Kurse</FooterLink>
            <FooterLink href="/#angebot">Veranstaltungen</FooterLink>
          </FooterCategory>
          <FooterCategory title="Kontakt">
            <FooterLink href="mailto:kontakt@starkgemacht.com">E-Mail</FooterLink>
            <FooterLink href="/#faqs">Häufige Fragen</FooterLink>
          </FooterCategory>
          <FooterCategory title="Rechtliches">
            <FooterLink href="#">Datenschutz</FooterLink>
            <FooterLink href="#">Impressum</FooterLink>
          </FooterCategory>
        </>
      }
      fineprint="© 2025 Verein Stark gemacht 🍀💚"
      socialLinks={
        <>
          <SocialLink href="mailto:kontakt@starkgemacht.com" name="E-Mail">
            <Mail className="size-6" />
          </SocialLink>
          <SocialLink href="https://www.facebook.com/StarkGemachtVerein/" name="Facebook">
            <FacebookIcon />
          </SocialLink>
          <SocialLink href="https://www.instagram.com/starkgemachtverein/" name="Instagram">
            <InstagramIcon />
          </SocialLink>
        </>
      }
    />
  )
}
