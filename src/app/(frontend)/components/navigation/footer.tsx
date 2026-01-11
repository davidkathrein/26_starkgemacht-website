import React from 'react'
import {
  FooterCategory,
  FooterLink,
  FooterWithNewsletterFormCategoriesAndSocialIcons,
  NewsletterForm,
  SocialLink,
} from '@/app/(frontend)/components/sections/footer-with-newsletter-form-categories-and-social-icons'
import { GitHubIcon } from '@/app/(frontend)/components/icons/social/github-icon'
import { XIcon } from '@/app/(frontend)/components/icons/social/x-icon'
import { YouTubeIcon } from '@/app/(frontend)/components/icons/social/youtube-icon'

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
          <SocialLink href="https://x.com" name="X">
            <XIcon />
          </SocialLink>
          <SocialLink href="https://github.com" name="GitHub">
            <GitHubIcon />
          </SocialLink>
          <SocialLink href="https://www.youtube.com" name="YouTube">
            <YouTubeIcon />
          </SocialLink>
        </>
      }
    />
  )
}
