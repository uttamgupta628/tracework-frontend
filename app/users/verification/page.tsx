'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { authService } from '@/lib/services/authService';

interface CategoryData {
  image: string;
  title: string;
  alt: string;
}

type CategoryType = 'photographer' | 'makeup' | 'developer' | 'tutor';

export default function VerificationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [category, setCategory] = useState<CategoryType>('photographer');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isClient, setIsClient] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Get parameters from URL
  useEffect(() => {
    setIsClient(true);
    const categoryParam = searchParams.get('category') as CategoryType;
    const emailParam = searchParams.get('email');
    
    if (categoryParam && ['photographer', 'makeup', 'developer', 'tutor'].includes(categoryParam)) {
      setCategory(categoryParam);
    }
    
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParams]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

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

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move to next input
      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join('');
    
    if (verificationCode.length !== 4) {
      setError('Please enter the complete 4-digit verification code');
      return;
    }

    if (!email) {
      setError('Email not found. Please go back and try again.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await authService.verifyAccount(email, verificationCode);

      if (response.success) {
        // Verification successful, redirect to login or dashboard
        setTimeout(() => {
          router.push(`/users/login?category=${category}&verified=true`);
        }, 1500);
      } else {
        setError(response.error || 'Verification failed');
      }
    } catch (error: any) {
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (timer > 0) return;
    
    if (!email) {
      setError('Email not found. Please go back and try again.');
      return;
    }

    setTimer(30);
    setError('');

    try {
      const response = await authService.resendVerificationCode(email);
      
      if (!response.success) {
        setError(response.error || 'Failed to resend code');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to resend verification code');
    }
  };

  // Don't render on server side to avoid hydration issues
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
              <img
                src={categoryData[category].image}
                alt={categoryData[category].alt}
                className="w-full max-w-lg h-auto object-contain"
              />
            </div>

            {/* Right Side - Verification Form */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Enter the verification code
              </h2>
              <p className="text-gray-600 mb-4">
                Your verification code has been sent to: <span className="font-medium">{email}</span>
              </p>
              <p className="text-gray-500 mb-8 text-sm">
                Check your email and enter the 4-digit code below to complete the verification process.
              </p>

              {/* Category Badge */}
              <div className="mb-6">
                <span className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
                  Verifying for: {categoryData[category].title}
                </span>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              {/* Code Input Boxes */}
              <div className="flex gap-3 mb-4">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-16 h-16 text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    disabled={isLoading}
                  />
                ))}
              </div>

              {/* Timer */}
              <div className="text-right mb-6">
                <span className="text-sm text-gray-600">
                  00:{timer.toString().padStart(2, '0')} sec
                </span>
              </div>

              {/* Resend Code Link */}
              <p className="text-sm text-gray-600 mb-6">
                Haven't received the code?{' '}
                <button
                  onClick={handleResendCode}
                  disabled={timer > 0 || isLoading}
                  className={`font-medium ${
                    timer > 0 || isLoading
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-orange-500 hover:text-orange-600'
                  }`}
                >
                  Resend code
                </button>
              </p>

              {/* Verify Button */}
              <button
                onClick={handleVerify}
                disabled={isLoading}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {isLoading ? 'Verifying...' : 'Verify'}
              </button>

              {/* Back to Registration Link */}
              <p className="text-center text-sm text-gray-600 mt-4">
                Need to change category?{' '}
                <Link href={`/users/register?category=${category}`} className="text-orange-500 hover:text-orange-600 font-medium">
                  Go back to registration
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}