import { apiClient } from '../api/client';

export class UserService {
  async getProfile(userId: string) {
    return apiClient.getUserProfile(userId);
  }

  async updateProfile(userId: string, data: any) {
    return apiClient.updateProfile(userId, data);
  }

  async getLeads(filters: any) {
    return apiClient.getLeads(filters);
  }

  async getLeadById(leadId: string) {
    return apiClient.getLeadById(leadId);
  }

  async applyToLead(leadId: string, userId: string, coverLetter: string, proposedRate?: number) {
    return apiClient.applyToLead({
      leadId,
      userId,
      coverLetter,
      proposedRate,
    });
  }

  async getMyApplications(userId: string, filters: any = {}) {
    return apiClient.getMyApplications(userId, filters);
  }
}

export const userService = new UserService();