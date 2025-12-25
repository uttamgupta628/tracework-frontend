'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { 
  UserCookie, 
  getUserCookie, 
  setUserCookie, 
  removeUserCookies,
  getTokenCookie,
  isAuthenticated as checkAuth
} from '../utils/cookies';
import { authService } from '../services/authService';

interface UserContextType {
  user: UserCookie | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (userData: UserCookie) => void;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<UserCookie>) => void;
  refreshUserData: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserCookie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load user from cookies on mount
  useEffect(() => {
    const loadUser = () => {
      const userCookie = getUserCookie();
      const token = getTokenCookie();
      
      if (userCookie && token) {
        setUser(userCookie);
      } else if (userCookie && !token) {
        // If user exists but no token, clear user data
        removeUserCookies();
        setUser(null);
      }
      
      setIsLoading(false);
    };

    loadUser();
  }, []);

  // Login function - sets user in state and cookies
  const login = (userData: UserCookie) => {
    setUserCookie(userData);
    setUser(userData);
  };

  // Logout function - clears user from state and cookies
  const logout = async () => {
    try {
      // Call backend logout if needed
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local state and cookies
      removeUserCookies();
      setUser(null);
      
      // Clear any other local storage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('pendingVerificationEmail');
        sessionStorage.clear();
      }
      
      // Redirect to login
      router.push('/users/login');
    }
  };

  // Update user data
  const updateUser = (userData: Partial<UserCookie>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUserCookie(updatedUser);
      setUser(updatedUser);
    }
  };

  // Refresh user data from backend
  const refreshUserData = async () => {
    if (!user) return;

    try {
      const result = await authService.getMyProfile();
      if (result.success && result.data?.user) {
        const updatedUser: UserCookie = {
          userId: result.data.user.userId,
          name: result.data.user.name,
          email: result.data.user.email,
          userType: result.data.user.userType,
          isVerified: result.data.user.isVerified,
          category: user.category, // Keep existing category
          token: user.token, // Keep existing token
        };
        
        setUserCookie(updatedUser);
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Failed to refresh user data:', error);
    }
  };

  const value: UserContextType = {
    user,
    isLoading,
    isAuthenticated: checkAuth(),
    login,
    logout,
    updateUser,
    refreshUserData,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the UserContext
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

// Helper hook to check if user is authenticated (for use in components)
export function useAuth() {
  const { user, isAuthenticated, isLoading } = useUser();
  return { user, isAuthenticated, isLoading };
}

// Helper hook to require authentication (redirects if not authenticated)
export function useRequireAuth(redirectTo: string = '/users/login') {
  const { isAuthenticated, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  return { isAuthenticated, isLoading };
}