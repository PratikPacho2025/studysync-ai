import { CalendarDays } from 'lucide-react'

export function DashboardHeader({ user }) {
  const today = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date())

  return (
    <header className="pt-1 sm:pt-2">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">Your daily command center</p>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-[var(--color-ink)] sm:text-4xl">Good morning, {user.name} <span aria-hidden="true">👋</span></h1>
          <p className="mt-2 text-sm text-[var(--color-muted)]">Let&apos;s make today productive.</p>
        </div>
        <div className="hidden items-center gap-2 rounded-xl bg-white/70 px-3 py-2 text-xs font-semibold text-[var(--color-muted)] shadow-sm sm:flex">
          <CalendarDays size={15} aria-hidden="true" />
          <time dateTime={new Date().toISOString().slice(0, 10)}>{today}</time>
        </div>
      </div>
      <time className="mt-3 flex items-center gap-2 text-xs font-semibold text-[var(--color-muted)] sm:hidden" dateTime={new Date().toISOString().slice(0, 10)}>
        <CalendarDays size={14} aria-hidden="true" /> {today}
      </time>
    </header>
  )
}