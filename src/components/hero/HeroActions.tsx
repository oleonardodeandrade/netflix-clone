import { useAtom, useSetAtom } from 'jotai'
import { useNavigate } from 'react-router'
import type { Movie } from '../../types/movie'
import { favoriteMoviesAtom, selectedMovieAtom } from '../../store/movies'
import { useToggleFavorite } from '../../hooks/useToggleFavorite'

type HeroActionsProps = {
  movie: Movie
}

export function HeroActions({ movie }: HeroActionsProps) {
  const setSelectedMovie = useSetAtom(selectedMovieAtom)
  const [favorites] = useAtom(favoriteMoviesAtom)
  const toggleFavorite = useToggleFavorite()
  const navigate = useNavigate()

  const isFavorite = favorites.some((fav) => fav.id === movie.id)

  const handlePlay = () => {
    navigate(`/watch/${movie.id}`)
  }

  const handleMoreInfo = () => {
    setSelectedMovie(movie)
  }

  const handleFavoriteClick = async () => {
    await toggleFavorite(movie, isFavorite)
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
        onClick={handleFavoriteClick}
        className="flex items-center gap-2 md:gap-3 bg-gray-500/70 text-white px-4 md:px-6 py-2 md:py-3 rounded font-semibold hover:bg-gray-500/50 transition-all backdrop-blur-sm text-base md:text-lg shadow-lg hover:shadow-xl"
      >
        <svg
          className={`w-5 h-5 md:w-6 md:h-6 transition-colors ${isFavorite ? 'text-red-500 fill-current' : 'text-white'}`}
          fill={isFavorite ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <span>{isFavorite ? 'Remove from List' : 'Add to List'}</span>
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
