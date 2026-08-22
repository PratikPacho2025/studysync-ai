export const timetableDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export const emptyLecture = {
  subject: '',
  topic: '',
  day: 'Monday',
  startTime: '09:00',
  endTime: '10:00',
  room: '',
  teacher: '',
  status: 'upcoming',
}

export const timetableData = [
  { id: 1, day: 'Monday', subject: 'DSA', topic: 'Arrays & Two Pointer', startTime: '09:00', endTime: '10:00', room: '301', teacher: 'Prof. Sharma', status: 'completed' },
  { id: 2, day: 'Monday', subject: 'DBMS', topic: 'Relational Algebra', startTime: '11:00', endTime: '12:00', room: '204', teacher: 'Dr. Mehta', status: 'upcoming' },
  { id: 3, day: 'Tuesday', subject: 'Computer Networks', topic: 'Network Layers', startTime: '10:00', endTime: '11:30', room: 'Lab 3', teacher: 'Prof. Iyer', status: 'ongoing' },
  { id: 4, day: 'Tuesday', subject: 'Operating Systems', topic: 'Process Scheduling', startTime: '14:00', endTime: '15:00', room: '105', teacher: 'Dr. Rao', status: 'upcoming' },
  { id: 5, day: 'Wednesday', subject: 'Web Technologies', topic: 'React Components', startTime: '09:00', endTime: '10:30', room: 'Lab 2', teacher: 'Prof. Khan', status: 'completed' },
  { id: 6, day: 'Wednesday', subject: 'DSA', topic: 'Trees and Graphs', startTime: '13:00', endTime: '14:00', room: '301', teacher: 'Prof. Sharma', status: 'upcoming' },
  { id: 7, day: 'Thursday', subject: 'DBMS', topic: 'SQL Joins', startTime: '11:00', endTime: '12:00', room: '204', teacher: 'Dr. Mehta', status: 'cancelled' },
  { id: 8, day: 'Thursday', subject: 'Computer Networks', topic: 'Routing Protocols', startTime: '14:00', endTime: '15:30', room: 'Lab 3', teacher: 'Prof. Iyer', status: 'upcoming' },
  { id: 9, day: 'Friday', subject: 'Operating Systems', topic: 'Memory Management', startTime: '09:00', endTime: '10:00', room: '105', teacher: 'Dr. Rao', status: 'upcoming' },
  { id: 10, day: 'Friday', subject: 'Web Technologies', topic: 'Accessibility Basics', startTime: '12:00', endTime: '13:00', room: 'Lab 2', teacher: 'Prof. Khan', status: 'upcoming' },
]