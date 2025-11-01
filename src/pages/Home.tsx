import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/clerk-react'
import { useEffect, useState, useRef } from 'react'
import { useSetAtom, useAtom } from 'jotai'
import { movieService } from '../services'
import type { Movie } from '../types/movie'
import { MovieRow } from '../components/movie/MovieRow'
import { Header } from '../components/header/Header'
import { HeroSection } from '../components/hero/HeroSection'
import { MoviePreviewModal } from '../components/movie/MoviePreviewModal'
import { Footer } from '../components/footer/Footer'
import { selectedMovieAtom } from '../store/movies'
import { useFavoritesPersistence } from '../hooks/useFavoritesPersistence'
import { useWatchHistoryPersistence } from '../hooks/useWatchHistoryPersistence'
import { watchHistoryAtom } from '../store/watchHistory'

export default function Home() {
  const { user } = useUser()
  const [heroMovie, setHeroMovie] = useState<Movie | null>(null)
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([])
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([])
  const [continueWatching, setContinueWatching] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const hasFetched = useRef(false)
  const setSelectedMovie = useSetAtom(selectedMovieAtom)
  const [watchHistory] = useAtom(watchHistoryAtom)

  useFavoritesPersistence()
  useWatchHistoryPersistence()

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

        if (popular.results.length > 0) {
          setHeroMovie(popular.results[0])
        }
      } catch (err) {
        setError('Failed to load movies')
        console.error('Error fetching movies:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  useEffect(() => {
    if (!user?.id || watchHistory.length === 0) {
      setContinueWatching([])
      return
    }

    const loadContinueWatching = async () => {
      try {
        const incompleteHistory = watchHistory
          .filter((item) => !item.completed && item.progress > 0)
          .sort((a, b) => new Date(b.watchedAt).getTime() - new Date(a.watchedAt).getTime())
          .slice(0, 10)

        const moviePromises = incompleteHistory.map((item) =>
          movieService.getMovieById(item.movieId)
        )

        const movies = await Promise.all(moviePromises)
        setContinueWatching(movies.filter((movie): movie is Movie => movie !== null))
      } catch (error) {
        console.error('Failed to load continue watching:', error)
      }
    }

    loadContinueWatching()
  }, [watchHistory, user?.id])

  return (
    <div className="min-h-screen bg-black text-white">
      <SignedOut>
        <header className="flex justify-between items-center p-6">
          <h1 className="text-3xl font-bold text-red-600">Netflix Clone</h1>
          <SignInButton mode="modal">
            <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded font-semibold">
              Sign In
            </button>
          </SignInButton>
        </header>
      </SignedOut>

      <SignedIn>
        <Header />
      </SignedIn>

      <main>
        <SignedOut>
          <div className="text-center pt-40">
            <h2 className="text-5xl font-bold mb-4">Welcome to Netflix Clone</h2>
            <p className="text-gray-400 text-xl mb-8">Sign in to start watching</p>
          </div>
        </SignedOut>

        <SignedIn>
          {loading && (
            <div className="pt-20">
              <div className="h-[80vh] bg-gray-800 animate-pulse"></div>
              <div className="px-8 py-8 space-y-8">
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
            </div>
          )}

          {error && (
            <div className="px-8 pt-20">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {!loading && !error && heroMovie && (
            <>
              <HeroSection movie={heroMovie} />

              <div className="space-y-8 py-8 -mt-32 relative z-10">
                {continueWatching.length > 0 && (
                  <MovieRow
                    title="Continuar Assistindo"
                    movies={continueWatching}
                    onMovieClick={setSelectedMovie}
                  />
                )}
                <MovieRow
                  title="Popular no Netflix"
                  movies={popularMovies}
                  onMovieClick={setSelectedMovie}
                />
                <MovieRow
                  title="Em Alta"
                  movies={trendingMovies}
                  onMovieClick={setSelectedMovie}
                />
                <MovieRow
                  title="Mais Bem Avaliados"
                  movies={topRatedMovies}
                  onMovieClick={setSelectedMovie}
                />
              </div>
            </>
          )}
        </SignedIn>
      </main>

      <SignedIn>
        <Footer />
      </SignedIn>

      <MoviePreviewModal />
    </div>
  )
}
