import { ArrowRight, BookOpen, Clock, Lightbulb } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { topRecommendation } from '../../data/mock/aiMentor'

export function AIRecommendationCard({ recommendation = topRecommendation }) {
  const navigate = useNavigate()
  const { subject, topic, duration, reason, startPath } = recommendation

  return (
    <article
      className="dashboard-card bg-white p-5 sm:p-6 transition hover:-translate-y-0.5"
      aria-labelledby="recommendation-title"
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <span
          className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#dceee4] text-[var(--color-accent)]"
          aria-hidden="true"
        >
          <BookOpen size={18} strokeWidth={1.9} />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Recommended for you
          </p>
          <h2
            id="recommendation-title"
            className="mt-0.5 text-base font-semibold text-[var(--color-ink)]"
          >
            {subject} — {topic}
          </h2>

          {/* Meta */}
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[var(--color-muted)]">
            <span className="flex items-center gap-1">
              <Clock size={12} strokeWidth={2} aria-hidden="true" />
              {duration} min
            </span>
            <span className="flex items-center gap-1.5">
              <Lightbulb size={12} strokeWidth={2} aria-hidden="true" />
              <span className="truncate">{reason}</span>
            </span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={() => navigate(startPath)}
        className="mt-4 flex w-full min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(39,124,104,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(39,124,104,0.32)] active:scale-95"
        aria-label={`Start ${subject} ${topic} revision`}
      >
        Start Now
        <ArrowRight size={15} aria-hidden="true" />
      </button>
    </article>
  )
}
