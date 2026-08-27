import { Router, Request, Response } from 'express'
import { prisma, getDefaultUser } from '../db'

const router = Router()

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function getHealthStatus(score: number): string {
  if (score >= 90) return 'Excellent'
  if (score >= 75) return 'Good'
  if (score >= 60) return 'Needs Attention'
  return 'Critical'
}

function getRiskStatus(score: number): string {
  if (score >= 80) return 'Critical'
  if (score >= 60) return 'High'
  if (score >= 30) return 'Medium'
  return 'Low'
}

// GET /api/dashboard - Aggregate all metrics for the dashboard
router.get('/', async (req: Request, res: Response) => {
  try {
    const user = await getDefaultUser()

    // 1. Get current day name (default to Monday if Sunday since Sunday has no classes)
    const todayName = DAYS_OF_WEEK[new Date().getDay()]
    const currentDay = todayName === 'Sunday' ? 'Monday' : todayName

    // 2. Fetch all components from DB
    const subjects = await prisma.subject.findMany({
      where: { userId: user.id },
      include: { topics: true }
    })

    const lectures = await prisma.lecture.findMany({
      where: { userId: user.id }
    })

    const studyTasks = await prisma.studyTask.findMany({
      where: { userId: user.id }
    })

    const revisions = await prisma.revisionSession.findMany({
      where: { userId: user.id }
    })

    const quizAttempts = await prisma.quizAttempt.findMany({
      where: { userId: user.id }
    })

    const habits = await prisma.habit.findMany({
      where: { goal: { userId: user.id } }
    })

    const procState = await prisma.procrastinationState.findFirst({
      where: { userId: user.id }
    })

    // 3. Compile Classes for Today
    const todayClasses = lectures
      .filter((lec) => lec.day.toLowerCase() === currentDay.toLowerCase())
      .map((lec) => ({
        time: lec.startTime,
        subject: lec.subject,
        title: lec.topic,
        room: lec.room ? `Room ${lec.room}` : 'Lab 3',
        status: lec.status
      }))

    // 4. Compile Study Tasks for Today
    const todayStudyTasks = studyTasks
      .filter((t) => t.dueDate === 'today')
      .map((t) => ({
        id: t.id,
        title: t.title,
        subject: t.subject,
        priority: t.priority.charAt(0).toUpperCase() + t.priority.slice(1),
        dueTime: t.dueTime,
        status: t.status
      }))

    // 5. Subject Progression
    const formattedSubjects = subjects.map((sub) => {
      const completed = sub.topics.filter((t) => t.status === 'completed').length
      const progress = sub.topics.length > 0 ? Math.round((completed / sub.topics.length) * 100) : 0
      return {
        name: sub.name,
        progress,
        color: sub.color
      }
    })

    // 6. Attendance Overview
    const attendanceSummary = subjects.map((sub) => {
      const total = sub.present + sub.absent
      const percentage = total > 0 ? Math.round((sub.present / total) * 100) : 0
      return {
        name: sub.name,
        value: percentage,
        attention: percentage < 75
      }
    })

    // 7. Calculate Study Health Score Metrics
    // Attendance Score (Average of subject attendances)
    let totalPresent = 0
    let totalAbsent = 0
    subjects.forEach((sub) => {
      totalPresent += sub.present
      totalAbsent += sub.absent
    })
    const totalAttendanceCount = totalPresent + totalAbsent
    const attendanceScore = totalAttendanceCount > 0 ? Math.round((totalPresent / totalAttendanceCount) * 100) : 0

    // Consistency Score (Percentage of completed study planner tasks)
    const completedTasksCount = studyTasks.filter((t) => t.status === 'completed').length
    const consistencyScore = studyTasks.length > 0 ? Math.round((completedTasksCount / studyTasks.length) * 100) : 0

    // Revision Score (Percentage of completed revisions)
    const completedRevisionsCount = revisions.filter((r) => r.status === 'completed').length
    const totalDueRevisions = revisions.filter((r) => r.status === 'due' || r.status === 'overdue' || r.status === 'completed').length
    const revisionScore = totalDueRevisions > 0 ? Math.round((completedRevisionsCount / totalDueRevisions) * 100) : 0

    // Quiz Performance Score (Average score on quiz attempts)
    const quizScore = quizAttempts.length > 0
      ? Math.round(quizAttempts.reduce((sum, q) => sum + q.score, 0) / quizAttempts.length)
      : 0

    // Goals Completion Score (Habits completed percentage)
    const completedHabitsCount = habits.filter((h) => h.completed).length
    const goalsScore = habits.length > 0 ? Math.round((completedHabitsCount / habits.length) * 100) : 0

    // Overall Study Health Score (Average of the 5 metrics, or 0 if no records)
    const metricsCount = 5
    const healthScore = Math.round((attendanceScore + consistencyScore + revisionScore + quizScore + goalsScore) / metricsCount)

    const studyHealth = {
      score: healthScore,
      status: getHealthStatus(healthScore),
      metrics: [
        { label: 'Attendance', value: attendanceScore },
        { label: 'Consistency', value: consistencyScore },
        { label: 'Revision', value: revisionScore },
        { label: 'Quiz performance', value: quizScore },
        { label: 'Goals', value: goalsScore }
      ]
    }

    // 8. Procrastination Dashboard Overview
    const pendingTopicsCount = subjects.reduce((sum, sub) => sum + sub.topics.filter(t => t.status !== 'completed').length, 0)
    const delayedRevisionsCount = revisions.filter(r => r.status === 'overdue').length
    const missedSessionsCount = studyTasks.filter(t => t.status === 'overdue').length
    const ignoredReminders = procState?.ignoredReminders ?? 0
    const examPressure = procState?.examPressure ?? 0

    const procScoreFactor = Math.min(100, missedSessionsCount * 10) * 0.25
      + Math.min(100, ignoredReminders * 15) * 0.15
      + Math.min(100, pendingTopicsCount * 12) * 0.25
      + Math.min(100, delayedRevisionsCount * 20) * 0.2
      + examPressure * 0.15
    const riskScore = Math.round(procScoreFactor)

    const procrastination = {
      risk: getRiskStatus(riskScore),
      missedSessions: Math.max(missedSessionsCount, procState?.missedSessions ?? 0),
      suggestion: subjects.length > 0 
        ? `Review some topics under ${subjects[0].name} to reduce procrastination risk.`
        : 'Get started by creating a subject or scanning a syllabus!'
    }

    // 9. Upcoming Exam (Dynamic based on first registered subject)
    const firstSubject = subjects[0]
    const upcomingExam = firstSubject ? {
      subject: firstSubject.name,
      daysRemaining: 10,
      preparation: formattedSubjects[0]?.progress ?? 0,
      topicsRemaining: firstSubject.topics.filter((t) => t.status !== 'completed').length
    } : {
      subject: 'No exams scheduled',
      daysRemaining: 0,
      preparation: 0,
      topicsRemaining: 0
    }

    // 10. AI Recommendation Card
    const aiRecommendation = firstSubject ? {
      message: `Start studying your first topic in ${firstSubject.name}.`,
      duration: '20 minutes',
      topic: firstSubject.topics[0]?.name || 'Introduction'
    } : {
      message: 'Add a subject and scan a syllabus to get personalized study recommendations.',
      duration: '0 minutes',
      topic: 'Get Started'
    }

    // 11. Today Summary Badge counts
    const todaySummary = [
      { label: 'Classes', value: todayClasses.length },
      { label: 'Study tasks', value: todayStudyTasks.filter(t => t.status === 'pending').length },
      { label: 'Revision', value: revisions.filter(r => r.status === 'due' || r.status === 'overdue').length },
      { label: 'Quiz', value: quizAttempts.length }
    ]

    res.json({
      user: { name: user.name },
      todaySummary,
      classes: todayClasses,
      studyTasks: todayStudyTasks,
      subjects: formattedSubjects,
      attendance: attendanceSummary,
      studyHealth,
      procrastination,
      upcomingExam,
      aiRecommendation
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to aggregate dashboard data' })
  }
})

export default router
