import { useState } from 'react'
import type { SearchFilters } from '../../types/search'
import { GENRE_OPTIONS, YEAR_OPTIONS, CONTENT_TYPE_OPTIONS, SORT_OPTIONS } from '../../types/search'

interface SearchFiltersProps {
  filters: SearchFilters
  onFilterChange: (filters: SearchFilters) => void
  resultCount?: number
}

export function SearchFilters({ filters, onFilterChange, resultCount }: SearchFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleGenreChange = (genreId: string | null) => {
    onFilterChange({ ...filters, genre: genreId })
  }

  const handleYearChange = (year: number | null) => {
    onFilterChange({ ...filters, year })
  }

  const handleContentTypeChange = (contentType: SearchFilters['contentType']) => {
    onFilterChange({ ...filters, contentType })
  }

  const handleSortChange = (sortBy: SearchFilters['sortBy']) => {
    onFilterChange({ ...filters, sortBy })
  }

  const clearFilters = () => {
    onFilterChange({
      ...filters,
      genre: null,
      year: null,
      contentType: 'all',
      sortBy: 'relevance',
    })
  }

  const hasActiveFilters = filters.genre || filters.year || filters.contentType !== 'all' || filters.sortBy !== 'relevance'

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {resultCount !== undefined && (
          <span className="text-sm text-gray-400">
            {resultCount} {resultCount === 1 ? 'result' : 'results'}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {CONTENT_TYPE_OPTIONS.map(option => (
          <button
            key={option.value}
            onClick={() => handleContentTypeChange(option.value as SearchFilters['contentType'])}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filters.contentType === option.value
                ? 'bg-white text-black'
                : 'bg-zinc-800 text-white hover:bg-zinc-700'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {isExpanded && (
        <div className="bg-zinc-900 rounded-lg p-6 space-y-6 animate-fade-in">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Genre</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleGenreChange(null)}
                className={`px-3 py-1.5 rounded text-sm transition-all ${
                  !filters.genre
                    ? 'bg-red-600 text-white'
                    : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                }`}
              >
                All Genres
              </button>
              {GENRE_OPTIONS.map(genre => (
                <button
                  key={genre.id}
                  onClick={() => handleGenreChange(String(genre.id))}
                  className={`px-3 py-1.5 rounded text-sm transition-all ${
                    filters.genre === String(genre.id)
                      ? 'bg-red-600 text-white'
                      : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                  }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Release Year</label>
              <select
                value={filters.year || ''}
                onChange={(e) => handleYearChange(e.target.value ? Number(e.target.value) : null)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-white transition-colors"
              >
                <option value="">Any Year</option>
                {YEAR_OPTIONS.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleSortChange(e.target.value as SearchFilters['sortBy'])}
                className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-white transition-colors"
              >
                {SORT_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
