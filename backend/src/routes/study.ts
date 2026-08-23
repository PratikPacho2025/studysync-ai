import { Router, Request, Response } from 'express'
import { prisma, getDefaultUser } from '../db'

const router = Router()

// GET /api/study - Get all study tasks
router.get('/', async (req: Request, res: Response) => {
  try {
    const user = await getDefaultUser()
    const tasks = await prisma.studyTask.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    })
    res.json(tasks)
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch study tasks' })
  }
})

// POST /api/study - Add a new study task
router.post('/', async (req: Request, res: Response) => {
  try {
    const user = await getDefaultUser()
    const { title, subject, topic, type, duration, priority, dueDate, dueTime } = req.body

    if (!title || !subject) {
      return res.status(400).json({ error: 'Title and subject are required' })
    }

    const task = await prisma.studyTask.create({
      data: {
        userId: user.id,
        title,
        subject,
        topic: topic || '',
        type: type || 'study',
        duration: duration ? Number(duration) : 30,
        priority: priority || 'medium',
        dueDate: dueDate || 'today',
        dueTime: dueTime || '7:00 PM',
        status: 'pending'
      }
    })
    res.status(201).json(task)
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to create study task' })
  }
})

// PUT /api/study/:id - Update a study task (e.g. mark complete or reschedule)
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { title, subject, topic, type, duration, priority, dueDate, dueTime, status } = req.body
    
    const updateData: any = {}
    if (title !== undefined) updateData.title = title
    if (subject !== undefined) updateData.subject = subject
    if (topic !== undefined) updateData.topic = topic
    if (type !== undefined) updateData.type = type
    if (duration !== undefined) updateData.duration = Number(duration)
    if (priority !== undefined) updateData.priority = priority
    if (dueDate !== undefined) updateData.dueDate = dueDate
    if (dueTime !== undefined) updateData.dueTime = dueTime
    if (status !== undefined) updateData.status = status

    const task = await prisma.studyTask.update({
      where: { id: req.params.id as string },
      data: updateData
    })
    res.json(task)
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to update study task' })
  }
})

// DELETE /api/study/:id - Delete a study task
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await prisma.studyTask.delete({
      where: { id: req.params.id as string }
    })
    res.json({ success: true })
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to delete study task' })
  }
})

export default router
