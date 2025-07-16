import React, { useState } from 'react';
import { Search, MapPin, DollarSign, Clock, Bookmark, ExternalLink, Star } from 'lucide-react';

export default function JobSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [salaryFilter, setSalaryFilter] = useState('');

  const jobs = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      salary: '$120k - $150k',
      type: 'Full-time',
      remote: true,
      postedDays: 2,
      matchScore: 94,
      description: 'We are looking for a senior frontend developer to join our growing team...',
      requirements: ['5+ years React experience', 'TypeScript proficiency', 'Team leadership'],
      benefits: ['Health insurance', 'Stock options', 'Flexible hours'],
      logo: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?w=100'
    },
    {
      id: '2',
      title: 'Full Stack Engineer',
      company: 'StartupHub',
      location: 'New York, NY',
      salary: '$100k - $130k',
      type: 'Full-time',
      remote: false,
      postedDays: 5,
      matchScore: 89,
      description: 'Join our dynamic startup as a full stack engineer and help build the future...',
      requirements: ['3+ years full stack experience', 'Node.js and React', 'AWS knowledge'],
      benefits: ['Equity package', 'Learning budget', 'Catered meals'],
      logo: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?w=100'
    },
    {
      id: '3',
      title: 'React Developer',
      company: 'DigitalFlow',
      location: 'Remote',
      salary: '$85k - $110k',
      type: 'Full-time',
      remote: true,
      postedDays: 1,
      matchScore: 87,
      description: 'Remote-first company seeking a passionate React developer...',
      requirements: ['3+ years React experience', 'Redux knowledge', 'Testing expertise'],
      benefits: ['100% remote', 'Home office budget', 'Unlimited PTO'],
      logo: 'https://images.pexels.com/photos/1181216/pexels-photo-1181216.jpeg?w=100'
    },
    {
      id: '4',
      title: 'Product Manager',
      company: 'InnovateTech',
      location: 'Austin, TX',
      salary: '$110k - $140k',
      type: 'Full-time',
      remote: false,
      postedDays: 7,
      matchScore: 76,
      description: 'Lead product strategy and execution for our flagship products...',
      requirements: ['5+ years PM experience', 'Technical background', 'Data-driven mindset'],
      benefits: ['Competitive salary', 'Bonus structure', 'Great team'],
      logo: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?w=100'
    }
  ];

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Job</h1>
          <p className="text-gray-600 mt-2">
            Discover opportunities matched to your skills and preferences
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <select
                value={salaryFilter}
                onChange={(e) => setSalaryFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Salary Range</option>
                <option value="0-50k">$0 - $50k</option>
                <option value="50k-100k">$50k - $100k</option>
                <option value="100k-150k">$100k - $150k</option>
                <option value="150k+">$150k+</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex space-x-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Search Jobs
            </button>
            <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium">
              Clear Filters
            </button>
          </div>
        </div>

        {/* Job Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Showing {jobs.length} jobs matching your profile
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
                <option>Best Match</option>
                <option>Newest</option>
                <option>Salary</option>
              </select>
            </div>
          </div>

          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-gray-600">{job.company}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                        {job.remote && <span className="ml-1 text-green-600">• Remote</span>}
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {job.salary}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {job.postedDays} days ago
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${getMatchScoreColor(job.matchScore)}`}>
                    <Star className="w-4 h-4 inline mr-1" />
                    {job.matchScore}% match
                  </span>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{job.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Requirements</h4>
                  <ul className="space-y-1">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Benefits</h4>
                  <ul className="space-y-1">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Match Reasons</h4>
                  <div className="space-y-1">
                    <span className="inline-block bg-green-50 text-green-700 text-xs px-2 py-1 rounded mr-1">
                      ✓ Skills match
                    </span>
                    <span className="inline-block bg-green-50 text-green-700 text-xs px-2 py-1 rounded mr-1">
                      ✓ Experience level
                    </span>
                    <span className="inline-block bg-green-50 text-green-700 text-xs px-2 py-1 rounded">
                      ✓ Location preference
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Apply Now
                </button>
                <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                  View Details
                </button>
                <button className="bg-purple-100 text-purple-700 px-6 py-2 rounded-lg hover:bg-purple-200 transition-colors font-medium flex items-center">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Company Page
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <button className="bg-white text-gray-700 px-8 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors font-medium">
            Load More Jobs
          </button>
        </div>
      </div>
    </div>
  );
}
