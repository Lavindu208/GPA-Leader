'use client'

import {
  Award,
  BookOpen,
  Calculator,
  CalendarDays,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  LogOut,
  Settings,
  Trophy,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navMain = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Courses', icon: BookOpen },
  { label: 'Grades', icon: LineChart },
  { label: 'Schedule', icon: CalendarDays },
  { label: 'GPA Calculator', icon: Calculator },
  { label: 'Achievements', icon: Award },
  { label: 'Leaderboard', icon: Trophy },
]

const navFooter = [
  { label: 'Settings', icon: Settings },
  { label: 'Sign out', icon: LogOut },
]

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open ? (
        <div
          aria-hidden="true"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-foreground/40 backdrop-blur-sm lg:hidden"
        />
      ) : null}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-300 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-16 items-center justify-between gap-2 border-b border-sidebar-border px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <GraduationCap className="size-5" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-sidebar-foreground">GPA Leader</p>
              <p className="text-xs text-muted-foreground">Academic Suite</p>
            </div>
          </div>
          <Button variant="ghost" size="icon-sm" onClick={onClose} className="lg:hidden" aria-label="Close menu">
            <X />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="px-3 pb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Menu
          </p>
          <ul className="flex flex-col gap-1">
            {navMain.map((item) => (
              <li key={item.label}>
                <a
                  href="#"
                  aria-current={item.active ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    item.active
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  <item.icon className="size-4.5" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-sidebar-border px-3 py-4">
          <ul className="flex flex-col gap-1">
            {navFooter.map((item) => (
              <li key={item.label}>
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <item.icon className="size-4.5" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  )
}
