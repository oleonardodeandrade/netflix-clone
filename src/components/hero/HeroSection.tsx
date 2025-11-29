import { useState, useRef, useEffect } from 'react'
import type { Movie } from '../../types/movie'
import { HeroActions } from './HeroActions'
import { MaturityRating, QualityBadge, Top10Badge } from '../badges'

type HeroSectionProps = {
  movie: Movie
}

function extractYouTubeId(url: string): string | null {
  if (!url || !url.includes('youtube')) return null
  const match = url.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

export function HeroSection({ movie }: HeroSectionProps) {
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const videoId = extractYouTubeId(movie.previewUrl)

  useEffect(() => {
    setIsMuted(true)
    setIsPlaying(true)
  }, [movie.id])

  const handleToggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="relative h-[60vh] md:h-[80vh] w-full bg-black">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />

      <div className="relative h-full flex items-center px-4 md:px-8 lg:px-16 z-20">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            {movie.top10Rank && (
              <div className="flex items-center gap-3">
                <Top10Badge rank={movie.top10Rank} />
                <span className="text-white/80 text-sm">in Movies Today</span>
              </div>
            )}

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
              {movie.title}
            </h1>

            <p className="text-white/80 text-sm md:text-base line-clamp-3 max-w-lg">
              {movie.description}
            </p>

            <div className="flex items-center gap-3 text-sm">
              {movie.maturityRating && (
                <MaturityRating rating={movie.maturityRating} />
              )}
              <span className="text-white/80">{movie.year}</span>
              {movie.quality && <QualityBadge quality={movie.quality} />}
              <span className="text-green-400 font-semibold">
                {Math.round(movie.rating * 10)}% Match
              </span>
            </div>

            <HeroActions movie={movie} />
          </div>

          <div className="hidden lg:block">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
              {videoId && isPlaying ? (
                <iframe
                  ref={iframeRef}
                  key={`${videoId}-${isMuted}`}
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&controls=0&showinfo=0&modestbranding=1&playlist=${videoId}&rel=0`}
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

              {videoId && (
                <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
                  <button
                    onClick={handleTogglePlay}
                    className="w-10 h-10 flex items-center justify-center bg-zinc-900/80 hover:bg-zinc-800 border border-white/40 hover:border-white rounded-full transition-all"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={handleToggleMute}
                    className="w-10 h-10 flex items-center justify-center bg-zinc-900/80 hover:bg-zinc-800 border border-white/40 hover:border-white rounded-full transition-all"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
