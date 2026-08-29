// ─────────────────────────────────────────────────────────────
//  ProfileEditSheet
//  Mobile-first bottom sheet for editing profile fields.
//  Uses controlled inputs and basic required-field validation.
// ─────────────────────────────────────────────────────────────
import { X } from 'lucide-react'
import { useState } from 'react'

const FIELDS = [
  { name: 'name',     label: 'Full Name',     type: 'text' },
  { name: 'email',    label: 'Email',         type: 'email' },
  { name: 'college',  label: 'College',       type: 'text' },
  { name: 'course',   label: 'Course',        type: 'text' },
  { name: 'branch',   label: 'Branch',        type: 'text' },
]

const YEAR_OPTIONS  = ['First Year', 'Second Year', 'Third Year', 'Fourth Year']
const SEM_OPTIONS   = ['1', '2', '3', '4', '5', '6', '7', '8']

const inputClass =
  'mt-2 min-h-11 w-full rounded-xl border border-[#d8e5db] bg-white px-3 text-sm font-normal outline-none focus:border-[var(--color-accent)] transition'

/**
 * @param {boolean}  isOpen
 * @param {object}   profile   – current profile values
 * @param {function} onClose   – () => void
 * @param {function} onSave    – (updatedProfile: object) => void
 */
export function ProfileEditSheet({ isOpen, profile, onClose, onSave }) {
  const [form, setForm] = useState(profile)

  if (!isOpen) return null

  function update(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSave(form)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#173e32]/35 sm:items-center sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-profile-title"
    >
      <div className="max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-[#f8fbf8] p-5 shadow-2xl sm:max-w-lg sm:rounded-3xl sm:p-7">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Update your details
            </p>
            <h2
              id="edit-profile-title"
              className="mt-1 text-2xl font-semibold text-[var(--color-ink)]"
            >
              Edit Profile
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close edit profile form"
            className="grid size-10 place-items-center rounded-xl text-[var(--color-muted)] hover:bg-white"
          >
            <X size={19} aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Text fields */}
          {FIELDS.map(({ name, label, type }) => (
            <label key={name} className="block text-sm font-semibold text-[var(--color-ink)]">
              {label}
              <input
                required
                name={name}
                type={type}
                value={form[name] ?? ''}
                onChange={update}
                className={inputClass}
              />
            </label>
          ))}

          {/* Year & Semester side by side */}
          <div className="grid grid-cols-2 gap-4">
            <label className="block text-sm font-semibold text-[var(--color-ink)]">
              Year
              <select
                name="year"
                value={form.year ?? ''}
                onChange={update}
                className={inputClass}
              >
                {YEAR_OPTIONS.map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-semibold text-[var(--color-ink)]">
              Semester
              <select
                name="semester"
                value={form.semester ?? ''}
                onChange={update}
                className={inputClass}
              >
                {SEM_OPTIONS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 flex-1 rounded-xl border border-[#d8e5db] text-sm font-bold text-[var(--color-muted)] hover:bg-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="min-h-11 flex-1 rounded-xl bg-[var(--color-accent)] text-sm font-bold text-white shadow-[0_6px_18px_rgba(39,124,104,0.25)] hover:opacity-90 transition active:scale-[0.98]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
