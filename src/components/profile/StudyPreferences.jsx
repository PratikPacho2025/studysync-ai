// ─────────────────────────────────────────────────────────────
//  StudyPreferences
//  Inputs for daily goal, session duration, break, and mode.
// ─────────────────────────────────────────────────────────────
import { BookOpen, Clock, Coffee, Flame } from 'lucide-react'
import { SettingsItem } from './SettingsItem'
import { SettingsSection } from './SettingsSection'

const inputClass =
  'min-h-10 w-20 rounded-xl border border-[#d8e5db] bg-[#f8fbf8] px-2 text-center text-sm font-semibold text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)] transition'

const MODES = [
  { value: 'focused',  label: 'Focused' },
  { value: 'balanced', label: 'Balanced' },
  { value: 'relaxed',  label: 'Relaxed' },
]

/**
 * @param {object}   settings        – current settings state
 * @param {function} updateSetting   – (key, value) => void
 */
export function StudyPreferences({ settings, updateSetting }) {
  return (
    <SettingsSection title="Study Preferences">
      <SettingsItem
        icon={<Flame size={16} />}
        title="Daily Study Goal"
        description="Hours of study you aim for each day"
        control={
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              min="0.5"
              max="12"
              step="0.5"
              aria-label="Daily study goal in hours"
              value={settings.dailyStudyGoal}
              onChange={(e) => updateSetting('dailyStudyGoal', Number(e.target.value))}
              className={inputClass}
            />
            <span className="text-xs font-semibold text-[var(--color-muted)]">hr</span>
          </div>
        }
      />
      <SettingsItem
        icon={<Clock size={16} />}
        title="Study Session"
        description="Length of a single focused study block"
        control={
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              min="10"
              max="180"
              step="5"
              aria-label="Study session duration in minutes"
              value={settings.studyDuration}
              onChange={(e) => updateSetting('studyDuration', Number(e.target.value))}
              className={inputClass}
            />
            <span className="text-xs font-semibold text-[var(--color-muted)]">min</span>
          </div>
        }
      />
      <SettingsItem
        icon={<Coffee size={16} />}
        title="Break Duration"
        description="Rest time between study sessions"
        control={
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              min="5"
              max="60"
              step="5"
              aria-label="Break duration in minutes"
              value={settings.breakDuration}
              onChange={(e) => updateSetting('breakDuration', Number(e.target.value))}
              className={inputClass}
            />
            <span className="text-xs font-semibold text-[var(--color-muted)]">min</span>
          </div>
        }
      />
      <SettingsItem
        icon={<BookOpen size={16} />}
        title="Study Mode"
        description="How intensive your sessions feel"
        control={
          <select
            aria-label="Study mode"
            value={settings.studyMode}
            onChange={(e) => updateSetting('studyMode', e.target.value)}
            className="min-h-10 rounded-xl border border-[#d8e5db] bg-[#f8fbf8] px-2 text-sm font-semibold text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)] transition capitalize"
          >
            {MODES.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        }
      />
    </SettingsSection>
  )
}
