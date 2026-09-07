import { Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { currentCourses, type SemesterCourse } from '@/lib/dashboard-data'

const statusVariant: Record<SemesterCourse['status'], 'success' | 'warning' | 'neutral'> = {
  'On Track': 'success',
  'At Risk': 'warning',
  Completed: 'neutral',
}

export function CoursesTable({ onAddCourse }: { onAddCourse: () => void }) {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Current Semester Courses</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">Semester 5 · 17 credit hours</p>
        </div>
        <Button variant="outline" size="sm" onClick={onAddCourse}>
          <Plus />
          Add course
        </Button>
      </CardHeader>
      <CardContent className="px-0 pt-4 pb-2">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="px-5 py-2 font-medium">Course</th>
                <th className="px-3 py-2 font-medium">Credits</th>
                <th className="hidden px-3 py-2 font-medium md:table-cell">Progress</th>
                <th className="px-3 py-2 font-medium">Grade</th>
                <th className="px-5 py-2 text-right font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentCourses.map((course) => (
                <tr
                  key={course.id}
                  className="border-b border-border/60 transition-colors last:border-0 hover:bg-muted/40"
                >
                  <td className="px-5 py-3">
                    <p className="font-medium text-foreground">{course.name}</p>
                    <p className="text-xs text-muted-foreground">{course.code}</p>
                  </td>
                  <td className="px-3 py-3 tabular-nums text-muted-foreground">{course.credits}</td>
                  <td className="hidden px-3 py-3 md:table-cell">
                    <div className="flex items-center gap-2">
                      <Progress value={course.progress} className="h-1.5 w-24" />
                      <span className="text-xs tabular-nums text-muted-foreground">
                        {course.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className="font-semibold text-foreground tabular-nums">{course.grade}</span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Badge variant={statusVariant[course.status]}>{course.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
