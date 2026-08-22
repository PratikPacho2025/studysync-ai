import { Check, Circle, Clock3 } from 'lucide-react'

const priorityStyles = { High: 'bg-[#f9e7de] text-[#a14d2e]', Medium: 'bg-[#f7efd9] text-[#9b7024]', Low: 'bg-[#e1f0e7] text-[#277c68]' }

export function TodaysStudyTasks({ tasks, completedTaskIds, onToggleTask }) {
  return (
    <section className="dashboard-card bg-white p-5 sm:p-6" aria-labelledby="study-tasks-title">
      <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">Make progress</p><h2 id="study-tasks-title" className="mt-1 text-xl font-semibold text-[var(--color-ink)]">Today&apos;s Study</h2></div><span className="rounded-full bg-[#edf5ef] px-2.5 py-1 text-xs font-bold text-[var(--color-accent)]">{tasks.length} tasks</span></div>
      <div className="mt-5 space-y-2">
        {tasks.map((task) => { const complete = completedTaskIds.includes(task.id); return <button key={task.id} type="button" onClick={() => onToggleTask(task.id)} className="group flex w-full items-center gap-3 rounded-2xl border border-transparent p-2 text-left transition hover:border-[#dce7df] hover:bg-[#f7faf7] active:scale-[0.99]" aria-pressed={complete}><span className={`grid size-7 shrink-0 place-items-center rounded-full border ${complete ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white' : 'border-[#c9d8cd] text-transparent group-hover:border-[var(--color-accent)]'}`}>{complete ? <Check size={15} strokeWidth={3} aria-hidden="true" /> : <Circle size={8} fill="currentColor" aria-hidden="true" />}</span><span className="min-w-0 flex-1"><span className={`block truncate text-sm font-semibold ${complete ? 'text-[var(--color-muted)] line-through' : 'text-[var(--color-ink)]'}`}>{task.title}</span><span className="mt-1 flex items-center gap-2 text-xs text-[var(--color-muted)]"><span>{task.subject}</span><span className="flex items-center gap-1"><Clock3 size={11} aria-hidden="true" /> {task.dueTime}</span></span></span><span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold ${priorityStyles[task.priority]}`}>{task.priority}</span></button> })}
      </div>
    </section>
  )
}