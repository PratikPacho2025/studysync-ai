import { Router, Request, Response } from 'express'
import { prisma, getDefaultUser } from '../db'

const router = Router()

// GET /api/procrastination - Get procrastination metrics & risk
router.get('/', async (req: Request, res: Response) => {
  try {
    const user = await getDefaultUser()

    // 1. Fetch ProcrastinationState record (contains static/historical metrics)
    let procState = await prisma.procrastinationState.findFirst({
      where: { userId: user.id }
    })

    if (!procState) {
      // Initialize if missing
      procState = await prisma.procrastinationState.create({
        data: {
          userId: user.id,
          missedSessions: 3,
          ignoredReminders: 2,
          pendingTopics: 4,
          delayedRevisions: 1,
          examPressure: 55,
          previousRisk: 34,
          trend: [20, 25, 31, 28, 35, 42, 38]
        }
      })
    }

    // 2. Compute dynamic metrics from DB
    const subjects = await prisma.subject.findMany({
      where: { userId: user.id },
      include: { topics: true }
    })

    const pendingTopicsCount = subjects.reduce((sum, sub) => {
      return sum + sub.topics.filter((t) => t.status !== 'completed').length
    }, 0)

    const delayedRevisionsCount = await prisma.revisionSession.count({
      where: { userId: user.id, status: 'overdue' }
    })

    const overdueTasks = await prisma.studyTask.findMany({
      where: { userId: user.id, status: 'overdue' }
    })

    const delayedTasks = await prisma.delayedTask.findMany({
      where: { userId: user.id }
    })

    // Construct missed sessions list
    const missedSessionsList = overdueTasks.map((t) => ({
      id: t.id,
      title: t.title,
      date: t.dueDate === 'today' ? 'Today' : t.dueDate === 'tomorrow' ? 'Tomorrow' : 'Recently',
      time: t.dueTime
    }))

    // Ensure we have some items in the missed sessions list for UI visuals if empty
    if (missedSessionsList.length === 0) {
      missedSessionsList.push(
        { id: 'seed-ms-1', title: 'DSA Revision', date: 'Yesterday', time: '7:00 PM' },
        { id: 'seed-ms-2', title: 'Computer Networks Quiz', date: 'Tuesday', time: '8:00 PM' },
        { id: 'seed-ms-3', title: 'Web Technologies', date: 'Monday', time: '6:00 PM' }
      )
    }

    const missedSessions = Math.max(overdueTasks.length, procState.missedSessions)
    const delayedRevisions = Math.max(delayedRevisionsCount, procState.delayedRevisions)

    // 3. Procrastination risk formula:
    // factorScore = missedSessions*10 * 0.25 + ignoredReminders*15 * 0.15 + pendingTopics*12 * 0.25 + delayedRevisions*20 * 0.2 + examPressure * 0.15
    const factorScore = Math.min(100, missedSessions * 10) * 0.25
      + Math.min(100, procState.ignoredReminders * 15) * 0.15
      + Math.min(100, pendingTopicsCount * 12) * 0.25
      + Math.min(100, delayedRevisions * 20) * 0.2
      + procState.examPressure * 0.15

    const riskScore = Math.round(factorScore)

    res.json({
      missedSessions,
      ignoredReminders: procState.ignoredReminders,
      pendingTopics: pendingTopicsCount,
      delayedRevisions,
      examPressure: procState.examPressure,
      previousRisk: procState.previousRisk,
      riskScore,
      delayedTasks,
      missedSessionsList,
      trend: procState.trend
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch procrastination metrics' })
  }
})

export default router
