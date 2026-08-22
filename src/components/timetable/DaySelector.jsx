export function DaySelector({ days, selectedDay, onSelect }) {
  return (
    <div className="-mx-5 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0" aria-label="Select a day">
      <div className="flex min-w-max gap-2" role="tablist">
        {days.map((day) => { const shortDay = day.slice(0, 3); return <button key={day} type="button" role="tab" aria-selected={selectedDay === day} onClick={() => onSelect(day)} className={`min-h-14 min-w-[4.25rem] rounded-2xl border px-3 text-center transition active:scale-95 ${selectedDay === day ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white shadow-[0_8px_18px_rgba(39,124,104,0.18)]' : 'border-[#dce7df] bg-white text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'}`}><span className="block text-xs font-bold uppercase tracking-wider">{shortDay}</span><span className="mt-1 block text-[11px] font-semibold">{day === selectedDay ? 'Selected' : 'View day'}</span></button> })}
      </div>
    </div>
  )
}