import { ArrowRight, BookOpen, Clock, FileQuestion } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { welcomeData } from '../../data/mock/aiMentor'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

const summaryItems = [
  {
    icon: BookOpen,
    value: welcomeData.pendingRevisions,
    label: 'pending revision',
    labelPlural: 'pending revisions',
  },
  {
    icon: FileQuestion,
    value: welcomeData.weakTopics,
    label: 'weak topic',
    labelPlural: 'weak topics',
  },
  {
    icon: Clock,
    value: welcomeData.availableHours,
    label: 'hr available',
    labelPlural: 'hrs available',
  },
]

export function AIWelcomeCard({ userName = 'Student' }) {
  const navigate = useNavigate()

  return (
    <article
      className="dashboard-card perspective bg-gradient-to-br from-[#eaf3ed] to-[#dceee4] p-5 sm:p-6"
      aria-labelledby="welcome-heading"
    >
      {/* Greeting */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Ready to study?
          </p>
          <h2
            id="welcome-heading"
            className="mt-1 text-xl font-semibold text-[var(--color-ink)] sm:text-2xl"
          >
            {getGreeting()}, {userName} 👋
          </h2>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            I've checked your study progress. Here's what I see today.
          </p>
        </div>
      </div>

      {/* Summary pills */}
      <div className="mt-4 flex flex-wrap gap-2">
        {summaryItems.map(({ icon: Icon, value, label, labelPlural }) => (
          <span
            key={label}
            className="flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1.5 text-xs font-semibold text-[var(--color-ink)] shadow-sm"
          >
            <Icon size={13} strokeWidth={2} className="text-[var(--color-accent)]" aria-hidden="true" />
            {value} {value === 1 ? label : labelPlural}
          </span>
        ))}
      </div>

      {/* Recommendation */}
      <div className="mt-5 border-t border-white/50 pt-4">
        <p className="text-xs font-semibold text-[var(--color-muted)]">Recommended now</p>
        <p className="mt-0.5 text-base font-semibold text-[var(--color-ink)]">
          {welcomeData.primaryRecommendation.label}
        </p>
        <button
          type="button"
          onClick={() => navigate(welcomeData.primaryRecommendation.path)}
          className="mt-3 flex min-h-11 items-center gap-2 rounded-xl bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(39,124,104,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(39,124,104,0.32)] active:scale-95"
          aria-label={welcomeData.primaryRecommendation.label}
        >
          Start Now
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}
