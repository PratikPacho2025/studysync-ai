// ─────────────────────────────────────────────────────────────
//  AIPreferences
//  Toggles for AI Mentor personalization options.
//  UI-only — no actual API changes.
// ─────────────────────────────────────────────────────────────
import { BarChart3, Brain, Sparkles, Zap } from 'lucide-react'
import { SettingsItem } from './SettingsItem'
import { SettingsSection } from './SettingsSection'
import { SettingsToggle } from './SettingsToggle'

const AI_ITEMS = [
  {
    key: 'aiMentor',
    icon: Sparkles,
    title: 'AI Mentor',
    description: 'Enable the AI Mentor chat and recommendations',
  },
  {
    key: 'personalizedRecommendations',
    icon: Brain,
    title: 'Personalized Recommendations',
    description: 'AI picks your next study topic based on history',
  },
  {
    key: 'progressAnalysis',
    icon: BarChart3,
    title: 'Progress Analysis',
    description: 'AI analyses your study activity weekly',
  },
  {
    key: 'procrastinationInsights',
    icon: Zap,
    title: 'Procrastination Insights',
    description: 'AI identifies risk patterns in your schedule',
  },
]

/**
 * @param {object}   settings
 * @param {function} updateSetting – (key, value) => void
 */
export function AIPreferences({ settings, updateSetting }) {
  return (
    <SettingsSection title="AI Mentor">
      {/* Explanation note */}
      <div className="px-4 py-3">
        <p className="text-xs leading-relaxed text-[var(--color-muted)]">
          These preferences control how StudySync AI uses your study activity to provide
          recommendations. Your data is processed locally and never shared with third parties.
        </p>
      </div>

      {AI_ITEMS.map(({ key, icon: Icon, title, description }) => (
        <SettingsItem
          key={key}
          icon={<Icon size={16} />}
          title={title}
          description={description}
          control={
            <SettingsToggle
              id={`ai-${key}`}
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
