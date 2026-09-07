export type LetterGrade =
  | 'A'
  | 'A-'
  | 'B+'
  | 'B'
  | 'B-'
  | 'C+'
  | 'C'
  | 'C-'
  | 'D+'
  | 'D'
  | 'D-'
  | 'F'

export const GRADE_POINTS: Record<LetterGrade, number> = {
  A: 4.0,
  'A-': 3.7,
  'B+': 3.3,
  B: 3.0,
  'B-': 2.7,
  'C+': 2.3,
  C: 2.0,
  'C-': 1.7,
  'D+': 1.3,
  D: 1.0,
  'D-': 0.7,
  F: 0.0,
}

export const LETTER_GRADES = Object.keys(GRADE_POINTS) as LetterGrade[]

/** Convert a percentage score (0-100) to a letter grade on a standard 4.0 scale. */
export function percentageToLetter(score: number): LetterGrade {
  if (score >= 93) return 'A'
  if (score >= 90) return 'A-'
  if (score >= 87) return 'B+'
  if (score >= 83) return 'B'
  if (score >= 80) return 'B-'
  if (score >= 77) return 'C+'
  if (score >= 73) return 'C'
  if (score >= 70) return 'C-'
  if (score >= 67) return 'D+'
  if (score >= 63) return 'D'
  if (score >= 60) return 'D-'
  return 'F'
}

export function percentageToPoints(score: number): number {
  return GRADE_POINTS[percentageToLetter(score)]
}

export type GradeMode = 'letter' | 'percentage'

export type Course = {
  id: string
  name: string
  /** For letter mode this is a LetterGrade; for percentage mode this is a numeric string. */
  grade: string
  credits: string
}

export type GpaResult = {
  gpa: number
  totalCredits: number
  countedCourses: number
}

/** Compute cumulative GPA. Only rows with a valid grade and positive credits count. */
export function computeGpa(courses: Course[], mode: GradeMode): GpaResult {
  let qualityPoints = 0
  let totalCredits = 0
  let countedCourses = 0

  for (const course of courses) {
    const credits = Number.parseFloat(course.credits)
    if (!Number.isFinite(credits) || credits <= 0) continue

    let points: number | null = null

    if (mode === 'letter') {
      if (course.grade in GRADE_POINTS) {
        points = GRADE_POINTS[course.grade as LetterGrade]
      }
    } else {
      const score = Number.parseFloat(course.grade)
      if (Number.isFinite(score) && course.grade.trim() !== '') {
        const clamped = Math.min(100, Math.max(0, score))
        points = percentageToPoints(clamped)
      }
    }

    if (points === null) continue

    qualityPoints += points * credits
    totalCredits += credits
    countedCourses += 1
  }

  return {
    gpa: totalCredits > 0 ? qualityPoints / totalCredits : 0,
    totalCredits,
    countedCourses,
  }
}

export function classification(gpa: number): { label: string; tone: 'good' | 'ok' | 'low' } {
  if (gpa >= 3.7) return { label: 'First Class', tone: 'good' }
  if (gpa >= 3.0) return { label: 'Very Good', tone: 'good' }
  if (gpa >= 2.3) return { label: 'Good', tone: 'ok' }
  if (gpa >= 2.0) return { label: 'Satisfactory', tone: 'ok' }
  return { label: 'Needs Improvement', tone: 'low' }
}
