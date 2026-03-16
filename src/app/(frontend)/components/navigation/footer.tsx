import React from 'react'
import {
  FooterCategory,
  FooterLink,
  FooterWithNewsletterFormCategoriesAndSocialIcons,
  NewsletterForm,
  SocialLink,
} from '@/app/(frontend)/components/sections/footer-with-newsletter-form-categories-and-social-icons'
import { FooterFaqAndCta } from '@/app/(frontend)/components/sections/footer-faq-and-cta'
import { FacebookIcon } from '@/app/(frontend)/components/icons/social/facebook-icon'
import { InstagramIcon } from '@/app/(frontend)/components/icons/social/instagram-icon'
import { Mail } from 'lucide-react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Footer as FooterGlobalDoc } from '@/payload-types'
import { NEXT_PUBLIC_SITE_NAME } from '@/lib/seo'
import {
  resolveLinkComponentHref,
  resolveLinkComponentLabel,
  shouldOpenLinkInNewTab,
} from '@/app/(frontend)/utils/linkComponent'

async function resolveFooterData() {
  const payload = await getPayload({ config })

  let footer: FooterGlobalDoc | null = null

  try {
    footer = await payload.findGlobal({
      slug: 'footer',
      depth: 2,
      overrideAccess: false,
    })
  } catch {
    footer = null
  }

  const groups = footer?.linkGroups?.length ? footer.linkGroups : []

  const resolvedGroups = groups.map((group) => {
    const title = group.title?.trim()
    if (!title) return null

    const links =
      group.links
        ?.map((link) => {
          const label = resolveLinkComponentLabel(link)
          const href = resolveLinkComponentHref(link)
          if (!label || !href) return null

          return {
            label,
            href,
            newTab: Boolean(link.newTab),
          }
        })
        .filter((link): link is { label: string; href: string; newTab: boolean } =>
          Boolean(link),
        ) ?? []

    return { title, links }
  })

  const filteredResolvedGroups = resolvedGroups.filter(
    (
      group,
    ): group is { title: string; links: { label: string; href: string; newTab: boolean }[] } =>
      group !== null && group.links.length > 0,
  )

  return {
    hideNewsletter: Boolean(footer?.newsletter?.hideNewsletter),
    newsletterHeadline: footer?.newsletter?.headline?.trim() || 'Newsletter anmelden',
    newsletterSubheadline:
      footer?.newsletter?.subheadline?.trim() ||
      'Erhalte aktuelle Informationen zu unseren Workshops, Kursen und Veranstaltungen direkt in dein Postfach.',
    fineprint: `© ${new Date().getFullYear()} ${NEXT_PUBLIC_SITE_NAME}`,
    groups: filteredResolvedGroups,
  }
}

export async function Footer() {
  const footerData = await resolveFooterData()

  return (
    <>
      <FooterFaqAndCta />
      <FooterWithNewsletterFormCategoriesAndSocialIcons
        id="footer"
        cta={
          footerData.hideNewsletter ? null : (
            <NewsletterForm
              headline={footerData.newsletterHeadline}
              subheadline={<p>{footerData.newsletterSubheadline}</p>}
            />
          )
        }
        links={
          <>
            {footerData.groups.map((group) => (
              <FooterCategory key={group.title} title={group.title}>
                {group.links.map((link) => (
                  <FooterLink
                    key={`${group.title}-${link.href}-${link.label}`}
                    href={link.href}
                    target={shouldOpenLinkInNewTab(link.href, link.newTab) ? '_blank' : undefined}
                    rel={
                      shouldOpenLinkInNewTab(link.href, link.newTab)
                        ? 'noopener noreferrer'
                        : undefined
                    }
                  >
                    {link.label}
                  </FooterLink>
                ))}
              </FooterCategory>
            ))}
          </>
        }
        fineprint={footerData.fineprint}
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
    </>
  )
}
