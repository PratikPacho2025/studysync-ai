import { Router, Request, Response } from 'express'
import { prisma, getDefaultUser } from '../db'
import multer from 'multer'
import fs from 'fs'
import { extractTextFromFile, parseTimetableText } from '../utils/scanner'

const router = Router()
const upload = multer({ dest: 'uploads/' })

// POST /api/timetable/upload - Scan timetable and add automatically
router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
  try {
    const user = await getDefaultUser()
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const text = await extractTextFromFile(req.file.path, req.file.mimetype)
    const scanned = parseTimetableText(text)

    const savedLectures = []
    for (const lec of scanned) {
      // Upsert subject
      let subject = await prisma.subject.findFirst({
        where: { userId: user.id, name: lec.subject }
      })
      if (!subject) {
        subject = await prisma.subject.create({
          data: {
            userId: user.id,
            name: lec.subject,
            code: 'CS' + Math.floor(1000 + Math.random() * 9000),
            teacher: lec.teacher,
            description: 'Scanned from timetable',
            color: '#3b82f6'
          }
        })
      }

      const lecture = await prisma.lecture.create({
        data: {
          userId: user.id,
          day: lec.day,
          subject: lec.subject,
          topic: lec.topic,
          startTime: lec.startTime,
          endTime: lec.endTime,
          room: lec.room,
          teacher: lec.teacher,
          status: 'upcoming'
        }
      })
      savedLectures.push(lecture)
    }

    // Clean up uploaded file
    try {
      fs.unlinkSync(req.file.path)
    } catch (e) {}

    res.json({ success: true, lectures: savedLectures })
  } catch (error: any) {
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path)
      } catch (e) {}
    }
    res.status(500).json({ error: error.message || 'Failed to parse timetable file' })
  }
})

// GET /api/timetable - Get all lectures
router.get('/', async (req: Request, res: Response) => {
  try {
    const user = await getDefaultUser()
    const lectures = await prisma.lecture.findMany({
      where: { userId: user.id }
    })
    res.json(lectures)
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch timetable' })
  }
})

// POST /api/timetable - Add a new lecture
router.post('/', async (req: Request, res: Response) => {
  try {
    const user = await getDefaultUser()
    const { day, subject, topic, startTime, endTime, room, teacher, status } = req.body

    if (!day || !subject || !startTime || !endTime) {
      return res.status(400).json({ error: 'Missing required lecture fields' })
    }

    const lecture = await prisma.lecture.create({
      data: {
        userId: user.id,
        day,
        subject,
        topic: topic || '',
        startTime,
        endTime,
        room: room || '',
        teacher: teacher || '',
        status: status || 'upcoming'
      }
    })
    res.status(201).json(lecture)
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to create lecture' })
  }
})

// PUT /api/timetable/:id - Edit a lecture
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { day, subject, topic, startTime, endTime, room, teacher, status } = req.body
    
    const lecture = await prisma.lecture.update({
      where: { id: req.params.id as string },
      data: {
        day,
        subject,
        topic,
        startTime,
        endTime,
        room,
        teacher,
        status
      }
    })
    res.json(lecture)
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to update lecture' })
  }
})

// DELETE /api/timetable/:id - Delete a lecture
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await prisma.lecture.delete({
      where: { id: req.params.id as string }
    })
    res.json({ success: true })
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to delete lecture' })
  }
})

export default router
