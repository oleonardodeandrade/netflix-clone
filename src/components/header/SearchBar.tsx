import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAtom } from 'jotai'
import { searchQueryAtom } from '../../store/ui'
import { searchHistoryStorage } from '../../services/localStorage/searchHistoryStorage'
import { movieService } from '../../services'
import type { Movie } from '../../types/movie'

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useAtom(searchQueryAtom)
  const [showHistory, setShowHistory] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<Movie[]>([])
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
      setHistory(searchHistoryStorage.getHistory())
      setShowHistory(true)
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowHistory(false)
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([])
      setShowSuggestions(false)
      setShowHistory(true)
      return
    }

    setShowHistory(false)
    setLoadingSuggestions(true)

    const timeoutId = setTimeout(async () => {
      try {
        const results = await movieService.searchMovies(query)
        setSuggestions(results.results.slice(0, 5))
        setShowSuggestions(true)
      } catch (error) {
        console.error('Error fetching suggestions:', error)
        setSuggestions([])
      } finally {
        setLoadingSuggestions(false)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query])

  useEffect(() => {
    if (!query.trim()) return

    const timeoutId = setTimeout(() => {
      navigate(`/search?q=${encodeURIComponent(query)}`)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query, navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      searchHistoryStorage.addSearch(query)
      setShowHistory(false)
      setShowSuggestions(false)
      navigate(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  const handleHistoryClick = (searchQuery: string) => {
    setQuery(searchQuery)
    searchHistoryStorage.addSearch(searchQuery)
    setShowHistory(false)
    setShowSuggestions(false)
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  const handleSuggestionClick = (movie: Movie) => {
    searchHistoryStorage.addSearch(movie.title)
    setQuery(movie.title)
    setShowSuggestions(false)
    navigate(`/search?q=${encodeURIComponent(movie.title)}`)
  }

  const handleRemoveHistory = (e: React.MouseEvent, searchQuery: string) => {
    e.stopPropagation()
    searchHistoryStorage.removeSearch(searchQuery)
    setHistory(searchHistoryStorage.getHistory())
  }

  const handleClearHistory = () => {
    searchHistoryStorage.clearHistory()
    setHistory([])
  }

  const handleClose = () => {
    setIsOpen(false)
    setQuery('')
    setShowHistory(false)
    setShowSuggestions(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex])
        } else {
          handleSubmit(e)
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        break
    }
  }

  return (
    <div className="relative">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="text-white hover:text-gray-300 transition-colors"
          aria-label="Open search"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      ) : (
        <div ref={dropdownRef} className="relative">
          <form onSubmit={handleSubmit} className="relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => !query && setShowHistory(true)}
              onKeyDown={handleKeyDown}
              placeholder="Titles, genres..."
              className="w-64 bg-black/70 border border-white/30 text-white px-4 py-2 pl-10 rounded focus:outline-none focus:border-white transition-colors"
            />
            <svg
              className="w-5 h-5 text-white/70 absolute left-3 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {query && (
              <button
                type="button"
                onClick={handleClose}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                aria-label="Clear search"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </form>

          {showHistory && !query && history.length > 0 && (
            <div className="absolute top-full mt-2 w-64 bg-black/95 border border-white/20 rounded-md shadow-xl overflow-hidden z-50">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
                <span className="text-sm text-white/60 font-semibold">Recent Searches</span>
                <button
                  onClick={handleClearHistory}
                  className="text-xs text-white/60 hover:text-white transition-colors"
                >
                  Clear all
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {history.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleHistoryClick(item)}
                    className="w-full flex items-center justify-between px-4 py-2 hover:bg-white/10 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-white">{item}</span>
                    </div>
                    <button
                      onClick={(e) => handleRemoveHistory(e, item)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove from history"
                    >
                      <svg className="w-4 h-4 text-white/60 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </button>
                ))}
              </div>
            </div>
          )}

          {showSuggestions && query && (
            <div className="absolute top-full mt-2 w-96 bg-black/95 border border-white/20 rounded-md shadow-xl overflow-hidden z-50">
              {loadingSuggestions ? (
                <div className="p-4 text-center">
                  <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
              ) : suggestions.length > 0 ? (
                <div className="max-h-96 overflow-y-auto">
                  {suggestions.map((movie, index) => (
                    <button
                      key={movie.id}
                      onClick={() => handleSuggestionClick(movie)}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors ${
                        index === selectedIndex ? 'bg-white/10' : ''
                      }`}
                    >
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-12 h-18 object-cover rounded"
                      />
                      <div className="flex-1 text-left">
                        <p className="text-sm font-semibold text-white line-clamp-1">{movie.title}</p>
                        <p className="text-xs text-white/60">{movie.year}</p>
                      </div>
                      <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-white/60 text-sm">
                  No suggestions found
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
