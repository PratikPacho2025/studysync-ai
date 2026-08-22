export function WeekSelector({ viewMode, onChange }) {
  return (
    <div className="flex rounded-2xl bg-[#e6efe8] p-1" role="group" aria-label="Timetable view">
      {['today', 'week'].map((mode) => <button key={mode} type="button" onClick={() => onChange(mode)} className={`min-h-11 flex-1 rounded-xl px-4 text-sm font-bold capitalize transition ${viewMode === mode ? 'bg-white text-[var(--color-accent)] shadow-sm' : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'}`} aria-pressed={viewMode === mode}>{mode === 'today' ? 'Today' : 'Week'}</button>)}
    </div>
  )
}