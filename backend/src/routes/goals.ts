import { Router, Request, Response } from 'express'
import { prisma, getDefaultUser } from '../db'

const router = Router()

function getGoalStatus(percentage: number): string {
  if (percentage >= 85) return 'excellent'
  if (percentage >= 70) return 'on-track'
  if (percentage >= 50) return 'needs-attention'
  return 'behind'
}

// GET /api/goals - Fetch all goals + habits
router.get('/', async (req: Request, res: Response) => {
  try {
    const user = await getDefaultUser()
    const goals = await prisma.goal.findMany({
      where: { userId: user.id },
      include: { habits: { orderBy: { title: 'asc' } } },
      orderBy: { createdAt: 'desc' }
    })
    res.json(goals)
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch goals' })
  }
})

// POST /api/goals - Create a new goal
router.post('/', async (req: Request, res: Response) => {
  try {
    const user = await getDefaultUser()
    const { name, category, description, type, target, current, unit, dailyTarget, deadline } = req.body

    if (!name || !category || !type || target === undefined) {
      return res.status(400).json({ error: 'Missing required goal fields' })
    }

    const percentage = target > 0 ? Math.round(((current || 0) / target) * 100) : 0

    const goal = await prisma.goal.create({
      data: {
        userId: user.id,
        name,
        category,
        description: description || '',
        type,
        target: Number(target),
        current: current !== undefined ? Number(current) : 0,
        unit: unit || 'units',
        dailyTarget: dailyTarget !== undefined ? Number(dailyTarget) : 1,
        deadline: deadline || new Date().toISOString().split('T')[0],
        consistency: 70, // default placeholder starting consistency
        status: getGoalStatus(percentage)
      },
      include: { habits: true }
    })
    res.status(201).json(goal)
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to create goal' })
  }
})

// PUT /api/goals/:id - Update a goal
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, category, description, type, target, current, unit, dailyTarget, deadline } = req.body
    
    const goal = await prisma.goal.findUnique({ where: { id: req.params.id as string } })
    if (!goal) return res.status(404).json({ error: 'Goal not found' })

    const nextTarget = target !== undefined ? Number(target) : goal.target
    const nextCurrent = current !== undefined ? Number(current) : goal.current
    const percentage = nextTarget > 0 ? Math.round((nextCurrent / nextTarget) * 100) : 0

    const updatedGoal = await prisma.goal.update({
      where: { id: req.params.id as string },
      data: {
        name,
        category,
        description,
        type,
        target: nextTarget,
        current: nextCurrent,
        unit,
        dailyTarget: dailyTarget !== undefined ? Number(dailyTarget) : undefined,
        deadline,
        status: getGoalStatus(percentage)
      },
      include: { habits: true }
    })
    res.json(updatedGoal)
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to update goal' })
  }
})

// DELETE /api/goals/:id - Delete a goal
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await prisma.goal.delete({
      where: { id: req.params.id as string }
    })
    res.json({ success: true })
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to delete goal' })
  }
})

// POST /api/goals/:id/habits - Add a habit to a goal
router.post('/:id/habits', async (req: Request, res: Response) => {
  try {
    const { title, target } = req.body
    if (!title || !target) {
      return res.status(400).json({ error: 'Title and target are required' })
    }

    const habit = await prisma.habit.create({
      data: {
        goalId: req.params.id as string,
        title,
        target,
        completed: false,
        streak: 0
      }
    })
    res.status(201).json(habit)
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to create habit' })
  }
})

// PUT /api/goals/:id/habits/:habitId/toggle - Toggle habit completion and recalculate streaks and goal progress
router.put('/:id/habits/:habitId/toggle', async (req: Request, res: Response) => {
  try {
    const habit = await prisma.habit.findUnique({
      where: { id: req.params.habitId as string }
    })

    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' })
    }

    const goal = await prisma.goal.findUnique({
      where: { id: req.params.id as string }
    })

    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' })
    }

    const nextCompleted = !habit.completed
    const nextStreak = nextCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1)

    // 1. Update habit
    const updatedHabit = await prisma.habit.update({
      where: { id: habit.id },
      data: {
        completed: nextCompleted,
        streak: nextStreak
      }
    })

    // 2. Update parent goal progress
    const targetProgress = goal.current + (nextCompleted ? goal.dailyTarget : -goal.dailyTarget)
    const nextProgress = Math.max(0, Math.min(goal.target, targetProgress))
    const percentage = goal.target > 0 ? Math.round((nextProgress / goal.target) * 100) : 0

    const updatedGoal = await prisma.goal.update({
      where: { id: goal.id },
      data: {
        current: nextProgress,
        status: getGoalStatus(percentage)
      },
      include: { habits: { orderBy: { title: 'asc' } } }
    })

    res.json({ updatedHabit, updatedGoal })
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to toggle habit' })
  }
})

// DELETE /api/goals/:id/habits/:habitId - Delete a habit
router.delete('/:id/habits/:habitId', async (req: Request, res: Response) => {
  try {
    await prisma.habit.delete({
      where: { id: req.params.habitId as string }
    })
    res.json({ success: true })
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to delete habit' })
  }
})

export default router
