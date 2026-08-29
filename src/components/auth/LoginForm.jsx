import { LoaderCircle, LogIn, Mail } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { PasswordInput } from './PasswordInput'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function LoginForm({ onSuccess }) {
  const { login } = useAuth()
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const set = (key) => (event) => setValues((current) => ({ ...current, [key]: event.target.value }))

  async function submit(event) {
    event.preventDefault()
    const next = {}
    if (!values.email.trim()) next.email = 'Please enter your email.'
    else if (!emailPattern.test(values.email.trim())) next.email = 'Please enter a valid email.'
    if (!values.password) next.password = 'Please enter your password.'
    setErrors(next)
    if (Object.keys(next).length) return
    setIsSubmitting(true); setFormError('')
    try { await login(values.email, values.password); onSuccess() } catch { setFormError('Invalid email or password.') } finally { setIsSubmitting(false) }
  }

  return <form noValidate onSubmit={submit} className="space-y-5">
    {formError && <p role="alert" className="rounded-xl bg-[#fff1eb] p-3 text-sm text-[#a14d2e]">{formError}</p>}
    <div><label htmlFor="login-email" className="mb-2 block text-sm font-semibold">Email</label><div className="relative"><Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" size={18}/><input id="login-email" type="email" value={values.email} onChange={set('email')} disabled={isSubmitting} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'login-email-error' : undefined} className={`min-h-12 w-full rounded-xl border py-3 pl-11 pr-4 text-base outline-none focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[#277c68]/15 ${errors.email ? 'border-[#c6573c]' : 'border-[#d8e5db]'}`}/></div>{errors.email && <p id="login-email-error" className="mt-1.5 text-xs font-medium text-[#a14d2e]">{errors.email}</p>}</div>
    <PasswordInput id="login-password" value={values.password} onChange={set('password')} error={errors.password} disabled={isSubmitting} />
    <div className="text-right"><Link to="/forgot-password" className="text-sm font-semibold text-[var(--color-accent)] hover:underline">Forgot password?</Link></div>
    <button disabled={isSubmitting} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-4 text-sm font-bold text-white shadow-[0_7px_16px_rgba(39,124,104,.24)] transition hover:bg-[#216b5a] active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-70">{isSubmitting ? <><LoaderCircle className="animate-spin" size={18}/>Signing in...</> : <><LogIn size={18}/>Login</>}</button>
  </form>
}
