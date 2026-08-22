import { AlertTriangle, CheckCircle2, CircleAlert, Sparkles } from 'lucide-react'

const statusConfig = { excellent: ['Excellent', 'bg-[#e1f0e7] text-[#277c68]', Sparkles], 'on-track': ['On Track', 'bg-[#e1edf0] text-[#3d7280]', CheckCircle2], 'needs-attention': ['Needs Attention', 'bg-[#f7efd9] text-[#9b7024]', AlertTriangle], behind: ['Behind', 'bg-[#f7e3dd] text-[#a14d2e]', CircleAlert] }

export function SubjectStatusBadge({ status }) {
  const [label, style, Icon] = statusConfig[status] ?? statusConfig['on-track']
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${style}`}><Icon size={12} aria-hidden="true" />{label}</span>
}