import { CalendarClock, Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { upcoming, type Deadline } from '@/lib/dashboard-data'

const typeVariant: Record<Deadline['type'], 'default' | 'warning' | 'neutral'> = {
  Assignment: 'default',
  Exam: 'warning',
  Project: 'neutral',
  Quiz: 'neutral',
}

export function Upcoming({ onAddAssignment }: { onAddAssignment: () => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming</CardTitle>
        <Button variant="ghost" size="sm" onClick={onAddAssignment}>
          <Plus />
          Add
        </Button>
      </CardHeader>
      <CardContent className="pt-4">
        <ul className="flex flex-col gap-3">
          {upcoming.map((item) => (
            <li
              key={item.id}
              className="flex items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/40"
            >
              <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <CalendarClock className="size-4.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
                  {item.urgent ? <Badge variant="danger">Urgent</Badge> : null}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {item.course} · {item.due}
                </p>
              </div>
              <Badge variant={typeVariant[item.type]}>{item.type}</Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
