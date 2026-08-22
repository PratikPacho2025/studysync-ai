import { AlertTriangle, CircleDot, Flag } from 'lucide-react'

const styles = { high: ['High priority', 'bg-[#f7e3dd] text-[#a14d2e]', AlertTriangle], medium: ['Medium priority', 'bg-[#f7efd9] text-[#9b7024]', Flag], low: ['Low priority', 'bg-[#e1f0e7] text-[#277c68]', CircleDot] }

export function PriorityBadge({ priority }) {
  const [label, className, Icon] = styles[priority] ?? styles.medium
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${className}`}><Icon size={12} aria-hidden="true" />{label}</span>
}