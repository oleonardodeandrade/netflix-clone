import { memo } from 'react'
import { useAtom, useSetAtom } from 'jotai'
import { useUser } from '@clerk/clerk-react'
import type { Movie } from '../../types/movie'
import { favoriteMoviesAtom, toggleFavoriteAtom } from '../../store/movies'
import { favoritesService } from '../../services/api/favoritesService'

type MovieCardProps = {
  movie: Movie
  onClick?: (movie: Movie) => void
}

export const MovieCard = memo(function MovieCard({ movie, onClick }: MovieCardProps) {
  const { user } = useUser()
  const [favorites] = useAtom(favoriteMoviesAtom)
  const toggleFavorite = useSetAtom(toggleFavoriteAtom)

  const isFavorite = favorites.some((fav) => fav.id === movie.id)

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation()

    if (!user?.id) return

    toggleFavorite(movie)

    try {
      if (isFavorite) {
        await favoritesService.removeFavorite(user.id, movie.id)
      } else {
        await favoritesService.addFavorite(user.id, movie.id)
      }
    } catch (error) {
      console.error('Failed to update favorite:', error)
      toggleFavorite(movie)
    }
  }

  return (
    <div
      className="group relative cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-10"
      onClick={() => onClick?.(movie)}
    >
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="w-full rounded-md shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-black/70 hover:bg-black rounded-full transition-colors"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            className={`w-5 h-5 transition-colors ${isFavorite ? 'text-red-500 fill-current' : 'text-white'}`}
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1">
          <h3 className="text-sm font-semibold text-white truncate">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-white/90">
            <span>{movie.year}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              ⭐ {movie.rating}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
})
