import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

import dashboardRouter from './routes/dashboard'
import subjectsRouter from './routes/subjects'
import timetableRouter from './routes/timetable'
import attendanceRouter from './routes/attendance'
import studyRouter from './routes/study'
import revisionRouter from './routes/revision'
import quizRouter from './routes/quiz'
import goalsRouter from './routes/goals'
import analyticsRouter from './routes/analytics'
import procrastinationRouter from './routes/procrastination'

const app = express()
const port = Number(process.env.PORT || 8787)

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    database: 'connected',
    timestamp: new Date().toISOString()
  })
})

// Register REST routers
app.use('/api/dashboard', dashboardRouter)
app.use('/api/subjects', subjectsRouter)
app.use('/api/timetable', timetableRouter)
app.use('/api/attendance', attendanceRouter)
app.use('/api/study', studyRouter)
app.use('/api/revision', revisionRouter)
app.use('/api/quiz', quizRouter)
app.use('/api/goals', goalsRouter)
app.use('/api/analytics', analyticsRouter)
app.use('/api/procrastination', procrastinationRouter)

// AI Chat End-point (Fallback to Groq if key exists, otherwise let frontend handle mock)
const groqApiUrl = 'https://api.groq.com/openai/v1/chat/completions'

import { prisma } from './db'

const MAX_CONTEXT_MESSAGES = 15

async function buildConversationContext(conversationId: string) {
  // Layer 1: Short-Term Memory (Recent messages)
  // Future Layer 2 & 3 will be integrated here
  const messages = await prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: 'desc' },
    take: MAX_CONTEXT_MESSAGES,
  })

  // Return them in chronological order
  return messages.reverse().map((msg) => ({
    role: msg.role === 'user' ? 'user' : 'assistant',
    content: msg.content,
  }))
}

app.post('/api/ai/chat', async (req: Request, res: Response) => {
  // Reload dotenv to pick up any runtime changes to .env
  dotenv.config()

  const groqApiKey = process.env.GROQ_API_KEY
  const groqModel = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'

  if (!groqApiKey) {
    return res.status(503).json({
      error: 'GROQ_API_KEY is not configured on the AI server. Please add it to your .env file.'
    })
  }

  try {
    const { conversationId, message, context } = req.body
    if (!message) {
      return res.status(400).json({ error: 'A message is required' })
    }
    if (!conversationId) {
      return res.status(400).json({ error: 'A conversationId is required' })
    }

    // STEP 2: Ensure Conversation exists
    let conversation = await prisma.conversation.findUnique({
      where: { id: conversationId }
    })
    
    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: { id: conversationId } // user_id is null for anonymous
      })
    }

    // STEP 3: Save user's new message
    await prisma.message.create({
      data: {
        conversationId: conversation.id,
        role: 'user',
        content: message
      }
    })

    // STEP 4 & 5: Build AI Context
    const systemPrompt = `You are StudySync AI Mentor, a supportive academic productivity assistant.
Help students understand concepts, plan realistic study sessions, revise effectively, and stay motivated.
Answer the student's actual question directly. Be concise, practical, and encouraging.
Use markdown for lists and emphasis when useful. Explain difficult topics step by step with simple examples.
Never claim to access data that is not provided. For medical, legal, or crisis concerns, recommend a qualified professional.`

    const contextText = context && Object.keys(context).length
      ? `\n\nStudySync context:\n${JSON.stringify(context)}`
      : ''

    const previousMessages = await buildConversationContext(conversation.id)

    // Append contextText to the current message without saving it to the DB this way
    // (We only saved the pure user message to DB, but we send the enriched one to Groq)
    const enrichedMessage = `${message}${contextText}`

    let response = await fetch(groqApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${groqApiKey}`
      },
      body: JSON.stringify({
        model: groqModel,
        temperature: 0.6,
        max_tokens: 700,
        messages: [
          { role: 'system', content: systemPrompt },
          ...previousMessages.slice(0, -1), // Everything except the very last (current) message which we enriched
          { role: 'user', content: enrichedMessage }
        ]
      })
    })

    let data = await response.json() as any

    // Fallback if the requested model is not accessible
    if (!response.ok && (response.status === 404 || data.error?.code === 'model_not_found')) {
      console.warn(`Model ${groqModel} not available on this API key. Retrying with fallback model groq/compound...`)
      response = await fetch(groqApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${groqApiKey}`
        },
        body: JSON.stringify({
          model: 'groq/compound',
          temperature: 0.6,
          max_tokens: 700,
          messages: [
            { role: 'system', content: systemPrompt },
            ...previousMessages.slice(0, -1),
            { role: 'user', content: enrichedMessage }
          ]
        })
      })
      data = await response.json() as any
    }

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'AI request failed' })
    }

    let content = data.choices?.[0]?.message?.content || ''
    content = content.replace(/<think>[\s\S]*?<\/think>\n*/gi, '').trim()

    // STEP 6: Save Groq response to Supabase
    await prisma.message.create({
      data: {
        conversationId: conversation.id,
        role: 'assistant',
        content
      }
    })
    
    await prisma.conversation.update({
      where: { id: conversation.id },
      data: { updatedAt: new Date() }
    })

    res.json({ content, actions: [] })
  } catch (error: any) {
    console.error('[AI chat]', error)
    res.status(500).json({ error: error.message || 'AI chat request failed' })
  }
})

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: express.NextFunction) => {
  console.error('[Server Error]:', err)
  res.status(500).json({ error: err.message || 'Internal Server Error' })
})

// Start server
app.listen(port, () => {
  console.log(`\n🚀 Express Server listening at http://localhost:${port}`)
})
