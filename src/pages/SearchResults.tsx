import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { useSetAtom } from 'jotai'
import { movieService } from '../services'
import type { Movie } from '../types/movie'
import { Header } from '../components/header/Header'
import { Footer } from '../components/footer/Footer'
import { MoviePreviewModal } from '../components/movie/MoviePreviewModal'
import { MovieCard } from '../components/movie/MovieCard'
import { selectedMovieAtom } from '../store/movies'
import { useFavoritesPersistence } from '../hooks/useFavoritesPersistence'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const setSelectedMovie = useSetAtom(selectedMovieAtom)

  useFavoritesPersistence()

  useEffect(() => {
    if (!query.trim()) {
      setMovies([])
      return
    }

    const searchMovies = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await movieService.searchMovies(query)
        setMovies(response.results)
      } catch (err) {
        setError('Failed to search movies')
        console.error('Error searching movies:', err)
      } finally {
        setLoading(false)
      }
    }

    searchMovies()
  }, [query])

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="pt-20 px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {query && (
            <h1 className="text-3xl font-bold mb-8">
              Search results for "{query}"
            </h1>
          )}

          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-800 aspect-[2/3] rounded-md animate-pulse"
                ></div>
              ))}
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="text-red-500 text-xl">{error}</p>
            </div>
          )}

          {!loading && !error && movies.length === 0 && query && (
            <div className="text-center py-20">
              <svg
                className="w-20 h-20 mx-auto mb-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h2 className="text-2xl font-semibold mb-2 text-gray-400">
                No results found
              </h2>
              <p className="text-gray-500">
                Try searching with different keywords
              </p>
            </div>
          )}

          {!loading && !error && movies.length > 0 && (
            <>
              <p className="text-gray-400 mb-6">
                Found {movies.length} {movies.length === 1 ? 'result' : 'results'}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onClick={setSelectedMovie}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
      <MoviePreviewModal />
    </div>
  )
}
