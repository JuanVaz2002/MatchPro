"use client"

import { useState } from "react"
import { AuthProvider, useAuth } from "./contexts/AuthContext"

import AuthContainer from "./components/Pages/AuthContainer"
import Sidebar from "./components/Layout/Sidebar"
import CandidateDashboard from "./components/Pages/CandidateDashboard"
import RecruiterDashboard from "./components/Pages/Recruiter/RecruiterDashboard"
import CVUpload from "./components/AI_tools/CVUpload"
import JobSearch from "./components/Pages/JobSearch"
import InterviewPrepChat from "./components/AI_tools/InterviewPrepChat"
import PostJob  from "./components/Pages/Recruiter/PostJob"
import ManageJobs from "./components/Pages/Recruiter/ManageJobs"

import Settings from "./components/Settings"


function AppContent() {
  const { user, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading MatchPro...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <AuthContainer />
  }

  const renderContent = () => {
    // Common routes for both roles
    if (activeTab === "settings") {
      return <Settings />
    }
    if (user.role === "candidate") {
      switch (activeTab) {
        case "dashboard":
          return <CandidateDashboard />
        case "upload-cv":
          return <CVUpload />
        case "job-search":
          return <JobSearch />
        case "interview-prep":
          return <InterviewPrepChat />
        default:
          return <CandidateDashboard />
      }

    }  else if (user.role === "recruiter") {
      switch (activeTab) {
        case "dashboard":
          return <RecruiterDashboard />
        case "post-job":
          return <PostJob />
        case "manage-jobs":
          return <ManageJobs />
        default:
          return <RecruiterDashboard />
      }
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderContent()}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
