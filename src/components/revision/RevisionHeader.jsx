import { CalendarDays } from 'lucide-react'

export function RevisionHeader() {
  const date = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric' }).format(new Date())
  return <header><p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">Build lasting recall</p><h1 className="mt-1 text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">Revision</h1><p className="mt-2 text-sm text-[var(--color-muted)]">Keep your learning fresh</p><p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[var(--color-muted)]"><CalendarDays size={14} aria-hidden="true" /> {date}</p></header>
}