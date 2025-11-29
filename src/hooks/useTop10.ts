import { useState, useEffect } from 'react'
import { top10Service, type Top10Movie } from '../services/api/top10Service'
import { movieService } from '../services'
import type { Movie } from '../types/movie'

export interface Top10MovieWithDetails extends Top10Movie {
  movie: Movie | null
}

export function useTop10() {
  const [top10Movies, setTop10Movies] = useState<Top10MovieWithDetails[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTop10 = async () => {
      setLoading(true)
      setError(null)

      try {
        const { movies } = await top10Service.getTop10()

        const moviesWithDetails = await Promise.all(
          movies.map(async (top10Movie) => {
            try {
              const movie = await movieService.getMovieById(top10Movie.movieId)
              return {
                ...top10Movie,
                movie,
              }
            } catch (error) {
              console.error(`Failed to fetch movie ${top10Movie.movieId}:`, error)
              return {
                ...top10Movie,
                movie: null,
              }
            }
          })
        )

        const validMovies = moviesWithDetails.filter((item) => item.movie !== null)
        setTop10Movies(validMovies)
      } catch (err) {
        console.error('Failed to fetch top 10:', err)
        setError('Failed to load top 10 movies')
      } finally {
        setLoading(false)
      }
    }

    fetchTop10()
  }, [])

  return { top10Movies, loading, error }
}
