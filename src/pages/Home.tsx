import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { useEffect, useState, useRef } from 'react'
import { movieService } from '../services'
import type { Movie } from '../types/movie'

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const hasFetched = useRef(false)

  useEffect(() => {
    if (hasFetched.current) return

    const fetchMovies = async () => {
      hasFetched.current = true
      setLoading(true)
      setError(null)
      try {
        const response = await movieService.getPopularMovies()
        setMovies(response.results)
      } catch (err) {
        setError('Failed to load movies')
        console.error('Error fetching movies:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="flex justify-between items-center p-6">
        <h1 className="text-3xl font-bold text-red-600">Netflix Clone</h1>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded font-semibold">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      <main className="p-8">
        <SignedOut>
          <div className="text-center mt-20">
            <h2 className="text-5xl font-bold mb-4">Welcome to Netflix Clone</h2>
            <p className="text-gray-400 text-xl mb-8">Sign in to start watching</p>
          </div>
        </SignedOut>

        <SignedIn>
          <div>
            <h2 className="text-4xl font-bold mb-6">Popular Movies</h2>

            {loading && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-800 aspect-[2/3] rounded-md"></div>
                    <div className="mt-2 space-y-2">
                      <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && movies.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {movies.slice(0, 12).map((movie) => (
                  <div key={movie.id} className="group cursor-pointer transition-transform hover:scale-105">
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="w-full rounded-md shadow-lg"
                    />
                    <div className="mt-2">
                      <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
                      <p className="text-xs text-gray-400">{movie.year} • ⭐ {movie.rating}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && !error && movies.length === 0 && (
              <p className="text-gray-400">No movies found</p>
            )}
          </div>
        </SignedIn>
      </main>
    </div>
  )
}
