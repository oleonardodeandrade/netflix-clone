import { useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useAtom } from 'jotai'
import { favoriteMoviesAtom } from '../store/movies'
import { favoritesService } from '../services/api/favoritesService'
import { favoritesStorage } from '../services/localStorage/favoritesStorage'
import { movieService } from '../services'
import type { Movie } from '../types/movie'

export function useFavoritesPersistence() {
  const { user } = useUser()
  const [favorites, setFavorites] = useAtom(favoriteMoviesAtom)

  useEffect(() => {
    const storedFavorites = favoritesStorage.getFavorites()
    if (storedFavorites.length > 0) {
      setFavorites(storedFavorites)
    }
  }, [setFavorites])

  useEffect(() => {
    if (!user?.id) return

    const loadFavorites = async () => {
      try {
        const favoritesData = await favoritesService.getFavorites(user.id)

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
        favoritesStorage.saveFavorites(movies)
      } catch (error) {
        console.warn('API not available, using localStorage only:', error)
      }
    }

    loadFavorites()
  }, [user?.id, setFavorites])

  useEffect(() => {
    favoritesStorage.saveFavorites(favorites)
  }, [favorites])
}
