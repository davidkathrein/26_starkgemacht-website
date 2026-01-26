'use client'

import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowNarrowRightIcon } from '../icons/arrow-narrow-right-icon'

const NEWSLETTER_FORM_ACTION =
  'https://edd7cb9a.sibforms.com/serve/MUIFADQ2tZH_p7XTpFIm7XDfFSgyHbGYP_SeJyKITUqtQB-SLIvL3aJ5SpUw-pMXR7bmHkplJxIEOjW8dZdHQsGoo2kR9K-B2UySOoRXG7dEMEUsgY3nSdef80XDqHG7EBbmiNMEwOr3IRDZRVKbgasIghsEVAMiNKCoCoICjOVhx-PhYYvheToTnIsZTA8ByhjABOrwo3tC0o1Uww=='

export function NewsletterFormClient({
  headline,
  subheadline,
  className,
  ...props
}: {
  headline: ReactNode
  subheadline: ReactNode
} & Omit<ComponentProps<'form'>, 'action' | 'method' | 'onSubmit'>) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)

    try {
      await fetch(NEWSLETTER_FORM_ACTION, {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      })

      setIsSubmitting(false)
      router.push('/newsletter/verify')
    } catch (error) {
      console.error('Newsletter signup error:', error)
      setIsSubmitting(false)
      setError('Es ist ein Fehler aufgetreten. Bitte versuche es erneut.')
    }
  }

  return (
    <form
      id="newsletter-signup"
      name="newsletter-signup"
      className={clsx('flex max-w-sm flex-col gap-2', className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <p>{headline}</p>
      <div className="text-olive-700 dark:text-olive-400 flex flex-col gap-4">{subheadline}</div>
      <div className="border-olive-950/20 has-[input:focus]:border-olive-950 flex items-center border-b py-2 dark:border-white/20 dark:has-[input:focus]:border-white">
        <input
          type="email"
          placeholder="Email"
          id="EMAIL"
          name="EMAIL"
          required
          aria-required="true"
          autoComplete="email"
          aria-label="Email"
          disabled={isSubmitting}
          className="text-olive-950 flex-1 focus:outline-hidden disabled:opacity-50 dark:text-white"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          disabled={isSubmitting}
          className="hover:bg-olive-950/10 relative inline-flex size-7 items-center justify-center rounded-full after:absolute after:-inset-2 disabled:opacity-50 dark:hover:bg-white/10 after:pointer-fine:hidden"
        >
          {isSubmitting ? (
            <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <ArrowNarrowRightIcon />
          )}
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </button>
      </div>
    </form>
  )
}
