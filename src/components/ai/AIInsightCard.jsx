import { ChevronRight, Lightbulb } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function AIInsightCard({ insight }) {
  const navigate = useNavigate()
  const { title, description, actionLabel, actionPath } = insight

  return (
    <article
      className="dashboard-card flex gap-3 bg-white p-4 sm:p-5 transition hover:-translate-y-0.5"
      aria-labelledby={`insight-title-${insight.id}`}
    >
      {/* Icon */}
      <span
        className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-xl bg-[#dceee4] text-[var(--color-accent)]"
        aria-hidden="true"
      >
        <Lightbulb size={15} strokeWidth={2} />
      </span>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p
          id={`insight-title-${insight.id}`}
          className="text-sm font-semibold leading-snug text-[var(--color-ink)]"
        >
          {title}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-[var(--color-muted)]">
          {description}
        </p>

        {actionLabel && actionPath && (
          <button
            type="button"
            onClick={() => navigate(actionPath)}
            className="mt-2.5 flex min-h-9 items-center gap-1 rounded-lg bg-[#f0f8f4] px-3 py-1.5 text-xs font-semibold text-[var(--color-accent)] transition hover:bg-[#dceee4] active:scale-95"
            aria-label={`${actionLabel} for ${title}`}
          >
            {actionLabel}
            <ChevronRight size={13} aria-hidden="true" />
          </button>
        )}
      </div>
    </article>
  )
}
