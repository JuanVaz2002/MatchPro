"use client"

import { useState } from "react"
import RegistrationForm from "./RegistrationForm"
import CandidateProfileForm from "./CandidateProfileForm"
import EmployerProfileForm from "./EmployerProfileForm"
import { useAuth } from "../../contexts/AuthContext"

interface RegistrationContainerProps {
  onShowLogin: () => void
}

interface RegistrationData {
  username: string
  email: string
  password: string
  role: "candidate" | "employer"
  company?: string
  industry?: string
  companySize?: string
}

export default function RegistrationContainer({ onShowLogin }: RegistrationContainerProps) {
  const { register } = useAuth()
  const [currentStep, setCurrentStep] = useState<"registration" | "profile">("registration")
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null)

  const handleRegistrationComplete = (data: RegistrationData) => {
    setRegistrationData(data)
    setCurrentStep("profile")
  }

  const handleProfileComplete = async (profileData: any) => {
    if (!registrationData) return

    try {
      const completeUserData = {
        ...registrationData,
        ...profileData,
      }

      // Call the register function from AuthContext
      await register(completeUserData)

      // User is now automatically logged in, no need to redirect to login
    } catch (error) {
      console.error("Registration failed:", error)
      alert("Registration failed. Please try again.")
    }
  }

  const handleBackToRegistration = () => {
    setCurrentStep("registration")
  }

  if (currentStep === "registration") {
    return <RegistrationForm onShowLogin={onShowLogin} onRegistrationComplete={handleRegistrationComplete} />
  }

  if (currentStep === "profile" && registrationData) {
    if (registrationData.role === "candidate") {
      return (
        <CandidateProfileForm
          onComplete={handleProfileComplete}
          onBack={handleBackToRegistration}
          initialData={{
            fullName: registrationData.username,
          }}
        />
      )
    } else {
      return (
        <EmployerProfileForm
          onComplete={handleProfileComplete}
          onBack={handleBackToRegistration}
          initialData={{
            fullName: registrationData.username,
            companyName: registrationData.company,
            industry: registrationData.industry,
            companySize: registrationData.companySize,
          }}
        />
      )
    }
  }

  return null
}
