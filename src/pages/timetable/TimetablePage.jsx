import { Plus } from 'lucide-react'
import { useState } from 'react'
import { AddLectureModal, DaySelector, EditLectureModal, TimetableHeader, TimetableTimeline, WeekSelector } from '../../components/timetable'
import { timetableData, timetableDays } from '../../data/mock/timetable'

const todayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date())

export function TimetablePage() {
  const initialDay = timetableDays.includes(todayName) ? todayName : 'Monday'
  const [lectures, setLectures] = useState(timetableData)
  const [selectedDay, setSelectedDay] = useState(initialDay)
  const [viewMode, setViewMode] = useState('today')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedLecture, setSelectedLecture] = useState(null)

  const sortedLectures = (items) => [...items].sort((first, second) => first.startTime.localeCompare(second.startTime))
  const todaysLectures = sortedLectures(lectures.filter((lecture) => lecture.day === selectedDay))
  const addLecture = (lecture) => { setLectures((current) => [...current, lecture]); setIsAddModalOpen(false); setSelectedDay(lecture.day); setViewMode('today') }
  const saveLecture = (updatedLecture) => { setLectures((current) => current.map((lecture) => lecture.id === updatedLecture.id ? updatedLecture : lecture)); setSelectedLecture(null); setSelectedDay(updatedLecture.day) }
  const deleteLecture = (lectureId) => { setLectures((current) => current.filter((lecture) => lecture.id !== lectureId)) }

  return <div className="mx-auto w-full max-w-4xl space-y-6 pb-2"><TimetableHeader onAdd={() => setIsAddModalOpen(true)} /><div className="dashboard-card bg-white p-3 sm:p-4"><WeekSelector viewMode={viewMode} onChange={setViewMode} /></div><DaySelector days={timetableDays} selectedDay={selectedDay} onSelect={(day) => { setSelectedDay(day); setViewMode('today') }} />{viewMode === 'today' ? <section aria-labelledby="selected-day-title"><div className="mb-4 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">{todaysLectures.length} {todaysLectures.length === 1 ? 'lecture' : 'lectures'}</p><h2 id="selected-day-title" className="mt-1 text-2xl font-semibold text-[var(--color-ink)]">{selectedDay}</h2></div><span className="text-xs font-semibold text-[var(--color-muted)]">Today&apos;s timeline</span></div><TimetableTimeline lectures={todaysLectures} onEdit={setSelectedLecture} onDelete={deleteLecture} /></section> : <section aria-labelledby="week-overview-title"><div className="mb-4"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">A quick overview</p><h2 id="week-overview-title" className="mt-1 text-2xl font-semibold text-[var(--color-ink)]">This week</h2></div><div className="space-y-3">{timetableDays.map((day) => { const dayLectures = sortedLectures(lectures.filter((lecture) => lecture.day === day)); return <button key={day} type="button" onClick={() => { setSelectedDay(day); setViewMode('today') }} className="dashboard-card flex min-h-16 w-full items-center justify-between bg-white px-4 text-left transition hover:-translate-y-0.5"><span><span className="block text-sm font-semibold text-[var(--color-ink)]">{day}</span><span className="mt-1 block text-xs text-[var(--color-muted)]">{dayLectures.length} {dayLectures.length === 1 ? 'lecture' : 'lectures'}</span></span><span className="text-sm font-bold text-[var(--color-accent)]">View day</span></button> })}</div></section>}<button type="button" onClick={() => setIsAddModalOpen(true)} aria-label="Add lecture" className="fixed bottom-24 right-5 z-30 grid size-14 place-items-center rounded-full bg-[var(--color-accent)] text-white shadow-[0_12px_25px_rgba(39,124,104,0.3)] transition hover:-translate-y-1 active:scale-95 lg:bottom-8 lg:right-10"><Plus size={24} aria-hidden="true" /></button><AddLectureModal key={`${selectedDay}-${isAddModalOpen}`} isOpen={isAddModalOpen} defaultDay={selectedDay} onClose={() => setIsAddModalOpen(false)} onAdd={addLecture} /><EditLectureModal key={selectedLecture?.id ?? 'none'} lecture={selectedLecture} onClose={() => setSelectedLecture(null)} onSave={saveLecture} /></div>
}