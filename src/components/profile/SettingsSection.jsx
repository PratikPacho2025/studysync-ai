// ─────────────────────────────────────────────────────────────
//  SettingsSection
//  Groups related SettingsItems under a labelled card.
// ─────────────────────────────────────────────────────────────

/**
 * @param {string}          title     – section heading
 * @param {React.ReactNode} children  – SettingsItem elements
 */
export function SettingsSection({ title, children }) {
  return (
    <section aria-labelledby={`settings-section-${title.replace(/\s+/g, '-').toLowerCase()}`}>
      <p
        id={`settings-section-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className="mb-2 px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-muted)]"
      >
        {title}
      </p>
      <div className="dashboard-card overflow-hidden bg-white divide-y divide-[#edf1ed]">
        {children}
      </div>
    </section>
  )
}
