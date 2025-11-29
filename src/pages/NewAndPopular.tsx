import { useEffect, useState, useMemo } from 'react'
import { useSetAtom } from 'jotai'
import { movieService } from '../services'
import type { Movie } from '../types/movie'
import { Header } from '../components/header/Header'
import { MoviePreviewModal } from '../components/movie/MoviePreviewModal'
import { Footer } from '../components/footer/Footer'
import { MovieGridSkeleton } from '../components/skeleton'
import { selectedMovieAtom } from '../store/movies'
import { useKidsMode } from '../hooks/useKidsMode'
import { filterMoviesByProfile } from '../utils/kidsMode'
import { useFavoritesPersistence } from '../hooks/useFavoritesPersistence'

type Tab = 'coming-soon' | 'everyone-watching' | 'top-10' | 'new-on-netflix'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'coming-soon', label: 'Coming Soon', icon: '🍿' },
  { id: 'everyone-watching', label: "Everyone's Watching", icon: '🔥' },
  { id: 'top-10', label: 'Top 10', icon: '🏆' },
  { id: 'new-on-netflix', label: 'New on Netflix', icon: '✨' },
]

export default function NewAndPopular() {
  const [activeTab, setActiveTab] = useState<Tab>('coming-soon')
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const setSelectedMovie = useSetAtom(selectedMovieAtom)
  const { isKidsProfile } = useKidsMode()

  useFavoritesPersistence()

  const filteredMovies = useMemo(() => {
    return filterMoviesByProfile(movies, isKidsProfile)
  }, [movies, isKidsProfile])

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true)
      try {
        let results: Movie[] = []

        switch (activeTab) {
          case 'coming-soon': {
            const response = await movieService.getUpcomingMovies()
            results = response.results
            break
          }
          case 'everyone-watching': {
            const [trendingMovies, trendingTv] = await Promise.all([
              movieService.getTrendingMovies('week'),
              movieService.getTrendingTvShows('week'),
            ])
            const combined = [...trendingMovies.results, ...trendingTv.results]
            results = combined.sort((a, b) => b.rating - a.rating)
            break
          }
          case 'top-10': {
            const response = await movieService.getTopRatedMovies()
            results = response.results.slice(0, 10).map((movie, index) => ({
              ...movie,
              top10Rank: index + 1,
            }))
            break
          }
          case 'new-on-netflix': {
            const response = await movieService.getNowPlayingMovies()
            results = response.results.map(movie => ({
              ...movie,
              isNew: true,
            }))
            break
          }
        }

        setMovies(results)
      } catch (error) {
        console.error('Error fetching content:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [activeTab])

  const getTabDescription = () => {
    switch (activeTab) {
      case 'coming-soon':
        return 'Upcoming movies and shows coming to Netflix'
      case 'everyone-watching':
        return 'Trending now across all of Netflix'
      case 'top-10':
        return 'The most popular titles right now'
      case 'new-on-netflix':
        return 'Recently added to Netflix'
      default:
        return ''
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="pt-20 pb-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">New & Popular</h1>
            <p className="text-gray-400 text-lg">{getTabDescription()}</p>
          </div>

          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-black'
                    : 'bg-zinc-800 text-white hover:bg-zinc-700'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {loading && <MovieGridSkeleton count={20} />}

          {!loading && filteredMovies.length === 0 && (
            <div className="bg-zinc-900 rounded-lg p-12 text-center">
              <p className="text-gray-400 text-lg">No content available in this category</p>
            </div>
          )}

          {!loading && filteredMovies.length > 0 && activeTab === 'top-10' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMovies.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => setSelectedMovie(movie)}
                  className="bg-zinc-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-white transition-all cursor-pointer group"
                >
                  <div className="flex items-center">
                    <div className="relative flex-shrink-0 w-24 md:w-32 flex items-center justify-center">
                      <span className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-300 to-gray-600" style={{ WebkitTextStroke: '2px #666' }}>
                        {movie.top10Rank}
                      </span>
                    </div>
                    <div className="relative flex-shrink-0 w-32 h-44">
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-full h-full object-cover rounded"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-gray-300 transition-colors">
                        {movie.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-400 mb-2">
                        <span className="text-green-500 font-semibold">{Math.round(movie.rating * 10)}% Match</span>
                        <span>{movie.year}</span>
                      </div>
                      <p className="text-sm text-gray-400 line-clamp-2">{movie.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredMovies.length > 0 && activeTab !== 'top-10' && (
            <div className="space-y-4">
              {filteredMovies.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => setSelectedMovie(movie)}
                  className="bg-zinc-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-white transition-all cursor-pointer group"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative flex-shrink-0 w-full md:w-72 h-40 md:h-auto">
                      <img
                        src={movie.backdropUrl}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {activeTab === 'coming-soon' && movie.year && (
                        <div className="absolute top-3 left-3 bg-red-600 px-3 py-1 rounded text-sm font-bold">
                          {movie.year}
                        </div>
                      )}
                      {activeTab === 'new-on-netflix' && (
                        <div className="absolute top-3 left-3 bg-red-600 px-3 py-1 rounded text-sm font-bold">
                          NEW
                        </div>
                      )}
                      {activeTab === 'everyone-watching' && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 rounded text-sm font-bold flex items-center gap-1">
                          <span>🔥</span> Trending
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-4 md:p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold group-hover:text-gray-300 transition-colors">
                            {movie.title}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                            <span className="text-green-500 font-semibold">{Math.round(movie.rating * 10)}% Match</span>
                            <span>{movie.year}</span>
                            {movie.duration && <span>{movie.duration}</span>}
                            {movie.isTvShow && <span className="bg-zinc-700 px-2 py-0.5 rounded text-xs">Series</span>}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="w-10 h-10 flex items-center justify-center bg-white rounded-full hover:bg-gray-200 transition-colors">
                            <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-300 line-clamp-2 md:line-clamp-3">{movie.description}</p>
                      {movie.tags && movie.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {movie.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-xs text-gray-400 bg-zinc-800 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <MoviePreviewModal />
    </div>
  )
}
