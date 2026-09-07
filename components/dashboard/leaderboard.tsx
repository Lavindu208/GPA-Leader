import { Trophy } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { leaderboard } from '@/lib/dashboard-data'
import { cn } from '@/lib/utils'

const rankColor: Record<number, string> = {
  1: 'bg-chart-2/15 text-chart-2',
  2: 'bg-muted text-foreground',
  3: 'bg-accent text-accent-foreground',
}

export function Leaderboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Class Leaderboard</CardTitle>
        <Trophy className="size-5 text-chart-2" />
      </CardHeader>
      <CardContent className="pt-4">
        <ul className="flex flex-col gap-1">
          {leaderboard.map((entry) => (
            <li
              key={entry.id}
              className={cn(
                'flex items-center gap-3 rounded-lg px-2 py-2',
                entry.you ? 'bg-accent/60 ring-1 ring-primary/20' : 'hover:bg-muted/40',
              )}
            >
              <span
                className={cn(
                  'flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                  rankColor[entry.rank] ?? 'bg-muted text-muted-foreground',
                )}
              >
                {entry.rank}
              </span>
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
                {entry.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {entry.name}
                  {entry.you ? <span className="ml-1.5 text-xs text-primary">(You)</span> : null}
                </p>
              </div>
              <span className="text-sm font-semibold text-foreground tabular-nums">
                {entry.cgpa.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
