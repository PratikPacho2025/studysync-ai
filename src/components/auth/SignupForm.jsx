import { LoaderCircle, Mail, User, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { PasswordInput } from './PasswordInput'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const fields = [
  ['college', 'College'], ['course', 'Course'], ['branch', 'Branch'], ['year', 'Year'], ['semester', 'Semester'],
]

export function SignupForm({ onSuccess }) {
  const { signup } = useAuth()
  const [values, setValues] = useState({ name: '', email: '', password: '', confirmPassword: '', college: '', course: '', branch: '', year: '', semester: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const set = (key) => (event) => setValues((current) => ({ ...current, [key]: event.target.value }))

  function input(key, label, icon) {
    const Icon = icon
    return <div key={key}><label htmlFor={`signup-${key}`} className="mb-2 block text-sm font-semibold">{label}</label><div className="relative">{Icon && <Icon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" size={18}/>}<input id={`signup-${key}`} value={values[key]} onChange={set(key)} disabled={isSubmitting} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `signup-${key}-error` : undefined} className={`min-h-12 w-full rounded-xl border py-3 ${Icon ? 'pl-11' : 'px-4'} pr-4 text-base outline-none focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[#277c68]/15 ${errors[key] ? 'border-[#c6573c]' : 'border-[#d8e5db]'}`}/></div>{errors[key] && <p id={`signup-${key}-error`} className="mt-1.5 text-xs font-medium text-[#a14d2e]">{errors[key]}</p>}</div>
  }

  async function submit(event) {
    event.preventDefault()
    const next = {}
    if (!values.name.trim()) next.name = 'Please enter your full name.'
    if (!values.email.trim()) next.email = 'Please enter your email.'
    else if (!emailPattern.test(values.email.trim())) next.email = 'Please enter a valid email.'
    if (!values.password) next.password = 'Please enter a password.'
    else if (values.password.length < 8) next.password = 'Password must be at least 8 characters.'
    if (!values.confirmPassword) next.confirmPassword = 'Please confirm your password.'
    else if (values.password !== values.confirmPassword) next.confirmPassword = 'Passwords do not match.'
    setErrors(next)
    if (Object.keys(next).length) return
    setIsSubmitting(true); setFormError('')
    try { await signup(values); onSuccess() } catch { setFormError('Unable to create account. Please try again.') } finally { setIsSubmitting(false) }
  }

  return <form noValidate onSubmit={submit} className="space-y-5">
    {formError && <p role="alert" className="rounded-xl bg-[#fff1eb] p-3 text-sm text-[#a14d2e]">{formError}</p>}
    <section className="space-y-5"><p className="text-xs font-bold uppercase tracking-[.16em] text-[var(--color-muted)]">Account information</p>{input('name', 'Full name', User)}{input('email', 'Email', Mail)}<PasswordInput id="signup-password" value={values.password} onChange={set('password')} error={errors.password} disabled={isSubmitting}/><PasswordInput id="signup-confirm-password" label="Confirm password" value={values.confirmPassword} onChange={set('confirmPassword')} error={errors.confirmPassword} disabled={isSubmitting}/></section>
    <details className="rounded-xl border border-[#d8e5db] bg-[#f8fbf8] p-4"><summary className="cursor-pointer text-sm font-semibold text-[var(--color-ink)]">Academic information <span className="font-normal text-[var(--color-muted)]">(optional)</span></summary><div className="mt-4 grid gap-4 sm:grid-cols-2">{fields.map(([key, label]) => input(key, label))}</div></details>
    <button disabled={isSubmitting} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-4 text-sm font-bold text-white shadow-[0_7px_16px_rgba(39,124,104,.24)] transition hover:bg-[#216b5a] active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-70">{isSubmitting ? <><LoaderCircle className="animate-spin" size={18}/>Creating account...</> : <><UserPlus size={18}/>Create Account</>}</button>
  </form>
}
