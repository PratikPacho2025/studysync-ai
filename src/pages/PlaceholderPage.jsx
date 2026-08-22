export function PlaceholderPage({ title }) {
  return (
    <section className="min-h-full px-0 py-6 sm:py-8">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
          StudySync AI
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-[var(--color-muted)]">
          This page is ready for its feature components.
        </p>
      </div>
    </section>
  )
}