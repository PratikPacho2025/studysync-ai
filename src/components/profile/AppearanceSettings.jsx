// ─────────────────────────────────────────────────────────────
//  AppearanceSettings
//  Theme selector — system / light / dark.
//  Uses local state only (no global theme engine yet).
// ─────────────────────────────────────────────────────────────
import { Moon, Palette, Sun } from 'lucide-react'
import { SettingsItem } from './SettingsItem'
import { SettingsSection } from './SettingsSection'

const THEMES = [
  { value: 'system', label: 'System default', icon: Palette },
  { value: 'light',  label: 'Light',          icon: Sun },
  { value: 'dark',   label: 'Dark',           icon: Moon },
]

/**
 * @param {object}   settings
 * @param {function} updateSetting – (key, value) => void
 */
export function AppearanceSettings({ settings, updateSetting }) {
  const currentTheme = THEMES.find((t) => t.value === settings.theme) ?? THEMES[0]
  const CurrentIcon = currentTheme.icon

  return (
    <SettingsSection title="Appearance">
      <SettingsItem
        icon={<Palette size={16} />}
        title="Theme"
        description="Controls the visual appearance of the app"
        control={
          <div className="flex items-center gap-2">
            <select
              aria-label="Select theme"
              value={settings.theme}
              onChange={(e) => updateSetting('theme', e.target.value)}
              className="min-h-10 rounded-xl border border-[#d8e5db] bg-[#f8fbf8] px-2 text-sm font-semibold text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)] capitalize transition"
            >
              {THEMES.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        }
      />

      {/* Inline theme preview tiles */}
      <div className="grid grid-cols-3 gap-3 px-4 pb-4 pt-2">
        {THEMES.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => updateSetting('theme', value)}
            aria-pressed={settings.theme === value}
            aria-label={`Set theme to ${label}`}
            className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-3 text-center text-xs font-semibold transition active:scale-95 ${
              settings.theme === value
                ? 'border-[var(--color-accent)] bg-[#eaf3ed] text-[var(--color-accent)]'
                : 'border-[#e2ece4] bg-white text-[var(--color-muted)] hover:border-[var(--color-accent)]/50'
            }`}
          >
            <Icon size={20} aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Honest note */}
      <div className="px-4 pb-3">
        <p className="text-[11px] text-[var(--color-muted)]">
          Full dark mode will be applied once a global theme provider is configured.
          Your preference is saved.
        </p>
      </div>
    </SettingsSection>
  )
}
