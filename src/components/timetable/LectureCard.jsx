import { Check, Clock3, MapPin, Pencil, Trash2, UserRound, X } from 'lucide-react'
import { useState } from 'react'

const statusStyles = {
  upcoming: 'bg-[#e1f0e7] text-[#277c68]',
  ongoing: 'bg-[#dcebed] text-[#3d7280]',
  completed: 'bg-[#e6e9e6] text-[#66716b]',
  cancelled: 'bg-[#f7e3dd] text-[#a14d2e]',
}

const statusLabels = { upcoming: 'Upcoming', ongoing: 'Ongoing', completed: 'Completed', cancelled: 'Cancelled' }

export function LectureCard({ lecture, onEdit, onDelete }) {
  const [confirming, setConfirming] = useState(false)
  const statusIcon = { upcoming: Clock3, ongoing: Clock3, completed: Check, cancelled: X }[lecture.status]
  const StatusIcon = statusIcon

  return (
    <article className={`dashboard-card 3d-hover relative ml-6 bg-white p-4 sm:p-5 ${lecture.status === 'cancelled' ? 'opacity-75' : ''}`}>
      <span className="absolute -left-[2.05rem] top-6 grid size-6 place-items-center rounded-full border-4 border-[#f3f7f2] bg-[var(--color-accent)] text-white"><StatusIcon size={11} strokeWidth={3} aria-hidden="true" /></span>
      <div className="flex items-start justify-between gap-3">
        <div><p className="flex items-center gap-1 text-xs font-bold text-[var(--color-accent)]"><Clock3 size={13} aria-hidden="true" /> {lecture.startTime} - {lecture.endTime}</p><h3 className="mt-2 text-lg font-semibold text-[var(--color-ink)]">{lecture.subject}</h3><p className="mt-1 text-sm text-[var(--color-muted)]">{lecture.topic}</p></div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyles[lecture.status]}`}>{statusLabels[lecture.status]}</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-[var(--color-muted)]"><span className="flex items-center gap-1"><MapPin size={13} aria-hidden="true" /> Room {lecture.room}</span><span className="flex items-center gap-1"><UserRound size={13} aria-hidden="true" /> {lecture.teacher}</span></div>
      {confirming ? <div className="mt-4 rounded-xl bg-[#fff4ef] p-3"><p className="text-sm font-semibold text-[#8d4228]">Delete this lecture?</p><p className="mt-1 text-xs text-[#a14d2e]">{lecture.subject}, {lecture.startTime} - {lecture.endTime}</p><div className="mt-3 flex gap-2"><button type="button" onClick={() => setConfirming(false)} className="min-h-10 flex-1 rounded-xl border border-[#e6cfc6] px-3 text-xs font-bold text-[#8d4228]">Cancel</button><button type="button" onClick={() => onDelete(lecture.id)} className="min-h-10 flex-1 rounded-xl bg-[#a14d2e] px-3 text-xs font-bold text-white">Delete</button></div></div> : <div className="mt-4 flex justify-end gap-1 border-t border-[#edf1ed] pt-3"><button type="button" onClick={() => onEdit(lecture)} aria-label={`Edit ${lecture.subject} lecture`} className="grid size-10 place-items-center rounded-xl text-[var(--color-muted)] hover:bg-[#eef7f0] hover:text-[var(--color-accent)]"><Pencil size={16} aria-hidden="true" /></button><button type="button" onClick={() => setConfirming(true)} aria-label={`Delete ${lecture.subject} lecture`} className="grid size-10 place-items-center rounded-xl text-[var(--color-muted)] hover:bg-[#fff0eb] hover:text-[#a14d2e]"><Trash2 size={16} aria-hidden="true" /></button></div>}
    </article>
  )
}