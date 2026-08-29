// ─────────────────────────────────────────────────────────────
//  ProfilePage
//
//  Route: /profile           → shows Profile view
//  Route: /profile?section=settings → shows Settings view
//
//  State is kept in this parent so edits persist without
//  reloading the page.  Settings use localStorage so they
//  survive page refreshes.
// ─────────────────────────────────────────────────────────────
import { Lock, LogOut, Pencil, Shield, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  AcademicInfoCard,
  AIPreferences,
  AppearanceSettings,
  NotificationPreferences,
  ProfileAvatar,
  ProfileEditSheet,
  ProfileHeader,
  ProfileInfoCard,
  ProfileStats,
  SettingsHeader,
  SettingsItem,
  SettingsSection,
  StudyPreferences,
} from '../../components/profile'
import { defaultSettings, mockProfile, mockProfileStats } from '../../data/mock/profile'

// ── Helpers ──────────────────────────────────────────────────

function loadSettings() {
  try {
    const stored = localStorage.getItem('studysync_settings')
    return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings
  } catch {
    return defaultSettings
  }
}

function saveSettings(s) {
  try {
    localStorage.setItem('studysync_settings', JSON.stringify(s))
  } catch { /* ignore storage errors */ }
}

// ── AccountSection (inline, no extra file needed) ────────────

function AccountSection({ onEditProfile, onLogout }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  function handleUnavailable(feature) {
    alert(`${feature} will be available once backend authentication is connected.`)
  }

  return (
    <>
      <SettingsSection title="Account">
        <SettingsItem
          icon={<Pencil size={16} />}
          title="Edit Profile"
          description="Update your name, email, and academic details"
          chevron
          onClick={onEditProfile}
        />
        <SettingsItem
          icon={<Lock size={16} />}
          title="Change Password"
          description="Authentication not yet connected"
          chevron
          onClick={() => handleUnavailable('Change Password')}
        />
        <SettingsItem
          icon={<Shield size={16} />}
          title="Privacy"
          description="Manage your data and privacy preferences"
          chevron
          onClick={() => handleUnavailable('Privacy settings')}
        />
        <SettingsItem
          icon={<LogOut size={16} />}
          title="Log Out"
          description="Sign out of your StudySync account"
          chevron
          onClick={onLogout}
        />
      </SettingsSection>

      {/* Danger Zone */}
      <section aria-labelledby="danger-zone-heading" className="mt-2">
        <p
          id="danger-zone-heading"
          className="mb-2 px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#a14d2e]"
        >
          Danger Zone
        </p>
        <div className="dashboard-card overflow-hidden bg-white">
          {showDeleteConfirm ? (
            <div className="p-5 space-y-3">
              <p className="text-sm font-semibold text-[var(--color-ink)]">
                Delete Account
              </p>
              <p className="text-xs leading-relaxed text-[var(--color-muted)]">
                Account deletion will be available once backend authentication is implemented.
                No data has been deleted. Your account is safe.
              </p>
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="min-h-10 w-full rounded-xl border border-[#d8e5db] text-sm font-bold text-[var(--color-muted)] transition hover:bg-[#f3f7f2] active:scale-[0.98]"
              >
                Got it, keep my account
              </button>
            </div>
          ) : (
            <SettingsItem
              icon={<Trash2 size={16} className="text-[#a14d2e]" />}
              title={<span className="text-[#a14d2e]">Delete Account</span>}
              description="Permanently remove your data"
              chevron
              onClick={() => setShowDeleteConfirm(true)}
            />
          )}
        </div>
      </section>
    </>
  )
}

// ── Main Page ─────────────────────────────────────────────────

export function ProfilePage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const isSettings = searchParams.get('section') === 'settings'

  const [profile, setProfile]           = useState(mockProfile)
  const [settings, setSettings]         = useState(loadSettings)
  const [isEditOpen, setIsEditOpen]     = useState(false)

  function updateSetting(key, value) {
    setSettings((prev) => {
      const next = { ...prev, [key]: value }
      saveSettings(next)
      return next
    })
  }

  function handleSaveProfile(updated) {
    setProfile(updated)
    setIsEditOpen(false)
  }

  async function handleLogout() {
    await logout()
    navigate('/login', { replace: true })
  }

  // ── Settings View ─────────────────────────────────────────
  if (isSettings) {
    return (
      <div className="mx-auto w-full max-w-2xl space-y-6 pb-2">
        <SettingsHeader />

        <StudyPreferences settings={settings} updateSetting={updateSetting} />
        <NotificationPreferences settings={settings} updateSetting={updateSetting} />
        <AIPreferences settings={settings} updateSetting={updateSetting} />
        <AppearanceSettings settings={settings} updateSetting={updateSetting} />
        <AccountSection onEditProfile={() => {
          // Navigate to profile and open edit sheet
          window.history.pushState({}, '', '/profile')
          setIsEditOpen(true)
        }} onLogout={handleLogout} />

        {/* Bottom return link */}
        <p className="pb-1 text-center text-xs text-[var(--color-muted)]">
          <Link to="/profile" className="font-semibold text-[var(--color-accent)]">
            ← Back to Profile
          </Link>
        </p>
      </div>
    )
  }

  // ── Profile View ──────────────────────────────────────────
  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 pb-2">
      <ProfileHeader onEdit={() => setIsEditOpen(true)} />

      {/* Hero hero card */}
      <div className="dashboard-card 3d-hover overflow-hidden bg-[#183f3b] p-6 text-white sm:p-8">
        <ProfileAvatar name={profile.name} />
        <div className="mt-5 text-center">
          <h2 className="text-2xl font-bold tracking-tight">{profile.name}</h2>
          <p className="mt-1 text-sm text-[#b9dfc7]">{profile.branch}</p>
          <p className="mt-1 text-xs font-semibold text-[#d5e9dc]">
            {profile.year} &middot; Semester {profile.semester}
          </p>
        </div>

        {/* Quick stats row */}
        <div className="mt-6 grid grid-cols-3 gap-2 border-t border-white/10 pt-5">
          {[
            { label: 'Health', value: `${mockProfileStats.studyHealth}` },
            { label: 'Attend.', value: `${mockProfileStats.attendance}%` },
            { label: 'Goals', value: `${mockProfileStats.goals}%` },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-xl font-bold text-white">{value}</p>
              <p className="text-[10px] font-semibold text-[#b9dfc7]">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: two-column layout for info cards */}
      <div className="grid gap-5 lg:grid-cols-2">
        <ProfileInfoCard profile={profile} />
        <AcademicInfoCard profile={profile} />
      </div>

      {/* Stats tiles */}
      <ProfileStats stats={mockProfileStats} />

      {/* Actions */}
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setIsEditOpen(true)}
          className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[var(--color-accent)] text-sm font-bold text-white shadow-[0_6px_18px_rgba(39,124,104,0.25)] transition hover:opacity-90 active:scale-[0.98]"
        >
          Edit Profile
        </button>
        <Link
          to="/profile?section=settings"
          className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-[#d8e5db] bg-white text-sm font-bold text-[var(--color-ink)] shadow-sm transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] active:scale-[0.98]"
        >
          Settings
        </Link>
      </div>

      {/* Edit Sheet */}
      <ProfileEditSheet
        isOpen={isEditOpen}
        profile={profile}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSaveProfile}
      />
    </div>
  )
}
