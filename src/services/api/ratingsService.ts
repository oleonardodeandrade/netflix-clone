export interface RatingResponse {
  id: string
  userId: string
  movieId: string
  rating: number
  createdAt: string
  updatedAt: string
}

const RATINGS_STORAGE_KEY = 'netflix-clone-ratings'

function getRatingsFromStorage(): Record<string, RatingResponse> {
  const stored = localStorage.getItem(RATINGS_STORAGE_KEY)
  return stored ? JSON.parse(stored) : {}
}

function saveRatingsToStorage(ratings: Record<string, RatingResponse>): void {
  localStorage.setItem(RATINGS_STORAGE_KEY, JSON.stringify(ratings))
}

export const ratingsService = {
  async getRatings(userId: string): Promise<RatingResponse[]> {
    const ratings = getRatingsFromStorage()
    return Object.values(ratings).filter((r) => r.userId === userId)
  },

  async getRating(userId: string, movieId: string): Promise<RatingResponse> {
    const key = `${userId}-${movieId}`
    const ratings = getRatingsFromStorage()
    const rating = ratings[key]

    if (!rating) {
      throw new Error('Rating not found')
    }

    return rating
  },

  async rateMovie(userId: string, movieId: string, rating: number): Promise<RatingResponse> {
    const key = `${userId}-${movieId}`
    const ratings = getRatingsFromStorage()
    const now = new Date().toISOString()

    const ratingData: RatingResponse = {
      id: key,
      userId,
      movieId,
      rating,
      createdAt: ratings[key]?.createdAt || now,
      updatedAt: now,
    }

    ratings[key] = ratingData
    saveRatingsToStorage(ratings)

    return ratingData
  },

  async removeRating(userId: string, movieId: string): Promise<void> {
    const key = `${userId}-${movieId}`
    const ratings = getRatingsFromStorage()
    delete ratings[key]
    saveRatingsToStorage(ratings)
  },
}
