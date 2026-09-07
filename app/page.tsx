'use client'

import { useState } from 'react'
import { BookPlus, CalendarPlus, FilePlus2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/dashboard/header'
import { Sidebar } from '@/components/dashboard/sidebar'
import { StatCards } from '@/components/dashboard/stat-cards'
import { GpaChart } from '@/components/dashboard/gpa-chart'
import { DegreeProgress } from '@/components/dashboard/degree-progress'
import { CoursesTable } from '@/components/dashboard/courses-table'
import { Upcoming } from '@/components/dashboard/upcoming'
import { Attendance } from '@/components/dashboard/attendance'
import { GpaGoal } from '@/components/dashboard/gpa-goal'
import { Achievements } from '@/components/dashboard/achievements'
import { Leaderboard } from '@/components/dashboard/leaderboard'
import { DashboardModals, type ModalKey } from '@/components/dashboard/modals'
import { student } from '@/lib/dashboard-data'

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [modal, setModal] = useState<ModalKey>(null)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64">
        <Header onMenu={() => setSidebarOpen(true)} />

        <main className="mx-auto max-w-[1400px] px-4 py-6 lg:px-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-foreground text-balance">
                Welcome back, {student.name.split('.').pop()?.trim() ?? 'Student'}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Here&apos;s how your academic performance is tracking this semester.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => setModal('course')}>
                <BookPlus />
                Add course
              </Button>
              <Button variant="outline" size="sm" onClick={() => setModal('assignment')}>
                <FilePlus2 />
                Add assignment
              </Button>
              <Button size="sm" onClick={() => setModal('exam')}>
                <CalendarPlus />
                Add exam
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <StatCards />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <GpaChart />
              </div>
              <DegreeProgress />

              <div className="lg:col-span-2">
                <CoursesTable onAddCourse={() => setModal('course')} />
              </div>
              <Upcoming onAddAssignment={() => setModal('assignment')} />

              <Attendance />
              <GpaGoal
                onSetTarget={() => setModal('target')}
                onCalculate={() => setModal('calculate')}
              />
              <Leaderboard />

              <div className="lg:col-span-3">
                <Achievements />
              </div>
            </div>
          </div>
        </main>
      </div>

      <DashboardModals active={modal} onClose={() => setModal(null)} />
    </div>
  )
}
