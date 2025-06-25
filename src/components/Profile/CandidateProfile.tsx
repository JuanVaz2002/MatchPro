import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Candidate } from '../../types';
import {
  User,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  DollarSign,
  Clock,
  Globe,
  Phone,
  Calendar,
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
  Star,
  Award,
  Link as LinkIcon
} from 'lucide-react';

export default function CandidateProfile() {
  const { user } = useAuth();
  const candidate = user as Candidate;
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: candidate.name,
    email: candidate.email,
    phone: '+1 (555) 123-4567',
    location: candidate.location,
    title: 'Senior Frontend Developer',
    bio: 'Passionate frontend developer with 5+ years of experience building scalable web applications. I love creating intuitive user experiences and working with modern technologies.',
    skills: [...candidate.skills],
    experience: candidate.experience,
    education: [
      {
        id: '1',
        degree: 'Bachelor of Science in Computer Science',
        school: 'Stanford University',
        year: '2019',
        gpa: '3.8'
      }
    ],
    workExperience: [
      {
        id: '1',
        title: 'Senior Frontend Developer',
        company: 'TechFlow Inc.',
        location: 'San Francisco, CA',
        startDate: '2022-01',
        endDate: 'Present',
        description: 'Led frontend development for multiple high-traffic web applications using React, TypeScript, and modern development practices.'
      },
      {
        id: '2',
        title: 'Frontend Developer',
        company: 'StartupCo',
        location: 'San Francisco, CA',
        startDate: '2020-06',
        endDate: '2021-12',
        description: 'Developed and maintained React-based applications, collaborated with design team to implement pixel-perfect UIs.'
      }
    ],
    certifications: [
      {
        id: '1',
        name: 'AWS Certified Developer',
        issuer: 'Amazon Web Services',
        year: '2023',
        credentialId: 'AWS-123456'
      }
    ],
    languages: [
      { name: 'English', level: 'Native' },
      { name: 'Spanish', level: 'Conversational' }
    ],
    portfolio: [
      {
        id: '1',
        title: 'E-commerce Platform',
        description: 'Full-stack e-commerce solution built with React and Node.js',
        url: 'https://github.com/johndoe/ecommerce',
        technologies: ['React', 'Node.js', 'MongoDB']
      }
    ],
    jobPreferences: {
      ...candidate.jobPreferences,
      workType: candidate.jobPreferences.jobType,
      remoteWork: 'hybrid',
      industries: ['Technology', 'Fintech', 'Healthcare'],
      companySize: ['startup', 'medium']
    },
    availability: 'immediately',
    website: 'https://johnsmith.dev',
    linkedin: 'https://linkedin.com/in/johnsmith',
    github: 'https://github.com/johnsmith'
  });

  const [newSkill, setNewSkill] = useState('');

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedInputChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section as keyof typeof prev], [field]: value }
    }));
  };

  const handleArrayItemChange = (section: string, index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section as keyof typeof prev].map((item: any, i: number) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addArrayItem = (section: string, newItem: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section as keyof typeof prev], { ...newItem, id: Date.now().toString() }]
    }));
  };

  const removeArrayItem = (section: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section as keyof typeof prev].filter((_: any, i: number) => i !== index)
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSave = () => {
    // In a real app, this would make an API call to update the user profile
    console.log('Saving profile data:', formData);
    setIsEditing(false);
    // Show success message
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      name: candidate.name,
      email: candidate.email,
      phone: '+1 (555) 123-4567',
      location: candidate.location,
      title: 'Senior Frontend Developer',
      bio: 'Passionate frontend developer with 5+ years of experience building scalable web applications. I love creating intuitive user experiences and working with modern technologies.',
      skills: [...candidate.skills],
      experience: candidate.experience,
      education: [
        {
          id: '1',
          degree: 'Bachelor of Science in Computer Science',
          school: 'Stanford University',
          year: '2019',
          gpa: '3.8'
        }
      ],
      workExperience: [
        {
          id: '1',
          title: 'Senior Frontend Developer',
          company: 'TechFlow Inc.',
          location: 'San Francisco, CA',
          startDate: '2022-01',
          endDate: 'Present',
          description: 'Led frontend development for multiple high-traffic web applications using React, TypeScript, and modern development practices.'
        },
        {
          id: '2',
          title: 'Frontend Developer',
          company: 'StartupCo',
          location: 'San Francisco, CA',
          startDate: '2020-06',
          endDate: '2021-12',
          description: 'Developed and maintained React-based applications, collaborated with design team to implement pixel-perfect UIs.'
        }
      ],
      certifications: [
        {
          id: '1',
          name: 'AWS Certified Developer',
          issuer: 'Amazon Web Services',
          year: '2023',
          credentialId: 'AWS-123456'
        }
      ],
      languages: [
        { name: 'English', level: 'Native' },
        { name: 'Spanish', level: 'Conversational' }
      ],
      portfolio: [
        {
          id: '1',
          title: 'E-commerce Platform',
          description: 'Full-stack e-commerce solution built with React and Node.js',
          url: 'https://github.com/johndoe/ecommerce',
          technologies: ['React', 'Node.js', 'MongoDB']
        }
      ],
      jobPreferences: {
        ...candidate.jobPreferences,
        workType: candidate.jobPreferences.jobType,
        remoteWork: 'hybrid',
        industries: ['Technology', 'Fintech', 'Healthcare'],
        companySize: ['startup', 'medium']
      },
      availability: 'immediately',
      website: 'https://johnsmith.dev',
      linkedin: 'https://linkedin.com/in/johnsmith',
      github: 'https://github.com/johnsmith'
    });
    setIsEditing(false);
  };

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <User className="w-8 h-8 text-blue-600 mr-3" />
                My Profile
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your professional profile and job preferences
              </p>
            </div>
            <div className="flex space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
            
            <div className="flex items-start space-x-6 mb-6">
              <img
                src={candidate.avatar || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=150'}
                alt={formData.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="flex-1">
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Professional Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                      <input
                        type="number"
                        value={formData.experience}
                        onChange={(e) => handleInputChange('experience', parseInt(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{formData.name}</h3>
                    <p className="text-lg text-gray-600 mb-2">{formData.title}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {formData.email}
                      </span>
                      <span className="flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        {formData.phone}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {formData.location}
                      </span>
                      <span className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-1" />
                        {formData.experience} years experience
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Professional Bio</label>
              {isEditing ? (
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about yourself, your experience, and what you're passionate about..."
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">{formData.bio}</p>
              )}
            </div>

            {/* Social Links */}
            {isEditing && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                    <input
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => handleInputChange('linkedin', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
                    <input
                      type="url"
                      value={formData.github}
                      onChange={(e) => handleInputChange('github', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                </div>
              </div>
            )}

            {!isEditing && (formData.website || formData.linkedin || formData.github) && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Links</h3>
                <div className="flex space-x-4">
                  {formData.website && (
                    <a
                      href={formData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-700"
                    >
                      <LinkIcon className="w-4 h-4 mr-1" />
                      Website
                    </a>
                  )}
                  {formData.linkedin && (
                    <a
                      href={formData.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-700"
                    >
                      <LinkIcon className="w-4 h-4 mr-1" />
                      LinkedIn
                    </a>
                  )}
                  {formData.github && (
                    <a
                      href={formData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-700"
                    >
                      <LinkIcon className="w-4 h-4 mr-1" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Skills */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Skills</h2>
            
            {isEditing ? (
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    placeholder="Add a skill"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={addSkill}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Work Experience */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
              {isEditing && (
                <button
                  onClick={() => addArrayItem('workExperience', {
                    title: '',
                    company: '',
                    location: '',
                    startDate: '',
                    endDate: '',
                    description: ''
                  })}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Experience
                </button>
              )}
            </div>

            <div className="space-y-6">
              {formData.workExperience.map((exp, index) => (
                <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                          <input
                            type="text"
                            value={exp.title}
                            onChange={(e) => handleArrayItemChange('workExperience', index, 'title', e.target.value)}
                            placeholder="Job Title"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => handleArrayItemChange('workExperience', index, 'company', e.target.value)}
                            placeholder="Company"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) => handleArrayItemChange('workExperience', index, 'location', e.target.value)}
                            placeholder="Location"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <div className="flex space-x-2">
                            <input
                              type="month"
                              value={exp.startDate}
                              onChange={(e) => handleArrayItemChange('workExperience', index, 'startDate', e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <input
                              type="month"
                              value={exp.endDate === 'Present' ? '' : exp.endDate}
                              onChange={(e) => handleArrayItemChange('workExperience', index, 'endDate', e.target.value || 'Present')}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => removeArrayItem('workExperience', index)}
                          className="ml-4 text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <textarea
                        value={exp.description}
                        onChange={(e) => handleArrayItemChange('workExperience', index, 'description', e.target.value)}
                        placeholder="Describe your responsibilities and achievements..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                          <p className="text-blue-600 font-medium">{exp.company}</p>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          <p>{exp.location}</p>
                          <p>{exp.startDate} - {exp.endDate}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm">{exp.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Education</h2>
              {isEditing && (
                <button
                  onClick={() => addArrayItem('education', {
                    degree: '',
                    school: '',
                    year: '',
                    gpa: ''
                  })}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Education
                </button>
              )}
            </div>

            <div className="space-y-4">
              {formData.education.map((edu, index) => (
                <div key={edu.id} className="border border-gray-200 rounded-lg p-4">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => handleArrayItemChange('education', index, 'degree', e.target.value)}
                            placeholder="Degree"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            value={edu.school}
                            onChange={(e) => handleArrayItemChange('education', index, 'school', e.target.value)}
                            placeholder="School/University"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            value={edu.year}
                            onChange={(e) => handleArrayItemChange('education', index, 'year', e.target.value)}
                            placeholder="Graduation Year"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            value={edu.gpa}
                            onChange={(e) => handleArrayItemChange('education', index, 'gpa', e.target.value)}
                            placeholder="GPA (optional)"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <button
                          onClick={() => removeArrayItem('education', index)}
                          className="ml-4 text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <GraduationCap className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                          <p className="text-gray-600">{edu.school}</p>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <p>{edu.year}</p>
                        {edu.gpa && <p>GPA: {edu.gpa}</p>}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Job Preferences */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Job Preferences</h2>
            
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={formData.jobPreferences.salary.min}
                      onChange={(e) => handleNestedInputChange('jobPreferences', 'salary', {
                        ...formData.jobPreferences.salary,
                        min: parseInt(e.target.value)
                      })}
                      placeholder="Min"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      value={formData.jobPreferences.salary.max}
                      onChange={(e) => handleNestedInputChange('jobPreferences', 'salary', {
                        ...formData.jobPreferences.salary,
                        max: parseInt(e.target.value)
                      })}
                      placeholder="Max"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Work Type</label>
                  <select
                    value={formData.jobPreferences.workType}
                    onChange={(e) => handleNestedInputChange('jobPreferences', 'workType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Remote Work</label>
                  <select
                    value={formData.jobPreferences.remoteWork}
                    onChange={(e) => handleNestedInputChange('jobPreferences', 'remoteWork', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="onsite">On-site only</option>
                    <option value="remote">Remote only</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                  <select
                    value={formData.availability}
                    onChange={(e) => handleInputChange('availability', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="immediately">Immediately</option>
                    <option value="2weeks">2 weeks notice</option>
                    <option value="1month">1 month notice</option>
                    <option value="3months">3+ months</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                    <span className="font-medium text-green-900">Salary Range</span>
                  </div>
                  <p className="text-green-800">
                    ${formData.jobPreferences.salary.min.toLocaleString()} - ${formData.jobPreferences.salary.max.toLocaleString()}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Clock className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="font-medium text-blue-900">Work Type</span>
                  </div>
                  <p className="text-blue-800 capitalize">{formData.jobPreferences.workType}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Globe className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="font-medium text-purple-900">Remote Work</span>
                  </div>
                  <p className="text-purple-800 capitalize">{formData.jobPreferences.remoteWork}</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Calendar className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="font-medium text-yellow-900">Availability</span>
                  </div>
                  <p className="text-yellow-800 capitalize">{formData.availability}</p>
                </div>
              </div>
            )}
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Certifications</h2>
              {isEditing && (
                <button
                  onClick={() => addArrayItem('certifications', {
                    name: '',
                    issuer: '',
                    year: '',
                    credentialId: ''
                  })}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Certification
                </button>
              )}
            </div>

            <div className="space-y-4">
              {formData.certifications.map((cert, index) => (
                <div key={cert.id} className="border border-gray-200 rounded-lg p-4">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                          <input
                            type="text"
                            value={cert.name}
                            onChange={(e) => handleArrayItemChange('certifications', index, 'name', e.target.value)}
                            placeholder="Certification Name"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            value={cert.issuer}
                            onChange={(e) => handleArrayItemChange('certifications', index, 'issuer', e.target.value)}
                            placeholder="Issuing Organization"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            value={cert.year}
                            onChange={(e) => handleArrayItemChange('certifications', index, 'year', e.target.value)}
                            placeholder="Year"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            value={cert.credentialId}
                            onChange={(e) => handleArrayItemChange('certifications', index, 'credentialId', e.target.value)}
                            placeholder="Credential ID (optional)"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <button
                          onClick={() => removeArrayItem('certifications', index)}
                          className="ml-4 text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                          <Award className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                          <p className="text-gray-600">{cert.issuer}</p>
                          {cert.credentialId && (
                            <p className="text-sm text-gray-500">ID: {cert.credentialId}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <p>{cert.year}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
