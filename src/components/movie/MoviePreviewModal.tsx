import { useEffect, useState } from 'react'
import { useAtom, useSetAtom } from 'jotai'
import { useUser } from '@clerk/clerk-react'
import { selectedMovieAtom, favoriteMoviesAtom, toggleFavoriteAtom } from '../../store/movies'
import { favoritesService } from '../../services/api/favoritesService'
import { ratingsService } from '../../services/api/ratingsService'
import { StarRating } from '../rating/StarRating'

export function MoviePreviewModal() {
  const { user } = useUser()
  const [movie, setMovie] = useAtom(selectedMovieAtom)
  const [favorites] = useAtom(favoriteMoviesAtom)
  const toggleFavorite = useSetAtom(toggleFavoriteAtom)
  const [userRating, setUserRating] = useState(0)

  const onClose = () => setMovie(null)

  const isFavorite = movie ? favorites.some((fav) => fav.id === movie.id) : false

  useEffect(() => {
    if (!movie || !user?.id) return

    const loadRating = async () => {
      try {
        const rating = await ratingsService.getRating(user.id, movie.id)
        setUserRating(rating.rating)
      } catch (error) {
        setUserRating(0)
      }
    }

    loadRating()
  }, [movie, user?.id])

  const handleFavoriteClick = async () => {
    if (!movie || !user?.id) return

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

  const handleRatingChange = async (rating: number) => {
    if (!movie || !user?.id) return

    setUserRating(rating)

    try {
      await ratingsService.rateMovie(user.id, movie.id, rating)
    } catch (error) {
      console.error('Failed to rate movie:', error)
      setUserRating(0)
    }
  }

  const handleShare = async () => {
    if (!movie) return

    const shareData = {
      title: movie.title,
      text: movie.description || `Check out ${movie.title} on Netflix Clone!`,
      url: `${window.location.origin}/movie/${movie.id}`,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(shareData.url)
        alert('Link copied to clipboard!')
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Error sharing:', error)
      }
    }
  }

  useEffect(() => {
    if (!movie) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [movie])

  if (!movie) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-black rounded-lg shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/70 hover:bg-black rounded-full transition-colors"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6 text-white"
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

        <div className="relative">
          <div className="relative aspect-video">
            <img
              src={movie.backdropUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h2 className="text-4xl font-bold text-white mb-4">{movie.title}</h2>

            <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded font-semibold hover:bg-white/90 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Play</span>
              </button>

              <button
                onClick={handleFavoriteClick}
                className={`w-10 h-10 flex items-center justify-center border-2 rounded-full transition-colors ${
                  isFavorite
                    ? 'border-red-500 bg-red-500/10 hover:bg-red-500/20'
                    : 'border-gray-400 hover:border-white'
                }`}
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

              <button
                onClick={handleShare}
                className="w-10 h-10 flex items-center justify-center border-2 border-gray-400 rounded-full hover:border-white transition-colors"
                aria-label="Share movie"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-4 text-sm text-white/80">
                <span className="text-green-500 font-semibold">{Math.round(movie.rating * 10)}% Match</span>
                <span>{movie.year}</span>
                <span>{movie.duration}</span>
              </div>

              {movie.description && (
                <p className="text-white/90 leading-relaxed">
                  {movie.description}
                </p>
              )}

              <div className="mt-6">
                <h3 className="text-sm text-gray-400 mb-2">Your Rating</h3>
                <StarRating value={userRating} onChange={handleRatingChange} />
              </div>
            </div>

            <div className="space-y-4 text-sm">
              {movie.cast.length > 0 && (
                <div>
                  <span className="text-gray-400">Cast: </span>
                  <span className="text-white">
                    {movie.cast.slice(0, 4).map(actor => actor.fullName).join(', ')}
                  </span>
                </div>
              )}

              {movie.tags.length > 0 && (
                <div>
                  <span className="text-gray-400">Genres: </span>
                  <span className="text-white">{movie.tags.join(', ')}</span>
                </div>
              )}
            </div>
          </div>

          {movie.episodes && movie.episodes.length > 0 && (
            <div className="p-8 pt-0">
              <h3 className="text-2xl font-bold mb-4">Episodes</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {movie.episodes.map((episode) => (
                  <div
                    key={episode.id}
                    className="bg-gray-800/50 rounded p-4 hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-32 h-18 bg-gray-700 rounded overflow-hidden">
                        {episode.previewUrl && (
                          <img
                            src={episode.previewUrl}
                            alt={episode.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold">
                            {episode.episodeNumber}. {episode.title}
                          </h4>
                          <span className="text-sm text-gray-400">
                            S{episode.seasonNumber}:E{episode.episodeNumber}
                          </span>
                        </div>
                        {episode.description && (
                          <p className="text-sm text-gray-400 line-clamp-2">
                            {episode.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
