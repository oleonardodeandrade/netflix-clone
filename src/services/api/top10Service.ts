import { apiClient } from './client'

export interface Top10Movie {
  movieId: string
  rank: number
  viewCount: number
}

export interface Top10Response {
  movies: Top10Movie[]
}

export const top10Service = {
  async getTop10(): Promise<Top10Response> {
    return apiClient.get<Top10Response>('/top10')
  },
}
