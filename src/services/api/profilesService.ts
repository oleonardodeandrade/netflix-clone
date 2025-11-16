import { apiClient } from './client'
import type { Profile, CreateProfileDto, UpdateProfileDto } from '../../types/profile'

export const profilesService = {
  async getProfiles(userId: string): Promise<Profile[]> {
    return apiClient.get<Profile[]>(`/profiles/${userId}`)
  },

  async createProfile(data: CreateProfileDto): Promise<Profile> {
    return apiClient.post<Profile>('/profiles', data)
  },

  async updateProfile(id: string, data: UpdateProfileDto): Promise<Profile> {
    return apiClient.put<Profile>(`/profiles/${id}`, data)
  },

  async deleteProfile(id: string): Promise<void> {
    return apiClient.delete(`/profiles/${id}`)
  },
}
