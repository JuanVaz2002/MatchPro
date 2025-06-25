export interface User {
  id: string;
  email: string;
  name: string;
  role: 'candidate' | 'employer';
  avatar?: string;
  createdAt: string;
}

export interface Candidate extends User {
  role: 'candidate';
  skills: string[];
  experience: number;
  location: string;
  cvUploaded: boolean;
  jobPreferences: {
    salary: { min: number; max: number };
    location: string[];
    jobType: 'full-time' | 'part-time' | 'contract';
  };
}

export interface Employer extends User {
  role: 'employer';
  company: string;
  industry: string;
  companySize: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: { min: number; max: number };
  type: 'full-time' | 'part-time' | 'contract';
  description: string;
  requirements: string[];
  benefits: string[];
  postedAt: string;
  employerId: string;
  applicants: number;
  status: 'active' | 'paused' | 'closed';
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  appliedAt: string;
  matchScore: number;
  aiAnalysis: {
    strengths: string[];
    concerns: string[];
    recommendation: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  message: string;
  timestamp: string;
}
