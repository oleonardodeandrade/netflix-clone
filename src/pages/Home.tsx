import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { useEffect, useState, useRef } from 'react'
import { movieService } from '../services'
import type { Movie } from '../types/movie'
import { MovieRow } from '../components/movie/MovieRow'

export default function Home() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([])
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([])
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
        const [popular, trending, topRated] = await Promise.all([
          movieService.getPopularMovies(),
          movieService.getTrendingMovies(),
          movieService.getTopRatedMovies(),
        ])
        setPopularMovies(popular.results)
        setTrendingMovies(trending.results)
        setTopRatedMovies(topRated.results)
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
          <div className="space-y-8">
            {loading && (
              <div className="px-8 space-y-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-8 bg-gray-800 rounded w-48 animate-pulse mb-4"></div>
                    <div className="flex gap-2 overflow-hidden">
                      {[...Array(6)].map((_, j) => (
                        <div
                          key={j}
                          className="min-w-[150px] md:min-w-[200px] bg-gray-800 aspect-[2/3] rounded-md animate-pulse"
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {error && (
              <div className="px-8">
                <p className="text-red-500">{error}</p>
              </div>
            )}

            {!loading && !error && (
              <>
                <MovieRow
                  title="Popular no Netflix"
                  movies={popularMovies}
                  onMovieClick={(movie) => console.log('Clicked:', movie.title)}
                />
                <MovieRow
                  title="Em Alta"
                  movies={trendingMovies}
                  onMovieClick={(movie) => console.log('Clicked:', movie.title)}
                />
                <MovieRow
                  title="Mais Bem Avaliados"
                  movies={topRatedMovies}
                  onMovieClick={(movie) => console.log('Clicked:', movie.title)}
                />
              </>
            )}
          </div>
        </SignedIn>
      </main>
    </div>
  )
}
