import { apiClient } from './client'

export interface RecommendationCategory {
  title: string
  movieIds: string[]
}

export interface RecommendationsResponse {
  categories: RecommendationCategory[]
}

export const recommendationsService = {
  async getRecommendations(
    userId: string,
    profileId?: string
  ): Promise<RecommendationsResponse> {
    const params = profileId ? `?profileId=${profileId}` : ''
    return apiClient.get<RecommendationsResponse>(
      `/recommendations/${userId}${params}`
    )
  },
}
