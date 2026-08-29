import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout, SignupForm } from '../../components/auth'

export function SignupPage() {
  const navigate = useNavigate()
  return <AuthLayout title="Create your account" subtitle="Start building a study routine that works for you."><SignupForm onSuccess={() => navigate('/dashboard', { replace: true })}/><p className="mt-6 text-center text-sm text-[var(--color-muted)]">Already have an account? <Link to="/login" className="font-bold text-[var(--color-accent)] hover:underline">Login</Link></p></AuthLayout>
}
