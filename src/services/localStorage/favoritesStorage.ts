import type { Movie } from '../../types/movie'

const FAVORITES_KEY = 'netflix-clone-favorites'

export const favoritesStorage = {
  getFavorites(): Movie[] {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Failed to load favorites from localStorage:', error)
      return []
    }
  },

  saveFavorites(favorites: Movie[]): void {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    } catch (error) {
      console.error('Failed to save favorites to localStorage:', error)
    }
  },

  addFavorite(movie: Movie): void {
    const favorites = this.getFavorites()
    const exists = favorites.some((fav) => fav.id === movie.id)

    if (!exists) {
      this.saveFavorites([...favorites, movie])
    }
  },

  removeFavorite(movieId: string): void {
    const favorites = this.getFavorites()
    this.saveFavorites(favorites.filter((fav) => fav.id !== movieId))
  },

  isFavorite(movieId: string): boolean {
    const favorites = this.getFavorites()
    return favorites.some((fav) => fav.id === movieId)
  },

  clear(): void {
    localStorage.removeItem(FAVORITES_KEY)
  },
}
