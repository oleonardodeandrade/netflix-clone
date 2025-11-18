import { useCallback } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useSetAtom, useAtomValue } from 'jotai'
import { toggleFavoriteAtom } from '../store/movies'
import { currentProfileAtom } from '../store/profiles'
import { favoritesService } from '../services/api/favoritesService'
import type { Movie } from '../types/movie'

export function useToggleFavorite() {
  const { user } = useUser()
  const currentProfile = useAtomValue(currentProfileAtom)
  const toggleFavorite = useSetAtom(toggleFavoriteAtom)

  const handleToggleFavorite = useCallback(
    async (movie: Movie, isFavorite: boolean) => {
      toggleFavorite(movie)

      if (user?.id) {
        try {
          if (isFavorite) {
            await favoritesService.removeFavorite(user.id, movie.id, currentProfile?.id)
          } else {
            await favoritesService.addFavorite(user.id, movie.id, currentProfile?.id)
          }
        } catch (error) {
          console.warn('API not available, using localStorage only:', error)
        }
      }
    },
    [user?.id, currentProfile?.id, toggleFavorite]
  )

  return handleToggleFavorite
}
