import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useAtomValue } from 'jotai'
import { recommendationsService } from '../services/api/recommendationsService'
import { movieService } from '../services'
import { currentProfileAtom } from '../store/profiles'
import type { Movie } from '../types/movie'

export interface RecommendationRow {
  title: string
  movies: Movie[]
}

export function useRecommendations() {
  const { user } = useUser()
  const currentProfile = useAtomValue(currentProfileAtom)
  const [recommendations, setRecommendations] = useState<RecommendationRow[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user?.id) return

    const fetchRecommendations = async () => {
      setLoading(true)
      try {
        const response = await recommendationsService.getRecommendations(
          user.id,
          currentProfile?.id
        )

        const rows: RecommendationRow[] = []

        for (const category of response.categories) {
          const movies: Movie[] = []
          const seenIds = new Set<string>()

          for (const movieId of category.movieIds) {
            try {
              const similarResponse = await movieService.getSimilarMovies(movieId, 1)

              for (const movie of similarResponse.results.slice(0, 3)) {
                if (!seenIds.has(movie.id) && movies.length < 10) {
                  movies.push(movie)
                  seenIds.add(movie.id)
                }
              }
            } catch (error) {
              console.error(`Failed to fetch similar movies for ${movieId}:`, error)
            }
          }

          if (movies.length > 0) {
            rows.push({
              title: category.title,
              movies,
            })
          }
        }

        setRecommendations(rows)
      } catch (error) {
        console.error('Failed to fetch recommendations:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [user?.id, currentProfile?.id])

  return { recommendations, loading }
}
