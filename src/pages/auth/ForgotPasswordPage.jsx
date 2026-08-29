import { AuthLayout, ForgotPasswordForm } from '../../components/auth'

export function ForgotPasswordPage() {
  return <AuthLayout title="Forgot your password?" subtitle="Enter your email and we’ll send instructions."><ForgotPasswordForm /></AuthLayout>
}
