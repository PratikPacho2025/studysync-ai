import { CheckCircle2, XCircle } from 'lucide-react'

export function AttendanceHistoryItem({ record }) {
  const present = record.status === 'present'
  return <li className="flex items-center gap-3 py-3 first:pt-1"><span className={`grid size-9 shrink-0 place-items-center rounded-full ${present ? 'bg-[#e1f0e7] text-[var(--color-accent)]' : 'bg-[#f7e3dd] text-[#a14d2e]'}`}>{present ? <CheckCircle2 size={18} aria-hidden="true" /> : <XCircle size={18} aria-hidden="true" />}</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-[var(--color-ink)]">{record.subject}</p><p className="mt-1 text-xs text-[var(--color-muted)]">{record.date} · {record.time}</p></div><span className={`text-xs font-bold ${present ? 'text-[var(--color-accent)]' : 'text-[#a14d2e]'}`}>{present ? 'Present' : 'Absent'}</span></li>
}