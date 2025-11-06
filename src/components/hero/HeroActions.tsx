import { useSetAtom } from 'jotai'
import type { Movie } from '../../types/movie'
import { selectedMovieAtom } from '../../store/movies'

type HeroActionsProps = {
  movie: Movie
}

export function HeroActions({ movie }: HeroActionsProps) {
  const setSelectedMovie = useSetAtom(selectedMovieAtom)

  const handlePlay = () => {
    console.log('Play movie:', movie.title)
  }

  const handleMoreInfo = () => {
    setSelectedMovie(movie)
  }

  return (
    <div className="flex flex-wrap gap-4 pt-4">
      <button
        onClick={handlePlay}
        className="flex items-center gap-2 bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded font-semibold hover:bg-white/90 transition-colors"
      >
        <svg
          className="w-5 h-5 md:w-6 md:h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
        <span className="text-sm md:text-base">Play</span>
      </button>

      <button
        onClick={handleMoreInfo}
        className="flex items-center gap-2 bg-gray-500/70 text-white px-6 md:px-8 py-2 md:py-3 rounded font-semibold hover:bg-gray-500/50 transition-colors backdrop-blur-sm"
      >
        <svg
          className="w-5 h-5 md:w-6 md:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-sm md:text-base">More Info</span>
      </button>
    </div>
  )
}
