import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { achievements } from '@/lib/dashboard-data'

export function Achievements() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Achievements</CardTitle>
        <a href="#" className="text-xs font-medium text-primary hover:underline">
          View all
        </a>
      </CardHeader>
      <CardContent className="pt-4">
        <ul className="grid grid-cols-2 gap-3">
          {achievements.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-2 rounded-lg border border-border p-3 transition-colors hover:bg-muted/40"
            >
              <div className="flex size-9 items-center justify-center rounded-lg bg-chart-2/15 text-chart-2">
                <item.icon className="size-4.5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
