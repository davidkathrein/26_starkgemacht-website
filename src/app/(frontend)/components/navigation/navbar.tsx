import React from 'react'
import {
  NavbarLink,
  NavbarLogo,
  NavbarWithLinksActionsAndCenteredLogo,
} from '@/app/(frontend)/components/sections/navbar-with-links-actions-and-left-logo'
import { ButtonLink, PlainButtonLink } from '@/app/(frontend)/components/elements/button'
import { Logo } from '@/app/(frontend)/components/elements/logo'

export function Navbar() {
  return (
    <NavbarWithLinksActionsAndCenteredLogo
      id="navbar"
      links={
        <>
          <NavbarLink href="/#uber">Über Uns</NavbarLink>
          <NavbarLink href="/#angebot">Angebot</NavbarLink>
          <NavbarLink href="/#aktuelles">Aktuelles</NavbarLink>
          <NavbarLink href="mailto:kontakt@starkgemacht.com" className="sm:hidden">
            kontakt(at)starkgemacht.com
          </NavbarLink>
        </>
      }
      logo={
        <NavbarLogo href="/#hero">
          <Logo className="text-olive-700 dark:text-olive-400 h-8 w-32" />
        </NavbarLogo>
      }
      actions={
        <>
          <PlainButtonLink href="mailto:kontakt@starkgemacht.com" className="max-sm:hidden">
            kontakt(at)starkgemacht.com
          </PlainButtonLink>
          <ButtonLink href="/#angebot">Unser Angebot</ButtonLink>
        </>
      }
    />
  )
}
