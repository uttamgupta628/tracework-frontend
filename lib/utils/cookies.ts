// lib/utils/cookies.ts
import Cookies from 'js-cookie';

export interface UserCookie {
  userId: string;
  name: string;
  email: string;
  userType: number;
  category: string;
  isVerified: boolean;
  token?: string;
}

export const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
};

// Set user data in cookie
export const setUserCookie = (user: UserCookie) => {
  Cookies.set('user', JSON.stringify(user), COOKIE_OPTIONS);
};

// Get user data from cookie
export const getUserCookie = (): UserCookie | null => {
  const userStr = Cookies.get('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Error parsing user cookie:', error);
    return null;
  }
};

// Set authentication token
export const setAuthToken = (token: string) => {
  Cookies.set('token', token, COOKIE_OPTIONS);
};

// Get authentication token
export const getAuthToken = (): string | undefined => {
  return Cookies.get('token');
};

// Alias for getAuthToken (for consistency with your existing code)
export const getTokenCookie = (): string | undefined => {
  return getAuthToken();
};

// Set refresh token
export const setRefreshToken = (refreshToken: string) => {
  Cookies.set('refreshToken', refreshToken, COOKIE_OPTIONS);
};

// Get refresh token
export const getRefreshToken = (): string | undefined => {
  return Cookies.get('refreshToken');
};

// Remove all auth-related cookies
export const removeUserCookies = () => {
  Cookies.remove('user', { path: '/' });
  Cookies.remove('token', { path: '/' });
  Cookies.remove('refreshToken', { path: '/' });
  
  // Fallback: Clear using document.cookie for stubborn cookies
  if (typeof document !== 'undefined') {
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
};

// Update specific user data in cookie
export const updateUserCookie = (userData: Partial<UserCookie>) => {
  const currentUser = getUserCookie();
  if (currentUser) {
    const updatedUser = { ...currentUser, ...userData };
    setUserCookie(updatedUser);
  }
};

// Check if user is authenticated (has both user data and token)
export const isAuthenticated = (): boolean => {
  const user = getUserCookie();
  const token = getAuthToken();
  return !!(user && token);
};