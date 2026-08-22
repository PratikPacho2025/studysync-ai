import { Bot } from 'lucide-react'

export function AIMentorHeader({ onClearChat }) {
  return (
    <div className="mb-2">
      {/* Mobile header — compact, below the TopNavbar */}
      <div className="flex items-start justify-between gap-3 lg:hidden">
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-[#dceee4] text-[var(--color-accent)]">
            <Bot size={20} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-lg font-semibold leading-tight text-[var(--color-ink)]">
              AI Mentor
            </h1>
            <p className="text-xs text-[var(--color-muted)]">
              Your personal study assistant
            </p>
          </div>
        </div>
        {onClearChat && (
          <button
            type="button"
            onClick={onClearChat}
            className="mt-0.5 shrink-0 rounded-xl px-3 py-2 text-xs font-semibold text-[var(--color-muted)] transition hover:bg-white hover:text-[var(--color-ink)] active:scale-95"
            aria-label="Clear chat history"
          >
            New Chat
          </button>
        )}
      </div>

      {/* Desktop header — sits below the sticky TopNavbar */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#dceee4] text-[var(--color-accent)]">
              <Bot size={24} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                Powered by StudySync
              </p>
              <h2 className="mt-0.5 text-2xl font-semibold text-[var(--color-ink)]">
                AI Mentor
              </h2>
              <p className="text-sm text-[var(--color-muted)]">
                Your personal study assistant
              </p>
            </div>
          </div>
          {onClearChat && (
            <button
              type="button"
              onClick={onClearChat}
              className="flex items-center gap-2 rounded-xl border border-[#d8e5db] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-muted)] shadow-sm transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] active:scale-95"
              aria-label="Start a new chat"
            >
              New Chat
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
