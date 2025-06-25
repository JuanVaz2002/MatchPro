import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import Sidebar from './components/Layout/Sidebar';
import CandidateDashboard from './components/Dashboard/CandidateDashboard';
import EmployerDashboard from './components/Dashboard/EmployerDashboard';
import CVUpload from './components/CV/CVUpload';
import JobSearch from './components/Jobs/JobSearch';
import InterviewPrepChat from './components/Chat/InterviewPrepChat';
import PostJob from './components/Jobs/PostJob';
import ManageJobs from './components/Jobs/ManageJobs';
import CandidateProfile from './components/Profile/CandidateProfile';

function AppContent() {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading MatchPro...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  const renderContent = () => {
    if (user.role === 'candidate') {
      switch (activeTab) {
        case 'dashboard':
          return <CandidateDashboard />;
        case 'upload-cv':
          return <CVUpload />;
        case 'job-search':
          return <JobSearch />;
        case 'interview-prep':
          return <InterviewPrepChat />;
        case 'profile':
          return <CandidateProfile />;
        default:
          return <CandidateDashboard />;
      }
    } else {
      switch (activeTab) {
        case 'dashboard':
          return <EmployerDashboard />;
        case 'post-job':
          return <PostJob />;
        case 'manage-jobs':
          return <ManageJobs />;
        default:
          return <EmployerDashboard />;
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderContent()}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
