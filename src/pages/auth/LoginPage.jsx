import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthLayout, LoginForm } from '../../components/auth'

export function LoginPage() {
  const navigate = useNavigate(); const location = useLocation()
  const destination = location.state?.from?.pathname || '/dashboard'
  return <AuthLayout title="Welcome back 👋" subtitle="Pick up where you left off with your study plan."><LoginForm onSuccess={() => navigate(destination, { replace: true })}/><p className="mt-6 text-center text-sm text-[var(--color-muted)]">Don&apos;t have an account? <Link to="/signup" className="font-bold text-[var(--color-accent)] hover:underline">Create Account</Link></p></AuthLayout>
}
