// ─────────────────────────────────────────────────────────────
//  StudySync API Client
//  Binds frontend pages to Node/Express/Prisma backend REST routes.
// ─────────────────────────────────────────────────────────────

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  })
  
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.error || `HTTP error! Status: ${response.status}`)
  }
  return data
}

export const api = {
  // ── Dashboard ──
  fetchDashboard() {
    return fetchJson('/api/dashboard')
  },

  // ── Subjects & Topics ──
  fetchSubjects() {
    return fetchJson('/api/subjects')
  },
  createSubject(data) {
    return fetchJson('/api/subjects', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },
  updateSubject(id, data) {
    return fetchJson(`/api/subjects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  },
  deleteSubject(id) {
    return fetchJson(`/api/subjects/${id}`, {
      method: 'DELETE'
    })
  },
  createTopic(subjectId, data) {
    return fetchJson(`/api/subjects/${subjectId}/topics`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },
  updateTopic(subjectId, topicId, data) {
    return fetchJson(`/api/subjects/${subjectId}/topics/${topicId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  },
  updateTopicStatus(subjectId, topicId, statusData) {
    return fetchJson(`/api/subjects/${subjectId}/topics/${topicId}/status`, {
      method: 'PUT',
      body: JSON.stringify(statusData)
    })
  },
  deleteTopic(subjectId, topicId) {
    return fetchJson(`/api/subjects/${subjectId}/topics/${topicId}`, {
      method: 'DELETE'
    })
  },

  // ── Timetable ──
  fetchTimetable() {
    return fetchJson('/api/timetable')
  },
  createLecture(data) {
    return fetchJson('/api/timetable', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },
  updateLecture(id, data) {
    return fetchJson(`/api/timetable/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  },
  deleteLecture(id) {
    return fetchJson(`/api/timetable/${id}`, {
      method: 'DELETE'
    })
  },

  // ── Attendance ──
  fetchAttendance() {
    return fetchJson('/api/attendance')
  },
  markAttendance(data) {
    return fetchJson('/api/attendance', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },

  // ── Study Planner ──
  fetchStudyTasks() {
    return fetchJson('/api/study')
  },
  createStudyTask(data) {
    return fetchJson('/api/study', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },
  updateStudyTask(id, data) {
    return fetchJson(`/api/study/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  },
  deleteStudyTask(id) {
    return fetchJson(`/api/study/${id}`, {
      method: 'DELETE'
    })
  },

  // ── Revision (Spaced Repetition) ──
  fetchRevisions() {
    return fetchJson('/api/revision')
  },
  completeRevision(id, reflection) {
    return fetchJson(`/api/revision/${id}/complete`, {
      method: 'POST',
      body: JSON.stringify(reflection)
    })
  },
  scheduleRevision(data) {
    return fetchJson('/api/revision', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },

  // ── Quiz ──
  fetchQuizzes() {
    return fetchJson('/api/quiz')
  },
  submitQuizAttempt(quizId, score) {
    return fetchJson(`/api/quiz/${quizId}/attempt`, {
      method: 'POST',
      body: JSON.stringify({ score })
    })
  },

  // ── Goals & Habits ──
  fetchGoals() {
    return fetchJson('/api/goals')
  },
  createGoal(data) {
    return fetchJson('/api/goals', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },
  updateGoal(id, data) {
    return fetchJson(`/api/goals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  },
  deleteGoal(id) {
    return fetchJson(`/api/goals/${id}`, {
      method: 'DELETE'
    })
  },
  createHabit(goalId, data) {
    return fetchJson(`/api/goals/${goalId}/habits`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },
  toggleHabit(goalId, habitId) {
    return fetchJson(`/api/goals/${goalId}/habits/${habitId}/toggle`, {
      method: 'PUT'
    })
  },
  deleteHabit(goalId, habitId) {
    return fetchJson(`/api/goals/${goalId}/habits/${habitId}`, {
      method: 'DELETE'
    })
  },

  // ── Analytics ──
  fetchAnalytics() {
    return fetchJson('/api/analytics')
  },

  // ── Procrastination ──
  fetchProcrastination() {
    return fetchJson('/api/procrastination')
  },

  // ── Document Scanning ──
  uploadTimetable(file) {
    const formData = new FormData()
    formData.append('file', file)
    return fetch('/api/timetable/upload', {
      method: 'POST',
      body: formData
    }).then(async (res) => {
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      return data
    })
  },
  uploadSyllabus(file) {
    const formData = new FormData()
    formData.append('file', file)
    return fetch('/api/subjects/upload-syllabus', {
      method: 'POST',
      body: formData
    }).then(async (res) => {
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      return data
    })
  }
}
