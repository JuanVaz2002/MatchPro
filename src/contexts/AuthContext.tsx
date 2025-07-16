"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

import type { Candidate, Recruiter, Education, WorkExperience, Certification, JobPreferences } from "../types"

export interface RegisterData {
  // Common user fields
  username: string
  email: string
  password: string
  fullName?: string
  phone?: string
  address?: string
  bio?: string

  // Candidate-specific
  professionalTitle?: string
  skills?: string[]
  experience?: number
  cvUploaded?: boolean
  jobPreferences?: JobPreferences
  workExperience?: WorkExperience
  certifications?: Certification
  education?: Education

  // Recruiter-specific
  company?: string
  industry?: string
  companySize?: string
  foundedYear?: number
  companyDescription?: string
  employerRole?: string
  requirements?: string[]
  companyTypes?: string[]
  companyLocation?: string

  // Role
  role: "candidate" | "recruiter"
}

interface AuthContextType {
  user: Candidate | Recruiter | null
  login: (email: string, password: string, role: "candidate" | "recruiter") => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

// Simulate finding a user
const mockUsers: (Candidate | Recruiter)[] = 
[
  {
    id: 1,
    email: "john@example.com",
    password: "demo1234",
    role: "candidate",
    name: "John Smith",
    professionalTitle: "Software Engineer",
    bio: "Passionate frontend developer with 5+ years of experience building scalable web applications.",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=150",
    createdAt: "2024-01-15",
    skills: ["JavaScript", "React", "Node.js", "TypeScript"],
    experience: 5,
    location: "San Francisco, CA",
    cvUploaded: false,
    jobPreferences: {
      salary: { min: 80000, max: 120000 },
      location: ["San Francisco", "Remote"],
      jobType: "full-time",
    },
    education: {
      degree: "Bachelor of Science in Computer Science",
      school: "Stanford University",
      year: 2019,
      gpa: 3.8
    },
    workExperience: {
      title: "Senior Frontend Developer",
      company: "TechFlow Inc.",
      location: "San Francisco, CA",
      startDate: "2022-01-01",
      endDate: "Present",
      description: "Led frontend development for multiple high-traffic web applications."
    },
    certifications: {
      title: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      year: 2023,
      credentialId: "AWS-123456"
    }
  },
  {
    id: 2,
    email: "sarah@techcorp.com",
    password: "demo1234",
    role: "recruiter",
    name: "Sarah Johnson",
    bio: "Passionate frontend developer turned tech recruiter, helping companies find top talent in the software industry.",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150",
    createdAt: "2024-01-15",
    location: "San Francisco, CA",
    phone: "+1 (415) 555-0198",
    education: {
      degree: "B.Sc. in Computer Science",
      school: "University of California, Berkeley",
      year: 2015,
      gpa: 4.0
    },
    company: "TechCorp Inc.",
    industry: "Information Technology",
    companySize: "201-500 employees",
    address: "123 Market Street, San Francisco, CA 94103",
    foundedYear: 2010,
    companyDescription: "TechCorp Solutions is a fast-growing SaaS company that specializes in enterprise collaboration tools and AI-powered business automation.",
    employerRole: "Lead Technical Recruiter",
    requirements: [
      "Strong understanding of frontend frameworks (React, Vue)",
      "5+ years of development or technical recruiting experience",
      "Excellent communication and organizational skills"
    ],
    companyTypes: ["Startup", "SaaS", "Remote-first"],
    companyLocation: "Hybrid - San Francisco HQ with remote options"
  }
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Candidate | Recruiter | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("matchpro_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: "candidate" | "recruiter") => {
    setIsLoading(true)


    const foundUser = mockUsers.find((u) => u.email === email && u.password === password && u.role === role)
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
    const existingUser = {
      id: "1",
      email: "john@example.com",
      password: "demo1234",
      role: "candidate",
      title: "Software Engineer",
      bio: "Passionate frontend developer with 5+ years of experience building scalable web applications.",
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
    }

    if (existingUser) {
      setIsLoading(false)
      throw new Error("Email already exists")
    }

    // Create new user with complete profile data
    const newCandidateUser: Candidate = {
      id: Date.now(),
      email: userData.email,
      professionalTitle: userData.professionalTitle || "",
      name: userData.fullName || userData.username,
      bio: userData.bio || "",
      password: userData.password,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.fullName || userData.username)}&background=3b82f6&color=fff`,
      createdAt: new Date().toISOString().split("T")[0],
      skills: userData.skills || [],
      experience: userData.experience || 0,
      location: userData.address || "",
      cvUploaded: false,
      jobPreferences: {
        salary: {
          min: userData.jobPreferences?.salary.min || 0,
          max: userData.jobPreferences?.salary.max || 0
        },
        location: userData.jobPreferences?.location || [],
        jobType: (userData.jobPreferences?.jobType?.[0] as
          | "full-time"
          | "part-time"
          | "contract"
          | "freelance"
          | "internship"
          | "temporary"
          | "volunteer"
          | "remote"
          | "hybrid"
          | "other") || "other",
      },
      // Add these default values:
      role: "candidate",
      workExperience: {
        title: userData.workExperience?.title || "",
        company: userData.workExperience?.company || "",
        location: userData.workExperience?.location || "",
        startDate: userData.workExperience?.startDate || "",
        endDate: userData.workExperience?.endDate || "",
        description: userData.workExperience?.description || ""
      },
      certifications: {
        title: userData.certifications?.title || "",
        issuer: userData.certifications?.issuer || "",
        year: userData.certifications?.year || 0,
        credentialId: userData.certifications?.credentialId || ""
      },
      education: {
        degree: userData.education?.degree || "",
        school: userData.education?.school || "",
        year: userData.education?.year || 0,
        gpa: userData.education?.gpa || 0.0
      },
    }

    // Automatically log in the user after successful registration
    setUser(newCandidateUser)
    localStorage.setItem("matchpro_user", JSON.stringify(newCandidateUser))
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
