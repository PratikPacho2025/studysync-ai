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
  const getOrCreateConversationId = useCallback(() => {
    let id = localStorage.getItem('studysync_conversation_id')
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem('studysync_conversation_id', id)
    }
    return id
  }, [])

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
        const conversationId = getOrCreateConversationId()
        // sendMessage is async — currently returns after a mock delay.
        // In the future it will call POST /api/ai/chat.
        const response = await sendMessage(text, quickActionKey, {}, conversationId)
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
    [isTyping, addUserMessage, addAssistantMessage, getOrCreateConversationId],
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
    <div className="mx-auto flex h-[calc(100vh-6rem)] w-full max-w-4xl flex-col gap-4 pb-2">
      {/* ── Header ────────────────────────────────────────── */}
      <AIMentorHeader onClearChat={handleClearChat} />

      {/* ── Chat ─────────────────────────────────────────── */}
      <div className="flex-1 overflow-hidden">
        <AIChat
          messages={messages}
          isTyping={isTyping}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSend={handleSend}
        />
      </div>

      {/* ── Trust note ───────────────────────────────────── */}
      <p className="pb-1 text-center text-[11px] leading-relaxed text-[var(--color-muted)] shrink-0">
        AI suggestions are based on your StudySync activity and may not always be perfect.
        <br />
        This assistant is for academic productivity only.
      </p>
    </div>
  )
}
