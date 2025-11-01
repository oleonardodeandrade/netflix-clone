import { apiClient } from './client'

export interface RatingResponse {
  id: string
  userId: string
  movieId: string
  rating: number
  createdAt: string
  updatedAt: string
}

export const ratingsService = {
  async getRatings(userId: string): Promise<RatingResponse[]> {
    return apiClient.get<RatingResponse[]>(`/ratings/${userId}`)
  },

  async getRating(userId: string, movieId: string): Promise<RatingResponse> {
    return apiClient.get<RatingResponse>(`/ratings/${userId}/${movieId}`)
  },

  async rateMovie(userId: string, movieId: string, rating: number): Promise<RatingResponse> {
    return apiClient.post<RatingResponse>('/ratings', {
      userId,
      movieId,
      rating,
    })
  },

  async removeRating(userId: string, movieId: string): Promise<void> {
    return apiClient.delete(`/ratings/${userId}/${movieId}`)
  },
}
