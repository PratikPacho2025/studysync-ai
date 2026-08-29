// ─────────────────────────────────────────────────────────────
//  ProfileAvatar
//  Circular avatar showing the user's initials.
//  The camera button triggers a mock interaction (no upload yet).
// ─────────────────────────────────────────────────────────────
import { Camera } from 'lucide-react'

function getInitials(name = '') {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

/**
 * @param {string}   name      – full name for initials
 * @param {string}   [imgSrc]  – optional image URL (future use)
 */
export function ProfileAvatar({ name, imgSrc }) {
  const initials = getInitials(name) || '?'

  return (
    <div className="relative mx-auto w-fit">
      {/* Avatar circle */}
      <div
        className="grid size-24 place-items-center rounded-full bg-[var(--color-accent)] text-3xl font-bold text-white shadow-[0_12px_30px_rgba(39,124,104,0.25)] sm:size-28"
        aria-label={`Avatar for ${name}`}
      >
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={name}
            className="size-full rounded-full object-cover"
          />
        ) : (
          <span aria-hidden="true">{initials}</span>
        )}
      </div>

      {/* Camera edit button */}
      <button
        type="button"
        aria-label="Change profile picture"
        onClick={() =>
          alert('Photo upload will be available once authentication is connected.')
        }
        className="absolute bottom-0 right-0 grid size-8 place-items-center rounded-full border-2 border-white bg-[var(--color-accent)] text-white shadow-md transition hover:scale-105 active:scale-95"
      >
        <Camera size={14} aria-hidden="true" />
      </button>
    </div>
  )
}
