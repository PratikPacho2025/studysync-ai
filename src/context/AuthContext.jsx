import { createContext, useContext, useMemo, useState } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getCurrentUser())
  // Reading the prototype session is synchronous. A real API-backed restore can
  // set this true until /api/auth/me resolves without changing consumer code.
  const [isLoading] = useState(false)

  async function login(email, password) {
    const nextUser = await authService.login(email, password)
    setUser(nextUser)
    return nextUser
  }

  async function signup(userData) {
    const nextUser = await authService.signup(userData)
    setUser(nextUser)
    return nextUser
  }

  async function logout() {
    await authService.logout()
    setUser(null)
  }

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    signup,
    logout,
  }), [user, isLoading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
