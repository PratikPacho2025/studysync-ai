// Temporary client-side adapter. Replace these functions with /api/auth calls
// when the authentication backend is available. Passwords are never retained.
const SESSION_KEY = 'studysync_mock_user'

const defaultUser = {
  id: 'user-001',
  name: 'Pratik',
  email: 'student@example.com',
}

function wait() {
  return new Promise((resolve) => setTimeout(resolve, 450))
}

function saveUser(user) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user))
}

export const authService = {
  async login(email, _password) {
    await wait()
    const stored = this.getCurrentUser()
    const user = stored ?? { ...defaultUser, email: email.trim().toLowerCase() }
    saveUser(user)
    return user
  },

  async signup(userData) {
    await wait()
    const user = {
      id: 'user-001',
      name: userData.name.trim(),
      email: userData.email.trim().toLowerCase(),
      college: userData.college?.trim() || undefined,
      course: userData.course?.trim() || undefined,
      branch: userData.branch?.trim() || undefined,
      year: userData.year?.trim() || undefined,
      semester: userData.semester?.trim() || undefined,
    }
    saveUser(user)
    return user
  },

  async logout() {
    await wait()
    sessionStorage.removeItem(SESSION_KEY)
  },

  getCurrentUser() {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  },
}
