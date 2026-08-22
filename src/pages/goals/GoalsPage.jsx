import { useMemo, useState } from 'react'
import { AddGoalSheet, GoalCard, GoalCategoryTabs, GoalDetailsSheet, GoalSummary, GoalsHeader, HabitList } from '../../components/goals'
import { dailyHabits as initialHabits, goals as initialGoals } from '../../data/mock/goals'
import { getGoalProgress, getGoalStatus, getGoalStreak } from '../../utils/goals'

export function GoalsPage() {
  const [goals, setGoals] = useState(initialGoals)
  const [habits, setHabits] = useState(initialHabits)
  const [category, setCategory] = useState('all')
  const [selectedGoal, setSelectedGoal] = useState(null)
  const [editingGoal, setEditingGoal] = useState(null)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const visibleGoals = useMemo(() => goals.filter((goal) => category === 'all' || goal.category === category).sort((first, second) => getGoalProgress(second) - getGoalProgress(first)), [category, goals])
  const completedHabits = habits.filter((habit) => habit.completed).length
  const summary = { completed: completedHabits, total: habits.length, percentage: Math.round((completedHabits / habits.length) * 100), active: goals.filter((goal) => getGoalProgress(goal) < 100).length, finished: goals.filter((goal) => getGoalProgress(goal) >= 100).length, streak: Math.max(...habits.map((habit) => getGoalStreak([habit], habit.goalId))) }

  function saveGoal(goal) { setGoals((current) => editingGoal ? current.map((item) => item.id === goal.id ? goal : item) : [...current, goal]); setEditingGoal(null); setIsAddOpen(false) }
  function toggleHabit(habitId) { const habit = habits.find((item) => item.id === habitId); setHabits((current) => current.map((item) => item.id === habitId ? { ...item, completed: !item.completed, streak: !item.completed ? item.streak + 1 : Math.max(0, item.streak - 1) } : item)); if (habit && !habit.completed) setGoals((current) => current.map((goal) => goal.id === habit.goalId ? { ...goal, current: Math.min(goal.target, goal.current + 1), consistency: Math.min(100, goal.consistency + 1) } : goal)) }
  function logProgress(goal) { setGoals((current) => current.map((item) => item.id === goal.id ? { ...item, current: Math.min(item.target, item.current + 1), consistency: Math.min(100, item.consistency + 2) } : item)); setSelectedGoal(null) }
  function deleteGoal(goal) { if (window.confirm(`Delete ${goal.name}?`)) { setGoals((current) => current.filter((item) => item.id !== goal.id)); setSelectedGoal(null) } }
  const goalNames = Object.fromEntries(goals.map((goal) => [goal.id, goal.name]))
  return <div className="mx-auto w-full max-w-6xl space-y-7 pb-2"><GoalsHeader onAdd={() => { setEditingGoal(null); setIsAddOpen(true) }} /><div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"><GoalSummary summary={summary} /><HabitList habits={habits} goalNames={goalNames} onToggle={toggleHabit} /></div><section aria-labelledby="goal-category-title"><div className="mb-4"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">Long-term direction</p><h2 id="goal-category-title" className="mt-1 text-2xl font-semibold text-[var(--color-ink)]">Categories</h2></div><GoalCategoryTabs selected={category} onChange={setCategory} /></section><section aria-labelledby="goals-list-title"><div className="mb-4 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">Your commitments</p><h2 id="goals-list-title" className="mt-1 text-2xl font-semibold text-[var(--color-ink)]">My Goals</h2></div><span className="text-xs font-semibold text-[var(--color-muted)]">{visibleGoals.length} shown</span></div><div className="grid gap-4 sm:grid-cols-2">{visibleGoals.map((goal) => <GoalCard key={goal.id} goal={goal} status={getGoalStatus(goal)} onSelect={setSelectedGoal} onEdit={(item) => { setEditingGoal(item); setIsAddOpen(true) }} onDelete={deleteGoal} />)}</div></section><GoalDetailsSheet goal={selectedGoal} habits={habits} onClose={() => setSelectedGoal(null)} onEdit={(goal) => { setSelectedGoal(null); setEditingGoal(goal); setIsAddOpen(true) }} onLog={logProgress} /><AddGoalSheet key={editingGoal?.id ?? 'new'} isOpen={isAddOpen} goal={editingGoal} onClose={() => { setIsAddOpen(false); setEditingGoal(null) }} onSave={saveGoal} /></div>
}