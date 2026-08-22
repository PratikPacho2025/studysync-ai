const priorityRank = { high: 0, medium: 1, low: 2 }

export function calculateProcrastinationRisk(data) {
  const factorScore = Math.min(100, data.missedSessions * 10) * 0.25
    + Math.min(100, data.ignoredReminders * 15) * 0.15
    + Math.min(100, data.pendingTopics * 12) * 0.25
    + Math.min(100, data.delayedRevisions * 20) * 0.2
    + data.examPressure * 0.15
  return Math.round(factorScore)
}

export function getRiskStatus(score) {
  if (score >= 80) return 'Critical'
  if (score >= 60) return 'High'
  if (score >= 30) return 'Medium'
  return 'Low'
}

export function getFocusTask(tasks) {
  return [...tasks].sort((first, second) => {
    const delayedRank = second.delayedCount - first.delayedCount
    if (delayedRank) return delayedRank
    return priorityRank[first.priority] - priorityRank[second.priority]
  })[0]
}