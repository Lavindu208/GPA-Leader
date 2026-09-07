import { CalendarCheck, GraduationCap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export function DegreeProgress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Degree Progress</CardTitle>
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
          On track
        </span>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-3xl font-semibold tracking-tight text-foreground tabular-nums">60%</p>
            <p className="mt-1 text-sm text-muted-foreground">72 of 120 credits completed</p>
          </div>
          <div className="flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            <GraduationCap className="size-6" />
          </div>
        </div>

        <Progress value={60} className="mt-4 h-2.5" />

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border bg-muted/40 p-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarCheck className="size-4" />
              <span className="text-xs">Expected graduation</span>
            </div>
            <p className="mt-1 text-lg font-semibold text-foreground">2028</p>
          </div>
          <div className="rounded-lg border border-border bg-muted/40 p-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <GraduationCap className="size-4" />
              <span className="text-xs">Semester status</span>
            </div>
            <p className="mt-1 text-lg font-semibold text-foreground">Year 3 · S1</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
