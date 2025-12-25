'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { authService } from '../../../lib/services/authService';

interface CategoryData {
  image: string;
  title: string;
  alt: string;
}

type CategoryType = 'photographer' | 'makeup' | 'developer' | 'tutor';

const categoryData: Record<CategoryType, CategoryData> = {
  photographer: {
    image: '/images/photographer.png',
    title: 'Photographer',
    alt: 'Professional photographer with camera'
  },
  makeup: {
    image: '/images/artist.png',
    title: 'Makeup Artist',
    alt: 'Professional makeup artist'
  },
  developer: {
    image: '/images/tutor.png',
    title: 'Developer',
    alt: 'Professional developer'
  },
  tutor: {
    image: '/images/study.png',
    title: 'Tutor',
    alt: 'Professional tutor'
  }
};

const fallbackImages: Record<CategoryType, string> = {
  photographer: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&h=700&fit=crop',
  makeup: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=700&fit=crop',
  developer: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=700&fit=crop',
  tutor: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=700&fit=crop'
};

export default function ForgotPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [category, setCategory] = useState<CategoryType>('photographer');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const categoryParam = searchParams.get('category');
    if (categoryParam && ['photographer', 'makeup', 'developer', 'tutor'].includes(categoryParam)) {
      setCategory(categoryParam as CategoryType);
    }
  }, [searchParams]);

  const handleContinue = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await authService.forgotPassword(email);

      if (result.success) {
        setSuccess('Reset link sent to your email. Please check your inbox.');
        // Optionally redirect after success
        setTimeout(() => {
          router.push(`/users/login?category=${category}`);
        }, 3000);
      } else {
        setError(result.error || 'Failed to send reset email');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Forgot password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient) {
    return null;
  }

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
              <Link href={`/users/login?category=${category}`}>
                <button className="px-6 py-2 text-orange-500 border border-orange-500 rounded hover:bg-orange-50">
                  Login
                </button>
              </Link>
              <Link href={`/users/register?category=${category}`}>
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
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left Side - Image */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 flex items-center justify-center min-h-[700px]">
              <div className="relative w-full max-w-lg h-full flex items-center justify-center">
                <img
                  src={categoryData[category]?.image || fallbackImages[category]}
                  alt={categoryData[category]?.alt || `${category} image`}
                  className="w-full h-auto max-h-[500px] object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = fallbackImages[category];
                  }}
                />
              </div>
            </div>

            {/* Right Side - Forgot Password Form */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Please enter your registered email address
              </h2>
              <p className="text-gray-600 mb-8">
                Enter email address
              </p>

              {/* Category Badge */}
              <div className="mb-6">
                <span className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
                  Resetting password for: {categoryData[category]?.title || category}
                </span>
              </div>

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

              <div className="space-y-6">
                {/* Email Input */}
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    required
                    disabled={isLoading}
                  />
                </div>

                {/* Continue Button */}
                <button
                  onClick={handleContinue}
                  disabled={isLoading}
                  className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : 'Continue'}
                </button>

                {/* Back to Login Link */}
                <p className="text-center text-sm text-gray-600">
                  Remember your password?{' '}
                  <Link href={`/users/login?category=${category}`} className="text-orange-500 hover:text-orange-600 font-medium">
                    Back to Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}