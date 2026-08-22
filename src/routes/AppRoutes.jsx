import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '../components/layout'
import { PlaceholderPage } from '../pages/PlaceholderPage'
import { DashboardPage } from '../pages/dashboard/DashboardPage'
import { TimetablePage } from '../pages/timetable/TimetablePage'
import { AttendancePage } from '../pages/attendance/AttendancePage'
import { SubjectsPage } from '../pages/subjects/SubjectsPage'
import { StudyPlannerPage } from '../pages/study/StudyPlannerPage'
import { RevisionPage } from '../pages/revision/RevisionPage'
import { QuizPage } from '../pages/quiz/QuizPage'
import { QuizSessionPage } from '../pages/quiz/QuizSessionPage'
import { QuizResultPage } from '../pages/quiz/QuizResultPage'
import { QuizHistoryPage } from '../pages/quiz/QuizHistoryPage'
import { GoalsPage } from '../pages/goals/GoalsPage'
import { AnalyticsPage } from '../pages/analytics/AnalyticsPage'
import { ProcrastinationPage } from '../pages/procrastination/ProcrastinationPage'
import { AIMentorPage } from '../pages/ai/AIMentorPage'

const pageRoutes = [
  ['dashboard', 'Dashboard'],
  ['timetable', 'Timetable'],
  ['attendance', 'Attendance'],
  ['subjects', 'Subjects'],
  ['study', 'Study'],
  ['revision', 'Revision'],
  ['quiz', 'Quiz'],
  ['goals', 'Goals'],
  ['analytics', 'Analytics'],
  ['ai-mentor', 'AI Mentor'],
  ['profile', 'Profile'],
]

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route element={<AppLayout />}>
        <Route path="/procrastination" element={<ProcrastinationPage />} />
        <Route path="/quiz/session/:quizId" element={<QuizSessionPage />} />
        <Route path="/quiz/result" element={<QuizResultPage />} />
        <Route path="/quiz/history" element={<QuizHistoryPage />} />
        {pageRoutes.map(([path, title]) => (
          <Route
            key={path}
            path={`/${path}`}
            element={
              path === 'dashboard' ? <DashboardPage /> :
              path === 'timetable' ? <TimetablePage /> :
              path === 'attendance' ? <AttendancePage /> :
              path === 'subjects' ? <SubjectsPage /> :
              path === 'study' ? <StudyPlannerPage /> :
              path === 'revision' ? <RevisionPage /> :
              path === 'quiz' ? <QuizPage /> :
              path === 'goals' ? <GoalsPage /> :
              path === 'analytics' ? <AnalyticsPage /> :
              path === 'ai-mentor' ? <AIMentorPage /> :
              <PlaceholderPage title={title} />
            }
          />
        ))}

      </Route>
      <Route path="/login" element={<PlaceholderPage title="Login" />} />
      <Route path="/signup" element={<PlaceholderPage title="Sign up" />} />
      <Route path="/onboarding" element={<PlaceholderPage title="Onboarding" />} />
      <Route path="*" element={<PlaceholderPage title="Page not found" />} />
    </Routes>
  )
}