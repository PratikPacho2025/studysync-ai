import { ArrowUpRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

export function TodaysClasses({ classes }) {
  return (
    <section className="dashboard-card bg-white p-5 sm:p-6" aria-labelledby="classes-title">
      <div className="flex items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">On your schedule</p><h2 id="classes-title" className="mt-1 text-xl font-semibold text-[var(--color-ink)]">Today&apos;s Classes</h2></div><Link to="/timetable" className="flex min-h-10 items-center gap-1 rounded-xl px-2 text-xs font-bold text-[var(--color-accent)] hover:bg-[#eef7f0]">View timetable <ArrowUpRight size={15} aria-hidden="true" /></Link></div>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {classes.map((lecture) => <article key={`${lecture.time}-${lecture.subject}`} className="flex gap-3 rounded-2xl border border-[#e3ece5] p-3"><time className="w-12 shrink-0 pt-0.5 text-sm font-bold text-[var(--color-accent)]">{lecture.time}</time><div className="min-w-0 border-l border-[#dce7df] pl-3"><h3 className="font-semibold text-[var(--color-ink)]">{lecture.subject}</h3><p className="mt-1 text-xs leading-5 text-[var(--color-muted)]">{lecture.title}</p><p className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-[var(--color-muted)]"><MapPin size={12} aria-hidden="true" /> {lecture.room}</p></div></article>)}
      </div>
    </section>
  )
}