import { atom } from 'jotai'
import type { Movie } from '../types/movie'

export const selectedMovieAtom = atom<Movie | null>(null)

export const favoriteMoviesAtom = atom<Movie[]>([])

export const userIdAtom = atom<string | null>(null)

export const selectedGenreAtom = atom<string>('all')

export const isFavoriteAtom = atom(
  (get) => {
    const favorites = get(favoriteMoviesAtom)
    const selected = get(selectedMovieAtom)
    if (!selected) return false
    return favorites.some((fav) => fav.id === selected.id)
  }
)

export const toggleFavoriteAtom = atom(
  null,
  (get, set, movie: Movie) => {
    const favorites = get(favoriteMoviesAtom)
    const exists = favorites.some((fav) => fav.id === movie.id)

    if (exists) {
      set(favoriteMoviesAtom, favorites.filter((fav) => fav.id !== movie.id))
    } else {
      set(favoriteMoviesAtom, [...favorites, movie])
    }
  }
)
