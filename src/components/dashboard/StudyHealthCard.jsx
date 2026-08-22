import { Brain, TrendingUp } from 'lucide-react'

export function StudyHealthCard({ data }) {
  return (
    <section className="dashboard-card 3d-hover overflow-hidden bg-[#1e5c4e] p-5 text-[#f4fbf5] sm:p-6" aria-labelledby="study-health-title">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b9dfc7]">Your overall rhythm</p>
          <h2 id="study-health-title" className="mt-2 text-xl font-semibold">Study Health</h2>
        </div>
        <span className="grid size-10 place-items-center rounded-xl bg-white/10"><Brain size={21} aria-hidden="true" /></span>
      </div>
      <div className="mt-6 flex items-end gap-3">
        <strong className="text-5xl font-semibold tracking-tight">{data.score}%</strong>
        <span className="mb-2 flex items-center gap-1 text-sm font-semibold text-[#b9dfc7]"><TrendingUp size={15} aria-hidden="true" /> {data.status}</span>
      </div>
      <div className="mt-6 space-y-3">
        {data.metrics.map((metric) => (
          <div key={metric.label}>
            <div className="mb-1 flex justify-between text-xs font-semibold text-[#d3ebd9]"><span>{metric.label}</span><span>{metric.value}%</span></div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-[#b9dfc7]" style={{ width: `${metric.value}%` }} /></div>
          </div>
        ))}
      </div>
    </section>
  )
}