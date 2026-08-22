export const dashboardData = {
  user: { name: 'Pratik' },
  todaySummary: [
    { label: 'Classes', value: 3 },
    { label: 'Study tasks', value: 2 },
    { label: 'Revision', value: 1 },
    { label: 'Quiz', value: 1 },
  ],
  classes: [
    { time: '09:00', subject: 'DSA', title: 'Design and Analysis of Algorithms', room: 'Room 204' },
    { time: '11:00', subject: 'CN', title: 'Computer Networks', room: 'Lab 3' },
    { time: '14:00', subject: 'Web Tech', title: 'Web Technologies', room: 'Room 108' },
  ],
  studyTasks: [
    { id: 1, title: 'Revise DSA Arrays', subject: 'DSA', priority: 'High', dueTime: '10:30' },
    { id: 2, title: 'Revise Computer Networks', subject: 'CN', priority: 'Medium', dueTime: '16:00' },
    { id: 3, title: 'Complete Web Technologies Quiz', subject: 'Web Tech', priority: 'Low', dueTime: '18:30' },
  ],
  subjects: [
    { name: 'DSA', progress: 72, color: '#277c68' },
    { name: 'DBMS', progress: 65, color: '#5e8d7b' },
    { name: 'Operating Systems', progress: 48, color: '#c28a3d' },
    { name: 'Computer Networks', progress: 83, color: '#3d7280' },
  ],
  attendance: [
    { name: 'DSA', value: 78 },
    { name: 'DBMS', value: 92 },
    { name: 'Operating Systems', value: 68, attention: true },
    { name: 'Computer Networks', value: 85 },
  ],
  studyHealth: {
    score: 78,
    status: 'Good',
    metrics: [
      { label: 'Attendance', value: 85 },
      { label: 'Consistency', value: 72 },
      { label: 'Revision', value: 68 },
      { label: 'Quiz performance', value: 82 },
      { label: 'Goals', value: 91 },
    ],
  },
  procrastination: {
    risk: 'Medium',
    missedSessions: 2,
    suggestion: 'Complete your DSA revision before starting another task.',
  },
  upcomingExam: {
    subject: 'Design and Analysis of Algorithms',
    daysRemaining: 12,
    preparation: 64,
    topicsRemaining: 12,
  },
  aiRecommendation: {
    message: "You attended DSA today but haven't revised the topic yet.",
    duration: '25 minutes',
    topic: 'Arrays & Two Pointer',
  },
}