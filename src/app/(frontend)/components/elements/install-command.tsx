'use client'

import { clsx } from 'clsx/lite'
import { useEffect, useState, type ComponentProps } from 'react'
import { Button } from '@/components/ui/button'
import { CheckmarkIcon } from '../icons/checkmark-icon'
import { Squares2StackedIcon } from '../icons/squares-2-stacked-icon'

export function InstallCommand({
  snippet,
  variant = 'normal',
  className,
  ...props
}: {
  snippet: string
  variant?: 'normal' | 'overlay'
} & ComponentProps<'div'>) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => setCopied(false), 2000)

    return () => window.clearTimeout(timeoutId)
  }, [copied])

  async function handleCopy() {
    await navigator.clipboard.writeText(snippet)
    setCopied(true)
  }

  return (
    <div
      className={clsx(
        'flex items-center justify-between gap-6 rounded-full p-1 font-mono text-sm/7 inset-ring-1 dark:bg-white/10 dark:inset-ring-white/10',
        variant === 'normal' && 'bg-white text-olive-600 inset-ring-black/10 dark:text-white',
        variant === 'overlay' && 'bg-white/15 text-white inset-ring-white/10',
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2 pl-3">
        <div className="text-current/60 select-none">$</div>
        <code className="truncate">{snippet}</code>
      </div>
      <Button
        type="button"
        variant={variant === 'overlay' ? 'ghostLight' : 'ghost'}
        size="icon"
        className="relative after:absolute after:-inset-1 after:pointer-fine:hidden"
        aria-label="Befehl kopieren"
        onClick={handleCopy}
      >
        {copied ? <CheckmarkIcon /> : <Squares2StackedIcon />}
      </Button>
    </div>
  )
}
