import { useEffect, useState, useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router'
import { useSetAtom } from 'jotai'
import { movieService } from '../services'
import type { Movie } from '../types/movie'
import type { SearchFilters as SearchFiltersType } from '../types/search'
import { DEFAULT_FILTERS } from '../types/search'
import { Header } from '../components/header/Header'
import { Footer } from '../components/footer/Footer'
import { MoviePreviewModal } from '../components/movie/MoviePreviewModal'
import { MovieCard } from '../components/movie/MovieCard'
import { MovieGridSkeleton } from '../components/skeleton'
import { SearchFilters } from '../components/search/SearchFilters'
import { selectedMovieAtom } from '../store/movies'
import { useFavoritesPersistence } from '../hooks/useFavoritesPersistence'
import { useKidsMode } from '../hooks/useKidsMode'
import { filterMoviesByProfile } from '../utils/kidsMode'

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const setSelectedMovie = useSetAtom(selectedMovieAtom)
  const { isKidsProfile } = useKidsMode()

  const [filters, setFilters] = useState<SearchFiltersType>(() => ({
    ...DEFAULT_FILTERS,
    query,
    genre: searchParams.get('genre'),
    year: searchParams.get('year') ? Number(searchParams.get('year')) : null,
    contentType: (searchParams.get('type') as SearchFiltersType['contentType']) || 'all',
    sortBy: (searchParams.get('sort') as SearchFiltersType['sortBy']) || 'relevance',
  }))

  useFavoritesPersistence()

  const handleFilterChange = useCallback((newFilters: SearchFiltersType) => {
    setFilters(newFilters)
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (newFilters.genre) params.set('genre', newFilters.genre)
    if (newFilters.year) params.set('year', String(newFilters.year))
    if (newFilters.contentType !== 'all') params.set('type', newFilters.contentType)
    if (newFilters.sortBy !== 'relevance') params.set('sort', newFilters.sortBy)
    setSearchParams(params)
  }, [query, setSearchParams])

  const sortResults = useCallback((movies: Movie[], sortBy: SearchFiltersType['sortBy']) => {
    const sorted = [...movies]
    switch (sortBy) {
      case 'year':
        return sorted.sort((a, b) => (b.year || 0) - (a.year || 0))
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating)
      default:
        return sorted
    }
  }, [])

  const filteredResults = useMemo(() => {
    let filtered = filterMoviesByProfile(results, isKidsProfile)

    if (filters.year) {
      filtered = filtered.filter(m => m.year === filters.year)
    }

    return sortResults(filtered, filters.sortBy)
  }, [results, isKidsProfile, filters.year, filters.sortBy, sortResults])

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true)
      setError(null)
      try {
        let movieResults: Movie[] = []
        let tvResults: Movie[] = []

        if (filters.contentType === 'all' || filters.contentType === 'movie') {
          if (query.trim()) {
            const response = await movieService.searchMovies(query)
            movieResults = response.results
          } else if (filters.genre) {
            const genreName = getGenreName(Number(filters.genre))
            if (genreName) {
              const response = await movieService.getMoviesByGenre(genreName)
              movieResults = response.results
            }
          } else {
            const response = await movieService.getPopularMovies()
            movieResults = response.results
          }
        }

        if (filters.contentType === 'all' || filters.contentType === 'tv') {
          if (query.trim()) {
            const response = await movieService.searchTvShows(query)
            tvResults = response.results
          } else {
            const response = await movieService.getPopularTvShows()
            tvResults = response.results
          }
        }

        let combined = [...movieResults, ...tvResults]

        if (filters.genre && query.trim()) {
          combined = combined.filter(m =>
            m.tags?.some(tag => tag.toLowerCase().includes(getGenreName(Number(filters.genre))?.toLowerCase() || ''))
          )
        }

        const uniqueResults = Array.from(new Map(combined.map(m => [m.id, m])).values())
        setResults(uniqueResults)
      } catch (err) {
        setError('Failed to search')
        console.error('Error searching:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [query, filters.contentType, filters.genre])

  const getGenreName = (genreId: number): string | null => {
    const genreMap: Record<number, string> = {
      28: 'action', 12: 'adventure', 16: 'animation', 35: 'comedy',
      80: 'crime', 99: 'documentary', 18: 'drama', 10751: 'family',
      14: 'fantasy', 36: 'history', 27: 'horror', 10402: 'music',
      9648: 'mystery', 10749: 'romance', 878: 'scifi', 53: 'thriller',
      10752: 'war', 37: 'western',
    }
    return genreMap[genreId] || null
  }

  const getPageTitle = () => {
    if (query) return `Search results for "${query}"`
    if (filters.genre) {
      const genreOption = [
        { id: 28, name: 'Action' }, { id: 12, name: 'Adventure' }, { id: 16, name: 'Animation' },
        { id: 35, name: 'Comedy' }, { id: 80, name: 'Crime' }, { id: 99, name: 'Documentary' },
        { id: 18, name: 'Drama' }, { id: 10751, name: 'Family' }, { id: 14, name: 'Fantasy' },
        { id: 36, name: 'History' }, { id: 27, name: 'Horror' }, { id: 10402, name: 'Music' },
        { id: 9648, name: 'Mystery' }, { id: 10749, name: 'Romance' }, { id: 878, name: 'Sci-Fi' },
        { id: 53, name: 'Thriller' }, { id: 10752, name: 'War' }, { id: 37, name: 'Western' },
      ].find(g => g.id === Number(filters.genre))
      return genreOption ? `${genreOption.name} ${filters.contentType === 'tv' ? 'TV Shows' : filters.contentType === 'movie' ? 'Movies' : 'Titles'}` : 'Browse'
    }
    return 'Browse All'
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="pt-20 px-4 md:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">{getPageTitle()}</h1>

          <SearchFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            resultCount={filteredResults.length}
          />

          {loading && <MovieGridSkeleton count={20} />}

          {error && (
            <div className="text-center py-20">
              <p className="text-red-500 text-xl">{error}</p>
            </div>
          )}

          {!loading && !error && filteredResults.length === 0 && (
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
                Try adjusting your filters or search terms
              </p>
            </div>
          )}

          {!loading && !error && filteredResults.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-3">
              {filteredResults.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={setSelectedMovie}
                />
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
