import { useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useAtom, useSetAtom } from 'jotai'
import { favoriteMoviesAtom, toggleFavoriteAtom } from '../store/movies'
import { favoritesService } from '../services/api/favoritesService'
import { movieService } from '../services'
import type { Movie } from '../types/movie'

export function useFavoritesApi() {
  const { user } = useUser()
  const [favorites, setFavorites] = useAtom(favoriteMoviesAtom)
  const toggleFavorite = useSetAtom(toggleFavoriteAtom)

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

  const addToFavorites = async (movie: Movie) => {
    if (!user?.id) {
      console.warn('User not authenticated')
      return
    }

    toggleFavorite(movie)

    try {
      await favoritesService.addFavorite(user.id, movie.id)
    } catch (error) {
      console.error('Failed to add favorite to API:', error)
      toggleFavorite(movie)
    }
  }

  const removeFromFavorites = async (movie: Movie) => {
    if (!user?.id) {
      console.warn('User not authenticated')
      return
    }

    toggleFavorite(movie)

    try {
      await favoritesService.removeFavorite(user.id, movie.id)
    } catch (error) {
      console.error('Failed to remove favorite from API:', error)
      toggleFavorite(movie)
    }
  }

  const isFavorite = (movieId: string) => {
    return favorites.some((fav) => fav.id === movieId)
  }

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  }
}
