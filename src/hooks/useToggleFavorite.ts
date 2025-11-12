import { useCallback } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useSetAtom } from 'jotai'
import { toggleFavoriteAtom } from '../store/movies'
import { favoritesService } from '../services/api/favoritesService'
import type { Movie } from '../types/movie'

export function useToggleFavorite() {
  const { user } = useUser()
  const toggleFavorite = useSetAtom(toggleFavoriteAtom)

  const handleToggleFavorite = useCallback(
    async (movie: Movie, isFavorite: boolean) => {
      toggleFavorite(movie)

      if (user?.id) {
        try {
          if (isFavorite) {
            await favoritesService.removeFavorite(user.id, movie.id)
          } else {
            await favoritesService.addFavorite(user.id, movie.id)
          }
        } catch (error) {
          console.warn('API not available, using localStorage only:', error)
        }
      }
    },
    [user?.id, toggleFavorite]
  )

  return handleToggleFavorite
}
