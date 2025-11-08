import type { Movie } from '../../types/movie'
import { HeroActions } from './HeroActions'

type HeroSectionProps = {
  movie: Movie
}

export function HeroSection({ movie }: HeroSectionProps) {
  const hasVideoUrl = movie.previewUrl && movie.previewUrl.includes('youtube')
  const videoId = hasVideoUrl ? movie.previewUrl.split('v=')[1]?.split('&')[0] : null

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
              {videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&modestbranding=1&playlist=${videoId}`}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={movie.title}
                />
              ) : (
                <img
                  src={movie.backdropUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
