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
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
              {movie.title}
            </h1>

            <HeroActions movie={movie} />
          </div>

          <div className="hidden lg:block">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                poster={movie.backdropUrl}
              >
                <source src={movie.backdropUrl} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
