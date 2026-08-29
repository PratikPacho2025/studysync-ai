// ─────────────────────────────────────────────────────────────
//  NotificationPreferences
//  Independent toggles for each study-related reminder type.
//  This is UI-only — no real push notifications yet.
// ─────────────────────────────────────────────────────────────
import { Bell, BookOpen, Calendar, ClipboardCheck, FileQuestion, Goal, RefreshCw, Zap } from 'lucide-react'
import { SettingsItem } from './SettingsItem'
import { SettingsSection } from './SettingsSection'
import { SettingsToggle } from './SettingsToggle'

const NOTIFICATION_ITEMS = [
  { key: 'studyReminders',        icon: BookOpen,       title: 'Study Reminders',       description: 'Alerts for upcoming study sessions' },
  { key: 'revisionReminders',     icon: RefreshCw,      title: 'Revision Reminders',    description: 'Spaced repetition schedule reminders' },
  { key: 'quizReminders',         icon: FileQuestion,   title: 'Quiz Reminders',        description: 'Reminders to practice topic quizzes' },
  { key: 'goalReminders',         icon: Goal,           title: 'Goal Reminders',        description: 'Daily habit and goal nudges' },
  { key: 'examReminders',         icon: Calendar,       title: 'Exam Reminders',        description: 'Countdown alerts for upcoming exams' },
  { key: 'attendanceAlerts',      icon: ClipboardCheck, title: 'Attendance Alerts',     description: 'Warn when attendance falls low' },
  { key: 'procrastinationAlerts', icon: Zap,            title: 'Focus Alerts',          description: 'Nudge when procrastination risk is high' },
]

/**
 * @param {object}   settings
 * @param {function} updateSetting – (key, value) => void
 */
export function NotificationPreferences({ settings, updateSetting }) {
  return (
    <SettingsSection title="Notifications">
      {/* UI-only note */}
      <div className="flex items-start gap-3 px-4 py-3">
        <Bell size={16} className="mt-0.5 shrink-0 text-[var(--color-muted)]" aria-hidden="true" />
        <p className="text-xs leading-relaxed text-[var(--color-muted)]">
          Notification delivery will be enabled when backend push notifications are implemented.
          Your preferences are saved for when that happens.
        </p>
      </div>
      {NOTIFICATION_ITEMS.map(({ key, icon: Icon, title, description }) => (
        <SettingsItem
          key={key}
          icon={<Icon size={16} />}
          title={title}
          description={description}
          control={
            <SettingsToggle
              id={`notif-${key}`}
              label={title}
              checked={settings[key]}
              onChange={(val) => updateSetting(key, val)}
            />
          }
        />
      ))}
    </SettingsSection>
  )
}
