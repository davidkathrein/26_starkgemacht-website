'use client'

import { useState, type MouseEvent, type ReactNode } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

export function MobileNavSheet({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  const handleNavClick = (event: MouseEvent<HTMLElement>) => {
    const target = event.target

    if (!(target instanceof Element)) {
      return
    }

    if (target.closest('a')) {
      setOpen(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Menü öffnen"
          className="text-brand-950 hover:bg-brand-950/10 lg:hidden dark:text-white dark:hover:bg-white/10"
        >
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="border-l-brand-950/10 bg-brand-100 text-brand-950 dark:bg-brand-950 px-6 py-6 dark:border-l-white/10 dark:text-white"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <nav className="mt-10 flex flex-col gap-6" onClickCapture={handleNavClick}>
          {children}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
