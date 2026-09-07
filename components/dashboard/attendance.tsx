import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { attendance, overallAttendance } from '@/lib/dashboard-data'
import { cn } from '@/lib/utils'

function Ring({ percent, size = 132 }: { percent: number; size?: number }) {
  const stroke = 10
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--muted)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--primary)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-semibold text-foreground tabular-nums">{percent}%</span>
        <span className="text-xs text-muted-foreground">overall</span>
      </div>
    </div>
  )
}

export function Attendance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Overview</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center pt-4">
        <Ring percent={overallAttendance} />
        <ul className="mt-6 grid w-full grid-cols-2 gap-3">
          {attendance.map((item) => (
            <li key={item.id} className="rounded-lg border border-border p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{item.course}</span>
                <span
                  className={cn(
                    'text-sm font-semibold tabular-nums',
                    item.percent < 80 ? 'text-chart-2' : 'text-foreground',
                  )}
                >
                  {item.percent}%
                </span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
