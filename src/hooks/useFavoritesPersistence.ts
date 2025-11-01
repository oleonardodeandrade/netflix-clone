import { useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useSetAtom } from 'jotai'
import { favoriteMoviesAtom } from '../store/movies'
import { favoritesService } from '../services/api/favoritesService'
import { movieService } from '../services'
import type { Movie } from '../types/movie'

export function useFavoritesPersistence() {
  const { user } = useUser()
  const setFavorites = useSetAtom(favoriteMoviesAtom)

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
      } catch (error) {
        console.error('Failed to load favorites from API:', error)
      }
    }

    loadFavorites()
  }, [user?.id, setFavorites])
}
