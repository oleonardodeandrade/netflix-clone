import type { Movie } from '../../types/movie'
import { HeroActions } from './HeroActions'

type HeroSectionProps = {
  movie: Movie
}

export function HeroSection({ movie }: HeroSectionProps) {
  return (
    <div className="relative h-[80vh] w-full">
      <div className="absolute inset-0">
        <img
          src={movie.backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="relative h-full flex items-center px-8 md:px-16">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
            {movie.title}
          </h1>

          {movie.description && (
            <p className="text-base md:text-lg text-white/90 line-clamp-3">
              {movie.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm md:text-base text-white/80">
            <span className="flex items-center gap-1">
              ⭐ {movie.rating}
            </span>
            <span>•</span>
            <span>{movie.year}</span>
            <span>•</span>
            <span>{movie.duration}</span>
          </div>

          {movie.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {movie.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <HeroActions movie={movie} />
        </div>
      </div>
    </div>
  )
}
