import { useEffect, useMemo, useState } from 'react'
import { AddGoalSheet, GoalCard, GoalCategoryTabs, GoalDetailsSheet, GoalSummary, GoalsHeader, HabitList } from '../../components/goals'
import { getGoalProgress, getGoalStatus } from '../../utils/goals'
import { api } from '../../services/api'

export function GoalsPage() {
  const [goals, setGoals] = useState([])
  const [habits, setHabits] = useState([])
  const [category, setCategory] = useState('all')
  const [selectedGoal, setSelectedGoal] = useState(null)
  const [editingGoal, setEditingGoal] = useState(null)
  const [isAddOpen, setIsAddOpen] = useState(false)

  function loadGoalsAndHabits() {
    api.fetchGoals().then((data) => {
      setGoals(data)
      const allHabits = data.flatMap((goal) => goal.habits.map(h => ({ ...h, goalId: goal.id })))
      setHabits(allHabits)
    }).catch(console.error)
  }

  useEffect(() => {
    loadGoalsAndHabits()
  }, [])

  const visibleGoals = useMemo(() => goals.filter((goal) => category === 'all' || goal.category === category).sort((first, second) => getGoalProgress(second) - getGoalProgress(first)), [category, goals])
  const completedHabits = habits.filter((habit) => habit.completed).length
  
  const maxStreak = useMemo(() => {
    if (habits.length === 0) return 0
    return Math.max(...habits.map(h => h.streak))
  }, [habits])

  const summary = { 
    completed: completedHabits, 
    total: habits.length, 
    percentage: habits.length > 0 ? Math.round((completedHabits / habits.length) * 100) : 0, 
    active: goals.filter((goal) => getGoalProgress(goal) < 100).length, 
    finished: goals.filter((goal) => getGoalProgress(goal) >= 100).length, 
    streak: maxStreak
  }

  function saveGoal(goal) { 
    if (editingGoal) {
      api.updateGoal(goal.id, goal).then(loadGoalsAndHabits).catch(console.error)
    } else {
      api.createGoal(goal).then(loadGoalsAndHabits).catch(console.error)
    }
    setEditingGoal(null); setIsAddOpen(false) 
  }
  function toggleHabit(habitId) { 
    const habit = habits.find((item) => item.id === habitId)
    if (!habit) return
    api.toggleHabit(habit.goalId, habitId).then(loadGoalsAndHabits).catch(console.error)
  }
  function logProgress(goal) { 
    api.updateGoal(goal.id, { current: Math.min(goal.target, goal.current + goal.dailyTarget) }).then(loadGoalsAndHabits).catch(console.error)
    setSelectedGoal(null) 
  }
  function deleteGoal(goal) { 
    if (window.confirm(`Delete ${goal.name}?`)) { 
      api.deleteGoal(goal.id).then(loadGoalsAndHabits).catch(console.error)
      setSelectedGoal(null) 
    } 
  }

  const goalNames = Object.fromEntries(goals.map((goal) => [goal.id, goal.name]))
  
  return <div className="mx-auto w-full max-w-6xl space-y-7 pb-2"><GoalsHeader onAdd={() => { setEditingGoal(null); setIsAddOpen(true) }} /><div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"><GoalSummary summary={summary} /><HabitList habits={habits} goalNames={goalNames} onToggle={toggleHabit} /></div><section aria-labelledby="goal-category-title"><div className="mb-4"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">Long-term direction</p><h2 id="goal-category-title" className="mt-1 text-2xl font-semibold text-[var(--color-ink)]">Categories</h2></div><GoalCategoryTabs selected={category} onChange={setCategory} /></section><section aria-labelledby="goals-list-title"><div className="mb-4 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">Your commitments</p><h2 id="goals-list-title" className="mt-1 text-2xl font-semibold text-[var(--color-ink)]">My Goals</h2></div><span className="text-xs font-semibold text-[var(--color-muted)]">{visibleGoals.length} shown</span></div><div className="grid gap-4 sm:grid-cols-2">{visibleGoals.map((goal) => <GoalCard key={goal.id} goal={goal} status={getGoalStatus(goal)} onSelect={setSelectedGoal} onEdit={(item) => { setEditingGoal(item); setIsAddOpen(true) }} onDelete={deleteGoal} />)}</div></section><GoalDetailsSheet goal={selectedGoal} habits={habits} onClose={() => setSelectedGoal(null)} onEdit={(goal) => { setSelectedGoal(null); setEditingGoal(goal); setIsAddOpen(true) }} onLog={logProgress} /><AddGoalSheet key={editingGoal?.id ?? 'new'} isOpen={isAddOpen} goal={editingGoal} onClose={() => { setIsAddOpen(false); setEditingGoal(null) }} onSave={saveGoal} /></div>
}