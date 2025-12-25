import type {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  VerifyAccountRequest,
  UserProfile,
  LeadFilters,
  LeadData,
  ApplicationData,
} from '../types/auth.types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';

// Backend request interface (snake_case for gRPC)
interface RegisterRequestBackend {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  user_type: number;
}

class ApiClient {
  private getAuthHeader(): Record<string, string> {
    // Get token from cookies if needed for Authorization header
    if (typeof window !== 'undefined') {
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(c => c.trim().startsWith('token='));
      if (tokenCookie) {
        const token = tokenCookie.split('=')[1];
        return {
          'Authorization': `Bearer ${token}`
        };
      }
    }
    return {};
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const fullUrl = `${API_BASE_URL}${endpoint}`;
      console.log('📤 API Request:', {
        url: fullUrl,
        method: options.method || 'GET',
        body: options.body ? JSON.parse(options.body as string) : null,
      });

      const response = await fetch(fullUrl, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeader(),
          ...options.headers,
        },
        credentials: 'include',
      });

      console.log('📥 API Response:', {
        url: fullUrl,
        status: response.status,
        statusText: response.statusText,
      });

      // Handle unauthorized responses
      if (response.status === 401) {
        if (typeof window !== 'undefined') {
          document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
        
        return {
          success: false,
          error: 'Session expired. Please login again.',
        };
      }

      // Handle other error statuses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ API Error:', errorData);
        
        return {
          success: false,
          error: errorData.message || errorData.error || `Request failed with status ${response.status}`,
          message: errorData.message,
        };
      }

      const data = await response.json();
      console.log('✅ API Success:', data);
      
      // Handle gRPC-style responses that wrap data
      if (data.message || data.userId || data.user || data.leads || data.lead || data.applications) {
        return {
          success: true,
          data,
          message: data.message,
        };
      }
      
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('❌ API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error occurred',
      };
    }
  }

  // ==========================================
  // AUTHENTICATION METHODS
  // ==========================================

  async register(data: RegisterRequestBackend): Promise<ApiResponse<{ message: string; userId: string; email: string }>> {
    console.log('🔍 Exact data being sent to backend:', {
      name: data.name,
      email: data.email,
      password: data.password,
      confirm_password: data.confirm_password,
      user_type: data.user_type,
      passwordsMatch: data.password === data.confirm_password
    });
    
    return this.request('/api/v1/users/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return this.request('/api/v1/users/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async logout(): Promise<ApiResponse> {
    // Clear cookies client-side
    if (typeof window !== 'undefined') {
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    
    return {
      success: true,
      message: 'Logged out successfully',
    };
  }

  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    return this.request('/api/v1/users/refresh-token', {
      method: 'POST',
    });
  }

  async verifyAccount(data: VerifyAccountRequest): Promise<ApiResponse<{ message: string; userId: string }>> {
    return this.request('/api/v1/users/verify-account', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async resendVerificationCode(email: string): Promise<ApiResponse<{ message: string }>> {
    return this.request('/api/v1/users/resend-verification-code', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse<{ message: string }>> {
    return this.request('/api/v1/users/forgot-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse<{ message: string }>> {
    return this.request('/api/v1/users/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // ==========================================
  // USER PROFILE METHODS
  // ==========================================

  async getUserProfile(userId: string): Promise<ApiResponse<{ user: UserProfile }>> {
    return this.request(`/api/v1/users/profile/${userId}`);
  }

  async getMyProfile(): Promise<ApiResponse<{ user: UserProfile }>> {
    return this.request('/api/v1/users/me');
  }

  async updateProfile(userId: string, data: Partial<UserProfile>): Promise<ApiResponse<{ message: string; user: UserProfile }>> {
    return this.request('/api/v1/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // ==========================================
  // LEAD/JOB METHODS
  // ==========================================

  async getLeads(filters: LeadFilters = {}): Promise<ApiResponse<{ leads: LeadData[]; total: number; page: number; limit: number }>> {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(v => queryParams.append(key, v.toString()));
        } else {
          queryParams.append(key, value.toString());
        }
      }
    });
    
    const queryString = queryParams.toString();
    return this.request(`/api/v1/users/leads${queryString ? `?${queryString}` : ''}`);
  }

  async getLeadById(leadId: string): Promise<ApiResponse<{ lead: LeadData }>> {
    return this.request(`/api/v1/users/leads/${leadId}`);
  }

  async createLead(data: any): Promise<ApiResponse<{ message: string; leadId: string; lead: LeadData }>> {
    return this.request('/api/v1/users/leads', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateLead(leadId: string, data: any): Promise<ApiResponse<{ message: string; lead: LeadData }>> {
    return this.request(`/api/v1/users/leads/${leadId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteLead(leadId: string): Promise<ApiResponse<{ message: string }>> {
    return this.request(`/api/v1/users/leads/${leadId}`, {
      method: 'DELETE',
    });
  }

  async applyToLead(data: {
    leadId: string;
    coverLetter: string;
    proposedRate?: number;
  }): Promise<ApiResponse<{ message: string; applicationId: string }>> {
    return this.request(`/api/v1/users/leads/${data.leadId}/apply`, {
      method: 'POST',
      body: JSON.stringify({
        coverLetter: data.coverLetter,
        proposedRate: data.proposedRate,
      }),
    });
  }

  async getMyApplications(filters: {
    status?: number;
    page?: number;
    limit?: number;
  } = {}): Promise<ApiResponse<{ applications: ApplicationData[]; total: number; page: number; limit: number }>> {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString());
      }
    });
    
    const queryString = queryParams.toString();
    return this.request(`/api/v1/users/applications${queryString ? `?${queryString}` : ''}`);
  }

  async updateApplicationStatus(applicationId: string, data: {
    status: number;
    notes?: string;
  }): Promise<ApiResponse<{ message: string; application: ApplicationData }>> {
    return this.request(`/api/v1/users/applications/${applicationId}/status`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // ==========================================
  // LEGACY METHODS (for backward compatibility)
  // ==========================================

  async saveLead(leadId: string, userId: string): Promise<ApiResponse> {
    return {
      success: false,
      error: 'Feature not yet implemented',
    };
  }

  async unsaveLead(leadId: string, userId: string): Promise<ApiResponse> {
    return {
      success: false,
      error: 'Feature not yet implemented',
    };
  }

  async getSavedLeads(userId: string): Promise<ApiResponse<{ leads: any[] }>> {
    return {
      success: false,
      error: 'Feature not yet implemented',
    };
  }
}

export const apiClient = new ApiClient();