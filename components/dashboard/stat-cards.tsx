import { ArrowUpRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { summaryStats } from '@/lib/dashboard-data'

export function StatCards() {
  return (
    <section
      aria-label="Academic summary"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {summaryStats.map((stat) => (
        <Card key={stat.id} className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <stat.icon className="size-5" />
            </div>
            {stat.delta ? (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                <ArrowUpRight className="size-3" />
                {stat.delta}
              </span>
            ) : null}
          </div>

          <p className="mt-4 text-sm text-muted-foreground">{stat.label}</p>
          <p className="mt-1 text-3xl font-semibold tracking-tight text-foreground tabular-nums">
            {stat.value}
          </p>

          {typeof stat.progress === 'number' ? (
            <div className="mt-3">
              <Progress value={stat.progress} />
              <p className="mt-2 text-xs text-muted-foreground">{stat.sub}</p>
            </div>
          ) : (
            <p className="mt-2 text-xs text-muted-foreground">{stat.sub}</p>
          )}
        </Card>
      ))}
    </section>
  )
}
