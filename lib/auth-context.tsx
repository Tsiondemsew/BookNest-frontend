"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

export type UserRole = "reader" | "author" | "publisher" | "admin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>
  logout: () => void
  switchRole: (role: UserRole) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Simulated users for demo
const demoUsers: Record<string, User> = {
  "reader@booknest.com": { id: "1", name: "John Reader", email: "reader@booknest.com", role: "reader" },
  "author@booknest.com": { id: "2", name: "James Clear", email: "author@booknest.com", role: "author" },
  "publisher@booknest.com": { id: "4", name: "Pam Publisher", email: "publisher@booknest.com", role: "publisher" },
  "admin@booknest.com": { id: "3", name: "Admin User", email: "admin@booknest.com", role: "admin" },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for saved user in localStorage on mount
    const savedUser = localStorage.getItem("booknest_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check for demo users or create a reader user
    const existingUser = demoUsers[email.toLowerCase()]
    const loggedInUser = existingUser || {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split("@")[0],
      email: email.toLowerCase(),
      role: "reader" as UserRole,
    }

    setUser(loggedInUser)
    localStorage.setItem("booknest_user", JSON.stringify(loggedInUser))
    setIsLoading(false)

    // Redirect based on role
    redirectToRoleDashboard(loggedInUser.role)
  }

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email: email.toLowerCase(),
      role,
    }

    setUser(newUser)
    localStorage.setItem("booknest_user", JSON.stringify(newUser))
    setIsLoading(false)

    // Redirect based on role
    redirectToRoleDashboard(role)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("booknest_user")
    router.push("/")
  }

  const switchRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role }
      setUser(updatedUser)
      localStorage.setItem("booknest_user", JSON.stringify(updatedUser))
      redirectToRoleDashboard(role)
    }
  }

  const redirectToRoleDashboard = (role: UserRole) => {
    switch (role) {
      case "admin":
        router.push("/admin")
        break
      case "publisher":
        router.push("/publisher")
        break
      case "author":
        router.push("/author")
        break
      default:
        router.push("/dashboard")
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
