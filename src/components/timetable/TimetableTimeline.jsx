import { CalendarX2 } from 'lucide-react'
import { LectureCard } from './LectureCard'

export function TimetableTimeline({ lectures, onEdit, onDelete }) {
  if (lectures.length === 0) return <div className="dashboard-card flex flex-col items-center justify-center bg-white px-5 py-14 text-center"><CalendarX2 size={30} className="text-[var(--color-accent)]" aria-hidden="true" /><h2 className="mt-4 text-lg font-semibold text-[var(--color-ink)]">No lectures scheduled</h2><p className="mt-2 text-sm text-[var(--color-muted)]">Your day is open. Add a lecture when your schedule changes.</p></div>

  return <div className="relative space-y-4 pl-1" aria-label="Lecture timeline"><div className="absolute bottom-7 left-[0.7rem] top-7 w-px bg-[#cfe0d4]" aria-hidden="true" />{lectures.map((lecture) => <LectureCard key={lecture.id} lecture={lecture} onEdit={onEdit} onDelete={onDelete} />)}</div>
}