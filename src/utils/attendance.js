export function calculateAttendancePercentage(present, total) {
  return total === 0 ? 0 : Math.round((present / total) * 100)
}

export function getAttendanceStatus(percentage) {
  if (percentage >= 90) return 'excellent'
  if (percentage >= 80) return 'good'
  if (percentage >= 60) return 'needs-attention'
  return 'critical'
}