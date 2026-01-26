import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'
import Link from 'next/link'
import { NewsletterFormClient } from './newsletter-form-client'

export function FooterCategory({
  title,
  children,
  ...props
}: { title: ReactNode } & ComponentProps<'div'>) {
  return (
    <div {...props}>
      <h3>{title}</h3>
      <ul role="list" className="mt-2 flex flex-col gap-2">
        {children}
      </ul>
    </div>
  )
}

export function FooterLink({
  href,
  className,
  ...props
}: { href: string } & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <li className={clsx('text-olive-700 dark:text-olive-400', className)}>
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
      className={clsx('text-olive-950 *:size-6 dark:text-white', className)}
      {...props}
    />
  )
}

export function NewsletterForm({
  headline,
  subheadline,
  className,
  ...props
}: {
  headline: ReactNode
  subheadline: ReactNode
} & Omit<ComponentProps<'form'>, 'action' | 'method'>) {
  return (
    <NewsletterFormClient
      headline={headline}
      subheadline={subheadline}
      className={className}
      {...props}
    />
  )
}

export function FooterWithNewsletterFormCategoriesAndSocialIcons({
  cta,
  links,
  fineprint,
  socialLinks,
  attribution,
  className,
  ...props
}: {
  cta: ReactNode
  links: ReactNode
  fineprint: ReactNode
  attribution: ReactNode
  socialLinks?: ReactNode
} & ComponentProps<'footer'>) {
  return (
    <footer className={clsx(className)} {...props}>
      <div className="bg-olive-950/2.5 text-olive-950 py-16 dark:bg-white/5 dark:text-white">
        <Container className="flex flex-col gap-16">
          <div className="grid grid-cols-1 gap-x-6 gap-y-16 text-sm/7 lg:grid-cols-2">
            {cta}
            <nav className="grid grid-cols-2 gap-6 sm:has-[>:last-child:nth-child(3)]:grid-cols-3 sm:has-[>:nth-child(5)]:grid-cols-3 md:has-[>:last-child:nth-child(4)]:grid-cols-4 lg:max-xl:has-[>:last-child:nth-child(4)]:grid-cols-2">
              {links}
            </nav>
          </div>
          <div className="flex items-center justify-between gap-10 text-sm/7">
            <div className="text-olive-600 dark:text-olive-500">{fineprint}</div>
            <div className="text-olive-600 dark:text-olive-500">{attribution}</div>
            {socialLinks && <div className="flex items-center gap-4 sm:gap-10">{socialLinks}</div>}
          </div>
        </Container>
      </div>
    </footer>
  )
}
