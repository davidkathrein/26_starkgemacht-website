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
import Link from 'next/link'

export function Footer() {
  return (
    <FooterWithNewsletterFormCategoriesAndSocialIcons
      id="footer"
      cta={
        <NewsletterForm
          headline="Newsletter anmelden"
          subheadline={
            <p>
              Erhalte aktuelle Informationen zu unseren Workshops, Kursen und Veranstaltungen direkt
              in dein Postfach.
            </p>
          }
        />
      }
      links={
        <>
          <FooterCategory title="Verein">
            <FooterLink href="/#uber">Über uns</FooterLink>
            <FooterLink href="/#team">Team</FooterLink>
            <FooterLink href="/blog">Blog</FooterLink>
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
      fineprint={`© ${new Date().getFullYear()} Verein StarkGemacht 🍀💚`}
      attribution={
        <span>
          Website von{' '}
          <Link
            className="cursor-pointer underline"
            target="_blank"
            href="https://davidkathrein.at"
          >
            David Kathrein
          </Link>
        </span>
      }
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
