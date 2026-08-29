import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function AuthLoadingScreen() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f3f7f2] p-5 text-center">
      <div>
        <p className="text-2xl font-bold text-[var(--color-ink)]">StudySync AI</p>
        <p className="mt-2 text-sm text-[var(--color-muted)]">Loading...</p>
      </div>
    </main>
  )
}

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()
  if (isLoading) return <AuthLoadingScreen />
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />
}

export function PublicOnlyRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()
  if (isLoading) return <AuthLoadingScreen />
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children
}
