import { AlertTriangle, CheckCircle2, Clock3, CircleSlash, RotateCcw } from 'lucide-react'

const statuses = { upcoming: ['Upcoming', 'bg-[#e1edf0] text-[#3d7280]', Clock3], due: ['Due', 'bg-[#e1f0e7] text-[#277c68]', RotateCcw], completed: ['Completed', 'bg-[#e6e9e6] text-[#66716b]', CheckCircle2], overdue: ['Overdue', 'bg-[#f7e3dd] text-[#a14d2e]', AlertTriangle], skipped: ['Skipped', 'bg-[#edf1ed] text-[var(--color-muted)]', CircleSlash] }

export function RevisionStatusBadge({ status }) {
  const [label, style, Icon] = statuses[status] ?? statuses.upcoming
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${style}`}><Icon size={12} aria-hidden="true" />{label}</span>
}