import { useEffect, useState } from 'react'
import {
  AIRecommendationCard,
  AttendanceOverview,
  DashboardHeader,
  ProcrastinationCard,
  StudyHealthCard,
  SubjectProgress,
  TodaysClasses,
  TodaysStudyTasks,
  TodayOverview,
  UpcomingExamCard,
} from '../../components/dashboard'
import { api } from '../../services/api'

export function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null)
  const [completedTaskIds, setCompletedTaskIds] = useState([])
  const [studyStarted, setStudyStarted] = useState(false)

  function loadDashboard() {
    api.fetchDashboard().then((data) => {
      setDashboardData(data)
      const completed = data.studyTasks
        .filter((t) => t.status.toLowerCase() === 'completed')
        .map((t) => t.id)
      setCompletedTaskIds(completed)
    }).catch(console.error)
  }

  useEffect(() => {
    loadDashboard()
  }, [])

  function toggleTask(taskId) {
    if (!dashboardData) return
    const isCompleted = completedTaskIds.includes(taskId)
    const nextStatus = isCompleted ? 'pending' : 'completed'

    api.updateStudyTask(taskId, { status: nextStatus }).then(() => {
      loadDashboard()
    }).catch(console.error)
  }

  if (!dashboardData) {
    return <div className="p-8 text-center text-sm text-[var(--color-muted)]">Loading dashboard...</div>
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7 pb-2">
      <DashboardHeader user={dashboardData.user} />
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
        <StudyHealthCard data={dashboardData.studyHealth} />
        <TodayOverview items={dashboardData.todaySummary} />
      </div>
      <TodaysClasses classes={dashboardData.classes} />
      <div className="grid gap-5 lg:grid-cols-2">
        <TodaysStudyTasks
          tasks={dashboardData.studyTasks}
          completedTaskIds={completedTaskIds}
          onToggleTask={toggleTask}
        />
        <AttendanceOverview attendance={dashboardData.attendance} />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <SubjectProgress subjects={dashboardData.subjects} />
        <ProcrastinationCard data={dashboardData.procrastination} />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <UpcomingExamCard data={dashboardData.upcomingExam} />
        <AIRecommendationCard
          data={dashboardData.aiRecommendation}
          started={studyStarted}
          onStart={() => setStudyStarted(true)}
        />
      </div>
    </div>
  )
}