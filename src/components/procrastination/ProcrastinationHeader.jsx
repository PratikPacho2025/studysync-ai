import { Clock3 } from 'lucide-react'

export function ProcrastinationHeader() {
  const date = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric' }).format(new Date())
  return <header><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]"><Clock3 size={15} aria-hidden="true" /> A kinder look at momentum</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">Focus &amp; Procrastination</h1><p className="mt-2 text-sm text-[var(--color-muted)]">Understand your study habits</p><p className="mt-2 text-xs font-semibold text-[var(--color-muted)]">{date}</p></header>
}