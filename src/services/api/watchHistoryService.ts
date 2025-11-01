import { apiClient } from './client'

export interface WatchHistoryResponse {
  id: string
  userId: string
  movieId: string
  watchedAt: string
  progress: number
  completed: boolean
}

export const watchHistoryService = {
  async getWatchHistory(userId: string): Promise<WatchHistoryResponse[]> {
    return apiClient.get<WatchHistoryResponse[]>(`/watch-history/${userId}`)
  },

  async updateProgress(
    userId: string,
    movieId: string,
    progress: number,
    completed: boolean = false
  ): Promise<WatchHistoryResponse> {
    return apiClient.post<WatchHistoryResponse>('/watch-history', {
      userId,
      movieId,
      progress,
      completed,
    })
  },

  async removeFromHistory(userId: string, movieId: string): Promise<void> {
    return apiClient.delete(`/watch-history/${userId}/${movieId}`)
  },
}
