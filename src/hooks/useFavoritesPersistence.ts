import { useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useAtom, useAtomValue } from 'jotai'
import { favoriteMoviesAtom } from '../store/movies'
import { currentProfileAtom } from '../store/profiles'
import { favoritesService } from '../services/api/favoritesService'
import { favoritesStorage } from '../services/localStorage/favoritesStorage'
import { movieService } from '../services'
import type { Movie } from '../types/movie'

export function useFavoritesPersistence() {
  const { user } = useUser()
  const currentProfile = useAtomValue(currentProfileAtom)
  const [, setFavorites] = useAtom(favoriteMoviesAtom)

  useEffect(() => {
    if (!currentProfile) return

    const storedFavorites = favoritesStorage.getFavorites(currentProfile.id)
    if (storedFavorites.length > 0) {
      setFavorites(storedFavorites)
    } else {
      setFavorites([])
    }
  }, [currentProfile?.id, setFavorites])

  useEffect(() => {
    if (!user?.id || !currentProfile?.id) return

    const loadFavorites = async () => {
      try {
        const favoritesData = await favoritesService.getFavorites(user.id, currentProfile.id)

        const moviePromises = favoritesData.map(async (fav) => {
          try {
            return await movieService.getMovieDetails(fav.movieId)
          } catch (error) {
            console.error(`Failed to load movie ${fav.movieId}:`, error)
            return null
          }
        })

        const movies = (await Promise.all(moviePromises)).filter(
          (movie): movie is Movie => movie !== null
        )

        setFavorites(movies)

        movies.forEach((movie) => {
          favoritesStorage.addFavorite(movie, currentProfile.id)
        })
      } catch (error) {
        console.warn('API not available, using localStorage only:', error)
      }
    }

    loadFavorites()
  }, [user?.id, currentProfile?.id, setFavorites])
}
