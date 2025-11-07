import { useSetAtom } from 'jotai'
import { useNavigate } from 'react-router'
import type { Movie } from '../../types/movie'
import { selectedMovieAtom } from '../../store/movies'

type HeroActionsProps = {
  movie: Movie
}

export function HeroActions({ movie }: HeroActionsProps) {
  const setSelectedMovie = useSetAtom(selectedMovieAtom)
  const navigate = useNavigate()

  const handlePlay = () => {
    navigate(`/watch/${movie.id}`)
  }

  const handleMoreInfo = () => {
    setSelectedMovie(movie)
  }

  return (
    <div className="flex flex-wrap gap-3 md:gap-4 pt-4">
      <button
        onClick={handlePlay}
        className="flex items-center gap-2 md:gap-3 bg-white text-black px-6 md:px-10 py-2 md:py-3 rounded hover:bg-white/80 transition-all font-bold text-base md:text-lg shadow-lg hover:shadow-xl"
      >
        <svg
          className="w-5 h-5 md:w-7 md:h-7"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
        <span>Play</span>
      </button>

      <button
        onClick={handleMoreInfo}
        className="flex items-center gap-2 md:gap-3 bg-gray-500/70 text-white px-6 md:px-8 py-2 md:py-3 rounded font-semibold hover:bg-gray-500/50 transition-all backdrop-blur-sm text-base md:text-lg shadow-lg hover:shadow-xl"
      >
        <svg
          className="w-5 h-5 md:w-7 md:h-7"
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
        <span>More Info</span>
      </button>
    </div>
  )
}
