'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { authService } from '../../../lib/services/authService';

export default function SetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  // Get token and email from URL
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const category = searchParams.get('category');

  useEffect(() => {
    // Redirect if token or email is missing
    if (!token || !email) {
      router.push('/users/forgot-password');
    }
  }, [token, email, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleUpdatePassword = async () => {
    if (!token || !email) {
      setError('Invalid reset link');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await authService.resetPassword(
        email,
        token,
        formData.newPassword
      );

      if (result.success) {
        setSuccess('Password updated successfully! Redirecting to login...');
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push(`/users/login${category ? `?category=${category}` : ''}`);
        }, 2000);
      } else {
        setError(result.error || 'Failed to reset password');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Reset password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUpdatePassword();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center">
              <div className="text-orange-500 text-2xl font-bold">T</div>
              <span className="ml-1 text-gray-800 font-semibold">TRACEWORKS</span>
              <span className="ml-2 text-xs text-gray-500">JOBS</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">Jobs</Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">Companies</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href={`/users/login${category ? `?category=${category}` : ''}`}>
                <button className="px-6 py-2 text-orange-500 border border-orange-500 rounded hover:bg-orange-50">
                  Login
                </button>
              </Link>
              <Link href={`/users/register${category ? `?category=${category}` : ''}`}>
                <button className="px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-800">
                  Register Now
                </button>
              </Link>
              <Link href="/employers">
                <button className="px-6 py-2 text-gray-700 hover:text-gray-900">
                  Employers
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left Side - Image */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-200">
              <img
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&h=700&fit=crop"
                alt="Professional"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Side - Set Password Form */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Please set your new password
              </h2>
              <p className="text-gray-600 mb-6">Enter your new password below</p>

              {/* Success Message */}
              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 font-medium">{success}</p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              )}

              <div className="space-y-5" onKeyPress={handleKeyPress}>
                {/* New Password Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter new password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none pr-12"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      disabled={isLoading}
                    >
                      {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none pr-12"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Update Password Button */}
                <button
                  onClick={handleUpdatePassword}
                  disabled={isLoading}
                  className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors mt-6 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </span>
                  ) : 'Update Password'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}