import { AlertTriangle, CheckCircle2, Circle, Clock3 } from 'lucide-react'

const topicStatus = { completed: ['Completed', 'bg-[#e1f0e7] text-[#277c68]', CheckCircle2], 'in-progress': ['In Progress', 'bg-[#e1edf0] text-[#3d7280]', Clock3], 'not-started': ['Not Started', 'bg-[#edf1ed] text-[var(--color-muted)]', Circle], 'needs-revision': ['Needs Revision', 'bg-[#f7efd9] text-[#9b7024]', AlertTriangle], weak: ['Weak', 'bg-[#f7e3dd] text-[#a14d2e]', AlertTriangle] }

export function TopicStatusBadge({ status }) {
  const [label, style, Icon] = topicStatus[status] ?? topicStatus['not-started']
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${style}`}><Icon size={12} aria-hidden="true" />{label}</span>
}