import { memo } from 'react'
import { useNavigate } from 'react-router'
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
  const navigate = useNavigate()
  const [favorites] = useAtom(favoriteMoviesAtom)
  const toggleFavorite = useSetAtom(toggleFavoriteAtom)

  const isFavorite = favorites.some((fav) => fav.id === movie.id)

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(`/watch/${movie.id}`)
  }

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

  const handleMoreInfo = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClick?.(movie)
  }

  return (
    <div className="group relative cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:z-20">
      <div className="relative overflow-hidden rounded-md bg-zinc-900">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full aspect-[2/3] object-cover"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-3 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePlay}
                className="w-8 h-8 flex items-center justify-center bg-white hover:bg-white/80 rounded-full transition-all"
                aria-label="Play"
              >
                <svg className="w-4 h-4 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>

              <button
                onClick={handleFavoriteClick}
                className="w-8 h-8 flex items-center justify-center bg-zinc-800/90 hover:bg-zinc-700 border border-white/40 hover:border-white rounded-full transition-all"
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

              <button
                onClick={handleMoreInfo}
                className="w-8 h-8 flex items-center justify-center bg-zinc-800/90 hover:bg-zinc-700 border border-white/40 hover:border-white rounded-full transition-all ml-auto"
                aria-label="More info"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <h3 className="text-sm font-bold text-white line-clamp-1">
              {movie.title}
            </h3>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-green-400 font-semibold">{Math.round(movie.rating * 10)}% Match</span>
              <span className="text-white/70">{movie.year}</span>
            </div>

            {movie.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {movie.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs text-white/60 capitalize">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})
