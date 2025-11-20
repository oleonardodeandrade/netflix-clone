import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react'
import { useEffect, useState, useRef, useMemo } from 'react'
import { useSetAtom, useAtom } from 'jotai'
import { movieService } from '../services'
import type { Movie } from '../types/movie'
import { MovieRow } from '../components/movie/MovieRow'
import { ContinueWatchingRow } from '../components/movie/ContinueWatchingRow'
import { Header } from '../components/header/Header'
import { HeroSection } from '../components/hero/HeroSection'
import { MoviePreviewModal } from '../components/movie/MoviePreviewModal'
import { Footer } from '../components/footer/Footer'
import { HeroSkeleton, MovieRowSkeleton } from '../components/skeleton'
import { selectedMovieAtom, selectedGenreAtom } from '../store/movies'
import { useFavoritesPersistence } from '../hooks/useFavoritesPersistence'
import { useWatchHistoryPersistence } from '../hooks/useWatchHistoryPersistence'
import { useKidsMode } from '../hooks/useKidsMode'
import { filterMoviesByProfile } from '../utils/kidsMode'

export default function Home() {
  const [heroMovie, setHeroMovie] = useState<Movie | null>(null)
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([])
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const hasFetched = useRef(false)
  const setSelectedMovie = useSetAtom(selectedMovieAtom)
  const [selectedGenre] = useAtom(selectedGenreAtom)
  const { isKidsProfile } = useKidsMode()

  useFavoritesPersistence()
  useWatchHistoryPersistence()

  const filterByGenre = (movies: Movie[]) => {
    if (selectedGenre === 'all') return movies
    return movies.filter((movie) =>
      movie.tags.some((tag) => tag.toLowerCase() === selectedGenre.toLowerCase())
    )
  }

  const filteredPopularMovies = useMemo(() => {
    const genreFiltered = filterByGenre(popularMovies)
    return filterMoviesByProfile(genreFiltered, isKidsProfile)
  }, [popularMovies, selectedGenre, isKidsProfile])

  const filteredTrendingMovies = useMemo(() => {
    const genreFiltered = filterByGenre(trendingMovies)
    return filterMoviesByProfile(genreFiltered, isKidsProfile)
  }, [trendingMovies, selectedGenre, isKidsProfile])

  const filteredTopRatedMovies = useMemo(() => {
    const genreFiltered = filterByGenre(topRatedMovies)
    return filterMoviesByProfile(genreFiltered, isKidsProfile)
  }, [topRatedMovies, selectedGenre, isKidsProfile])

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
          const heroMovieDetails = await movieService.getMovieDetails(popular.results[0].id)
          setHeroMovie(heroMovieDetails)
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
              <HeroSkeleton />
              <div className="space-y-8 py-8 -mt-32 relative z-10">
                {[...Array(4)].map((_, i) => (
                  <MovieRowSkeleton key={i} />
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
                <ContinueWatchingRow />
                <MovieRow
                  title="Popular on Netflix"
                  movies={filteredPopularMovies}
                  onMovieClick={setSelectedMovie}
                />
                <MovieRow
                  title="Trending Now"
                  movies={filteredTrendingMovies}
                  onMovieClick={setSelectedMovie}
                />
                <MovieRow
                  title="Top Rated"
                  movies={filteredTopRatedMovies}
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
