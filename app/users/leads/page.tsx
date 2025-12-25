'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/lib/contexts/UserContext';
import { authService } from '@/lib/services/authService';
import type { LeadData, LeadFilters } from '@/lib/types/auth.types';

// =============================================================================
// COMPONENTS
// =============================================================================

interface SuccessPopupProps {
  message: string;
  onClose: () => void;
}

function SuccessPopup({ message, onClose }: SuccessPopupProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-30" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-2xl p-8 text-center max-w-sm w-full mx-4">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-base font-semibold text-gray-800">{message}</p>
      </div>
    </div>
  );
}

function Header() {
  const { user, logout } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center">
            <div className="text-orange-500 text-2xl font-bold">T</div>
            <span className="ml-1 text-gray-800 font-semibold">TRACEWORKS</span>
            <span className="ml-2 text-xs text-gray-500">JOBS</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link href="/leads" className="text-gray-900 font-medium">Leads</Link>
            <Link href="/applications" className="text-gray-600 hover:text-gray-900">My Applications</Link>
            <Link href="/profile" className="text-gray-600 hover:text-gray-900">Profile</Link>
          </nav>

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">
                {user?.name}
              </span>
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/applications"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  My Applications
                </Link>
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    logout();
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

interface LeadDetailsProps {
  lead: LeadData;
  onClose: () => void;
  onApply: (leadId: string) => void;
}

function LeadDetails({ lead, onClose, onApply }: LeadDetailsProps) {
  const [coverLetter, setCoverLetter] = useState('');
  const [proposedRate, setProposedRate] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState('');

  const handleApply = async () => {
    if (!coverLetter.trim()) {
      setError('Please write a cover letter');
      return;
    }

    setIsApplying(true);
    setError('');

    try {
      const result = await authService.applyToLead(
        lead.id,
        coverLetter,
        proposedRate ? parseFloat(proposedRate) : undefined
      );

      if (result.success) {
        onApply(lead.id);
        onClose();
      } else {
        setError(result.error || 'Failed to apply');
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{lead.title}</h2>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <span className="font-medium">{lead.location}</span>
                <span>•</span>
                <span className="font-medium">{lead.durationDays} days</span>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{lead.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Skills Required</h4>
              <div className="flex flex-wrap gap-2">
                {lead.requiredSkills.map((skill, index) => (
                  <span key={index} className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Job Type: </span>
                  <span className="font-semibold text-gray-900">
                    {lead.jobType === 1 ? 'Hourly' : lead.jobType === 2 ? 'Daily' : 'Project'}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Experience: </span>
                  <span className="font-semibold text-gray-900">
                    {lead.experienceLevel === 1 ? 'Fresher' : lead.experienceLevel === 2 ? 'Intermediate' : 'Experienced'}
                  </span>
                </div>
                {lead.hourlyRateMin && lead.hourlyRateMax && (
                  <div>
                    <span className="text-sm text-gray-600">Rate: </span>
                    <span className="font-semibold text-gray-900">
                      ₹{lead.hourlyRateMin} - ₹{lead.hourlyRateMax}/hr
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Client Details</h4>
              <div className="space-y-3">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">{lead.clientName}</span>
                </p>
                <div className="flex items-center gap-2">
                  {lead.clientVerification >= 1 && (
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                      Payment Verified
                    </span>
                  )}
                  {lead.clientVerification >= 2 && (
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                      Contact Verified
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{lead.applicationsCount} applications</p>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Apply to this Lead</h4>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Explain why you're a great fit for this project..."
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  disabled={isApplying}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proposed Rate (Optional)
                </label>
                <input
                  type="number"
                  value={proposedRate}
                  onChange={(e) => setProposedRate(e.target.value)}
                  placeholder="Your proposed rate"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  disabled={isApplying}
                />
              </div>

              <button
                onClick={handleApply}
                disabled={isApplying}
                className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:bg-gray-400"
              >
                {isApplying ? 'Applying...' : 'Submit Application'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface LeadCardProps {
  lead: LeadData;
  onSave: (id: string) => void;
  onViewDetails: (lead: LeadData) => void;
}

function LeadCard({ lead, onSave, onViewDetails }: LeadCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{lead.clientName}</h3>
          <h4 className="text-base font-bold text-gray-900 mb-3">{lead.title}</h4>
        </div>
        <button 
          onClick={() => onSave(lead.id)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>

      <p className="text-sm text-gray-700 mb-4 line-clamp-3">{lead.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {lead.requiredSkills.slice(0, 3).map((skill, index) => (
          <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
            {skill}
          </span>
        ))}
        {lead.requiredSkills.length > 3 && (
          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
            +{lead.requiredSkills.length - 3} more
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
        <span>📍 {lead.location}</span>
        <span>📅 {lead.durationDays} days</span>
        {lead.hourlyRateMin && lead.hourlyRateMax && (
          <span className="font-semibold text-gray-900">
            ₹{lead.hourlyRateMin}-{lead.hourlyRateMax}/hr
          </span>
        )}
      </div>

      <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {lead.applicationsCount} applications
        </span>
        <button 
          onClick={() => onViewDetails(lead)}
          className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function LeadsPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: userLoading } = useUser();
  
  const [leads, setLeads] = useState<LeadData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<LeadData | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Redirect if not authenticated
  useEffect(() => {
    if (!userLoading && !isAuthenticated) {
      router.push('/users/login');
    }
  }, [isAuthenticated, userLoading, router]);

  // Fetch leads
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchLeads();
    }
  }, [isAuthenticated, user]);

  const fetchLeads = async () => {
    setIsLoading(true);
    setError('');

    try {
      const filters: LeadFilters = {
        searchQuery: searchQuery || undefined,
      };

      const result = await authService.getLeads(filters);

      if (result.success && result.data) {
        setLeads(result.data.leads || []);
      } else {
        setError(result.error || 'Failed to load leads');
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (leadId: string) => {
    setSuccessMessage('Lead saved successfully!');
    setShowSuccessPopup(true);
    // Implement save functionality with backend
  };

  const handleApply = (leadId: string) => {
    setSuccessMessage('Application submitted successfully!');
    setShowSuccessPopup(true);
    fetchLeads(); // Refresh to update application count
  };

  const handleSearch = () => {
    fetchLeads();
  };

  // Show loading while checking authentication
  if (userLoading || (isLoading && leads.length === 0)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-lg font-medium text-gray-700">Loading leads...</div>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {showSuccessPopup && (
        <SuccessPopup 
          message={successMessage}
          onClose={() => setShowSuccessPopup(false)}
        />
      )}

      {selectedLead && (
        <LeadDetails 
          lead={selectedLead} 
          onClose={() => setSelectedLead(null)}
          onApply={handleApply}
        />
      )}

      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Leads</h1>
          <p className="text-gray-600">Find the perfect opportunity for your skills</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <svg 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search for jobs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Search
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Leads List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading leads...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">No leads available at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {leads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onSave={handleSave}
                onViewDetails={setSelectedLead}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}