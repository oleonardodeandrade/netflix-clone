import { apiClient } from './client'

export interface FavoriteResponse {
  id: string
  userId: string
  movieId: string
  createdAt: string
}

export const favoritesService = {
  async getFavorites(userId: string): Promise<FavoriteResponse[]> {
    return apiClient.get<FavoriteResponse[]>(`/favorites/${userId}`)
  },

  async addFavorite(userId: string, movieId: string): Promise<FavoriteResponse> {
    return apiClient.post<FavoriteResponse>('/favorites', {
      userId,
      movieId,
    })
  },

  async removeFavorite(userId: string, movieId: string): Promise<void> {
    return apiClient.delete(`/favorites/${userId}/${movieId}`)
  },
}
