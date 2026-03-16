import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'
import Link from 'next/link'

export function FooterLink({
  href,
  className,
  ...props
}: { href: string } & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <li className={clsx('text-brand-700 dark:text-brand-400', className)}>
      <Link href={href} {...props} />
    </li>
  )
}

export function SocialLink({
  href,
  name,
  className,
  ...props
}: {
  href: string
  name: string
} & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <a
      href={href}
      target="_blank"
      aria-label={name}
      className={clsx('text-brand-950 *:size-6 dark:text-white', className)}
      {...props}
    />
  )
}

export function FooterWithLinksAndSocialIcons({
  links,
  socialLinks,
  fineprint,
  className,
  ...props
}: {
  links: ReactNode
  socialLinks?: ReactNode
  fineprint: ReactNode
} & ComponentProps<'footer'>) {
  return (
    <footer className={clsx('pt-16', className)} {...props}>
      <div className="bg-brand-950/2.5 text-brand-950 py-16 dark:bg-white/5 dark:text-white">
        <Container className="flex flex-col gap-10 text-center text-sm/7">
          <div className="flex flex-col gap-6">
            <nav>
              <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
                {links}
              </ul>
            </nav>
            {socialLinks && (
              <div className="flex items-center justify-center gap-10">{socialLinks}</div>
            )}
          </div>
          <div className="text-brand-600 dark:text-brand-500">{fineprint}</div>
        </Container>
      </div>
    </footer>
  )
}
