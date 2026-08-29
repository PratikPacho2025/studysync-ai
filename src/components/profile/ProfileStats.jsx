// ─────────────────────────────────────────────────────────────
//  ProfileStats
//  Displays high-level study metrics in a 2×2 grid tile layout.
// ─────────────────────────────────────────────────────────────
import { Activity, BarChart3, BookOpen, Target } from 'lucide-react'

const STATS = [
  {
    key: 'studyHealth',
    label: 'Study Health',
    icon: Activity,
    format: (v) => `${v}/100`,
    color: 'text-[var(--color-accent)]',
    bg: 'bg-[#eaf3ed]',
  },
  {
    key: 'attendance',
    label: 'Attendance',
    icon: BarChart3,
    format: (v) => `${v}%`,
    color: 'text-[#3d7280]',
    bg: 'bg-[#e2eef0]',
  },
  {
    key: 'knowledge',
    label: 'Knowledge',
    icon: BookOpen,
    format: (v) => `${v}%`,
    color: 'text-[#7a5c99]',
    bg: 'bg-[#ede8f5]',
  },
  {
    key: 'goals',
    label: 'Goals',
    icon: Target,
    format: (v) => `${v}%`,
    color: 'text-[#a14d2e]',
    bg: 'bg-[#f7e3dd]',
  },
]

/**
 * @param {object} stats  – { studyHealth, attendance, knowledge, goals }
 */
export function ProfileStats({ stats }) {
  return (
    <section aria-labelledby="profile-stats-heading">
      <p
        id="profile-stats-heading"
        className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]"
      >
        Study Overview
      </p>
      <div className="grid grid-cols-2 gap-3">
        {STATS.map(({ key, label, icon: Icon, format, color, bg }) => (
          <div
            key={key}
            className="dashboard-card 3d-hover flex flex-col gap-3 bg-white p-4"
          >
            <span className={`grid size-9 place-items-center rounded-xl ${bg} ${color}`}>
              <Icon size={18} aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-semibold text-[var(--color-muted)]">{label}</p>
              <p className={`mt-0.5 text-xl font-bold ${color}`}>
                {format(stats[key] ?? 0)}
              </p>
            </div>
            {/* Mini progress bar */}
            <div className="h-1.5 overflow-hidden rounded-full bg-[#e8f0e9]">
              <div
                className={`h-full rounded-full ${color.replace('text-', 'bg-')}`}
                style={{ width: `${Math.min(stats[key] ?? 0, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
