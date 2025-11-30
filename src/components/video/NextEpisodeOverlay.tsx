import { useEffect, useState } from 'react'
import type { Episode } from '../../types/movie'

type NextEpisodeOverlayProps = {
  episode: Episode
  showTitle: string
  visible: boolean
  onPlay: () => void
  onCancel: () => void
  autoPlayDelay?: number
}

export function NextEpisodeOverlay({
  episode,
  showTitle,
  visible,
  onPlay,
  onCancel,
  autoPlayDelay = 10,
}: NextEpisodeOverlayProps) {
  const [countdown, setCountdown] = useState(autoPlayDelay)

  useEffect(() => {
    if (!visible) {
      setCountdown(autoPlayDelay)
      return
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          onPlay()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [visible, autoPlayDelay, onPlay])

  if (!visible) return null

  return (
    <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl p-8">
        <div className="relative w-80 aspect-video bg-zinc-800 rounded overflow-hidden group">
          {episode.previewUrl ? (
            <img
              src={episode.previewUrl}
              alt={episode.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-16 h-16 text-zinc-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
              </svg>
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-14 h-14 flex items-center justify-center bg-white rounded-full">
              <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex-1 text-white text-center md:text-left">
          <p className="text-zinc-400 text-sm mb-1">Next Episode</p>
          <h2 className="text-2xl font-bold mb-2">{showTitle}</h2>
          <p className="text-lg text-zinc-300 mb-1">
            S{episode.seasonNumber}:E{episode.episodeNumber} "{episode.title}"
          </p>
          {episode.description && (
            <p className="text-sm text-zinc-400 line-clamp-2 mb-6 max-w-md">
              {episode.description}
            </p>
          )}

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <button
              onClick={onPlay}
              className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded hover:bg-zinc-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>Play Now</span>
            </button>

            <button
              onClick={onCancel}
              className="px-6 py-3 bg-zinc-700 text-white font-semibold rounded hover:bg-zinc-600 transition-colors"
            >
              Cancel
            </button>
          </div>

          <div className="mt-6 flex items-center gap-3 justify-center md:justify-start">
            <div className="relative w-10 h-10">
              <svg className="w-10 h-10 transform -rotate-90">
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  fill="none"
                  stroke="#3f3f46"
                  strokeWidth="3"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="3"
                  strokeDasharray={113}
                  strokeDashoffset={113 - (113 * countdown) / autoPlayDelay}
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold">
                {countdown}
              </span>
            </div>
            <span className="text-zinc-400 text-sm">Playing in {countdown} seconds...</span>
          </div>
        </div>
      </div>
    </div>
  )
}
