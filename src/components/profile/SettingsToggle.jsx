// ─────────────────────────────────────────────────────────────
//  SettingsToggle
//  Accessible on/off switch using a hidden checkbox.
// ─────────────────────────────────────────────────────────────

/**
 * @param {string}   id        – unique id for the label/input pair
 * @param {boolean}  checked   – current value
 * @param {function} onChange  – (nextValue: boolean) => void
 * @param {string}   [label]   – sr-only label text (falls back to id)
 */
export function SettingsToggle({ id, checked, onChange, label }) {
  return (
    <label htmlFor={id} className="relative inline-flex cursor-pointer items-center">
      <input
        id={id}
        type="checkbox"
        role="switch"
        aria-checked={checked}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      {/* Track */}
      <span
        aria-hidden="true"
        className={`relative flex h-7 w-12 shrink-0 items-center rounded-full border-2 transition-colors duration-200 ${
          checked
            ? 'border-[var(--color-accent)] bg-[var(--color-accent)]'
            : 'border-[#c9d8cc] bg-[#e4ede6]'
        }`}
      >
        {/* Thumb */}
        <span
          className={`absolute left-0.5 size-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </span>
      {label && <span className="sr-only">{label}</span>}
    </label>
  )
}
