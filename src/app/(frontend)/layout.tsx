import React from 'react'
import { Familjen_Grotesk, Inter } from 'next/font/google'
import './styles.css'
import {
  NavbarLink,
  NavbarLogo,
  NavbarWithLinksActionsAndCenteredLogo,
} from '@/app/(frontend)/components/sections/navbar-with-links-actions-and-left-logo'
import Image from 'next/image'
import { ButtonLink, PlainButtonLink } from '@/app/(frontend)/components/elements/button'
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
      <body className="h-full flex flex-col">
        <NavbarWithLinksActionsAndCenteredLogo
          id="navbar"
          links={
            <>
              <NavbarLink href="#">Pricing</NavbarLink>
              <NavbarLink href="#">About</NavbarLink>
              <NavbarLink href="#">Docs</NavbarLink>
              <NavbarLink href="#" className="sm:hidden">
                Log in
              </NavbarLink>
            </>
          }
          logo={
            <NavbarLogo href="/">
              <Image
                src="/api/media/file/starkgemacht-logologo.svg"
                alt="StarkGemacht Logo"
                width={128}
                height={32}
              ></Image>
            </NavbarLogo>
          }
          actions={
            <>
              <PlainButtonLink href="#" className="max-sm:hidden">
                Log in
              </PlainButtonLink>
              <ButtonLink href="#">Get started</ButtonLink>
            </>
          }
        />
        <main className="grow flex flex-col">{children}</main>
        <FooterWithNewsletterFormCategoriesAndSocialIcons
          id="footer"
          cta={
            <NewsletterForm
              headline="Stay in the loop"
              subheadline={
                <p>
                  Get customer support tips, product updates and customer stories that you can
                  archive as soon as they arrive.
                </p>
              }
              action="#"
            />
          }
          links={
            <>
              <FooterCategory title="Product">
                <FooterLink href="#">Features</FooterLink>
                <FooterLink href="#">Pricing</FooterLink>
                <FooterLink href="#">Integrations</FooterLink>
              </FooterCategory>
              <FooterCategory title="Company">
                <FooterLink href="#">About</FooterLink>
                <FooterLink href="#">Careers</FooterLink>
                <FooterLink href="#">Blog</FooterLink>
                <FooterLink href="#">Press Kit</FooterLink>
              </FooterCategory>
              <FooterCategory title="Resources">
                <FooterLink href="#">Help Center</FooterLink>
                <FooterLink href="#">API Docs</FooterLink>
                <FooterLink href="#">Status</FooterLink>
                <FooterLink href="#">Contact</FooterLink>
              </FooterCategory>
              <FooterCategory title="Legal">
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Terms of Service</FooterLink>
                <FooterLink href="#">Security</FooterLink>
              </FooterCategory>
            </>
          }
          fineprint="© 2025 Oatmeal, Inc."
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
      </body>
    </html>
  )
}
