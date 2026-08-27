import { Router, Request, Response } from 'express'
import { prisma, getDefaultUser } from '../db'

const router = Router()

// GET /api/quiz - Get all quizzes, history, and weak topics
router.get('/', async (req: Request, res: Response) => {
  try {
    const user = await getDefaultUser()

    // 1. Fetch available quizzes
    const quizzes = await prisma.quiz.findMany({
      include: { questions: true }
    })

    // 2. Fetch history attempts
    const quizHistory = await prisma.quizAttempt.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    })

    // 3. Fetch weak topics (quiz accuracy between 1% and 60%)
    const subjects = await prisma.subject.findMany({
      where: { userId: user.id },
      include: { topics: true }
    })

    const weakTopics: { name: string, accuracy: number }[] = []
    subjects.forEach((sub) => {
      sub.topics.forEach((topic) => {
        if (topic.quizAccuracy > 0 && topic.quizAccuracy < 60) {
          weakTopics.push({
            name: topic.name,
            accuracy: topic.quizAccuracy
          })
        }
      })
    })

    res.json({
      quizzes,
      quizHistory,
      weakTopics
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch quizzes data' })
  }
})

// GET /api/quiz/:id - Get a specific quiz with questions
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: req.params.id as string },
      include: { questions: true }
    })

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' })
    }

    res.json(quiz)
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch quiz' })
  }
})

// POST /api/quiz/:id/attempt - Record a quiz attempt and update topic accuracy
router.post('/:id/attempt', async (req: Request, res: Response) => {
  try {
    const user = await getDefaultUser()
    const { score } = req.body // Score is the accuracy percentage (e.g. 80)

    if (score === undefined) {
      return res.status(400).json({ error: 'Score is required' })
    }

    const quiz = await prisma.quiz.findUnique({
      where: { id: req.params.id as string }
    })

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' })
    }

    // 1. Log the attempt in history
    const attempt = await prisma.quizAttempt.create({
      data: {
        userId: user.id,
        subject: quiz.subject,
        topic: quiz.topic,
        score: Number(score),
        date: 'Today'
      }
    })

    // 2. Find corresponding subject/topic to update accuracy
    const subject = await prisma.subject.findFirst({
      where: { userId: user.id, name: quiz.subject },
      include: { topics: true }
    })

    let updatedTopic = null
    if (subject) {
      const topic = subject.topics.find((t) => t.name.toLowerCase() === quiz.topic.toLowerCase())
      if (topic) {
        updatedTopic = await prisma.topic.update({
          where: { id: topic.id },
          data: {
            quizAccuracy: Number(score),
            // Optionally mark status completed if accuracy is high
            status: score >= 70 ? 'completed' : topic.status,
            studyProgress: score >= 70 ? 100 : topic.studyProgress
          }
        })
      }
    }

    res.status(201).json({ attempt, updatedTopic })
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to record quiz attempt' })
  }
})

export default router
