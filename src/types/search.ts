export interface SearchFilters {
  query: string
  genre: string | null
  year: number | null
  contentType: 'all' | 'movie' | 'tv'
  sortBy: 'relevance' | 'year' | 'rating'
}

export const DEFAULT_FILTERS: SearchFilters = {
  query: '',
  genre: null,
  year: null,
  contentType: 'all',
  sortBy: 'relevance',
}

export const GENRE_OPTIONS = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Sci-Fi' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
] as const

export const YEAR_OPTIONS = (() => {
  const currentYear = new Date().getFullYear()
  const years: number[] = []
  for (let year = currentYear; year >= 1990; year--) {
    years.push(year)
  }
  return years
})()

export const CONTENT_TYPE_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'movie', label: 'Movies' },
  { value: 'tv', label: 'TV Shows' },
] as const

export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'year', label: 'Release Year' },
  { value: 'rating', label: 'Rating' },
] as const
