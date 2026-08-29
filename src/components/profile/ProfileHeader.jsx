// ─────────────────────────────────────────────────────────────
//  ProfileHeader
//  Shows the Profile section title, subtitle, edit and settings
//  action buttons.
// ─────────────────────────────────────────────────────────────
import { Pencil, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'

/**
 * @param {function} onEdit – opens the ProfileEditSheet
 */
export function ProfileHeader({ onEdit }) {
  return (
    <header className="flex items-start justify-between gap-3">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
          StudySync AI
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
          Profile
        </h1>
        <p className="mt-1 text-sm text-[var(--color-muted)]">Your StudySync identity</p>
      </div>

      {/* Action buttons */}
      <div className="flex shrink-0 items-center gap-2 pt-1">
        <button
          type="button"
          onClick={onEdit}
          aria-label="Edit profile"
          className="grid size-10 place-items-center rounded-xl border border-[#d8e5db] bg-white text-[var(--color-muted)] shadow-sm transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] active:scale-95"
        >
          <Pencil size={17} aria-hidden="true" />
        </button>

        <Link
          to="/profile?section=settings"
          aria-label="Open Settings"
          className="grid size-10 place-items-center rounded-xl border border-[#d8e5db] bg-white text-[var(--color-muted)] shadow-sm transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] active:scale-95"
        >
          <Settings size={17} aria-hidden="true" />
        </Link>
      </div>
    </header>
  )
}
