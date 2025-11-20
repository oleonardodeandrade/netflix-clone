import { memo, useRef, useState, useEffect } from 'react'
import { watchProgressStorage, type WatchProgress } from '../../services'
import { ContinueWatchingCard } from './ContinueWatchingCard'

export const ContinueWatchingRow = memo(function ContinueWatchingRow() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [continueWatching, setContinueWatching] = useState<WatchProgress[]>([])

  useEffect(() => {
    const loadContinueWatching = () => {
      const items = watchProgressStorage.getContinueWatching()
      setContinueWatching(items)
    }

    loadContinueWatching()

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'netflix-clone-watch-progress') {
        loadContinueWatching()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleRemove = () => {
    const items = watchProgressStorage.getContinueWatching()
    setContinueWatching(items)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -800 : 800
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  if (continueWatching.length === 0) return null

  return (
    <div className="space-y-3 mb-8">
      <h2 className="text-xl md:text-2xl font-bold text-white px-4 md:px-8 hover:text-gray-300 transition-colors cursor-default">
        Continue Watching
      </h2>

      <div className="group relative px-4 md:px-8">
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute left-0 top-0 bottom-0 z-30 w-14 bg-black/60 hover:bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 items-center justify-center backdrop-blur-sm"
          aria-label="Scroll left"
        >
          <svg
            className="w-10 h-10 text-white drop-shadow-lg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className="flex gap-2 md:gap-3 overflow-x-scroll scrollbar-hide scroll-smooth py-4 md:py-6 -my-4 md:-my-6"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {continueWatching.map((item) => (
            <div
              key={item.movieId}
              className="min-w-[200px] sm:min-w-[240px] md:min-w-[280px] lg:min-w-[320px] flex-shrink-0"
            >
              <ContinueWatchingCard watchProgress={item} onRemove={handleRemove} />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="hidden md:flex absolute right-0 top-0 bottom-0 z-30 w-14 bg-black/60 hover:bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 items-center justify-center backdrop-blur-sm"
          aria-label="Scroll right"
        >
          <svg
            className="w-10 h-10 text-white drop-shadow-lg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  )
})
