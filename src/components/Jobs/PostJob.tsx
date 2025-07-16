import React, { useState } from 'react';
import { Briefcase, MapPin, DollarSign, Clock, Users, Sparkles, CheckCircle } from 'lucide-react';

export default function PostJob() {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    workType: 'full-time',
    remote: false,
    experience: '',
    salaryMin: '',
    salaryMax: '',
    description: '',
    requirements: [''],
    benefits: [''],
    skills: ['']
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobPosted, setJobPosted] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].map((item: string, i: number) => 
        i === index ? value : item
      )
    }));
  };

  const addArrayItem = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field as keyof typeof prev], '']
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].filter((_: any, i: number) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setJobPosted(true);
    }, 2000);
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  if (jobPosted) {
    return (
      <div className="flex-1 p-8 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Posted Successfully! 🎉</h1>
            <p className="text-gray-600 mb-6">
              Your job posting for "{formData.title}" is now live and visible to candidates.
            </p>
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
              <ul className="text-blue-800 text-sm space-y-1 text-left">
                <li>• AI will start matching qualified candidates</li>
                <li>• You'll receive applications in your dashboard</li>
                <li>• Automatic screening will rank candidates</li>
                <li>• Analytics will track job performance</li>
              </ul>
            </div>
            <div className="flex space-x-4 justify-center">
              <button
                onClick={() => setJobPosted(false)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Post Another Job
              </button>
              <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                View Job Posting
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Briefcase className="w-8 h-8 text-blue-600 mr-3" />
            Post a New Job
          </h1>
          <p className="text-gray-600 mt-2">
            Create a job posting and let AI match the best candidates for you
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                <span className={`ml-2 font-medium ${
                  currentStep >= step ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  {step === 1 ? 'Basic Info' : step === 2 ? 'Details' : 'Review'}
                </span>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-4 ${
                    currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Job Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g. Senior Frontend Developer"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Department</option>
                    <option value="engineering">Engineering</option>
                    <option value="product">Product</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="e.g. San Francisco, CA"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Work Type *
                  </label>
                  <select
                    value={formData.workType}
                    onChange={(e) => handleInputChange('workType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Level
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Experience</option>
                    <option value="entry">Entry Level (0-2 years)</option>
                    <option value="mid">Mid Level (3-5 years)</option>
                    <option value="senior">Senior Level (6+ years)</option>
                    <option value="lead">Lead/Manager (8+ years)</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remote"
                    checked={formData.remote}
                    onChange={(e) => handleInputChange('remote', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remote" className="ml-2 block text-sm text-gray-700">
                    Remote work available
                  </label>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salary Range (Annual)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="number"
                      value={formData.salaryMin}
                      onChange={(e) => handleInputChange('salaryMin', e.target.value)}
                      placeholder="Minimum"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={formData.salaryMax}
                      onChange={(e) => handleInputChange('salaryMax', e.target.value)}
                      placeholder="Maximum"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Job Details */}
          {currentStep === 2 && (
            <div className="p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Job Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={6}
                    placeholder="Describe the role, responsibilities, and what the candidate will be working on..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Requirements
                  </label>
                  {formData.requirements.map((req, index) => (
                    <div key={index} className="flex mb-2">
                      <input
                        type="text"
                        value={req}
                        onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                        placeholder="e.g. 3+ years of React experience"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {formData.requirements.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('requirements', index)}
                          className="ml-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('requirements')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    + Add Requirement
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Benefits & Perks
                  </label>
                  {formData.benefits.map((benefit, index) => (
                    <div key={index} className="flex mb-2">
                      <input
                        type="text"
                        value={benefit}
                        onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                        placeholder="e.g. Health insurance, Stock options"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {formData.benefits.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('benefits', index)}
                          className="ml-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('benefits')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    + Add Benefit
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Required Skills
                  </label>
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="flex mb-2">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => handleArrayChange('skills', index, e.target.value)}
                        placeholder="e.g. JavaScript, React, Node.js"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {formData.skills.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('skills', index)}
                          className="ml-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('skills')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    + Add Skill
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Review & Publish</h2>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{formData.title}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {formData.location} {formData.remote && '• Remote Available'}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    {formData.workType.charAt(0).toUpperCase() + formData.workType.slice(1)}
                  </div>
                  {formData.salaryMin && formData.salaryMax && (
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="w-4 h-4 mr-2" />
                      ${parseInt(formData.salaryMin).toLocaleString()} - ${parseInt(formData.salaryMax).toLocaleString()}
                    </div>
                  )}
                  {formData.experience && (
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {formData.experience.charAt(0).toUpperCase() + formData.experience.slice(1)} Level
                    </div>
                  )}
                </div>
                <p className="text-gray-700 text-sm">{formData.description}</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <div className="flex items-center mb-4">
                  <Sparkles className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-blue-900">AI Optimization Ready</h3>
                </div>
                <p className="text-blue-800 text-sm mb-4">
                  Your job posting will be automatically optimized for better candidate matching and visibility.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white rounded p-3">
                    <div className="font-medium text-gray-900">Estimated Matches</div>
                    <div className="text-blue-600 font-semibold">25-40 candidates</div>
                  </div>
                  <div className="bg-white rounded p-3">
                    <div className="font-medium text-gray-900">Expected Applications</div>
                    <div className="text-blue-600 font-semibold">15-25 per week</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="px-8 py-6 bg-gray-50 rounded-b-xl flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="flex space-x-4">
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 text-white px-8 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Publishing...
                    </>
                  ) : (
                    'Publish Job'
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
