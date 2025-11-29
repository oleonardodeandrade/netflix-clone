import { useSetAtom } from 'jotai'
import { Header } from '../components/header/Header'
import { Footer } from '../components/footer/Footer'
import { useTop10 } from '../hooks/useTop10'
import { selectedMovieAtom } from '../store/movies'
import { Top10Badge } from '../components/badges/Top10Badge'
import { MoviePreviewModal } from '../components/movie/MoviePreviewModal'

export default function Top10() {
  const { top10Movies, loading, error } = useTop10()
  const setSelectedMovie = useSetAtom(selectedMovieAtom)

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="pt-20 pb-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Top 10 Movies</h1>
            <p className="text-gray-400 text-lg">Most watched movies on Netflix Clone</p>
          </div>

          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="bg-gray-900 rounded-lg h-32 animate-pulse" />
              ))}
            </div>
          )}

          {error && (
            <div className="bg-red-900/20 border border-red-900 rounded-lg p-6 text-center">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {!loading && !error && top10Movies.length === 0 && (
            <div className="bg-gray-900 rounded-lg p-12 text-center">
              <p className="text-gray-400 text-lg">
                No top 10 movies available yet. Start watching to see the most popular movies!
              </p>
            </div>
          )}

          {!loading && !error && top10Movies.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {top10Movies.map(({ rank, movie, viewCount }) => {
                if (!movie) return null

                return (
                  <div
                    key={movie.id}
                    onClick={() => setSelectedMovie(movie)}
                    className="bg-gray-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-white transition-all cursor-pointer group"
                  >
                    <div className="flex items-center">
                      <div className="relative flex-shrink-0 w-48 h-32">
                        <img
                          src={movie.posterUrl}
                          alt={movie.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute top-2 left-2">
                          <Top10Badge rank={rank} />
                        </div>
                      </div>

                      <div className="flex-1 p-4">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-gray-300 transition-colors">
                          {movie.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-400 mb-2">
                          <span>{movie.year}</span>
                          <span>•</span>
                          <span>{viewCount} views</span>
                        </div>
                        <p className="text-sm text-gray-400 line-clamp-2">{movie.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <MoviePreviewModal />
    </div>
  )
}
