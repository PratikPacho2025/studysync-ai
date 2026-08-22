// ─────────────────────────────────────────────────────────────
//  Mock data for AI Mentor
//  Replace with real API responses when backend is ready.
// ─────────────────────────────────────────────────────────────

export const aiMentorUser = {
  name: 'Pratik',
}

// Welcome card — simulates AI reading the student's current state
export const welcomeData = {
  pendingRevisions: 2,
  weakTopics: 1,
  availableHours: 3,
  primaryRecommendation: {
    label: 'Start DSA Revision',
    path: '/revision',
  },
}

// Insight cards — short, actionable observations
export const aiInsights = [
  {
    id: 'dsa-accuracy',
    title: 'DSA needs attention',
    description:
      'Your Recursion quiz accuracy is 54%. This topic is also overdue for revision.',
    actionLabel: 'Practice DSA',
    actionPath: '/quiz',
  },
  {
    id: 'attendance-revision',
    title: 'Revision consistency is low',
    description:
      'Your attendance is strong (85%), but you have only completed 40% of scheduled revisions this week.',
    actionLabel: 'Open Revision',
    actionPath: '/revision',
  },
  {
    id: 'exam-pressure',
    title: 'Exam in 12 days',
    description:
      'Your DSA exam is approaching. You have completed 8 of 12 topics. Four topics still need attention.',
    actionLabel: 'View Subjects',
    actionPath: '/subjects',
  },
]

// Recommendation card — top single recommendation
export const topRecommendation = {
  subject: 'DSA',
  topic: 'Recursion',
  duration: 30,
  reason: 'Low quiz accuracy (54%) and overdue revision',
  startPath: '/revision',
}

