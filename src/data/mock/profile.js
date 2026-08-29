// ─────────────────────────────────────────────────────────────
//  Mock Profile Data
//  Used for local state until backend auth is implemented.
// ─────────────────────────────────────────────────────────────

export const mockProfile = {
  name: 'Pratik',
  email: 'student@example.com',
  college: 'ABC Engineering College',
  course: 'B.E.',
  branch: 'Computer Engineering',
  year: 'Third Year',
  semester: '5',
}

export const mockProfileStats = {
  studyHealth: 78,
  attendance: 82,
  knowledge: 72,
  goals: 65,
}

export const defaultSettings = {
  // Study preferences
  dailyStudyGoal: 2,
  studyDuration: 45,
  breakDuration: 10,
  studyMode: 'balanced',

  // Notifications
  studyReminders: true,
  revisionReminders: true,
  quizReminders: true,
  goalReminders: true,
  examReminders: true,
  attendanceAlerts: true,
  procrastinationAlerts: true,

  // AI Mentor
  aiMentor: true,
  personalizedRecommendations: true,
  progressAnalysis: true,
  procrastinationInsights: true,

  // Appearance
  theme: 'system',
}
