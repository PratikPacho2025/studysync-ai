import { Bot, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

/**
 * Renders a single chat message bubble.
 *
 * Props:
 *   message — { id, role: 'user'|'assistant', content: string, actions?: [...] }
 */
export function AIMessage({ message }) {
  const navigate = useNavigate()
  const isAssistant = message.role === 'assistant'

  return (
    <div
      id={message.id}
      className={`flex gap-2.5 ${isAssistant ? 'justify-start' : 'justify-end'}`}
      role="listitem"
    >
      {/* Avatar — only for assistant */}
      {isAssistant && (
        <span
          className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-[#dceee4] text-[var(--color-accent)]"
          aria-hidden="true"
        >
          <Bot size={14} strokeWidth={2} />
        </span>
      )}

      <div className={`flex min-w-0 max-w-[82%] flex-col gap-2 ${isAssistant ? 'items-start' : 'items-end'}`}>
        {/* Screen-reader role label */}
        <span className="sr-only">{isAssistant ? 'AI Mentor' : 'You'}:</span>

        {/* Bubble */}
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
            isAssistant
              ? 'rounded-tl-sm bg-white text-[var(--color-ink)]'
              : 'rounded-tr-sm bg-[var(--color-accent)] text-white'
          }`}
        >
          {/* Render newlines as <br> and bold **text** */}
          <MessageContent content={message.content} isAssistant={isAssistant} />
        </div>

        {/* Action buttons — only for assistant */}
        {isAssistant && message.actions && message.actions.length > 0 && (
          <div className="flex flex-wrap gap-2 pl-1">
            {message.actions.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={() => {
                  if (action.path) navigate(action.path)
                }}
                className="flex min-h-9 items-center rounded-xl border border-[#d8e5db] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--color-accent)] shadow-sm transition hover:bg-[#dceee4] active:scale-95"
                aria-label={action.label}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Avatar — only for user */}
      {!isAssistant && (
        <span
          className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-[#c8dfd5] text-[var(--color-ink)]"
          aria-hidden="true"
        >
          <User size={14} strokeWidth={2} />
        </span>
      )}
    </div>
  )
}

/**
 * Parses message content:
 * - Converts \n to line breaks
 * - Converts **bold** markdown to <strong>
 */
function MessageContent({ content, isAssistant }) {
  const lines = content.split('\n')
  return (
    <>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex}>
          {lineIndex > 0 && <br />}
          <InlineBold text={line} isAssistant={isAssistant} />
        </span>
      ))}
    </>
  )
}

function InlineBold({ text, isAssistant }) {
  // Split on **...** pairs
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong
              key={index}
              className={isAssistant ? 'font-semibold text-[var(--color-ink)]' : 'font-semibold text-white'}
            >
              {part.slice(2, -2)}
            </strong>
          )
        }
        return <span key={index}>{part}</span>
      })}
    </>
  )
}
