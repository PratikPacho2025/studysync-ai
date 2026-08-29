import { AuthLogo } from './AuthLogo'

export function AuthLayout({ title, subtitle, children }) {
  return (
    <main className="min-h-[100dvh] bg-[#f3f7f2] px-4 py-6 sm:grid sm:place-items-center sm:p-8">
      <div className="mx-auto w-full max-w-md lg:grid lg:max-w-6xl lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-center lg:gap-16">
        <section className="hidden min-h-[42rem] rounded-[2rem] bg-[#183f3b] p-10 text-white shadow-[0_20px_48px_rgba(23,62,50,.18)] lg:block">
          <p className="text-2xl font-bold">Your study companion.</p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#c9e4d5]">Plan your time, build steady habits, and keep every academic goal in one calm space.</p>
        </section>
        <div className="pt-2">
          <AuthLogo />
          <section className="mt-7 rounded-[1.75rem] border border-[#e0ebe3] bg-white p-5 shadow-[0_14px_34px_rgba(23,62,50,.10)] sm:p-8">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--color-ink)]">{title}</h1>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{subtitle}</p>
            <div className="mt-7">{children}</div>
          </section>
          <p className="mt-5 text-center text-xs text-[var(--color-muted)]">A calmer way to stay on track.</p>
        </div>
      </div>
    </main>
  )
}
