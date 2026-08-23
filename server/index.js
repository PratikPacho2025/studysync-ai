import http from 'node:http'
import dotenv from 'dotenv'

// Load .env.local first (developer overrides), then .env (defaults)
dotenv.config({ path: '.env.local' })
dotenv.config()

const port = Number(process.env.PORT || 8787)
const groqApiUrl = 'https://api.groq.com/openai/v1/chat/completions'
const groqModel = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'
const groqApiKey = process.env.GROQ_API_KEY

// ── Startup diagnostics ────────────────────────────────────────
if (!groqApiKey) {
  console.warn(
    '\n⚠️  GROQ_API_KEY is not set!\n' +
    '   Create a .env file (or .env.local) with:\n' +
    '     GROQ_API_KEY=gsk_your_key_here\n' +
    '   The AI chat endpoint will return 503 until this is fixed.\n',
  )
} else {
  console.log('✅ GROQ_API_KEY detected — AI chat is enabled')
  console.log(`   Model: ${groqModel}`)
}

// ── CORS helper ────────────────────────────────────────────────
const ALLOWED_ORIGINS = ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000']

function setCorsHeaders(response, request) {
  const origin = request.headers.origin || '*'
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  response.setHeader('Access-Control-Allow-Origin', allowed)
  response.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.setHeader('Access-Control-Max-Age', '86400')
}

const systemPrompt = `You are StudySync AI Mentor, a supportive academic productivity assistant.
Help students understand concepts, plan realistic study sessions, revise effectively, and stay motivated.
Answer the student's actual question directly. Be concise, practical, and encouraging.
Use markdown for lists and emphasis when useful. Explain difficult topics step by step with simple examples.
Never claim to access data that is not provided. For medical, legal, or crisis concerns, recommend a qualified professional.`

function sendJson(response, status, payload) {
  response.writeHead(status, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(payload))
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = ''
    request.on('data', (chunk) => {
      body += chunk
      if (body.length > 1_000_000) reject(new Error('Request body is too large'))
    })
    request.on('end', () => resolve(body))
    request.on('error', reject)
  })
}

const server = http.createServer(async (request, response) => {
  // Always set CORS headers on every response
  setCorsHeaders(response, request)

  // Handle preflight
  if (request.method === 'OPTIONS') {
    response.writeHead(204)
    response.end()
    return
  }

  // Health check endpoint
  if (request.method === 'GET' && request.url === '/api/health') {
    sendJson(response, 200, {
      status: 'ok',
      groq_configured: Boolean(groqApiKey),
      model: groqModel,
    })
    return
  }

  if (request.method !== 'POST' || request.url !== '/api/ai/chat') {
    sendJson(response, 404, { error: 'Not found' })
    return
  }

  if (!groqApiKey) {
    sendJson(response, 503, {
      error: 'GROQ_API_KEY is not configured on the AI server. Please add it to your .env file.',
    })
    return
  }

  try {
    const payload = JSON.parse(await readBody(request))
    const message = typeof payload.message === 'string' ? payload.message.trim() : ''
    if (!message) {
      sendJson(response, 400, { error: 'A message is required' })
      return
    }

    const contextText = payload.context && Object.keys(payload.context).length
      ? `\n\nStudySync context:\n${JSON.stringify(payload.context)}`
      : ''

    console.log(`[AI] Sending to Groq (${groqModel}): "${message.slice(0, 80)}${message.length > 80 ? '…' : ''}"`)

    const groqResponse = await fetch(groqApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model: groqModel,
        temperature: 0.6,
        max_tokens: 700,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `${message}${contextText}` },
        ],
      }),
    })
    const data = await groqResponse.json()

    if (!groqResponse.ok) {
      const errMsg = data.error?.message || 'Groq request failed'
      console.error(`[AI] Groq API error (${groqResponse.status}):`, errMsg)

      // Give a user-friendly error for common issues
      if (groqResponse.status === 401) {
        sendJson(response, 401, {
          error: 'Invalid GROQ_API_KEY. Please check your API key in the .env file.',
        })
        return
      }
      if (groqResponse.status === 429) {
        sendJson(response, 429, {
          error: 'Rate limit reached. Please wait a moment and try again.',
        })
        return
      }

      sendJson(response, groqResponse.status, { error: errMsg })
      return
    }

    let content = data.choices?.[0]?.message?.content
    if (!content) {
      console.error('[AI] Groq returned empty content:', JSON.stringify(data))
      sendJson(response, 502, { error: 'Groq returned an empty response' })
      return
    }

    // Strip out <think>...</think> blocks from reasoning models
    content = content.replace(/<think>[\s\S]*?<\/think>\n*/gi, '').trim()

    console.log(`[AI] Response received (${content.length} chars)`)
    sendJson(response, 200, { content, actions: [] })
  } catch (error) {
    console.error('[AI server]', error)

    // Network / DNS errors when calling Groq
    if (error.cause?.code === 'ENOTFOUND' || error.cause?.code === 'ECONNREFUSED') {
      sendJson(response, 502, { error: 'Could not reach the Groq API. Check your internet connection.' })
      return
    }

    sendJson(response, 400, { error: error.message || 'Invalid AI request' })
  }
})

server.listen(port, () => {
  console.log(`\n🚀 AI server listening at http://localhost:${port}`)
  console.log(`   POST http://localhost:${port}/api/ai/chat`)
  console.log(`   GET  http://localhost:${port}/api/health\n`)
})
