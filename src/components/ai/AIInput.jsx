import { Send } from 'lucide-react'
import { useRef } from 'react'

/**
 * Controlled chat input component.
 *
 * Props:
 *   value       — current input text
 *   onChange    — (newValue: string) => void
 *   onSend      — () => void  — called on send (button click or Enter)
 *   disabled    — boolean (true while AI is typing)
 */
export function AIInput({ value, onChange, onSend, disabled = false }) {
  const textareaRef = useRef(null)

  function handleKeyDown(event) {
    // Submit on Enter (not Shift+Enter)
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      if (!disabled && value.trim()) onSend()
    }
  }

  function handleInput(event) {
    onChange(event.target.value)
    // Auto-grow textarea up to ~5 lines
    const el = textareaRef.current
    if (el) {
      el.style.height = 'auto'
      el.style.height = `${Math.min(el.scrollHeight, 120)}px`
    }
  }

  const canSend = !disabled && value.trim().length > 0

  return (
    <div className="flex items-end gap-2">
      {/* Label for accessibility */}
      <label htmlFor="ai-chat-input" className="sr-only">
        Ask your AI Mentor
      </label>

      <textarea
        id="ai-chat-input"
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Ask your AI Mentor…"
        aria-label="Message to AI Mentor"
        aria-describedby="ai-input-hint"
        className="min-h-[2.75rem] flex-1 resize-none rounded-2xl border border-[#d8e5db] bg-white px-4 py-[0.65rem] text-sm text-[var(--color-ink)] placeholder-[var(--color-muted)] shadow-sm outline-none transition focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 disabled:opacity-50"
        style={{ lineHeight: '1.5' }}
      />

      <button
        type="button"
        onClick={onSend}
        disabled={!canSend}
        aria-label="Send message"
        className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[var(--color-accent)] text-white shadow-[0_4px_14px_rgba(39,124,104,0.3)] transition hover:shadow-[0_6px_18px_rgba(39,124,104,0.35)] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
      >
        <Send size={17} strokeWidth={2} aria-hidden="true" />
      </button>

      <span id="ai-input-hint" className="sr-only">
        Press Enter to send, Shift+Enter for a new line
      </span>
    </div>
  )
}
