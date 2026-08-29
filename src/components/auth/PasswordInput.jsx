import { Eye, EyeOff, LockKeyhole } from 'lucide-react'
import { useState } from 'react'

export function PasswordInput({ id, label = 'Password', error, ...props }) {
  const [visible, setVisible] = useState(false)
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-[var(--color-ink)]">{label}</label>
      <div className="relative">
        <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" size={18} />
        <input id={id} type={visible ? 'text' : 'password'} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className={`min-h-12 w-full rounded-xl border bg-white py-3 pl-11 pr-12 text-base outline-none transition focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[#277c68]/15 ${error ? 'border-[#c6573c]' : 'border-[#d8e5db]'}`} {...props} />
        <button type="button" onClick={() => setVisible((value) => !value)} aria-label={visible ? 'Hide password' : 'Show password'} className="absolute right-1 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-xl text-[var(--color-muted)] hover:bg-[#f3f7f2] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" disabled={props.disabled}>
          {visible ? <EyeOff size={19} /> : <Eye size={19} />}
        </button>
      </div>
      {error && <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-[#a14d2e]">{error}</p>}
    </div>
  )
}
