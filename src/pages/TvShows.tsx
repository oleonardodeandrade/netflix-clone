import { SignedIn } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'
import { useSetAtom } from 'jotai'
import { movieService } from '../services'
import type { Movie } from '../types/movie'
import { MovieCard } from '../components/movie/MovieCard'
import { Header } from '../components/header/Header'
import { MoviePreviewModal } from '../components/movie/MoviePreviewModal'
import { Footer } from '../components/footer/Footer'
import { MovieGridSkeleton } from '../components/skeleton'
import { selectedMovieAtom } from '../store/movies'

export default function TvShows() {
  const [shows, setShows] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const setSelectedMovie = useSetAtom(selectedMovieAtom)

  useEffect(() => {
    const fetchShows = async () => {
      setLoading(true)
      try {
        const [popular, trending] = await Promise.all([
          movieService.getPopularMovies(),
          movieService.getTrendingMovies(),
        ])

        const allShows = [...popular.results, ...trending.results]
        const uniqueShows = Array.from(new Map(allShows.map(m => [m.id, m])).values())
        setShows(uniqueShows)
      } catch (error) {
        console.error('Error fetching TV shows:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchShows()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <SignedIn>
        <Header />
      </SignedIn>

      <main className="pt-20 px-4 md:px-8 pb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">TV Shows</h1>

        {loading && <MovieGridSkeleton count={24} />}

        {!loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-3">
            {shows.map((show) => (
              <MovieCard
                key={show.id}
                movie={show}
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
