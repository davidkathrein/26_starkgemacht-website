import Link from 'next/link'
import {
  NavbarLogo,
  NavbarWithLinksActionsAndCenteredLogo,
} from '@/app/(frontend)/components/sections/navbar-with-links-actions-and-left-logo'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Logo } from '@/app/(frontend)/components/elements/logo'

export function Navbar() {
  return (
    <NavbarWithLinksActionsAndCenteredLogo
      id="navbar"
      links={
        <>
          <Button variant="link" className="max-sm:hidden">
            <Link href="/#uber">Über uns</Link>
          </Button>
          <Button variant="link" className="max-sm:hidden">
            <Link href="/#angebot">Angebote</Link>
          </Button>
          <Button variant="link" className="max-sm:hidden">
            <Link href="/blog">Blog</Link>
          </Button>
          <Button variant="link" className="sm:hidden">
            <Link href="mailto:kontakt@starkgemacht.com">kontakt(at)starkgemacht.com</Link>
          </Button>
        </>
      }
      logo={
        <NavbarLogo href="/#hero">
          <Logo className="text-primary h-8 w-32" />
        </NavbarLogo>
      }
      actions={
        <>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" asChild className="max-sm:hidden">
                <Link href="mailto:kontakt@starkgemacht.com">kontakt(at)starkgemacht.com</Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Mailprogramm öffnen</p>
            </TooltipContent>
          </Tooltip>
          <Button asChild>
            <Link href="/#angebot">Angebote entdecken</Link>
          </Button>
        </>
      }
    />
  )
}
