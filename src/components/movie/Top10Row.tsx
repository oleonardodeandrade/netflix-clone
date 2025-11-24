import { useState, useRef } from 'react'
import { Link } from 'react-router'
import { useTop10 } from '../../hooks/useTop10'
import { Top10Badge } from '../badges/Top10Badge'
import type { Movie } from '../../types/movie'

type Top10RowProps = {
  onMovieClick: (movie: Movie) => void
}

export function Top10Row({ onMovieClick }: Top10RowProps) {
  const { top10Movies, loading } = useTop10()
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (!scrollContainerRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return

    const scrollAmount = scrollContainerRef.current.clientWidth * 0.8
    const newScrollLeft =
      direction === 'left'
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount

    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    })
  }

  if (loading) {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Top 10 Movies</h2>
          <div className="h-6 w-24 bg-gray-800 rounded animate-pulse" />
        </div>
        <div className="flex gap-2 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-40 h-60 bg-gray-800 rounded animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (top10Movies.length === 0) return null

  return (
    <div className="mb-8 group/row">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bold">Top 10 Movies</h2>
        <Link
          to="/top10"
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          See all
        </Link>
      </div>

      <div className="relative">
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-10 bg-black/50 hover:bg-black/75 text-white px-2 opacity-0 group-hover/row:opacity-100 transition-opacity"
            aria-label="Scroll left"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {top10Movies.map(({ rank, movie }) => {
            if (!movie) return null

            return (
              <div
                key={movie.id}
                onClick={() => onMovieClick(movie)}
                className="relative flex-shrink-0 w-40 cursor-pointer group/card transition-transform hover:scale-105"
              >
                <div className="relative">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-60 object-cover rounded"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2">
                    <Top10Badge rank={rank} />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity rounded" />

                  <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover/card:opacity-100 transition-opacity">
                    <h3 className="text-sm font-semibold line-clamp-2">{movie.title}</h3>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-10 bg-black/50 hover:bg-black/75 text-white px-2 opacity-0 group-hover/row:opacity-100 transition-opacity"
            aria-label="Scroll right"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
