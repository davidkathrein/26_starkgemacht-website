'use client'

import { useState } from 'react'
import { Check, Copy, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

type SharePostButtonProps = {
  title: string
}

export function SharePostButton({ title }: SharePostButtonProps) {
  const [copied, setCopied] = useState(false)

  const copyLink = async () => {
    const url = window.location.href

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Link zu diesem Beitrag:', url)
    }
  }

  const handleShare = async () => {
    const url = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }
      }
    }

    await copyLink()
  }

  return (
    <div className="border-border/70 mt-10 flex flex-wrap gap-3 border-t pt-6">
      <Button type="button" variant="secondary" onClick={handleShare}>
        <Share2 />
        Beitrag teilen
      </Button>
      <Button type="button" variant="ghost" onClick={copyLink}>
        {copied ? <Check /> : <Copy />}
        {copied ? 'Link kopiert' : 'Link kopieren'}
      </Button>
    </div>
  )
}

export default SharePostButton
