import { useMemo, useState } from 'react'
import {
  AttendanceHeader,
  AttendanceHistory,
  AttendanceSummary,
  MarkAttendanceSheet,
  SubjectAttendanceCard,
} from '../../components/attendance'
import { attendanceData, attendanceHistory } from '../../data/mock/attendance'
import { calculateAttendancePercentage, getAttendanceStatus } from '../../utils/attendance'

const statusOrder = { critical: 0, 'needs-attention': 1, good: 2, excellent: 3 }

export function AttendancePage() {
  const [subjects, setSubjects] = useState(attendanceData)
  const [history, setHistory] = useState(attendanceHistory)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [isMarkAttendanceOpen, setIsMarkAttendanceOpen] = useState(false)

  const summary = useMemo(() => {
    const totals = subjects.reduce((result, subject) => ({ present: result.present + subject.present, absent: result.absent + subject.absent }), { present: 0, absent: 0 })
    const total = totals.present + totals.absent
    const percentage = calculateAttendancePercentage(totals.present, total)
    return { ...totals, total, percentage, status: getAttendanceStatus(percentage) }
  }, [subjects])

  const visibleHistory = history.filter((record) => selectedFilter === 'all' || record.status === selectedFilter)
  const sortedSubjects = [...subjects].sort((first, second) => statusOrder[first.status] - statusOrder[second.status])

  function saveAttendance(record) {
    setSubjects((currentSubjects) => currentSubjects.map((subject) => {
      if (subject.subject !== record.subject) return subject
      const present = subject.present + (record.status === 'present' ? 1 : 0)
      const absent = subject.absent + (record.status === 'absent' ? 1 : 0)
      const total = present + absent
      const percentage = calculateAttendancePercentage(present, total)
      return { ...subject, present, absent, total, percentage, status: getAttendanceStatus(percentage) }
    }))
    setHistory((currentHistory) => [{ id: Date.now(), subject: record.subject, date: new Date(`${record.date}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }), time: record.lecture, status: record.status }, ...currentHistory])
    setIsMarkAttendanceOpen(false)
  }

  return <div className="mx-auto w-full max-w-6xl space-y-7 pb-2"><AttendanceHeader onMark={() => setIsMarkAttendanceOpen(true)} /><div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"><AttendanceSummary summary={summary} /><section aria-labelledby="subject-attendance-title"><div className="mb-4 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">By subject</p><h2 id="subject-attendance-title" className="mt-1 text-2xl font-semibold text-[var(--color-ink)]">Subject Attendance</h2></div><span className="text-xs font-semibold text-[var(--color-muted)]">{subjects.length} subjects</span></div><div className="grid gap-3 sm:grid-cols-2">{sortedSubjects.map((subject) => <SubjectAttendanceCard key={subject.id} subject={subject} />)}</div></section></div><AttendanceHistory records={visibleHistory} filter={selectedFilter} onFilterChange={setSelectedFilter} /><MarkAttendanceSheet isOpen={isMarkAttendanceOpen} subjects={subjects} onClose={() => setIsMarkAttendanceOpen(false)} onSave={saveAttendance} /></div>
}