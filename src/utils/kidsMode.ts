import type { Movie } from '../types/movie'

const KIDS_ALLOWED_RATINGS = ['G', 'PG', 'TV-Y', 'TV-Y7', 'TV-G']

export function isAppropriateForKids(movie: Movie): boolean {
  if (!movie.maturityRating) {
    return false
  }

  return KIDS_ALLOWED_RATINGS.includes(movie.maturityRating)
}

export function filterMoviesForKids(movies: Movie[]): Movie[] {
  return movies.filter(isAppropriateForKids)
}

export function filterMoviesByProfile(movies: Movie[], isKidsProfile: boolean): Movie[] {
  if (!isKidsProfile) {
    return movies
  }

  return filterMoviesForKids(movies)
}
