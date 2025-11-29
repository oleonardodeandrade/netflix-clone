import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { useNavigate } from 'react-router'
import { useUser } from '@clerk/clerk-react'
import { selectedMovieAtom, favoriteMoviesAtom } from '../../store/movies'
import { useToggleFavorite } from '../../hooks/useToggleFavorite'
import { ratingsService } from '../../services/api/ratingsService'
import { movieService } from '../../services'
import { StarRating } from '../rating/StarRating'
import { MaturityRating, QualityBadge } from '../badges'
import { EpisodeList } from './EpisodeList'
import { MovieCard } from './MovieCard'
import type { Movie } from '../../types/movie'

export function MoviePreviewModal() {
  const { user } = useUser()
  const navigate = useNavigate()
  const [movie, setMovie] = useAtom(selectedMovieAtom)
  const [favorites] = useAtom(favoriteMoviesAtom)
  const toggleFavorite = useToggleFavorite()
  const [userRating, setUserRating] = useState(0)
  const [fullDetails, setFullDetails] = useState<Movie | null>(null)
  const [loadingDetails, setLoadingDetails] = useState(false)

  const onClose = () => {
    setMovie(null)
    setFullDetails(null)
  }

  const handlePlay = () => {
    if (!movie) return
    navigate(`/watch/${movie.id}`)
  }

  const isFavorite = movie ? favorites.some((fav) => fav.id === movie.id) : false

  useEffect(() => {
    if (!movie || !user?.id) return

    const loadRating = async () => {
      try {
        const rating = await ratingsService.getRating(user.id, movie.id)
        setUserRating(rating.rating)
      } catch {
        setUserRating(0)
      }
    }

    loadRating()
  }, [movie, user?.id])

  useEffect(() => {
    if (!movie) {
      setFullDetails(null)
      return
    }

    const loadDetails = async () => {
      setLoadingDetails(true)
      try {
        const details = movie.isTvShow
          ? await movieService.getTvShowDetails(movie.id)
          : await movieService.getMovieDetails(movie.id)
        setFullDetails(details)
      } catch {
        setFullDetails(null)
      } finally {
        setLoadingDetails(false)
      }
    }

    loadDetails()
  }, [movie?.id, movie?.isTvShow])

  const handleFavoriteClick = async () => {
    if (!movie) return
    await toggleFavorite(movie, isFavorite)
  }

  const handleRatingChange = async (rating: number) => {
    if (!movie || !user?.id) return

    const previousRating = userRating
    setUserRating(rating)

    try {
      await ratingsService.rateMovie(user.id, movie.id, rating)
    } catch (error) {
      console.error('Failed to rate movie:', error)
      setUserRating(previousRating)
      alert('Failed to save rating. Please try again.')
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-zinc-900 rounded-xl shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 md:top-5 md:right-5 z-10 w-10 h-10 md:w-11 md:h-11 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 rounded-full transition-all border border-zinc-700 hover:border-zinc-600"
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
              strokeWidth={2.5}
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

            <div className="flex gap-3 md:gap-4">
              <button
                onClick={handlePlay}
                className="flex items-center gap-2 md:gap-3 bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded font-bold hover:bg-white/80 transition-all shadow-lg text-base md:text-lg"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Play</span>
              </button>

              <button
                onClick={handleFavoriteClick}
                className={`w-10 h-10 md:w-11 md:h-11 flex items-center justify-center border-2 rounded-full transition-all ${
                  isFavorite
                    ? 'border-red-500 bg-red-500/20 hover:bg-red-500/30'
                    : 'border-white/60 hover:border-white bg-zinc-800/50 hover:bg-zinc-800'
                }`}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <svg
                  className={`w-5 h-5 md:w-6 md:h-6 transition-colors ${isFavorite ? 'text-red-500 fill-current' : 'text-white'}`}
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
                className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center border-2 border-white/60 hover:border-white rounded-full hover:bg-zinc-800 transition-all bg-zinc-800/50"
                aria-label="Share movie"
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-white"
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
              <div className="flex items-center gap-3 text-sm flex-wrap">
                <span className="text-green-500 font-semibold">{Math.round(movie.rating * 10)}% Match</span>
                <span className="text-white/80">{movie.year}</span>
                {movie.maturityRating && (
                  <MaturityRating rating={movie.maturityRating} />
                )}
                {movie.quality && <QualityBadge quality={movie.quality} />}
                <span className="text-white/80">{movie.duration}</span>
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

            <div className="space-y-3 text-sm">
              {fullDetails?.director && (
                <div>
                  <span className="text-gray-400">Director: </span>
                  <span className="text-white">{fullDetails.director}</span>
                </div>
              )}

              {(fullDetails?.cast?.length ?? movie.cast.length) > 0 && (
                <div>
                  <span className="text-gray-400">Cast: </span>
                  <span className="text-white">
                    {(fullDetails?.cast || movie.cast).slice(0, 4).map(actor => actor.fullName).join(', ')}
                  </span>
                </div>
              )}

              {movie.tags.length > 0 && (
                <div>
                  <span className="text-gray-400">Genres: </span>
                  <span className="text-white">{movie.tags.join(', ')}</span>
                </div>
              )}

              {fullDetails?.originalLanguage && (
                <div>
                  <span className="text-gray-400">Audio: </span>
                  <span className="text-white">{fullDetails.originalLanguage}</span>
                </div>
              )}
            </div>
          </div>

          {(fullDetails?.cast?.length ?? 0) > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Cast</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {fullDetails?.cast.slice(0, 10).map((actor) => (
                  <div key={actor.id} className="text-center">
                    <div className="w-full aspect-square rounded-lg overflow-hidden bg-zinc-800 mb-2">
                      <img
                        src={actor.profileUrl}
                        alt={actor.fullName}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-white text-sm font-medium truncate">{actor.fullName}</p>
                    {actor.character && (
                      <p className="text-gray-400 text-xs truncate">{actor.character}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {movie.isTvShow && fullDetails?.seasons && fullDetails.seasons.length > 0 && (
            <EpisodeList tvShowId={movie.id} seasons={fullDetails.seasons} />
          )}

          {fullDetails?.similar && fullDetails.similar.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">More Like This</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {fullDetails.similar.slice(0, 12).map((similarMovie) => (
                  <MovieCard
                    key={similarMovie.id}
                    movie={similarMovie}
                    onClick={setMovie}
                  />
                ))}
              </div>
            </div>
          )}

          {loadingDetails && (
            <div className="space-y-6">
              <div>
                <div className="h-6 w-24 bg-zinc-800 rounded animate-pulse mb-4" />
                <div className="grid grid-cols-5 gap-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="space-y-2">
                      <div className="aspect-square bg-zinc-800 rounded-lg animate-pulse" />
                      <div className="h-3 bg-zinc-800 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
