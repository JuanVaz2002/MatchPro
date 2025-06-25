import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ArrowLeft, 
  Users, 
  Star, 
  Eye, 
  MessageSquare, 
  CheckCircle, 
  X, 
  Filter,
  Download,
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  Mail,
  Phone
} from 'lucide-react';

interface JobApplicationsProps {
  jobId: string;
  onBack: () => void;
}

export default function JobApplications({ jobId, onBack }: JobApplicationsProps) {
  const { user } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

  // Mock job data
  const job = {
    id: jobId,
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    salary: '$120k - $150k',
    type: 'Full-time',
    remote: true,
    postedDays: 5,
    status: 'Active',
    applicants: 32,
    views: 245
  };

  // Mock applications data
  const applications = [
    {
      id: '1',
      candidate: {
        id: '1',
        name: 'Alex Johnson',
        email: 'alex.johnson@email.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        experience: '6 years',
        currentRole: 'Frontend Developer at StartupCo',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150',
        skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
        education: 'BS Computer Science - Stanford University'
      },
      appliedAt: '2024-01-15T10:30:00Z',
      status: 'shortlisted',
      matchScore: 94,
      aiAnalysis: {
        strengths: [
          'Strong React and TypeScript experience (5+ years)',
          'Previous experience at high-growth startups',
          'Excellent problem-solving skills demonstrated in portfolio',
          'Strong communication skills from technical blog posts'
        ],
        concerns: [
          'No direct experience with our specific tech stack (Next.js)',
          'May be overqualified for some aspects of the role'
        ],
        recommendation: 'Highly recommended - excellent technical fit with strong cultural alignment'
      },
      coverLetter: 'I am excited to apply for the Senior Frontend Developer position at TechCorp Inc. With over 6 years of experience building scalable web applications...',
      resumeUrl: '/resumes/alex-johnson.pdf'
    },
    {
      id: '2',
      candidate: {
        id: '2',
        name: 'Maria Garcia',
        email: 'maria.garcia@email.com',
        phone: '+1 (555) 987-6543',
        location: 'Remote (EST)',
        experience: '4 years',
        currentRole: 'Full Stack Developer at WebFlow',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=150',
        skills: ['React', 'JavaScript', 'Python', 'Docker', 'PostgreSQL'],
        education: 'MS Software Engineering - UC Berkeley'
      },
      appliedAt: '2024-01-14T14:20:00Z',
      status: 'under_review',
      matchScore: 87,
      aiAnalysis: {
        strengths: [
          'Solid full-stack development experience',
          'Strong educational background',
          'Experience with modern development practices',
          'Good cultural fit based on values alignment'
        ],
        concerns: [
          'Less frontend-specific experience compared to other candidates',
          'Remote work setup may require additional coordination'
        ],
        recommendation: 'Good candidate - would benefit from technical interview to assess frontend depth'
      },
      coverLetter: 'Dear Hiring Manager, I am writing to express my interest in the Senior Frontend Developer role...',
      resumeUrl: '/resumes/maria-garcia.pdf'
    },
    {
      id: '3',
      candidate: {
        id: '3',
        name: 'David Chen',
        email: 'david.chen@email.com',
        phone: '+1 (555) 456-7890',
        location: 'New York, NY',
        experience: '8 years',
        currentRole: 'Senior Software Engineer at Meta',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=150',
        skills: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Kubernetes'],
        education: 'BS Computer Science - MIT'
      },
      appliedAt: '2024-01-13T09:15:00Z',
      status: 'interview_scheduled',
      matchScore: 96,
      aiAnalysis: {
        strengths: [
          'Exceptional technical background with Big Tech experience',
          'Perfect skill match with required technologies',
          'Proven track record of leading complex projects',
          'Strong system design and architecture experience'
        ],
        concerns: [
          'May expect higher compensation than budgeted',
          'Potential flight risk due to high demand for skills'
        ],
        recommendation: 'Top candidate - prioritize for immediate interview and competitive offer'
      },
      coverLetter: 'I am thrilled to apply for the Senior Frontend Developer position. My experience at Meta has given me...',
      resumeUrl: '/resumes/david-chen.pdf'
    },
    {
      id: '4',
      candidate: {
        id: '4',
        name: 'Sarah Wilson',
        email: 'sarah.wilson@email.com',
        phone: '+1 (555) 321-0987',
        location: 'Austin, TX',
        experience: '3 years',
        currentRole: 'Frontend Developer at Shopify',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=150',
        skills: ['React', 'JavaScript', 'CSS', 'Figma', 'Jest'],
        education: 'BS Computer Science - UT Austin'
      },
      appliedAt: '2024-01-12T16:45:00Z',
      status: 'pending',
      matchScore: 78,
      aiAnalysis: {
        strengths: [
          'Strong frontend fundamentals and modern React experience',
          'Good design sense and UI/UX awareness',
          'Growing rapidly in current role',
          'Enthusiastic and eager to learn'
        ],
        concerns: [
          'Less experience than ideal for senior role',
          'Limited backend or system design experience',
          'May need mentoring and guidance initially'
        ],
        recommendation: 'Promising candidate - consider for mid-level role or with strong mentorship plan'
      },
      coverLetter: 'Hello! I am excited to submit my application for the Senior Frontend Developer position...',
      resumeUrl: '/resumes/sarah-wilson.pdf'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      case 'shortlisted':
        return 'bg-purple-100 text-purple-800';
      case 'interview_scheduled':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending Review';
      case 'under_review':
        return 'Under Review';
      case 'shortlisted':
        return 'Shortlisted';
      case 'interview_scheduled':
        return 'Interview Scheduled';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const filteredApplications = selectedStatus === 'all' 
    ? applications 
    : applications.filter(app => app.status === selectedStatus);

  const updateApplicationStatus = (applicationId: string, newStatus: string) => {
    // In a real app, this would make an API call
    console.log(`Updating application ${applicationId} to status: ${newStatus}`);
  };

  if (selectedCandidate) {
    return (
      <div className="flex-1 p-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => setSelectedCandidate(null)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Applications
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Candidate Profile</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Candidate Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                <div className="text-center mb-6">
                  <img
                    src={selectedCandidate.candidate.avatar}
                    alt={selectedCandidate.candidate.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h2 className="text-xl font-bold text-gray-900">{selectedCandidate.candidate.name}</h2>
                  <p className="text-gray-600">{selectedCandidate.candidate.currentRole}</p>
                  <div className="flex items-center justify-center mt-2">
                    <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${getMatchScoreColor(selectedCandidate.matchScore)}`}>
                      <Star className="w-4 h-4 inline mr-1" />
                      {selectedCandidate.matchScore}% match
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-5 h-5 mr-3" />
                    <span className="text-sm">{selectedCandidate.candidate.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-5 h-5 mr-3" />
                    <span className="text-sm">{selectedCandidate.candidate.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3" />
                    <span className="text-sm">{selectedCandidate.candidate.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-3" />
                    <span className="text-sm">{selectedCandidate.candidate.experience} experience</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.candidate.skills.map((skill: string, index: number) => (
                      <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Education</h3>
                  <p className="text-sm text-gray-600">{selectedCandidate.candidate.education}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium">
                    Schedule Interview
                  </button>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Send Message
                  </button>
                  <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center">
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </button>
                  <button className="w-full bg-red-100 text-red-700 py-2 px-4 rounded-lg hover:bg-red-200 transition-colors font-medium">
                    Reject Application
                  </button>
                </div>
              </div>
            </div>

            {/* AI Analysis & Cover Letter */}
            <div className="lg:col-span-2 space-y-6">
              {/* AI Analysis */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Star className="w-5 h-5 text-purple-600 mr-2" />
                  AI Analysis
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-medium text-green-700 mb-3 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Strengths
                    </h4>
                    <ul className="space-y-2">
                      {selectedCandidate.aiAnalysis.strengths.map((strength: string, index: number) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-amber-700 mb-3 flex items-center">
                      <X className="w-4 h-4 mr-2" />
                      Areas of Concern
                    </h4>
                    <ul className="space-y-2">
                      {selectedCandidate.aiAnalysis.concerns.map((concern: string, index: number) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start">
                          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          {concern}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <h4 className="font-medium text-blue-900 mb-2">AI Recommendation</h4>
                  <p className="text-blue-800 text-sm">{selectedCandidate.aiAnalysis.recommendation}</p>
                </div>
              </div>

              {/* Cover Letter */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cover Letter</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 text-sm leading-relaxed">{selectedCandidate.coverLetter}</p>
                </div>
              </div>

              {/* Application Timeline */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Timeline</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Application Submitted</p>
                      <p className="text-xs text-gray-500">
                        {new Date(selectedCandidate.appliedAt).toLocaleDateString()} at {new Date(selectedCandidate.appliedAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">AI Analysis Completed</p>
                      <p className="text-xs text-gray-500">Automated screening passed</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Status: {getStatusLabel(selectedCandidate.status)}</p>
                      <p className="text-xs text-gray-500">Current application status</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Jobs
          </button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
              <p className="text-gray-600 mt-2">{job.company} • {job.location}</p>
              <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                <span className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  {job.salary}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {job.type}
                </span>
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {job.remote ? 'Remote Available' : 'On-site'}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                {job.status}
              </div>
              <div className="text-sm text-gray-600">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {job.applicants} applications
                </div>
                <div className="flex items-center mt-1">
                  <Eye className="w-4 h-4 mr-1" />
                  {job.views} views
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{applications.length}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Shortlisted</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {applications.filter(app => app.status === 'shortlisted').length}
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Interviews</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {applications.filter(app => app.status === 'interview_scheduled').length}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Match Score</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {Math.round(applications.reduce((sum, app) => sum + app.matchScore, 0) / applications.length)}%
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Applications</option>
                <option value="pending">Pending Review</option>
                <option value="under_review">Under Review</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="interview_scheduled">Interview Scheduled</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
                <option>Match Score</option>
                <option>Application Date</option>
                <option>Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Applications ({filteredApplications.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {filteredApplications.map((application) => (
              <div key={application.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <img
                      src={application.candidate.avatar}
                      alt={application.candidate.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{application.candidate.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                          {getStatusLabel(application.status)}
                        </span>
                        <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${getMatchScoreColor(application.matchScore)}`}>
                          {application.matchScore}% match
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{application.candidate.currentRole}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                        <span className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {application.candidate.location}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {application.candidate.experience}
                        </span>
                        <span>Applied {new Date(application.appliedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {application.candidate.skills.slice(0, 4).map((skill, index) => (
                          <span key={index} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                        {application.candidate.skills.length > 4 && (
                          <span className="bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded">
                            +{application.candidate.skills.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedCandidate(application)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Profile
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
