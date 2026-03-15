import React from 'react'
import Link from 'next/link'
import {
  NavbarLink,
  NavbarLogo,
  NavbarWithLinksActionsAndCenteredLogo,
} from '@/app/(frontend)/components/sections/navbar-with-links-actions-and-left-logo'
import { Button } from '@/components/ui/button'
import { Logo } from '@/app/(frontend)/components/elements/logo'

export function Navbar() {
  return (
    <NavbarWithLinksActionsAndCenteredLogo
      id="navbar"
      links={
        <>
          <NavbarLink href="/#uber">Über Uns</NavbarLink>
          <NavbarLink href="/#angebot">Angebot</NavbarLink>
          <NavbarLink href="/blog">Blog</NavbarLink>
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
          <Button variant="ghost" asChild className="max-sm:hidden">
            <a href="mailto:kontakt@starkgemacht.com">kontakt(at)starkgemacht.com</a>
          </Button>
          <Button asChild>
            <Link href="/#angebot">Unser Angebot</Link>
          </Button>
        </>
      }
    />
  )
}
