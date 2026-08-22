export const subjects = [
  {
    id: 1, name: 'DSA', code: 'CS3212', teacher: 'Prof. Sharma', description: 'Design and Analysis of Algorithms', attendance: 78,
    topics: [
      { id: 101, name: 'Arrays', description: 'Core array operations', status: 'completed', studyProgress: 100, quizAccuracy: 88, revisionStatus: 'completed' },
      { id: 102, name: 'Sorting', description: 'Comparison and non-comparison sorting', status: 'completed', studyProgress: 100, quizAccuracy: 82, revisionStatus: 'completed' },
      { id: 103, name: 'Recursion', description: 'Thinking recursively', status: 'in-progress', studyProgress: 65, quizAccuracy: 54, revisionStatus: 'pending' },
      { id: 104, name: 'Two Pointer', description: 'Efficient array traversal', status: 'not-started', studyProgress: 0, quizAccuracy: 58, revisionStatus: 'pending' },
      { id: 105, name: 'Trees', description: 'Tree data structures', status: 'not-started', studyProgress: 15, quizAccuracy: 62, revisionStatus: 'pending' },
    ],
  },
  {
    id: 2, name: 'DBMS', code: 'CS3213', teacher: 'Dr. Mehta', description: 'Database Management Systems', attendance: 92,
    topics: [
      { id: 201, name: 'SQL Joins', description: 'Combining relational data', status: 'completed', studyProgress: 100, quizAccuracy: 91, revisionStatus: 'completed' },
      { id: 202, name: 'Normalization', description: 'Designing clean schemas', status: 'completed', studyProgress: 100, quizAccuracy: 87, revisionStatus: 'completed' },
      { id: 203, name: 'Transactions', description: 'Reliable database operations', status: 'in-progress', studyProgress: 62, quizAccuracy: 74, revisionStatus: 'pending' },
      { id: 204, name: 'Indexing', description: 'Faster database queries', status: 'not-started', studyProgress: 0, quizAccuracy: 0, revisionStatus: 'pending' },
    ],
  },
  {
    id: 3, name: 'Operating Systems', code: 'CS3214', teacher: 'Dr. Rao', description: 'Processes, memory, and systems', attendance: 68,
    topics: [
      { id: 301, name: 'Processes', description: 'Process lifecycle and control', status: 'completed', studyProgress: 100, quizAccuracy: 76, revisionStatus: 'completed' },
      { id: 302, name: 'Memory Management', description: 'Paging and allocation', status: 'in-progress', studyProgress: 48, quizAccuracy: 57, revisionStatus: 'pending' },
      { id: 303, name: 'Deadlocks', description: 'Avoiding resource deadlocks', status: 'not-started', studyProgress: 0, quizAccuracy: 0, revisionStatus: 'pending' },
    ],
  },
  {
    id: 4, name: 'Computer Networks', code: 'CS3215', teacher: 'Prof. Iyer', description: 'Networks and communication protocols', attendance: 85,
    topics: [
      { id: 401, name: 'Network Layers', description: 'The layered network model', status: 'completed', studyProgress: 100, quizAccuracy: 89, revisionStatus: 'completed' },
      { id: 402, name: 'Routing Protocols', description: 'Finding paths across networks', status: 'completed', studyProgress: 100, quizAccuracy: 84, revisionStatus: 'completed' },
      { id: 403, name: 'Transport Layer', description: 'Reliable end-to-end delivery', status: 'in-progress', studyProgress: 55, quizAccuracy: 71, revisionStatus: 'pending' },
    ],
  },
]