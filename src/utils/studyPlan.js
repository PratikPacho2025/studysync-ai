const priorityRank = { high: 0, medium: 1, low: 2 }

export function getStudyProgress(tasks) {
  const completed = tasks.filter((task) => task.status === 'completed').length
  return { completed, total: tasks.length, percentage: tasks.length ? Math.round((completed / tasks.length) * 100) : 0 }
}

export function getStudyTime(tasks) {
  const planned = tasks.reduce((total, task) => total + Number(task.duration), 0)
  const completed = tasks.filter((task) => task.status === 'completed').reduce((total, task) => total + Number(task.duration), 0)
  return { completed, planned }
}

export function getFocusTask(tasks) {
  return [...tasks].filter((task) => task.status !== 'completed' && task.status !== 'skipped').sort((first, second) => {
    const overdueRank = Number(second.status === 'overdue') - Number(first.status === 'overdue')
    if (overdueRank) return overdueRank
    const priorityRankDifference = priorityRank[first.priority] - priorityRank[second.priority]
    if (priorityRankDifference) return priorityRankDifference
    const dueDateRank = { today: 0, tomorrow: 1, 'in-2-days': 2 }
    return (dueDateRank[first.dueDate] ?? 3) - (dueDateRank[second.dueDate] ?? 3)
  })[0]
}