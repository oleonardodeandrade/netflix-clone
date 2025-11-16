import { apiClient } from './client'

export interface FavoriteResponse {
  id: string
  userId: string
  profileId?: string
  movieId: string
  createdAt: string
}

export const favoritesService = {
  async getFavorites(userId: string, profileId?: string): Promise<FavoriteResponse[]> {
    const url = profileId
      ? `/favorites/${userId}?profileId=${profileId}`
      : `/favorites/${userId}`
    return apiClient.get<FavoriteResponse[]>(url)
  },

  async addFavorite(userId: string, movieId: string, profileId?: string): Promise<FavoriteResponse> {
    return apiClient.post<FavoriteResponse>('/favorites', {
      userId,
      movieId,
      profileId,
    })
  },

  async removeFavorite(userId: string, movieId: string, profileId?: string): Promise<void> {
    const url = profileId
      ? `/favorites/${userId}/${movieId}?profileId=${profileId}`
      : `/favorites/${userId}/${movieId}`
    return apiClient.delete(url)
  },
}
