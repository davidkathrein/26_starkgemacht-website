import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Link } from '../elements/link'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { MobileNavSheet } from './mobile-nav-sheet'

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
        'group text-foreground inline-flex items-center justify-between gap-2 text-3xl/10 font-medium lg:text-sm/7',
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

export function NavbarLogo({
  className,
  href,
  ...props
}: { href: string } & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
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
  links,
  logo,
  actions,
  className,
  ...props
}: {
  links: ReactNode
  logo: ReactNode
  actions: ReactNode
} & ComponentProps<'header'>) {
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
            <div className="flex flex-1 items-center">{logo}</div>
            <div className="flex max-lg:hidden">{links}</div>
            <div className="flex flex-1 items-center justify-end gap-4">
              <div className="flex shrink-0 items-center gap-2">{actions}</div>
              <MobileNavSheet>{links}</MobileNavSheet>
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
