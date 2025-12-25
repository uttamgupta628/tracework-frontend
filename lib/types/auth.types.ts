// ==========================================
// COMMON TYPES
// ==========================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface Language {
  language: string;
  proficiency: string;
  read: boolean;
  write: boolean;
  speak: boolean;
}

// ==========================================
// AUTHENTICATION TYPES
// ==========================================

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirm_password: string;  // ✅ snake_case to match proto
  user_type: number;          // ✅ snake_case to match proto
  phoneNumber?: string;
  location?: string;
  dateOfBirth?: string;
  gender?: number;
  experience?: number;
  availability?: number;
  permanentAddress?: string;
  hometown?: string;
  pincode?: string;
  languages?: Language[];
  captcha?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  userId: string;
  email: string;
  name: string;
  userType: number;
  isVerified: boolean;
  token?: string;
  refreshToken?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  token: string;
  newPassword: string;
}

export interface VerifyAccountRequest {
  email: string;
  code: string;
}

export interface VerifyAccountResponse {
  message: string;
  userId: string;
}

export interface ResendCodeResponse {
  message: string;
}

// ==========================================
// USER PROFILE TYPES
// ==========================================

export interface UserProfile {
  userId: string;
  name: string;
  email: string;
  userType: number;
  phoneNumber?: string;
  location?: string;
  dateOfBirth?: string;
  gender?: number;
  experience?: number;
  availability?: number;
  permanentAddress?: string;
  hometown?: string;
  pincode?: string;
  languages?: Language[];
  profilePicture?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  name?: string;
  phoneNumber?: string;
  location?: string;
  profilePicture?: string;
  permanentAddress?: string;
  hometown?: string;
  pincode?: string;
  languages?: Language[];
}

// ==========================================
// LEAD/JOB TYPES
// ==========================================

export interface LeadFilters {
  searchQuery?: string;
  experienceLevels?: number[];
  jobTypes?: number[];
  hourlyRateMin?: number;
  hourlyRateMax?: number;
  dailyRateMin?: number;
  dailyRateMax?: number;
  location?: string;
  clientVerifications?: number[];
  clientHistories?: number[];
  page?: number;
  limit?: number;
}

export interface LeadData {
  id: string;
  clientName: string;
  title: string;
  description: string;
  requiredSkills: string[];
  experienceLevel: number;
  jobType: number;
  hourlyRateMin: number;
  hourlyRateMax: number;
  dailyRate: number;
  location: string;
  availability: number;
  durationDays: number;
  clientVerification: number;
  clientHistory: number;
  createdByUserId: string;
  applicationsCount: number;
  createdAt: string;
  updatedAt: string;
  postedAgo?: string;
}

export interface CreateLeadRequest {
  clientName: string;
  title: string;
  description: string;
  requiredSkills: string[];
  experienceLevel: number;
  jobType: number;
  hourlyRateMin?: number;
  hourlyRateMax?: number;
  dailyRate?: number;
  location: string;
  availability: number;
  durationDays: number;
  clientVerification: number;
  clientHistory: number;
}

export interface UpdateLeadRequest {
  title?: string;
  description?: string;
  requiredSkills?: string[];
  experienceLevel?: number;
  jobType?: number;
  hourlyRateMin?: number;
  hourlyRateMax?: number;
  dailyRate?: number;
  location?: string;
  availability?: number;
  durationDays?: number;
}

// ==========================================
// APPLICATION TYPES
// ==========================================

export interface ApplicationData {
  id: string;
  leadId: string;
  userId: string;
  coverLetter: string;
  proposedRate: number;
  status: number;
  notes?: string;
  appliedAt: string;
  lead?: LeadData;
  user?: UserProfile;
}

export interface ApplyToLeadRequest {
  leadId: string;
  coverLetter: string;
  proposedRate?: number;
}

export interface ApplicationFilters {
  status?: number;
  page?: number;
  limit?: number;
}

export interface UpdateApplicationStatusRequest {
  applicationId: string;
  status: number;
  notes?: string;
}

// ==========================================
// ENUMS
// ==========================================

export enum UserTypeEnum {
  PHOTOGRAPHER = 1,
  MAKEUP_ARTIST = 2,
  DEVELOPER = 3,
  TUTOR = 4,
}

export enum GenderEnum {
  MALE = 1,
  FEMALE = 2,
  OTHERS = 3,
}

export enum ExperienceEnum {
  FRESHER = 1,
  EXPERIENCED = 2,
}

export enum AvailabilityEnum {
  IMMEDIATELY = 1,
  WITHIN_A_WEEK = 2,
  WITHIN_15_DAYS = 3,
}

export enum ExperienceLevelEnum {
  FRESHER = 1,
  INTERMEDIATE = 2,
  EXPERIENCED = 3,
}

export enum JobTypeEnum {
  HOURLY = 1,
  DAILY = 2,
  PROJECT = 3,
}

export enum AvailabilityTypeEnum {
  IMMEDIATELY = 1,
  WITHIN_WEEK = 2,
  WITHIN_2_WEEKS = 3,
}

export enum ClientVerificationEnum {
  NONE = 0,
  PAYMENT_VERIFIED = 1,
  CONTACT_VERIFIED = 2,
  BOTH = 3,
}

export enum ClientHistoryEnum {
  NO_HIRES = 1,
  ONE_TO_TEN = 2,
  TEN_PLUS = 3,
}

export enum ApplicationStatusEnum {
  PENDING = 1,
  SHORTLISTED = 2,
  REJECTED = 3,
  ACCEPTED = 4,
}

// ==========================================
// RESPONSE TYPES
// ==========================================

export interface RegisterResponse {
  message: string;
  userId: string;
  email: string;
}

export interface GetUserProfileResponse {
  user: UserProfile;
}

export interface UpdateProfileResponse {
  message: string;
  user: UserProfile;
}

export interface GetLeadsResponse {
  leads: LeadData[];
  total: number;
  page: number;
  limit: number;
}

export interface GetLeadByIdResponse {
  lead: LeadData;
}

export interface CreateLeadResponse {
  message: string;
  leadId: string;
  lead: LeadData;
}

export interface UpdateLeadResponse {
  message: string;
  lead: LeadData;
}

export interface DeleteLeadResponse {
  message: string;
}

export interface ApplyToLeadResponse {
  message: string;
  applicationId: string;
}

export interface GetApplicationsResponse {
  applications: ApplicationData[];
  total: number;
  page: number;
  limit: number;
}

export interface UpdateApplicationStatusResponse {
  message: string;
  application: ApplicationData;
}