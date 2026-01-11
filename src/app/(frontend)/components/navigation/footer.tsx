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
              Get customer support tips, product updates and customer stories that you can archive
              as soon as they arrive.
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
  )
}
