"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  role: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error("Failed to parse stored user:", e)
        localStorage.removeItem("user")
      }
    }
  }, [])

  // Client-side only login function - no API calls
  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Hardcoded credentials check
      if (email === "admin@securitysystem.com" && password === "admin123") {
        const userData = {
          id: 1,
          email: "admin@securitysystem.com",
          firstName: "Admin",
          lastName: "User",
          role: "admin",
        }

        // Store user in localStorage
        localStorage.setItem("user", JSON.stringify(userData))
        localStorage.setItem("token", "demo-token-12345")
        // Set token as a cookie for middleware
        document.cookie = `token=demo-token-12345; path=/;`;

        setUser(userData)
        return
      }

      // If credentials don't match
      throw new Error("Invalid email or password")
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message || "Login failed. Please try again.")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
