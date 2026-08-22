import { useCallback, useEffect, useRef, useState } from 'react'
import {
  AIMentorHeader,
  AIChat,
  AIInsightCard,
  AIQuickActions,
  AIRecommendationCard,
  AIWelcomeCard,
} from '../../components/ai'
import { aiInsights, aiMentorUser, initialAssistantMessage } from '../../data/mock/aiMentor'
import { sendMessage } from '../../services/aiMentorService'

// ─── Unique ID helper ─────────────────────────────────────────
let _msgCounter = 1
function nextId() {
  return `msg-${Date.now()}-${_msgCounter++}`
}

// ─── Confirmation helper ──────────────────────────────────────
function confirmClear() {
  // Use native confirm so we have no extra dependency.
  // On production, replace with a custom modal if desired.
  return window.confirm('Clear the chat history and start a new conversation?')
}

export function AIMentorPage() {
  const [messages, setMessages] = useState([initialAssistantMessage])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  // We keep a ref to any in-flight timeout so we can cancel it on unmount
  const typingTimeoutRef = useRef(null)

  // Clean up the timeout if the component unmounts mid-response
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
    }
  }, [])

  // ── Core send logic ─────────────────────────────────────────
  const addUserMessage = useCallback((text) => {
    const userMsg = {
      id: nextId(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])
    return userMsg
  }, [])

  const addAssistantMessage = useCallback((content, actions = []) => {
    const aiMsg = {
      id: nextId(),
      role: 'assistant',
      content,
      actions,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, aiMsg])
  }, [])

  /**
   * sendToAI — sends a user message and waits for the AI service to respond.
   *
   * @param {string} text             — the message text displayed in chat
   * @param {string|null} quickActionKey — if coming from a quick action, pass its key
   */
  const sendToAI = useCallback(
    async (text, quickActionKey = null) => {
      if (!text.trim() || isTyping) return

      addUserMessage(text)
      setIsTyping(true)

      try {
        // sendMessage is async — currently returns after a mock delay.
        // In the future it will call POST /api/ai/chat.
        const response = await sendMessage(text, quickActionKey)
        addAssistantMessage(response.content, response.actions)
      } catch (error) {
        addAssistantMessage(
          "Sorry, I couldn't process that right now. Please try again in a moment.",
        )
        console.error('[AI Mentor] sendMessage error:', error)
      } finally {
        setIsTyping(false)
      }
    },
    [isTyping, addUserMessage, addAssistantMessage],
  )

  // ── Handlers ────────────────────────────────────────────────

  function handleSend() {
    const text = inputValue.trim()
    if (!text || isTyping) return
    setInputValue('')
    sendToAI(text)
  }

  function handleQuickAction(actionId, actionLabel) {
    // Use the label as the user-facing message and the id as the mock key
    sendToAI(actionLabel, actionId)
  }

  function handleClearChat() {
    if (messages.length <= 1 || confirmClear()) {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
      setIsTyping(false)
      setInputValue('')
      setMessages([{ ...initialAssistantMessage, id: nextId(), timestamp: new Date() }])
    }
  }

  // ── Render ──────────────────────────────────────────────────
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 pb-2">

      {/* ── Header ────────────────────────────────────────── */}
      <AIMentorHeader onClearChat={handleClearChat} />

      {/* ── Welcome card ──────────────────────────────────── */}
      <AIWelcomeCard userName={aiMentorUser.name} />

      {/* ── Insights ──────────────────────────────────────── */}
      <section aria-labelledby="insights-heading">
        <div className="mb-3">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            What I noticed
          </p>
          <h2
            id="insights-heading"
            className="mt-0.5 text-xl font-semibold text-[var(--color-ink)] sm:text-2xl"
          >
            Key Insights
          </h2>
        </div>
        <div className="space-y-2.5">
          {aiInsights.map((insight) => (
            <AIInsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </section>

      {/* ── Desktop two-column: Quick Actions + Recommendation ── */}
      {/* Mobile: stacked; Desktop: side-by-side                   */}
      <div className="grid gap-6 lg:grid-cols-[1fr_minmax(18rem,0.8fr)]">

        {/* Quick Actions */}
        <AIQuickActions onAction={handleQuickAction} />

        {/* Recommendation */}
        <section aria-labelledby="recommendation-heading">
          <div className="mb-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Start here
            </p>
            <h2
              id="recommendation-heading"
              className="mt-0.5 text-xl font-semibold text-[var(--color-ink)] sm:text-2xl"
            >
              Top Pick
            </h2>
          </div>
          <AIRecommendationCard />
        </section>
      </div>

      {/* ── Chat ─────────────────────────────────────────── */}
      <section aria-labelledby="chat-heading">
        <div className="mb-3">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Ask anything
          </p>
          <h2
            id="chat-heading"
            className="mt-0.5 text-xl font-semibold text-[var(--color-ink)] sm:text-2xl"
          >
            Chat with AI Mentor
          </h2>
        </div>

        <AIChat
          messages={messages}
          isTyping={isTyping}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSend={handleSend}
        />
      </section>

      {/* ── Trust note ───────────────────────────────────── */}
      <p className="pb-1 text-center text-[11px] leading-relaxed text-[var(--color-muted)]">
        AI suggestions are based on your StudySync activity and may not always be perfect.
        <br />
        This assistant is for academic productivity only.
      </p>
    </div>
  )
}
