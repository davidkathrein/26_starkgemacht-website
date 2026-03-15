'use client'

import type { ReactNode } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

export function MobileNavSheet({ children }: { children: ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Menü öffnen"
          className="text-olive-950 hover:bg-olive-950/10 lg:hidden dark:text-white dark:hover:bg-white/10"
        >
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="bg-olive-100 text-olive-950 border-l-olive-950/10 px-6 py-6 dark:bg-olive-950 dark:text-white dark:border-l-white/10"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <nav className="mt-10 flex flex-col gap-6">{children}</nav>
      </SheetContent>
    </Sheet>
  )
}