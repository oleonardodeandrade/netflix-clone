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
      className="group relative cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:z-20"
      onClick={() => onClick?.(movie)}
    >
      <div className="relative overflow-hidden rounded-md">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full aspect-[2/3] object-cover"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            <button
              onClick={handleFavoriteClick}
              className="w-8 h-8 flex items-center justify-center bg-black/80 hover:bg-white/20 border border-white/50 rounded-full transition-colors"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg
                className={`w-4 h-4 transition-colors ${isFavorite ? 'text-red-500 fill-current' : 'text-white'}`}
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
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            <h3 className="text-sm font-bold text-white mb-1 line-clamp-1">
              {movie.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-white/80">
              <span className="text-green-400 font-semibold">{Math.round(movie.rating * 10)}% Match</span>
              <span>{movie.year}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})
