'use client'

import { useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select } from '@/components/ui/field'
import { gpaTrend } from '@/lib/dashboard-data'

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="mb-1 font-medium text-popover-foreground">{label}</p>
      <p className="text-primary">GPA: {payload[0].value.toFixed(2)}</p>
      <p className="text-muted-foreground">Target: 3.70</p>
    </div>
  )
}

export function GpaChart() {
  const [period, setPeriod] = useState('all')

  return (
    <Card>
      <CardHeader className="flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <div>
          <CardTitle>GPA Performance</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Semester GPA trend against your 3.70 target
          </p>
        </div>
        <div className="sm:w-40">
          <Select value={period} onChange={(e) => setPeriod(e.target.value)} aria-label="Select period">
            <option value="all">All semesters</option>
            <option value="year">This year</option>
            <option value="recent">Last 3 semesters</option>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={gpaTrend} margin={{ top: 8, right: 12, bottom: 0, left: -16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="semester"
                stroke="var(--muted-foreground)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={[3, 4]}
                ticks={[3, 3.25, 3.5, 3.75, 4]}
                stroke="var(--muted-foreground)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<ChartTooltip />} />
              <ReferenceLine
                y={3.7}
                stroke="var(--chart-2)"
                strokeDasharray="6 6"
                label={{
                  value: 'Target 3.70',
                  position: 'insideTopRight',
                  fill: 'var(--chart-2)',
                  fontSize: 11,
                }}
              />
              <Line
                type="monotone"
                dataKey="gpa"
                stroke="var(--primary)"
                strokeWidth={2.5}
                dot={{ r: 4, fill: 'var(--primary)', strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
