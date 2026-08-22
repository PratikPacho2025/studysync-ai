export const quizzes = [
  { id: 1, subject: 'DSA', topic: 'Arrays & Two Pointer', difficulty: 'medium', duration: 10, status: 'ready', questions: [
    { id: 101, question: 'Which technique is commonly used to solve pair-sum problems efficiently?', options: ['Two Pointer', 'DFS', 'BFS', 'Backtracking'], correctAnswer: 'Two Pointer', explanation: 'Two pointers solve sorted pair-sum problems efficiently.' },
    { id: 102, question: 'What is the average lookup time for a hash table?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], correctAnswer: 'O(1)', explanation: 'Hash tables provide constant average-time lookup.' },
    { id: 103, question: 'Which structure follows FIFO ordering?', options: ['Stack', 'Queue', 'Tree', 'Heap'], correctAnswer: 'Queue', explanation: 'A queue removes its oldest item first.' },
    { id: 104, question: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'], correctAnswer: 'O(log n)', explanation: 'Binary search halves the search space each step.' },
  ] },
  { id: 2, subject: 'DBMS', topic: 'Normalization', difficulty: 'easy', duration: 8, status: 'ready', questions: [
    { id: 201, question: 'Which normal form removes partial dependencies?', options: ['1NF', '2NF', '3NF', 'BCNF'], correctAnswer: '2NF', explanation: 'Second normal form removes partial dependencies.' },
    { id: 202, question: 'What identifies a row uniquely?', options: ['Foreign key', 'Primary key', 'View', 'Index'], correctAnswer: 'Primary key', explanation: 'A primary key uniquely identifies each row.' },
    { id: 203, question: 'Which command retrieves data?', options: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'], correctAnswer: 'SELECT', explanation: 'SELECT reads records from a database.' },
  ] },
  { id: 3, subject: 'Computer Networks', topic: 'OSI Model', difficulty: 'hard', duration: 10, status: 'ready', questions: [
    { id: 301, question: 'Which OSI layer routes packets?', options: ['Transport', 'Network', 'Session', 'Data Link'], correctAnswer: 'Network', explanation: 'The network layer handles logical addressing and routing.' },
    { id: 302, question: 'Which protocol is connection-oriented?', options: ['UDP', 'IP', 'TCP', 'DNS'], correctAnswer: 'TCP', explanation: 'TCP establishes a reliable connection before transfer.' },
    { id: 303, question: 'What does DNS translate?', options: ['Ports to services', 'Names to IP addresses', 'Packets to frames', 'Files to URLs'], correctAnswer: 'Names to IP addresses', explanation: 'DNS resolves domain names to IP addresses.' },
  ] },
]

export const quizHistory = [
  { id: 1, subject: 'DSA', topic: 'Arrays', score: 80, date: 'Today' },
  { id: 2, subject: 'DBMS', topic: 'Normalization', score: 72, date: 'Yesterday' },
  { id: 3, subject: 'Computer Networks', topic: 'OSI Model', score: 58, date: '2 days ago' },
]

export const weakTopics = [
  { name: 'Recursion', accuracy: 54 },
  { name: 'Two Pointer', accuracy: 58 },
  { name: 'Sliding Window', accuracy: 48 },
]