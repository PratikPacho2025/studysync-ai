export function calculateScore(quiz, answers) {
  return quiz.questions.reduce((score, question, index) => score + (answers[index] === question.correctAnswer ? 1 : 0), 0)
}

export function calculateAccuracy(score, total) { return total ? Math.round((score / total) * 100) : 0 }

export function getKnowledgeFeedback(accuracy) {
  if (accuracy >= 80) return 'Strong'
  if (accuracy >= 60) return 'Needs Practice'
  return 'Weak'
}