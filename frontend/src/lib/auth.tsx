import { createContext, useContext, ReactNode, useEffect, useState } from 'react'
import { authService, User as ApiUser } from '@/services/authService'
import { User } from './types'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = authService.getUser()
    if (storedUser) {
      setUser({
        id: storedUser.id.toString(),
        email: storedUser.email,
        name: storedUser.name,
        createdAt: storedUser.created_at || new Date().toISOString()
      })
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authService.login({ email, password })
      if (response.success) {
        setUser({
          id: response.user.id.toString(),
          email: response.user.email,
          name: response.user.name,
          createdAt: response.user.created_at || new Date().toISOString()
        })
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const response = await authService.register({
        email,
        password,
        name,
        password_confirmation: password
      })
      if (response.success) {
        setUser({
          id: response.user.id.toString(),
          email: response.user.email,
          name: response.user.name,
          createdAt: response.user.created_at || new Date().toISOString()
        })
        return true
      }
      return false
    } catch (error) {
      console.error('Register error:', error)
      return false
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
