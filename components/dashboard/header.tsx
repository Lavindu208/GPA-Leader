'use client'

import { Bell, Menu, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { student } from '@/lib/dashboard-data'

export function Header({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md lg:px-6">
      <Button variant="ghost" size="icon" onClick={onMenu} className="lg:hidden" aria-label="Open menu">
        <Menu />
      </Button>

      <div className="relative hidden max-w-sm flex-1 sm:block">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search courses, grades, deadlines..."
          aria-label="Search"
          className="h-9 w-full rounded-lg border border-input bg-muted/50 pr-3 pl-9 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:bg-background focus-visible:ring-3 focus-visible:ring-ring/30"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary ring-2 ring-background" />
        </Button>

        <div className="h-6 w-px bg-border" aria-hidden="true" />

        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
            {student.initials}
          </div>
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-semibold text-foreground">{student.name}</p>
            <p className="text-xs text-muted-foreground">{student.program}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
