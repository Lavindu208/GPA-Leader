import { Calculator, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

const current = 3.41
const target = 3.7
const pct = Math.round((current / target) * 100)

export function GpaGoal({
  onSetTarget,
  onCalculate,
}: {
  onSetTarget: () => void
  onCalculate: () => void
}) {
  return (
    <Card className="bg-gradient-to-br from-primary to-primary/85 text-primary-foreground">
      <CardHeader>
        <CardTitle className="text-primary-foreground">Your GPA Goal</CardTitle>
        <Target className="size-5 text-primary-foreground/80" />
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-semibold tracking-tight tabular-nums">{current}</span>
          <span className="text-primary-foreground/70">/ {target} target</span>
        </div>

        <Progress
          value={pct}
          className="mt-4 h-2.5 bg-primary-foreground/20"
          indicatorClassName="bg-primary-foreground"
        />
        <p className="mt-2 text-sm text-primary-foreground/80">
          You&apos;re {pct}% of the way to your First Class target. Keep it up!
        </p>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Button
            variant="secondary"
            size="sm"
            onClick={onSetTarget}
            className="flex-1 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            <Target />
            Set target
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={onCalculate}
            className="flex-1 bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/25"
          >
            <Calculator />
            Calculate GPA
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
