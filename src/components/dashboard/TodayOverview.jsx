import { BarChart3, BookOpen, CalendarCheck, FileQuestion } from 'lucide-react'

const icons = [CalendarCheck, BookOpen, BarChart3, FileQuestion]

export function TodayOverview({ items }) {
  return (
    <section className="dashboard-card bg-white p-5 sm:p-6" aria-labelledby="today-overview-title">
      <div className="flex items-center justify-between"><h2 id="today-overview-title" className="text-xl font-semibold text-[var(--color-ink)]">Today</h2><span className="text-xs font-semibold text-[var(--color-muted)]">Overview</span></div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {items.map((item, index) => {
          const Icon = icons[index]
          return <div key={item.label} className="rounded-2xl bg-[#f2f7f3] p-3"><Icon size={18} className="text-[var(--color-accent)]" aria-hidden="true" /><strong className="mt-3 block text-2xl font-semibold text-[var(--color-ink)]">{item.value}</strong><span className="text-xs font-semibold text-[var(--color-muted)]">{item.label}</span></div>
        })}
      </div>
    </section>
  )
}