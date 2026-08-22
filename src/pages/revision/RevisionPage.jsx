import { useEffect, useMemo, useState } from 'react'
import { StudySessionCard } from '../../components/study'
import { CompleteRevisionSheet, RevisionCard, RevisionDetailsSheet, RevisionHeader, RevisionSummary, RevisionTabs, RevisionTimeline } from '../../components/revision'
import { revisions as initialRevisions } from '../../data/mock/revisions'
import { formatRevisionDate, getNextRevisionDate } from '../../utils/revisions'

export function RevisionPage() {
  const [revisions, setRevisions] = useState(initialRevisions)
  const [activeTab, setActiveTab] = useState('due')
  const [selectedRevision, setSelectedRevision] = useState(null)
  const [isCompleteOpen, setIsCompleteOpen] = useState(false)
  const [activeSession, setActiveSession] = useState(null)
  const [remainingTime, setRemainingTime] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [lastCompleted, setLastCompleted] = useState(null)

  useEffect(() => {
    if (!isTimerRunning || remainingTime <= 0) return undefined
    const timer = setInterval(() => setRemainingTime((current) => { if (current <= 1) { setIsTimerRunning(false); return 0 } return current - 1 }), 1000)
    return () => clearInterval(timer)
  }, [isTimerRunning, remainingTime])

  const summary = useMemo(() => { const due = revisions.filter((revision) => revision.status === 'due').length; const completed = revisions.filter((revision) => revision.status === 'completed').length; const overdue = revisions.filter((revision) => revision.status === 'overdue').length; const todayTotal = due + completed; return { due, completed, overdue, todayTotal, progress: todayTotal ? Math.round((completed / todayTotal) * 100) : 0 } }, [revisions])
  const visibleRevisions = revisions.filter((revision) => activeTab === 'due' ? revision.status === 'due' || revision.status === 'overdue' : revision.status === activeTab)
  const selectedNextDate = selectedRevision ? formatRevisionDate(getNextRevisionDate(selectedRevision.scheduledDate, selectedRevision.revisionNumber), { weekday: 'short', year: 'numeric' }) : ''

  function startRevision(revision) { setSelectedRevision(null); setActiveSession({ title: `${revision.subject} Revision`, topic: revision.topic, revision }); setRemainingTime(revision.duration * 60); setIsTimerRunning(true) }
  function openComplete(revision) { setSelectedRevision(null); setIsCompleteOpen(true); setSelectedRevision(revision) }
  function saveCompletion(reflection) { const revision = selectedRevision; const nextDate = getNextRevisionDate(revision.scheduledDate, revision.revisionNumber); setRevisions((current) => current.map((item) => item.id === revision.id ? { ...item, status: 'completed', confidence: reflection.confidence, understanding: reflection.understanding, nextRevisionDate: nextDate } : item)); setLastCompleted({ revision, nextDate }); setIsCompleteOpen(false); setSelectedRevision(null); setActiveTab('completed') }
  function completeSession() { if (activeSession) openComplete(activeSession.revision); setActiveSession(null); setRemainingTime(0); setIsTimerRunning(false) }

  return <div className="mx-auto w-full max-w-6xl space-y-7 pb-2"><RevisionHeader />{activeSession ? <StudySessionCard task={activeSession} remainingTime={remainingTime} isRunning={isTimerRunning} onToggle={() => setIsTimerRunning((current) => !current)} onComplete={completeSession} /> : <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)]"><RevisionSummary summary={summary} />{lastCompleted ? <section className="dashboard-card bg-[#eaf3ed] p-5 sm:p-6" aria-labelledby="next-revision-title"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">Nice work</p><h2 id="next-revision-title" className="mt-2 text-xl font-semibold text-[var(--color-ink)]">Revision #{lastCompleted.revision.revisionNumber} completed</h2><p className="mt-4 text-sm text-[var(--color-muted)]">Next revision: <strong className="text-[var(--color-ink)]">#{lastCompleted.revision.revisionNumber + 1} · {formatRevisionDate(lastCompleted.nextDate, { weekday: 'short', month: 'short', day: 'numeric' })}</strong></p></section> : <RevisionTimeline revision={revisions[0]} />}</div>}<RevisionTabs activeTab={activeTab} onChange={setActiveTab} /><section aria-labelledby="revision-list-title"><div className="mb-4 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">Spaced repetition</p><h2 id="revision-list-title" className="mt-1 text-2xl font-semibold text-[var(--color-ink)]">{activeTab === 'due' ? 'Due Now' : activeTab}</h2></div><span className="text-xs font-semibold text-[var(--color-muted)]">{visibleRevisions.length} items</span></div><div className="grid gap-4 lg:grid-cols-2">{visibleRevisions.length ? visibleRevisions.map((revision) => <RevisionCard key={revision.id} revision={revision} onSelect={setSelectedRevision} onStart={startRevision} />) : <p className="dashboard-card bg-white p-8 text-center text-sm text-[var(--color-muted)] lg:col-span-2">Nothing in this view yet.</p>}</div></section><RevisionDetailsSheet revision={selectedRevision && !isCompleteOpen ? selectedRevision : null} onClose={() => setSelectedRevision(null)} onStart={startRevision} onComplete={openComplete} /><CompleteRevisionSheet revision={isCompleteOpen ? selectedRevision : null} nextDate={selectedNextDate} onClose={() => { setIsCompleteOpen(false); setSelectedRevision(null) }} onSave={saveCompletion} /></div>
}