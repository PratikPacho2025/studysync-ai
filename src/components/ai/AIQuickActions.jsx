import {
  BarChart3,
  BookOpen,
  CalendarDays,
  Target,
  Zap,
} from 'lucide-react'

const QUICK_ACTIONS = [
  {
    id: 'planDay',
    label: 'Plan My Day',
    description: 'Get a personalised study schedule',
    icon: CalendarDays,
    color: 'bg-[#dceee4] text-[var(--color-accent)]',
  },
  {
    id: 'whatStudy',
    label: 'What Should I Study?',
    description: 'Find your highest priority topic',
    icon: BookOpen,
    color: 'bg-[#e4ecf9] text-[#3d6baa]',
  },
  {
    id: 'progress',
    label: 'Check My Progress',
    description: 'See your study health breakdown',
    icon: BarChart3,
    color: 'bg-[#f0ece0] text-[#8a6e2e]',
  },
  {
    id: 'exam',
    label: 'Prepare For Exam',
    description: 'Review exam readiness',
    icon: Target,
    color: 'bg-[#ede4f4] text-[#6b3fa0]',
  },
  {
    id: 'procrastination',
    label: 'Help Me Focus',
    description: 'Beat procrastination today',
    icon: Zap,
    color: 'bg-[#fde8e0] text-[#b0512a]',
  },
]

export function AIQuickActions({ onAction }) {
  return (
    <section aria-labelledby="quick-actions-title">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Ask me about
          </p>
          <h2
            id="quick-actions-title"
            className="mt-0.5 text-xl font-semibold text-[var(--color-ink)] sm:text-2xl"
          >
            Quick Actions
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {QUICK_ACTIONS.map(({ id, label, description, icon: Icon, color }) => (
          <button
            key={id}
            type="button"
            onClick={() => onAction(id, label)}
            className="dashboard-card flex min-h-[3.5rem] w-full items-center gap-3 bg-white px-4 py-3.5 text-left transition hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(23,62,50,0.1)] active:scale-[0.98]"
            aria-label={`Quick action: ${label}`}
          >
            <span
              className={`grid size-9 shrink-0 place-items-center rounded-xl ${color}`}
              aria-hidden="true"
            >
              <Icon size={17} strokeWidth={1.9} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-[var(--color-ink)]">
                {label}
              </span>
              <span className="block truncate text-xs text-[var(--color-muted)]">
                {description}
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
