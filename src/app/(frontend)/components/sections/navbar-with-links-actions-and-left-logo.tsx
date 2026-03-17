import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { SmartLink } from '../elements/link'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { MobileNavSheet } from './mobile-nav-sheet'
import { Button } from '@/components/ui/button'

export function NavbarLink({
  children,
  href,
  className,
  ...props
}: { href: string } & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <a
      href={href}
      className={clsx(
        'group text-foreground inline-flex items-center justify-between gap-2 text-xl/7 font-medium sm:text-2xl/8 lg:text-sm/7',
        className,
      )}
      {...props}
    >
      {children}
      <span
        className="inline-flex p-1.5 opacity-0 group-hover:opacity-100 lg:hidden"
        aria-hidden="true"
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </span>
    </a>
  )
}

export type NavbarItem = {
  label: string
  href: string
  newTab?: boolean
}

export function NavbarLogo({
  className,
  href,
  ...props
}: { href: string } & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <SmartLink
          href={href}
          {...props}
          className={clsx('inline-flex items-stretch justify-center', className)}
        />
      </TooltipTrigger>
      <TooltipContent>
        <p>Zur Startseite</p>
      </TooltipContent>
    </Tooltip>
  )
}

export function NavbarWithLinksActionsAndCenteredLogo({
  items,
  secondaryCta,
  cta,
  logo,
  className,
  ...props
}: {
  items: NavbarItem[]
  secondaryCta?: NavbarItem | null
  cta?: NavbarItem | null
  logo: ReactNode
} & ComponentProps<'header'>) {
  const secondaryDesktopCta = secondaryCta ? (
    <Button variant="ghost" asChild className="text-primary max-sm:hidden">
      <SmartLink
        href={secondaryCta.href}
        target={secondaryCta.newTab ? '_blank' : undefined}
        rel={secondaryCta.newTab ? 'noopener noreferrer' : undefined}
      >
        {secondaryCta.label}
      </SmartLink>
    </Button>
  ) : null

  const desktopLinks = (
    <>
      {items.map((item) => (
        <Button key={`${item.href}-${item.label}`} variant="link" asChild>
            <SmartLink
              href={item.href}
              target={item.newTab ? '_blank' : undefined}
              rel={item.newTab ? 'noopener noreferrer' : undefined}
            >
              {item.label}
            </SmartLink>
        </Button>
      ))}
    </>
  )

  const mobileLinks = (
    <>
      {items.map((item) => (
        <NavbarLink
          key={`${item.href}-${item.label}`}
          href={item.href}
          target={item.newTab ? '_blank' : undefined}
          rel={item.newTab ? 'noopener noreferrer' : undefined}
        >
          {item.label}
        </NavbarLink>
      ))}
      {secondaryCta && (
        <NavbarLink
          href={secondaryCta.href}
          target={secondaryCta.newTab ? '_blank' : undefined}
          rel={secondaryCta.newTab ? 'noopener noreferrer' : undefined}
        >
          {secondaryCta.label}
        </NavbarLink>
      )}
      {cta && (
        <Button asChild size="lg" className="mt-2 w-full sm:w-fit">
          <SmartLink
            href={cta.href}
            target={cta.newTab ? '_blank' : undefined}
            rel={cta.newTab ? 'noopener noreferrer' : undefined}
          >
            {cta.label}
          </SmartLink>
        </Button>
      )}
    </>
  )

  return (
    <>
      <header
        className={clsx(
          'border-border/60 bg-background/85 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md',
          className,
        )}
        {...props}
      >
        <style>{`:root { --scroll-padding-top: 5.25rem }`}</style>
        <nav>
          <div className="mx-auto flex h-(--scroll-padding-top) max-w-7xl items-center gap-4 px-6 lg:px-10">
            <div className="flex items-center gap-8 lg:gap-10">
              <div className="flex items-center">{logo}</div>
              <div className="flex max-lg:hidden">{desktopLinks}</div>
            </div>
            <div className="flex flex-1 items-center justify-end gap-2">
              {secondaryCta && (
                secondaryCta.href.startsWith('mailto:') ? (
                  <Tooltip>
                    <TooltipTrigger asChild>{secondaryDesktopCta}</TooltipTrigger>
                    <TooltipContent>
                      <p>Mailprogramm öffnen</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  secondaryDesktopCta
                )
              )}
              {cta && (
                <Button asChild className="max-[399px]:hidden">
                  <SmartLink
                    href={cta.href}
                    target={cta.newTab ? '_blank' : undefined}
                    rel={cta.newTab ? 'noopener noreferrer' : undefined}
                  >
                    {cta.label}
                  </SmartLink>
                </Button>
              )}
              <MobileNavSheet>{mobileLinks}</MobileNavSheet>
            </div>
          </div>
        </nav>
      </header>
      <div>
        {/* Dummy element to prevent content from being hidden behind the fixed header */}
        <div className="h-(--scroll-padding-top)" />
      </div>
    </>
  )
}
