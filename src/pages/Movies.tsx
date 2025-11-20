import { SignedIn } from '@clerk/clerk-react'
import { useEffect, useState, useMemo } from 'react'
import { useSetAtom } from 'jotai'
import { movieService } from '../services'
import type { Movie } from '../types/movie'
import { MovieCard } from '../components/movie/MovieCard'
import { Header } from '../components/header/Header'
import { MoviePreviewModal } from '../components/movie/MoviePreviewModal'
import { Footer } from '../components/footer/Footer'
import { MovieGridSkeleton } from '../components/skeleton'
import { selectedMovieAtom } from '../store/movies'
import { useKidsMode } from '../hooks/useKidsMode'
import { filterMoviesByProfile } from '../utils/kidsMode'

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const setSelectedMovie = useSetAtom(selectedMovieAtom)
  const { isKidsProfile } = useKidsMode()

  const filteredMovies = useMemo(() => {
    return filterMoviesByProfile(movies, isKidsProfile)
  }, [movies, isKidsProfile])

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      try {
        const [popular, trending, topRated] = await Promise.all([
          movieService.getPopularMovies(),
          movieService.getTrendingMovies(),
          movieService.getTopRatedMovies(),
        ])

        const allMovies = [...popular.results, ...trending.results, ...topRated.results]
        const uniqueMovies = Array.from(new Map(allMovies.map(m => [m.id, m])).values())
        setMovies(uniqueMovies)
      } catch (error) {
        console.error('Error fetching movies:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <SignedIn>
        <Header />
      </SignedIn>

      <main className="pt-20 px-4 md:px-8 pb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Movies</h1>

        {loading && <MovieGridSkeleton count={24} />}

        {!loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-3">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={setSelectedMovie}
              />
            ))}
          </div>
        )}
      </main>

      <SignedIn>
        <Footer />
      </SignedIn>

      <MoviePreviewModal />
    </div>
  )
}
