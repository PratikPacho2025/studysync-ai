// ─────────────────────────────────────────────────────────────
//  SettingsHeader
//  Shows the Settings section title, subtitle, and back button.
// ─────────────────────────────────────────────────────────────
import { ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export function SettingsHeader() {
  return (
    <header className="flex items-start gap-3">
      {/* Back button */}
      <Link
        to="/profile"
        aria-label="Back to Profile"
        className="mt-1 grid size-10 shrink-0 place-items-center rounded-xl border border-[#d8e5db] bg-white text-[var(--color-muted)] shadow-sm transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] active:scale-95"
      >
        <ChevronLeft size={19} aria-hidden="true" />
      </Link>

      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
          StudySync AI
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
          Settings
        </h1>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          Customize your StudySync experience
        </p>
      </div>
    </header>
  )
}
