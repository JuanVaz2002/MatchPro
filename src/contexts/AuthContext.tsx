"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User, Candidate, Employer } from "../types"

interface RegisterData {
  username: string
  email: string
  password: string
  role: "candidate" | "employer"
  // Profile data
  fullName?: string
  phone?: string
  address?: string
  // Candidate specific
  professionalTitle?: string
  skills?: string[]
  experience?: number
  jobPreferences?: {
    salaryMin: number
    salaryMax: number
    workTypes: string[]
    locations: string[]
  }
  // Employer specific
  company?: string
  industry?: string
  companySize?: string
  foundedYear?: number
  companyDescription?: string
  employerRole?: string
  requirements?: string[]
  companyTypes?: string[]
  companyLocation?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: "candidate" | "employer") => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

// Mock users data
const mockUsers: (Candidate | Employer)[] = [
  {
    id: "1",
    email: "john@example.com",
    name: "John Smith",
    role: "candidate",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=150",
    createdAt: "2024-01-15",
    skills: ["JavaScript", "React", "Node.js", "TypeScript"],
    experience: 5,
    location: "San Francisco, CA",
    cvUploaded: true,
    jobPreferences: {
      salary: { min: 80000, max: 120000 },
      location: ["San Francisco", "Remote"],
      jobType: "full-time",
    },
  },
  {
    id: "2",
    email: "sarah@techcorp.com",
    name: "Sarah Johnson",
    role: "employer",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150",
    createdAt: "2024-01-10",
    company: "TechCorp Inc.",
    industry: "Technology",
    companySize: "50-200",
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("matchpro_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: "candidate" | "employer") => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = mockUsers.find((u) => u.email === email && u.role === role)
    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem("matchpro_user", JSON.stringify(foundUser))
    } else {
      throw new Error("Invalid credentials")
    }

    setIsLoading(false)
  }

  const register = async (userData: RegisterData) => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Check if email already exists
    const existingUser = mockUsers.find((u) => u.email === userData.email)
    if (existingUser) {
      setIsLoading(false)
      throw new Error("Email already exists")
    }

    // Create new user with complete profile data
    const newUser: Candidate | Employer = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.fullName || userData.username,
      role: userData.role,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.fullName || userData.username)}&background=3b82f6&color=fff`,
      createdAt: new Date().toISOString().split("T")[0],
      ...(userData.role === "candidate"
        ? {
            skills: userData.skills || [],
            experience: userData.experience || 0,
            location: userData.address || "",
            cvUploaded: false,
            jobPreferences: {
              salary: {
                min: userData.jobPreferences?.salaryMin || 0,
                max: userData.jobPreferences?.salaryMax || 0,
              },
              location: userData.jobPreferences?.locations || [],
              jobType: "full-time" as const,
            },
          }
        : {
            company: userData.company || "",
            industry: userData.industry || "",
            companySize: userData.companySize || "",
          }),
    }

    // Add to mock users
    mockUsers.push(newUser)

    // Automatically log in the user after successful registration
    setUser(newUser)
    localStorage.setItem("matchpro_user", JSON.stringify(newUser))

    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("matchpro_user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
