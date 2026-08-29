// ─────────────────────────────────────────────────────────────
//  ProfileInfoCard
//  Displays personal identity fields: name and email.
// ─────────────────────────────────────────────────────────────
import { Mail, User } from 'lucide-react'

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span
        className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-[#eaf3ed] text-[var(--color-accent)]"
        aria-hidden="true"
      >
        <Icon size={15} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-muted)]">
          {label}
        </p>
        <p className="mt-0.5 break-all text-sm font-semibold text-[var(--color-ink)]">
          {value || '—'}
        </p>
      </div>
    </div>
  )
}

/**
 * @param {object} profile – { name, email }
 */
export function ProfileInfoCard({ profile }) {
  return (
    <section
      className="dashboard-card bg-white p-5 sm:p-6"
      aria-labelledby="profile-info-heading"
    >
      <p
        id="profile-info-heading"
        className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]"
      >
        Personal Details
      </p>
      <div className="space-y-4">
        <InfoRow icon={User} label="Full Name" value={profile.name} />
        <InfoRow icon={Mail} label="Email" value={profile.email} />
      </div>
    </section>
  )
}
