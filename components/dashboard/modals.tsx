'use client'

import { useState, type FormEvent } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input, Label, Select } from '@/components/ui/field'
import { Modal } from '@/components/ui/modal'
import {
  classification,
  computeGpa,
  LETTER_GRADES,
  type Course,
} from '@/lib/gpa'

export type ModalKey = 'course' | 'assignment' | 'exam' | 'target' | 'calculate' | null

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  )
}

function Footer({ onClose, submitLabel }: { onClose: () => void; submitLabel: string }) {
  return (
    <div className="mt-6 flex justify-end gap-2">
      <Button type="button" variant="outline" size="lg" onClick={onClose}>
        Cancel
      </Button>
      <Button type="submit" size="lg">
        {submitLabel}
      </Button>
    </div>
  )
}

export function DashboardModals({
  active,
  onClose,
}: {
  active: ModalKey
  onClose: () => void
}) {
  const submit = (e: FormEvent) => {
    e.preventDefault()
    onClose()
  }

  return (
    <>
      <Modal
        open={active === 'course'}
        onClose={onClose}
        title="Add Course"
        description="Add a course to your current semester."
      >
        <form onSubmit={submit} className="flex flex-col gap-4">
          <Field label="Course name">
            <Input placeholder="e.g. Operating Systems" required />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Course code">
              <Input placeholder="ICT 2213" required />
            </Field>
            <Field label="Credit hours">
              <Input type="number" min={1} max={6} defaultValue={3} required />
            </Field>
          </div>
          <Field label="Expected grade">
            <Select defaultValue="A">
              {LETTER_GRADES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </Select>
          </Field>
          <Footer onClose={onClose} submitLabel="Add course" />
        </form>
      </Modal>

      <Modal
        open={active === 'assignment'}
        onClose={onClose}
        title="Add Assignment"
        description="Track a new assignment deadline."
      >
        <form onSubmit={submit} className="flex flex-col gap-4">
          <Field label="Title">
            <Input placeholder="e.g. Assignment 3" required />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Course">
              <Input placeholder="ICT 2203" required />
            </Field>
            <Field label="Due date">
              <Input type="date" required />
            </Field>
          </div>
          <Field label="Weight (%)">
            <Input type="number" min={0} max={100} defaultValue={10} />
          </Field>
          <Footer onClose={onClose} submitLabel="Add assignment" />
        </form>
      </Modal>

      <Modal
        open={active === 'exam'}
        onClose={onClose}
        title="Add Exam"
        description="Schedule an upcoming exam."
      >
        <form onSubmit={submit} className="flex flex-col gap-4">
          <Field label="Exam name">
            <Input placeholder="e.g. Mid Semester Exam" required />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Course">
              <Input placeholder="ICT 2205" required />
            </Field>
            <Field label="Date">
              <Input type="date" required />
            </Field>
          </div>
          <Field label="Type">
            <Select defaultValue="mid">
              <option value="quiz">Quiz</option>
              <option value="mid">Mid Semester</option>
              <option value="final">Final</option>
            </Select>
          </Field>
          <Footer onClose={onClose} submitLabel="Add exam" />
        </form>
      </Modal>

      <Modal
        open={active === 'target'}
        onClose={onClose}
        title="Set GPA Target"
        description="Choose the GPA you're aiming for this program."
      >
        <form onSubmit={submit} className="flex flex-col gap-4">
          <Field label="Target GPA">
            <Input type="number" min={0} max={4} step={0.01} defaultValue={3.7} required />
          </Field>
          <Field label="Target classification">
            <Select defaultValue="first">
              <option value="first">First Class (3.70+)</option>
              <option value="upper">Second Upper (3.30+)</option>
              <option value="lower">Second Lower (3.00+)</option>
            </Select>
          </Field>
          <Footer onClose={onClose} submitLabel="Save target" />
        </form>
      </Modal>

      <CalculateModal open={active === 'calculate'} onClose={onClose} />
    </>
  )
}

let idCounter = 0
const newRow = (): Course => ({
  id: `calc-${idCounter++}`,
  name: '',
  grade: 'A',
  credits: '3',
})

function CalculateModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [rows, setRows] = useState<Course[]>([newRow(), newRow(), newRow()])

  const update = (id: string, patch: Partial<Course>) =>
    setRows((r) => r.map((row) => (row.id === id ? { ...row, ...patch } : row)))
  const remove = (id: string) => setRows((r) => r.filter((row) => row.id !== id))

  const result = computeGpa(rows, 'letter')
  const klass = classification(result.gpa)

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Calculate GPA"
      description="Enter grades and credit hours to project your GPA."
      className="max-w-lg"
    >
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-[1fr_auto_auto] gap-2 px-1 text-xs font-medium text-muted-foreground">
          <span>Grade</span>
          <span className="w-20 text-center">Credits</span>
          <span className="w-8" />
        </div>
        <div className="flex max-h-56 flex-col gap-2 overflow-y-auto pr-1">
          {rows.map((row) => (
            <div key={row.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-2">
              <Select
                value={row.grade}
                onChange={(e) => update(row.id, { grade: e.target.value })}
                aria-label="Grade"
              >
                {LETTER_GRADES.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </Select>
              <Input
                type="number"
                min={0}
                max={6}
                value={row.credits}
                onChange={(e) => update(row.id, { credits: e.target.value })}
                className="w-20 text-center"
                aria-label="Credits"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => remove(row.id)}
                disabled={rows.length <= 1}
                aria-label="Remove row"
              >
                <Trash2 />
              </Button>
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setRows((r) => [...r, newRow()])}
          className="mt-1 self-start"
        >
          <Plus />
          Add row
        </Button>

        <div className="mt-3 flex items-center justify-between rounded-xl border border-border bg-muted/40 p-4">
          <div>
            <p className="text-xs text-muted-foreground">Projected GPA</p>
            <p className="text-3xl font-semibold tracking-tight text-foreground tabular-nums">
              {result.gpa.toFixed(2)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-primary">{klass.label}</p>
            <p className="text-xs text-muted-foreground">
              {result.totalCredits} credits · {result.countedCourses} courses
            </p>
          </div>
        </div>

        <div className="mt-2 flex justify-end">
          <Button type="button" size="lg" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </Modal>
  )
}
