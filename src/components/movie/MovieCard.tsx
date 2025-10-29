import type { Movie } from '../../types/movie'

type MovieCardProps = {
  movie: Movie
  onClick?: (movie: Movie) => void
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
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
}
