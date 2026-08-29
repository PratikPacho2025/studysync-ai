import { useEffect, useRef } from 'react'
import { AIInput } from './AIInput'
import { AIMessage } from './AIMessage'

/** Three-dot typing indicator shown while the AI is composing a reply */
function TypingIndicator() {
  return (
    <div className="flex items-center gap-2.5" role="status" aria-label="AI Mentor is thinking">
      {/* Bot avatar */}
      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#dceee4] text-[var(--color-accent)]" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" />
        </svg>
      </span>
      {/* Animated dots */}
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm">
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="block size-1.5 rounded-full bg-[var(--color-muted)]"
            style={{
              animation: 'aiTypingDot 1.2s ease-in-out infinite',
              animationDelay: `${delay}ms`,
            }}
            aria-hidden="true"
          />
        ))}
      </div>
      <span className="sr-only">AI Mentor is thinking…</span>
    </div>
  )
}

/**
 * Chat container — holds message list, typing indicator, and the input bar.
 *
 * Props:
 *   messages    — array of message objects
 *   isTyping    — boolean
 *   inputValue  — string
 *   onInputChange — (val) => void
 *   onSend      — () => void
 */
export function AIChat({ messages, isTyping, inputValue, onInputChange, onSend }) {
  const bottomRef = useRef(null)
  const prevMessageCount = useRef(messages.length)

  // Smart auto-scroll logic
  useEffect(() => {
    // 1. If typing started, scroll to the typing indicator
    if (isTyping) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    } 
    // 2. If a new message arrived
    else if (messages.length > prevMessageCount.current) {
      const lastMessage = messages[messages.length - 1]
      
      if (lastMessage.role === 'assistant') {
        // Scroll to the START of the new AI message
        const messageEl = document.getElementById(lastMessage.id)
        if (messageEl) {
          messageEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      } else {
        // Scroll to bottom for user messages
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }

    prevMessageCount.current = messages.length
  }, [messages, isTyping])

  return (
    <section aria-label="AI Mentor chat" className="dashboard-card flex flex-col bg-[#fafcfb]">
      {/* Header bar */}
      <div className="flex items-center gap-2 border-b border-[#e2ece4] px-4 py-3">
        <span className="size-2 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-muted)]">
          AI Chat
        </p>
        <span className="ml-auto rounded-full bg-[#dceee4] px-2 py-0.5 text-[10px] font-semibold text-[var(--color-accent)]">
          {messages.length} message{messages.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Message list */}
      <div
        className="flex flex-col gap-4 overflow-y-auto px-4 py-4"
        role="list"
        aria-label="Chat messages"
        aria-live="polite"
        aria-relevant="additions"
        style={{ maxHeight: '60vh', minHeight: '12rem' }}
      >
        {messages.map((message) => (
          <AIMessage key={message.id} message={message} />
        ))}

        {isTyping && <TypingIndicator />}

        {/* Scroll anchor */}
        <div ref={bottomRef} aria-hidden="true" />
      </div>

      {/* Input */}
      <div className="border-t border-[#e2ece4] px-4 pb-4 pt-3">
        <AIInput
          value={inputValue}
          onChange={onInputChange}
          onSend={onSend}
          disabled={isTyping}
        />
      </div>
    </section>
  )
}
