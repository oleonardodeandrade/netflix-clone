import type { Movie } from '../../types/movie'
import { HeroActions } from './HeroActions'

type HeroSectionProps = {
  movie: Movie
}

export function HeroSection({ movie }: HeroSectionProps) {
  return (
    <div className="relative h-[60vh] md:h-[80vh] w-full bg-black">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />

      <div className="relative h-full flex items-center px-4 md:px-8 lg:px-16 z-20">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-3 md:space-y-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">
              {movie.title}
            </h1>

            {movie.description && (
              <p className="text-base md:text-lg text-white/90 line-clamp-3 max-w-xl">
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

          <div className="hidden lg:block">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
              <img
                src={movie.backdropUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
