import type { Movie } from '../../types/movie'

const FAVORITES_KEY = 'netflix-clone-favorites'

interface FavoriteWithProfile {
  movie: Movie
  profileId?: string
}

export const favoritesStorage = {
  getFavorites(profileId?: string): Movie[] {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY)
      if (!stored) return []

      const data: FavoriteWithProfile[] = JSON.parse(stored)

      if (!profileId) {
        return data.map((item) => item.movie || item as unknown as Movie)
      }

      return data
        .filter((item) => item.profileId === profileId)
        .map((item) => item.movie)
    } catch (error) {
      console.error('Failed to load favorites from localStorage:', error)
      return []
    }
  },

  saveFavorites(favorites: FavoriteWithProfile[]): void {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    } catch (error) {
      console.error('Failed to save favorites to localStorage:', error)
    }
  },

  addFavorite(movie: Movie, profileId?: string): void {
    const stored = localStorage.getItem(FAVORITES_KEY)
    const allFavorites: FavoriteWithProfile[] = stored ? JSON.parse(stored) : []

    const exists = allFavorites.some(
      (fav) => fav.movie.id === movie.id && fav.profileId === profileId
    )

    if (!exists) {
      this.saveFavorites([...allFavorites, { movie, profileId }])
    }
  },

  removeFavorite(movieId: string, profileId?: string): void {
    const stored = localStorage.getItem(FAVORITES_KEY)
    const allFavorites: FavoriteWithProfile[] = stored ? JSON.parse(stored) : []

    this.saveFavorites(
      allFavorites.filter(
        (fav) => !(fav.movie.id === movieId && fav.profileId === profileId)
      )
    )
  },

  isFavorite(movieId: string, profileId?: string): boolean {
    const stored = localStorage.getItem(FAVORITES_KEY)
    if (!stored) return false

    const allFavorites: FavoriteWithProfile[] = JSON.parse(stored)
    return allFavorites.some(
      (fav) => fav.movie.id === movieId && fav.profileId === profileId
    )
  },

  clear(): void {
    localStorage.removeItem(FAVORITES_KEY)
  },
}
