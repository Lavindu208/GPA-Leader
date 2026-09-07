import type { LucideIcon } from 'lucide-react'
import {
  Award,
  BookOpen,
  CalendarClock,
  FileText,
  GraduationCap,
  Medal,
  Target,
  TrendingUp,
} from 'lucide-react'

export type Student = {
  name: string
  program: string
  initials: string
}

export const student: Student = {
  name: 'M.N.P. Silva',
  program: 'ICT Undergraduate',
  initials: 'MS',
}

export type SummaryStat = {
  id: string
  label: string
  value: string
  sub: string
  delta?: string
  trend?: 'up' | 'down'
  icon: LucideIcon
  progress?: number
}

export const summaryStats: SummaryStat[] = [
  {
    id: 'current-gpa',
    label: 'Current GPA',
    value: '3.52',
    sub: 'Semester 5',
    delta: '+0.11',
    trend: 'up',
    icon: TrendingUp,
  },
  {
    id: 'cgpa',
    label: 'Overall CGPA',
    value: '3.41',
    sub: 'Across 5 semesters',
    delta: '+0.06',
    trend: 'up',
    icon: GraduationCap,
  },
  {
    id: 'credits',
    label: 'Credits Completed',
    value: '72',
    sub: 'of 120 credits',
    progress: 60,
    icon: BookOpen,
  },
  {
    id: 'target',
    label: 'Target GPA',
    value: '3.70',
    sub: 'First Class range',
    delta: '0.18 to go',
    trend: 'up',
    icon: Target,
  },
]

export type GpaPoint = { semester: string; gpa: number; target: number }

export const gpaTrend: GpaPoint[] = [
  { semester: 'Sem 1', gpa: 3.18, target: 3.7 },
  { semester: 'Sem 2', gpa: 3.29, target: 3.7 },
  { semester: 'Sem 3', gpa: 3.36, target: 3.7 },
  { semester: 'Sem 4', gpa: 3.41, target: 3.7 },
  { semester: 'Sem 5', gpa: 3.52, target: 3.7 },
]

export type Deadline = {
  id: string
  title: string
  course: string
  due: string
  type: 'Assignment' | 'Exam' | 'Project' | 'Quiz'
  urgent?: boolean
}

export const upcoming: Deadline[] = [
  {
    id: 'd1',
    title: 'Data Structures Assignment 3',
    course: 'ICT 2203',
    due: 'Tomorrow, 11:59 PM',
    type: 'Assignment',
    urgent: true,
  },
  {
    id: 'd2',
    title: 'Database Systems Mid Exam',
    course: 'ICT 2205',
    due: 'In 3 days',
    type: 'Exam',
  },
  {
    id: 'd3',
    title: 'Web Technologies Project Demo',
    course: 'ICT 2207',
    due: 'In 6 days',
    type: 'Project',
  },
  {
    id: 'd4',
    title: 'Networking Quiz 2',
    course: 'ICT 2209',
    due: 'Next week',
    type: 'Quiz',
  },
]

export type SemesterCourse = {
  id: string
  code: string
  name: string
  credits: number
  grade: string
  progress: number
  status: 'On Track' | 'At Risk' | 'Completed'
}

export const currentCourses: SemesterCourse[] = [
  {
    id: 'c1',
    code: 'ICT 2203',
    name: 'Data Structures & Algorithms',
    credits: 4,
    grade: 'A-',
    progress: 82,
    status: 'On Track',
  },
  {
    id: 'c2',
    code: 'ICT 2205',
    name: 'Database Management Systems',
    credits: 3,
    grade: 'B+',
    progress: 74,
    status: 'On Track',
  },
  {
    id: 'c3',
    code: 'ICT 2207',
    name: 'Web Technologies',
    credits: 3,
    grade: 'A',
    progress: 91,
    status: 'On Track',
  },
  {
    id: 'c4',
    code: 'ICT 2209',
    name: 'Computer Networks',
    credits: 3,
    grade: 'B',
    progress: 58,
    status: 'At Risk',
  },
  {
    id: 'c5',
    code: 'ICT 2211',
    name: 'Software Engineering',
    credits: 4,
    grade: 'A-',
    progress: 79,
    status: 'On Track',
  },
]

export type AttendanceMetric = {
  id: string
  course: string
  percent: number
}

export const attendance: AttendanceMetric[] = [
  { id: 'a1', course: 'Data Structures', percent: 94 },
  { id: 'a2', course: 'Databases', percent: 88 },
  { id: 'a3', course: 'Web Tech', percent: 96 },
  { id: 'a4', course: 'Networks', percent: 72 },
]

export const overallAttendance = 88

export type Achievement = {
  id: string
  title: string
  detail: string
  icon: LucideIcon
}

export const achievements: Achievement[] = [
  { id: 'ach1', title: "Dean's List", detail: 'Semester 5 honoree', icon: Medal },
  { id: 'ach2', title: 'Perfect Attendance', detail: 'Web Technologies', icon: CalendarClock },
  { id: 'ach3', title: 'Top Performer', detail: 'Data Structures A-', icon: Award },
  { id: 'ach4', title: 'Project Award', detail: 'Best Demo, Sem 4', icon: FileText },
]

export type LeaderboardEntry = {
  id: string
  rank: number
  name: string
  initials: string
  cgpa: number
  you?: boolean
}

export const leaderboard: LeaderboardEntry[] = [
  { id: 'l1', rank: 1, name: 'A.K. Fernando', initials: 'AF', cgpa: 3.78 },
  { id: 'l2', rank: 2, name: 'D.R. Perera', initials: 'DP', cgpa: 3.65 },
  { id: 'l3', rank: 3, name: 'M.N.P. Silva', initials: 'MS', cgpa: 3.41, you: true },
  { id: 'l4', rank: 4, name: 'S.J. Bandara', initials: 'SB', cgpa: 3.38 },
  { id: 'l5', rank: 5, name: 'H.T. Jayasuriya', initials: 'HJ', cgpa: 3.29 },
]
