// ─────────────────────────────────────────────────────────────
//  AI Mentor Service
//
//  Uses Groq when VITE_GROQ_API_KEY is configured and keeps
//  the local mock responses available for development without a key.
//
//  Future API shape:
//
//  POST /api/ai/chat
//  {
//    message: string,
//    context: {
//      attendance: {},
//      subjects: {},
//      studyPlan: {},
//      revisions: {},
//      quiz: {},
//      goals: {},
//      studyHealth: {},
//      procrastination: {},
//      exams: {}
//    }
//  }
// ─────────────────────────────────────────────────────────────

import { mockResponses } from '../data/mock/aiMentor'

const GROQ_ENABLED = import.meta.env.VITE_GROQ_ENABLED !== 'false'

// Simulated network latency (ms) so the typing indicator is visible in fallback mode
const MOCK_DELAY_MIN = 900
const MOCK_DELAY_MAX = 1800

function randomDelay() {
  return MOCK_DELAY_MIN + Math.random() * (MOCK_DELAY_MAX - MOCK_DELAY_MIN)
}

/**
 * Match freeform user text against keyword triggers in the fallback list.
 * Returns the first matching fallback response, or null if none match.
 */
function matchFallback(text) {
  const lower = text.toLowerCase()
  return mockResponses.fallback.find((entry) =>
    entry.triggers.some((trigger) => lower.includes(trigger)),
  ) ?? null
}

/**
 * Send a message to the AI Mentor.
 *
 * @param {string} message     — The user's message text
 * @param {string|null} quickActionKey — One of the named quick-action keys, or null
 * @param {object} [context]   — Optional StudySync context data (future use)
 * @returns {Promise<{content: string, actions?: Array<{label: string, path?: string, quickAction?: string}>}>}
 */
export async function sendMessage(message, quickActionKey = null, context = {}, conversationId = null) {
  if (GROQ_ENABLED) {
    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        quickActionKey,
        context,
        conversationId,
      }),
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.error || `AI request failed (${response.status})`)
    }

    const content = data.content
    if (!content) throw new Error('Groq returned an empty response')
    return { content, actions: data.actions ?? [] }
  }

  await new Promise((resolve) => setTimeout(resolve, randomDelay()))

  // 1. Named quick-action takes highest priority
  if (quickActionKey && mockResponses[quickActionKey]) {
    const r = mockResponses[quickActionKey]
    return { content: r.message, actions: r.actions ?? [] }
  }

  // 2. Keyword matching against freeform text
  const fallback = matchFallback(message)
  if (fallback) {
    return { content: fallback.message, actions: fallback.actions ?? [] }
  }

  // 3. Generic fallback
  return {
    content: mockResponses.defaultReply.message,
    actions: mockResponses.defaultReply.actions ?? [],
  }
}

/**
 * Returns the quick-action key from a named action string.
 * Quick actions are sent both as display labels and as keys.
 */
export const QUICK_ACTION_KEYS = {
  planDay: 'planDay',
  whatStudy: 'whatStudy',
  progress: 'progress',
  exam: 'exam',
  procrastination: 'procrastination',
}
