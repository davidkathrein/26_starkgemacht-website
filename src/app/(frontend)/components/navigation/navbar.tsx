import { getPayload } from 'payload'
import config from '@payload-config'
import type { Navbar as NavbarGlobalDoc } from '@/payload-types'
import {
  NavbarLogo,
  NavbarWithLinksActionsAndCenteredLogo,
  type NavbarItem,
} from '@/app/(frontend)/components/sections/navbar-with-links-actions-and-left-logo'
import { Logo } from '@/app/(frontend)/components/elements/logo'
import {
  resolveLinkComponentHref,
  resolveLinkComponentLabel,
  shouldOpenLinkInNewTab,
} from '@/app/(frontend)/utils/linkComponent'

async function resolveNavbarData() {
  const payload = await getPayload({ config })

  let navbar: NavbarGlobalDoc | null = null

  try {
    navbar = await payload.findGlobal({
      slug: 'navbar',
      depth: 2,
      overrideAccess: false,
    })
  } catch {
    navbar = null
  }

  const items =
    navbar?.links
      ?.map((link) => {
        const label = resolveLinkComponentLabel(link)
        const href = resolveLinkComponentHref(link)
        if (!label || !href) return null

        const item: NavbarItem = {
          label,
          href,
          newTab: shouldOpenLinkInNewTab(href, link.newTab),
        }
        return item
      })
      .filter((item): item is NavbarItem => item !== null) ?? []

  const buttonLabel = navbar?.button ? resolveLinkComponentLabel(navbar.button) : null
  const buttonHref = navbar?.button ? resolveLinkComponentHref(navbar.button) : null
  const button2Label = navbar?.button2 ? resolveLinkComponentLabel(navbar.button2) : null
  const button2Href = navbar?.button2 ? resolveLinkComponentHref(navbar.button2) : null

  const cta =
    buttonLabel && buttonHref
      ? {
          label: buttonLabel,
          href: buttonHref,
          newTab: shouldOpenLinkInNewTab(buttonHref, navbar?.button?.newTab),
        }
      : null

  const secondaryCta =
    button2Label && button2Href
      ? {
          label: button2Label,
          href: button2Href,
          newTab: shouldOpenLinkInNewTab(button2Href, navbar?.button2?.newTab),
        }
      : null

  return {
    items,
    secondaryCta,
    cta,
  }
}

export async function Navbar() {
  const navbarData = await resolveNavbarData()

  return (
    <NavbarWithLinksActionsAndCenteredLogo
      id="navbar"
      items={navbarData.items}
      secondaryCta={navbarData.secondaryCta}
      cta={navbarData.cta}
      logo={
        <NavbarLogo href="/#hero">
          <Logo className="text-primary h-8 w-32" />
        </NavbarLogo>
      }
    />
  )
}
