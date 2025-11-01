import { useEffect } from 'react'
import { useAtom, useSetAtom } from 'jotai'
import { selectedMovieAtom, favoriteMoviesAtom, toggleFavoriteAtom } from '../../store/movies'

export function MoviePreviewModal() {
  const [movie, setMovie] = useAtom(selectedMovieAtom)
  const [favorites] = useAtom(favoriteMoviesAtom)
  const toggleFavorite = useSetAtom(toggleFavoriteAtom)

  const onClose = () => setMovie(null)

  const isFavorite = movie ? favorites.some((fav) => fav.id === movie.id) : false

  const handleFavoriteClick = () => {
    if (movie) toggleFavorite(movie)
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
                <span>Assistir</span>
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

              <button className="w-10 h-10 flex items-center justify-center border-2 border-gray-400 rounded-full hover:border-white transition-colors">
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
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
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
                <span className="text-green-500 font-semibold">{Math.round(movie.rating * 10)}% relevante</span>
                <span>{movie.year}</span>
                <span>{movie.duration}</span>
              </div>

              {movie.description && (
                <p className="text-white/90 leading-relaxed">
                  {movie.description}
                </p>
              )}
            </div>

            <div className="space-y-4 text-sm">
              {movie.cast.length > 0 && (
                <div>
                  <span className="text-gray-400">Elenco: </span>
                  <span className="text-white">
                    {movie.cast.slice(0, 4).map(actor => actor.fullName).join(', ')}
                  </span>
                </div>
              )}

              {movie.tags.length > 0 && (
                <div>
                  <span className="text-gray-400">Gêneros: </span>
                  <span className="text-white">{movie.tags.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
