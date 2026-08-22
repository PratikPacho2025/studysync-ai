export function StudyProgress({ percentage }) {
  return <div><div className="mb-2 flex justify-between text-xs font-bold text-[var(--color-muted)]"><span>Progress</span><span>{percentage}%</span></div><div className="h-2 overflow-hidden rounded-full bg-[#e7efe9]"><div className="h-full rounded-full bg-[var(--color-accent)] transition-all" style={{ width: `${percentage}%` }} /></div></div>
}