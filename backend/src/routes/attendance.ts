import { Router, Request, Response } from 'express'
import { prisma, getDefaultUser } from '../db'

const router = Router()

function getAttendanceStatus(percentage: number): string {
  if (percentage >= 90) return 'excellent'
  if (percentage >= 75) return 'good'
  if (percentage >= 65) return 'needs-attention'
  return 'critical'
}

// GET /api/attendance - Fetch attendance subjects and history
router.get('/', async (req: Request, res: Response) => {
  try {
    const user = await getDefaultUser()

    const subjects = await prisma.subject.findMany({
      where: { userId: user.id }
    })

    const formattedSubjects = subjects.map((sub) => {
      const total = sub.present + sub.absent
      const percentage = total > 0 ? Math.round((sub.present / total) * 100) : 0
      return {
        id: sub.id,
        subject: sub.name,
        present: sub.present,
        absent: sub.absent,
        total,
        percentage,
        status: getAttendanceStatus(percentage)
      }
    })

    const history = await prisma.attendanceRecord.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    })

    res.json({
      subjects: formattedSubjects,
      history
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch attendance data' })
  }
})

// POST /api/attendance - Record new attendance entry (marks present/absent)
router.post('/', async (req: Request, res: Response) => {
  try {
    const user = await getDefaultUser()
    const { subject, status, date, lecture } = req.body

    if (!subject || !status || !date || !lecture) {
      return res.status(400).json({ error: 'Missing required attendance logging parameters' })
    }

    // Find the corresponding subject
    const existingSubject = await prisma.subject.findFirst({
      where: { userId: user.id, name: subject }
    })

    if (!existingSubject) {
      return res.status(404).json({ error: `Subject ${subject} not found` })
    }

    // 1. Create history record
    // Format date to local date readable format (e.g. "Today" or "23 Aug 2026")
    let dateString = date
    if (date === new Date().toISOString().split('T')[0]) {
      dateString = 'Today'
    } else {
      const d = new Date(date)
      dateString = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    }

    const record = await prisma.attendanceRecord.create({
      data: {
        userId: user.id,
        subject,
        date: dateString,
        time: lecture,
        status
      }
    })

    // 2. Update subject counts
    const updatedSubject = await prisma.subject.update({
      where: { id: existingSubject.id },
      data: {
        present: { increment: status === 'present' ? 1 : 0 },
        absent: { increment: status === 'absent' ? 1 : 0 }
      }
    })

    res.status(201).json({ record, updatedSubject })
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to log attendance' })
  }
})

export default router
