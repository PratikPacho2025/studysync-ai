export const studyTasks = [
  { id: 1, title: 'Revise DSA Arrays', subject: 'DSA', topic: 'Arrays & Two Pointer', type: 'revision', duration: 30, priority: 'high', dueDate: 'today', dueTime: '7:00 PM', status: 'pending' },
  { id: 2, title: 'Complete CN Quiz', subject: 'Computer Networks', topic: 'OSI Model', type: 'quiz', duration: 20, priority: 'medium', dueDate: 'today', dueTime: '8:00 PM', status: 'pending' },
  { id: 3, title: 'Review DBMS joins', subject: 'DBMS', topic: 'SQL Joins', type: 'study', duration: 25, priority: 'medium', dueDate: 'today', dueTime: '9:00 PM', status: 'completed' },
  { id: 4, title: 'Practice React forms', subject: 'Web Technologies', topic: 'React Components', type: 'practice', duration: 35, priority: 'low', dueDate: 'today', dueTime: '10:00 PM', status: 'pending' },
  { id: 5, title: 'Read process scheduling', subject: 'Operating Systems', topic: 'Process Scheduling', type: 'reading', duration: 40, priority: 'high', dueDate: 'tomorrow', dueTime: '9:00 AM', status: 'overdue' },
  { id: 6, title: 'Revise routing protocols', subject: 'Computer Networks', topic: 'Routing Protocols', type: 'revision', duration: 30, priority: 'medium', dueDate: 'in-2-days', dueTime: '5:00 PM', status: 'pending' },
]

export const taskTypes = ['study', 'revision', 'quiz', 'practice', 'assignment', 'reading']

export const blankStudyTask = {
  title: '', subject: '', topic: '', type: 'study', duration: 30, priority: 'medium', dueDate: 'today', dueTime: '7:00 PM', status: 'pending',
}