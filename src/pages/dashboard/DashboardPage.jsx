import { useState } from 'react'
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
import { dashboardData } from '../../data/mock/dashboard'

export function DashboardPage() {
  const [completedTaskIds, setCompletedTaskIds] = useState([])
  const [studyStarted, setStudyStarted] = useState(false)

  function toggleTask(taskId) {
    setCompletedTaskIds((currentIds) => (
      currentIds.includes(taskId)
        ? currentIds.filter((id) => id !== taskId)
        : [...currentIds, taskId]
    ))
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