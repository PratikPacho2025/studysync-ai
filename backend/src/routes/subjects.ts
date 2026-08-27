import { Router, Request, Response } from 'express'
import { prisma, getDefaultUser } from '../db'
import multer from 'multer'
import fs from 'fs'
import { extractTextFromFile, parseSyllabusText } from '../utils/scanner'

const router = Router()
const upload = multer({ dest: 'uploads/' })

// POST /api/subjects/upload-syllabus - Scan syllabus and add automatically
router.post('/upload-syllabus', upload.single('file'), async (req: Request, res: Response) => {
  try {
    const user = await getDefaultUser()
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const text = await extractTextFromFile(req.file.path, req.file.mimetype)
    const parsed = parseSyllabusText(text)

    // Upsert subject
    let subject = await prisma.subject.findFirst({
      where: { userId: user.id, name: parsed.subjectName }
    })
    if (!subject) {
      subject = await prisma.subject.create({
        data: {
          userId: user.id,
          name: parsed.subjectName,
          code: parsed.subjectCode,
          teacher: 'Instructor',
          description: 'Syllabus scanned subject',
          color: '#8b5cf6'
        }
      })
    }

    // Add topics
    for (const t of parsed.topics) {
      const existing = await prisma.topic.findFirst({
        where: { subjectId: subject.id, name: t.name }
      })
      if (!existing) {
        await prisma.topic.create({
          data: {
            subjectId: subject.id,
            name: t.name,
            description: t.description,
            status: 'not-started',
            studyProgress: 0,
            quizAccuracy: 0.0,
            revisionStatus: 'none'
          }
        })
      }
    }

    // Clean up uploaded file
    try {
      fs.unlinkSync(req.file.path)
    } catch (e) {}

    const finalSubject = await prisma.subject.findUnique({
      where: { id: subject.id },
      include: { topics: { orderBy: { name: 'asc' } } }
    })

    res.json(finalSubject)
  } catch (error: any) {
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path)
      } catch (e) {}
    }
    res.status(500).json({ error: error.message || 'Failed to parse syllabus file' })
  }
})

// GET /api/subjects - List all subjects & topics
router.get('/', async (req: Request, res: Response) => {
  try {
    const user = await getDefaultUser()
    const subjects = await prisma.subject.findMany({
      where: { userId: user.id },
      include: { topics: { orderBy: { name: 'asc' } } },
      orderBy: { name: 'asc' }
    })
    res.json(subjects)
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch subjects' })
  }
})

// POST /api/subjects - Create a new subject
router.post('/', async (req: Request, res: Response) => {
  try {
    const user = await getDefaultUser()
    const { name, code, teacher, description, color } = req.body
    
    if (!name || !code) {
      return res.status(400).json({ error: 'Name and code are required' })
    }

    const subject = await prisma.subject.create({
      data: {
        userId: user.id,
        name,
        code,
        teacher: teacher || '',
        description: description || '',
        color: color || '#277c68'
      },
      include: { topics: true }
    })
    res.status(201).json(subject)
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to create subject' })
  }
})

// PUT /api/subjects/:id - Edit a subject
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, code, teacher, description, color } = req.body
    const subject = await prisma.subject.update({
      where: { id: req.params.id as string },
      data: {
        name,
        code,
        teacher,
        description,
        color
      },
      include: { topics: true }
    })
    res.json(subject)
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to update subject' })
  }
})

// DELETE /api/subjects/:id - Delete a subject
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await prisma.subject.delete({
      where: { id: req.params.id as string }
    })
    res.json({ success: true })
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to delete subject' })
  }
})

// POST /api/subjects/:subjectId/topics - Add a topic to a subject
router.post('/:subjectId/topics', async (req: Request, res: Response) => {
  try {
    const { name, description, status, studyProgress, quizAccuracy, revisionStatus } = req.body
    if (!name) {
      return res.status(400).json({ error: 'Topic name is required' })
    }
    const topic = await prisma.topic.create({
      data: {
        subjectId: req.params.subjectId as string,
        name,
        description: description || '',
        status: status || 'not-started',
        studyProgress: studyProgress || 0,
        quizAccuracy: quizAccuracy || 0.0,
        revisionStatus: revisionStatus || 'pending'
      }
    })
    res.status(201).json(topic)
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to create topic' })
  }
})

// PUT /api/subjects/:subjectId/topics/:topicId - Edit a topic
router.put('/:subjectId/topics/:topicId', async (req: Request, res: Response) => {
  try {
    const { name, description, status, studyProgress, quizAccuracy, revisionStatus } = req.body
    const topic = await prisma.topic.update({
      where: { id: req.params.topicId as string },
      data: {
        name,
        description,
        status,
        studyProgress,
        quizAccuracy,
        revisionStatus
      }
    })
    res.json(topic)
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to update topic' })
  }
})

// PUT /api/subjects/:subjectId/topics/:topicId/status - Update topic status, progress, accuracy
router.put('/:subjectId/topics/:topicId/status', async (req: Request, res: Response) => {
  try {
    const { status, studyProgress, quizAccuracy, revisionStatus } = req.body
    
    const updateData: any = {}
    if (status !== undefined) updateData.status = status
    if (studyProgress !== undefined) updateData.studyProgress = studyProgress
    if (quizAccuracy !== undefined) updateData.quizAccuracy = quizAccuracy
    if (revisionStatus !== undefined) updateData.revisionStatus = revisionStatus

    // Implement auto calculations based on status if needed
    if (status === 'completed') {
      updateData.studyProgress = 100
    }

    const topic = await prisma.topic.update({
      where: { id: req.params.topicId as string },
      data: updateData
    })
    res.json(topic)
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to update topic status' })
  }
})

// DELETE /api/subjects/:subjectId/topics/:topicId - Delete a topic
router.delete('/:subjectId/topics/:topicId', async (req: Request, res: Response) => {
  try {
    await prisma.topic.delete({
      where: { id: req.params.topicId as string }
    })
    res.json({ success: true })
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to delete topic' })
  }
})

export default router