// Quick action mock responses
// Each key maps to a predefined AI reply used by aiMentorService
export const mockResponses = {
  planDay: {
    message:
      "Based on your pending revisions and today's available time (≈3 hours), here's your study plan:\n\n1. **DSA — Recursion** · 30 min (overdue revision, low accuracy)\n2. **CN Quiz** · 20 min (scheduled today)\n3. **DBMS — Transactions** · 25 min (in progress, 62% complete)\n\nStart with DSA while your focus is freshest. Take a 10-minute break between sessions.",
    actions: [
      { label: 'Open Study Planner', path: '/study' },
      { label: 'Start Revision', path: '/revision' },
    ],
  },

  whatStudy: {
    message:
      'Your highest priority right now is **DSA Recursion**.\n\nHere\'s why:\n- Quiz accuracy: 54% (below the 70% target)\n- Revision is overdue\n- Your DSA exam is 12 days away\n\nAfter Recursion, consider reviewing DBMS Transactions — it\'s 62% complete and a quick win.',
    actions: [
      { label: 'View Weak Topics', path: '/quiz' },
      { label: 'Start Revision', path: '/revision' },
    ],
  },

  progress: {
    message:
      'Your **Study Health Score is 78/100** — that\'s "Good".\n\nBreakdown:\n- Attendance: 85% ✓\n- Consistency: 72% (room to improve)\n- Revision: 68% (needs attention)\n- Quiz Performance: 82% ✓\n- Goals: 91% ✓\n\nYour biggest opportunity is revision consistency. You\'ve missed 2 sessions this week.',
    actions: [
      { label: 'View Analytics', path: '/analytics' },
      { label: 'Open Revision', path: '/revision' },
    ],
  },

  exam: {
    message:
      'Your **DSA exam is 12 days away**.\n\nReadiness: 72%\n- Completed: 8 of 12 topics\n- Pending: Recursion, Dynamic Programming, Two Pointer, Graph Basics\n\nAt your current pace, focus on one topic per day. Prioritise Recursion and Two Pointer — both have low quiz accuracy.',
    actions: [
      { label: 'View Subjects', path: '/subjects' },
      { label: 'Start Quiz', path: '/quiz' },
    ],
  },

  procrastination: {
    message:
      "You delayed **3 study sessions** this week. Most delays happened with longer tasks (45+ min sessions).\n\nTry this:\n1. Start with a **20-minute session** — any topic\n2. Use the built-in timer so you see progress\n3. Celebrate finishing — even small sessions count\n\nProcrastination often fades once you start. The first 5 minutes are the hardest.",
    actions: [
      { label: 'View Focus Tracker', path: '/procrastination' },
      { label: 'Start a Short Session', path: '/study' },
    ],
  },

  // Fallback responses for freeform questions
  fallback: [
    {
      triggers: ['recursion', 'recurse'],
      message:
        'Your **Recursion** accuracy is 54% and the revision is overdue. I recommend a focused 30-minute revision session today. Use the Revision module to track your confidence afterwards.',
      actions: [{ label: 'Start Revision', path: '/revision' }],
    },
    {
      triggers: ['exam', 'ready', 'readiness', 'prepared'],
      message:
        'Your DSA readiness is **72%**. You have completed 8 of 12 topics. Recursion and Dynamic Programming need the most attention before your exam in 12 days.',
      actions: [
        { label: 'View Subjects', path: '/subjects' },
        { label: 'Take a Quiz', path: '/quiz' },
      ],
    },
    {
      triggers: ['procrastinat', 'lazy', 'delay', 'distract'],
      message:
        "You delayed 3 sessions this week — most with 45+ min tasks. Try starting with a **20-minute focused session**. The Procrastination Tracker has more detail on your patterns.",
      actions: [{ label: 'View Focus Tracker', path: '/procrastination' }],
    },
    {
      triggers: ['attendance'],
      message:
        'Your overall attendance is **85%** — that\'s solid. Operating Systems is at 68%, which needs attention to avoid academic issues. Mark your attendance regularly so I can track it accurately.',
      actions: [{ label: 'View Attendance', path: '/attendance' }],
    },
    {
      triggers: ['goal', 'habit'],
      message:
        'Your goals completion is **91%** — excellent! You\'re on a strong habit streak. Keep logging daily habits to maintain your momentum. Consistency is the key to long-term improvement.',
      actions: [{ label: 'View Goals', path: '/goals' }],
    },
    {
      triggers: ['quiz', 'test', 'knowledge', 'accuracy'],
      message:
        'Your overall quiz accuracy is **76%**. Your strongest subject is DBMS (SQL Joins: 91%). Your weakest is DSA Recursion at 54%. I recommend 2–3 quiz sessions per week per subject.',
      actions: [{ label: 'Take a Quiz', path: '/quiz' }],
    },
    {
      triggers: ['timetable', 'schedule', 'class', 'lecture'],
      message:
        'You have **3 classes today** — DSA at 9:00, CN at 11:00, and Web Tech at 14:00. Check your timetable to plan study sessions around your lectures.',
      actions: [{ label: 'Open Timetable', path: '/timetable' }],
    },
    {
      triggers: ['subject', 'topic', 'syllabus', 'curriculum'],
      message:
        'You are studying 4 subjects: DSA (72% progress), DBMS (65%), Operating Systems (48%), and Computer Networks (83%). Your weakest subject by progress is Operating Systems.',
      actions: [{ label: 'View Subjects', path: '/subjects' }],
    },
    {
      triggers: ['revision', 'revise', 'spaced', 'flashcard'],
      message:
        'You have **2 revisions due today**. Spaced repetition helps retain knowledge far longer than re-reading. Open the Revision module to mark them complete.',
      actions: [{ label: 'Open Revision', path: '/revision' }],
    },
    {
      triggers: ['study', 'plan', 'planner', 'task', 'session'],
      message:
        'Your Study Planner has 2 pending tasks for today: DSA Arrays revision and CN review. You have approximately 3 hours available. Start with the highest-priority task first.',
      actions: [{ label: 'Open Study Planner', path: '/study' }],
    },
    {
      triggers: ['health', 'score', 'performance', 'analysis', 'analytic'],
      message:
        'Your Study Health is **78/100** — "Good". Attendance and goals are strong. Your opportunity areas are revision consistency (68%) and study rhythm (72%). Review your analytics for a full breakdown.',
      actions: [{ label: 'View Analytics', path: '/analytics' }],
    },
  ],

  // Default reply when no match found
  defaultReply: {
    message:
      "I don't have specific data on that yet, but here's what I know about your current situation:\n\n- Study Health: 78/100\n- DSA Recursion needs revision (54% accuracy)\n- Exam in 12 days\n- 2 pending revisions today\n\nWould you like me to help you plan your day, check your progress, or prepare for your exam?",
    actions: [
      { label: 'Plan My Day', quickAction: 'planDay' },
      { label: 'Check Progress', quickAction: 'progress' },
    ],
  },
}

// Initial greeting message shown when the chat first opens
export const initialAssistantMessage = {
  id: 'init-0',
  role: 'assistant',
  content:
    "Hello! I'm your AI Study Mentor. I can see your study progress, revisions, quiz performance, and more.\n\nTap a quick action below or ask me anything about your studies.",
  timestamp: new Date(),
}
