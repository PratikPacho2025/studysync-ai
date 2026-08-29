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
import { ProfilePage } from '../pages/profile/ProfilePage'
import { LoginPage } from '../pages/auth/LoginPage'
import { SignupPage } from '../pages/auth/SignupPage'
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage'
import { ProtectedRoute, PublicOnlyRoute } from './ProtectedRoute'

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
      <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
      <Route path="/signup" element={<PublicOnlyRoute><SignupPage /></PublicOnlyRoute>} />
      <Route path="/forgot-password" element={<PublicOnlyRoute><ForgotPasswordPage /></PublicOnlyRoute>} />
      <Route element={<ProtectedRoute />}>
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
              path === 'profile'   ? <ProfilePage /> :
              <PlaceholderPage title={title} />
            }
          />
        ))}

      </Route>
      </Route>
      <Route path="/onboarding" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
