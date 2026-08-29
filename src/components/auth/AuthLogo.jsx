import { GraduationCap } from 'lucide-react'

export function AuthLogo() {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="grid size-11 place-items-center rounded-2xl bg-[var(--color-accent)] text-white shadow-[0_8px_18px_rgba(39,124,104,.24)]"><GraduationCap size={23} /></span>
      <span className="text-xl font-bold tracking-tight text-[var(--color-ink)]">StudySync AI</span>
    </div>
  )
}
