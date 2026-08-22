import { AlertTriangle, CheckCircle2, CircleAlert, Sparkles } from 'lucide-react'

const statusConfig = {
  excellent: { label: 'Excellent', className: 'bg-[#e1f0e7] text-[#277c68]', icon: Sparkles },
  good: { label: 'Good', className: 'bg-[#e1edf0] text-[#3d7280]', icon: CheckCircle2 },
  'needs-attention': { label: 'Needs Attention', className: 'bg-[#f7efd9] text-[#9b7024]', icon: AlertTriangle },
  critical: { label: 'Critical', className: 'bg-[#f7e3dd] text-[#a14d2e]', icon: CircleAlert },
}

export function AttendanceStatusBadge({ status }) {
  const config = statusConfig[status] ?? statusConfig.good
  const Icon = config.icon
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${config.className}`}><Icon size={12} aria-hidden="true" />{config.label}</span>
}