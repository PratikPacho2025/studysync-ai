import { useEffect, useMemo, useState } from 'react'
import { AddStudyTaskSheet, FocusNowCard, StudyPlannerHeader, StudySessionCard, StudyTaskDetailsSheet, StudyTaskList, TodayStudySummary } from '../../components/study'
import { getFocusTask, getStudyProgress, getStudyTime } from '../../utils/studyPlan'
import { api } from '../../services/api'

export function StudyPlannerPage() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [selectedTask, setSelectedTask] = useState(null)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [activeSession, setActiveSession] = useState(null)
  const [remainingTime, setRemainingTime] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  function loadTasks() {
    api.fetchStudyTasks().then(setTasks).catch(console.error)
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const progress = getStudyProgress(tasks)
  const studyTime = getStudyTime(tasks)
  const focusTask = useMemo(() => getFocusTask(tasks), [tasks])
  const visibleTasks = tasks.filter((task) => filter === 'all' || (filter === 'pending' ? task.status !== 'completed' : task.status === 'completed'))

  useEffect(() => {
    if (!isTimerRunning || remainingTime <= 0) return undefined
    const timer = setInterval(() => setRemainingTime((current) => {
      if (current <= 1) {
        setIsTimerRunning(false)
        return 0
      }
      return current - 1
    }), 1000)
    return () => clearInterval(timer)
  }, [isTimerRunning, remainingTime])

  function completeTask(taskId) { 
    api.updateStudyTask(taskId, { status: 'completed' }).then(loadTasks).catch(console.error)
    setSelectedTask(null) 
  }
  function startStudy(task) { setSelectedTask(null); setActiveSession(task); setRemainingTime(Math.max(1, Number(task.duration) * 60)); setIsTimerRunning(true) }
  function completeSession() { if (activeSession) completeTask(activeSession.id); setActiveSession(null); setRemainingTime(0); setIsTimerRunning(false) }
  function addTask(task) { 
    api.createStudyTask(task).then(loadTasks).catch(console.error)
    setIsAddOpen(false) 
  }
  function toggleTask(taskId) {
    const task = tasks.find(t => t.id === taskId)
    if (!task) return
    const nextStatus = task.status === 'completed' ? 'pending' : 'completed'
    api.updateStudyTask(taskId, { status: nextStatus }).then(loadTasks).catch(console.error)
  }

  return <div className="mx-auto w-full max-w-6xl space-y-7 pb-2"><StudyPlannerHeader onAdd={() => setIsAddOpen(true)} />{activeSession ? <StudySessionCard task={activeSession} remainingTime={remainingTime} isRunning={isTimerRunning} onToggle={() => setIsTimerRunning((current) => !current)} onComplete={completeSession} /> : <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)]"><FocusNowCard task={focusTask} onStart={startStudy} onSelect={setSelectedTask} /><TodayStudySummary progress={progress} studyTime={studyTime} /></div>}<div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)]"><StudyTaskList tasks={visibleTasks} filter={filter} onFilterChange={setFilter} onToggle={toggleTask} onSelect={setSelectedTask} onStart={startStudy} /><section className="dashboard-card h-fit bg-[#eef5f0] p-5 sm:p-6" aria-labelledby="upcoming-study-title"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">Keep momentum</p><h2 id="upcoming-study-title" className="mt-1 text-xl font-semibold text-[var(--color-ink)]">Upcoming Study</h2><div className="mt-5 space-y-4">{tasks.filter((task) => task.dueDate !== 'today').map((task) => <button type="button" key={task.id} onClick={() => setSelectedTask(task)} className="block w-full text-left"><p className="text-xs font-bold capitalize text-[var(--color-accent)]">{task.dueDate.replace('-', ' ')}</p><p className="mt-1 text-sm font-semibold text-[var(--color-ink)]">{task.title}</p><p className="mt-1 text-xs text-[var(--color-muted)]">{task.duration} min · {task.dueTime}</p></button>)}</div></section></div><StudyTaskDetailsSheet task={selectedTask} onClose={() => setSelectedTask(null)} onStart={startStudy} onComplete={completeTask} /><AddStudyTaskSheet isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onAdd={addTask} /></div>
}