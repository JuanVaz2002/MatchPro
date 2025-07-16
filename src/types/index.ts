
export interface Education {
  degree: string
  school: string
  year: number
  gpa: number
}

export interface WorkExperience {
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  description: string
}

export interface Certification {
  title: string
  issuer: string
  year: number
  credentialId: string
}

export interface JobPreferences {
  salary: { min: number; max: number }
  location: string[]
  jobType: "full-time" | "part-time" | "contract" | "freelance" | "internship" | "temporary" | "volunteer" | "remote" | "hybrid" | "other"
}

export interface User {
  id: number
  email: string
  password: string
  name: string
  avatar?: string 
  createdAt: string
  bio: string
  role: "candidate" | "recruiter"
  location: string
  phone?: string 
  education: Education

}

export interface Candidate extends User {
  role: "candidate"
  skills: string[]
  experience: number

  cvUploaded: boolean
  professionalTitle?: string | null
  jobPreferences: JobPreferences
  workExperience: WorkExperience
  certifications: Certification
}

export interface Recruiter extends User {
  role: "recruiter"
  company: string
  industry: string
  companySize: string
  address?: string
  foundedYear?: number
  companyDescription?: string
  employerRole?: string
  requirements?: string[]
  companyTypes?: string[]
  companyLocation?: string
}

export interface Job {
  id: string
  title: string
  company: string
  location: string
  salary: { min: number; max: number }
  type: "full-time" | "part-time" | "contract" | "freelance" | "internship" | "temporary" | "volunteer" | "remote" | "hybrid" | "other"
  description: string
  requirements: string[]
  benefits: string[]
  postedAt: string
  applicants: number
  status: "active" | "paused" | "closed"
}

export interface Application {
  id: string
  jobId: string
  userId: string
  status: "pending" | "reviewed" | "shortlisted" | "rejected" | "hired"
  appliedAt: string
  matchScore: number
  aiAnalysis: {
    strengths: string[]
    concerns: string[]
    recommendation: string
  }
}

export interface ChatMessage {
  id: string
  sender: "user" | "ai"
  message: string
  timestamp: string
}
