import { ArrowLeft, LoaderCircle, Mail, Send } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  async function submit(event) {
    event.preventDefault()
    if (!email.trim()) return setError('Please enter your email.')
    if (!emailPattern.test(email.trim())) return setError('Please enter a valid email.')
    setError(''); setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 450))
    setSent(true); setIsSubmitting(false)
  }
  if (sent) return <div className="space-y-5"><div role="status" className="rounded-xl bg-[#e8f4ec] p-4 text-sm leading-6 text-[#216b5a]">If this email is registered, password reset instructions will be sent.</div><Link to="/login" className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#d8e5db] text-sm font-bold text-[var(--color-ink)] hover:bg-[#f3f7f2]"><ArrowLeft size={17}/>Back to Login</Link></div>
  return <form noValidate onSubmit={submit} className="space-y-5"><div><label htmlFor="reset-email" className="mb-2 block text-sm font-semibold">Email</label><div className="relative"><Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" size={18}/><input id="reset-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} disabled={isSubmitting} aria-invalid={Boolean(error)} aria-describedby={error ? 'reset-email-error' : undefined} className={`min-h-12 w-full rounded-xl border py-3 pl-11 pr-4 text-base outline-none focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[#277c68]/15 ${error ? 'border-[#c6573c]' : 'border-[#d8e5db]'}`}/></div>{error && <p id="reset-email-error" className="mt-1.5 text-xs font-medium text-[#a14d2e]">{error}</p>}</div><button disabled={isSubmitting} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] text-sm font-bold text-white shadow-[0_7px_16px_rgba(39,124,104,.24)] disabled:opacity-70">{isSubmitting ? <><LoaderCircle className="animate-spin" size={18}/>Sending...</> : <><Send size={17}/>Send Reset Link</>}</button><Link to="/login" className="flex min-h-11 items-center justify-center gap-2 text-sm font-semibold text-[var(--color-accent)] hover:underline"><ArrowLeft size={16}/>Back to Login</Link></form>
}
