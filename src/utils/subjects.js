export function getSubjectProgress(subject) {
  if (subject.topics.length === 0) return 0
  return Math.round((subject.topics.filter((topic) => topic.status === 'completed').length / subject.topics.length) * 100)
}

export function getCompletedTopics(subject) {
  return subject.topics.filter((topic) => topic.status === 'completed').length
}

export function getWeakTopics(subject) {
  return subject.topics.filter((topic) => topic.quizAccuracy > 0 && topic.quizAccuracy < 60)
}

export function getSubjectStatus(subject) {
  const progress = getSubjectProgress(subject)
  if (progress >= 80) return 'excellent'
  if (progress >= 60) return 'on-track'
  if (progress >= 40) return 'needs-attention'
  return 'behind'
}