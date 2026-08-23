import { Router, Request, Response } from 'express'
import { prisma, getDefaultUser } from '../db'

const router = Router()

const REVISION_INTERVALS = [6, 24, 72, 168, 360] // in hours

// GET /api/revision - List all revision sessions
router.get('/', async (req: Request, res: Response) => {
  try {
    const user = await getDefaultUser()
    const revisions = await prisma.revisionSession.findMany({
      where: { userId: user.id },
      orderBy: { scheduledDate: 'asc' }
    })
    res.json(revisions)
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch revision sessions' })
  }
})

// POST /api/revision/:id/complete - Complete a revision session
router.post('/:id/complete', async (req: Request, res: Response) => {
  try {
    const user = await getDefaultUser()
    const { confidence, understanding } = req.body

    const revision = await prisma.revisionSession.findUnique({
      where: { id: req.params.id as string }
    })

    if (!revision) {
      return res.status(404).json({ error: 'Revision session not found' })
    }

    const currentNumber = revision.revisionNumber
    const intervalHours = REVISION_INTERVALS[Math.min(currentNumber - 1, REVISION_INTERVALS.length - 1)] ?? 360
    
    const baseDate = new Date(revision.scheduledDate)
    const nextDate = new Date(baseDate.getTime() + intervalHours * 60 * 60 * 1000)

    // 1. Update current revision to completed
    const updatedRevision = await prisma.revisionSession.update({
      where: { id: revision.id },
      data: {
        status: 'completed',
        confidence,
        understanding: understanding ? Number(understanding) : null
      }
    })

    // 2. Create the next scheduled spaced repetition revision session
    const nextRevision = await prisma.revisionSession.create({
      data: {
        userId: user.id,
        subject: revision.subject,
        topic: revision.topic,
        lectureDate: revision.lectureDate,
        revisionNumber: currentNumber + 1,
        scheduledDate: nextDate.toISOString(),
        duration: revision.duration,
        status: 'upcoming'
      }
    })

    // 3. Update the Topic's revisionStatus in the Subject model if found
    const subject = await prisma.subject.findFirst({
      where: { userId: user.id, name: revision.subject },
      include: { topics: true }
    })

    if (subject) {
      const topic = subject.topics.find((t) => t.name.toLowerCase() === revision.topic.toLowerCase())
      if (topic) {
        await prisma.topic.update({
          where: { id: topic.id },
          data: {
            revisionStatus: 'completed'
          }
        })
      }
    }

    res.json({ updatedRevision, nextRevision, nextDate: nextDate.toISOString() })
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to complete revision session' })
  }
})

// POST /api/revision - Schedule a new revision session manually
router.post('/', async (req: Request, res: Response) => {
  try {
    const user = await getDefaultUser()
    const { subject, topic, duration, scheduledDate } = req.body

    if (!subject || !topic) {
      return res.status(400).json({ error: 'Subject and topic are required' })
    }

    const session = await prisma.revisionSession.create({
      data: {
        userId: user.id,
        subject,
        topic,
        lectureDate: new Date().toISOString(),
        revisionNumber: 1,
        scheduledDate: scheduledDate || new Date().toISOString(),
        duration: duration ? Number(duration) : 20,
        status: 'due'
      }
    })

    res.status(201).json(session)
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to create revision session' })
  }
})

export default router
