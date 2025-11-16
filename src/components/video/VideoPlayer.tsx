import { useEffect, useRef, useState, useCallback } from 'react'

declare global {
  interface Window {
    YT: {
      Player: new (
        element: HTMLElement | string,
        config: {
          videoId: string
          playerVars?: Record<string, number | string>
          events?: {
            onReady?: (event: { target: YTPlayer }) => void
            onStateChange?: (event: { data: number }) => void
          }
        }
      ) => YTPlayer
      PlayerState: {
        ENDED: number
        PLAYING: number
        PAUSED: number
        BUFFERING: number
        CUED: number
      }
    }
    onYouTubeIframeAPIReady: () => void
  }
}

interface YTPlayer {
  destroy(): void
  getCurrentTime(): number
  getDuration(): number
  playVideo(): void
  pauseVideo(): void
  seekTo(seconds: number, allowSeekAhead: boolean): void
}

type VideoPlayerProps = {
  src: string
  poster?: string
  title?: string
  initialTime?: number
  onBack?: () => void
  onEnded?: () => void
  onProgressUpdate?: (currentTime: number, duration: number) => void
}

const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[7].length === 11 ? match[7] : null
}

export function VideoPlayer({ src, poster, title, initialTime, onBack, onEnded, onProgressUpdate }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const youtubePlayerRef = useRef<YTPlayer | null>(null)
  const youtubeDivRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const progressUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const progressPollingRef = useRef<NodeJS.Timeout | null>(null)
  const lastSavedTimeRef = useRef<number>(0)

  const onEndedRef = useRef(onEnded)
  const onProgressUpdateRef = useRef(onProgressUpdate)

  useEffect(() => {
    onEndedRef.current = onEnded
    onProgressUpdateRef.current = onProgressUpdate
  }, [onEnded, onProgressUpdate])

  const isYouTube = src.includes('youtube.com') || src.includes('youtu.be')
  const youtubeVideoId = isYouTube ? getYouTubeVideoId(src) : null

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [buffered, setBuffered] = useState(0)

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  const handleTimeUpdate = useCallback(() => {
    if (!videoRef.current) return
    const currentVideoTime = videoRef.current.currentTime
    const videoDuration = videoRef.current.duration

    setCurrentTime(currentVideoTime)

    if (videoRef.current.buffered.length > 0) {
      setBuffered(videoRef.current.buffered.end(videoRef.current.buffered.length - 1))
    }

    if (onProgressUpdate && videoDuration > 0) {
      const timeSinceLastSave = Math.abs(currentVideoTime - lastSavedTimeRef.current)

      if (timeSinceLastSave >= 5) {
        lastSavedTimeRef.current = currentVideoTime

        if (progressUpdateTimeoutRef.current) {
          clearTimeout(progressUpdateTimeoutRef.current)
        }

        progressUpdateTimeoutRef.current = setTimeout(() => {
          onProgressUpdate(currentVideoTime, videoDuration)
        }, 1000)
      }
    }
  }, [onProgressUpdate])

  const handleLoadedMetadata = useCallback(() => {
    if (!videoRef.current) return
    setDuration(videoRef.current.duration)

    if (initialTime && initialTime > 0) {
      videoRef.current.currentTime = initialTime
      setCurrentTime(initialTime)
    }
  }, [initialTime])

  const handleSeek = useCallback((time: number) => {
    if (!videoRef.current) return
    videoRef.current.currentTime = time
    setCurrentTime(time)
  }, [])

  const handleVolumeChange = useCallback((newVolume: number) => {
    if (!videoRef.current) return
    videoRef.current.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }, [])

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return

    if (isMuted) {
      videoRef.current.volume = volume || 0.5
      setIsMuted(false)
    } else {
      videoRef.current.volume = 0
      setIsMuted(true)
    }
  }, [isMuted, volume])

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }, [isFullscreen])

  const skipForward = useCallback(() => {
    if (!videoRef.current) return
    videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, duration)
  }, [duration])

  const skipBackward = useCallback(() => {
    if (!videoRef.current) return
    videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0)
  }, [])

  const resetControlsTimeout = useCallback(() => {
    setShowControls(true)

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }

    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
  }, [isPlaying])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault()
          togglePlay()
          break
        case 'ArrowLeft':
          e.preventDefault()
          skipBackward()
          break
        case 'ArrowRight':
          e.preventDefault()
          skipForward()
          break
        case 'ArrowUp':
          e.preventDefault()
          handleVolumeChange(Math.min(volume + 0.1, 1))
          break
        case 'ArrowDown':
          e.preventDefault()
          handleVolumeChange(Math.max(volume - 0.1, 0))
          break
        case 'f':
          e.preventDefault()
          toggleFullscreen()
          break
        case 'm':
          e.preventDefault()
          toggleMute()
          break
      }
      resetControlsTimeout()
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [togglePlay, skipBackward, skipForward, handleVolumeChange, volume, toggleFullscreen, toggleMute, resetControlsTimeout])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  useEffect(() => {
    if (!isYouTube || !youtubeVideoId || !youtubeDivRef.current) return

    if (youtubePlayerRef.current) {
      youtubePlayerRef.current.destroy()
      youtubePlayerRef.current = null
    }

    if (progressPollingRef.current) {
      clearTimeout(progressPollingRef.current)
      progressPollingRef.current = null
    }

    const initializePlayer = () => {
      if (!window.YT || !window.YT.Player) {
        setTimeout(initializePlayer, 100)
        return
      }

      youtubePlayerRef.current = new window.YT.Player(youtubeDivRef.current!, {
        videoId: youtubeVideoId,
        playerVars: {
          autoplay: 1,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          start: Math.floor(initialTime || 0),
        },
        events: {
          onReady: (event) => {
            const player = event.target

            setTimeout(() => {
              player.playVideo()
            }, 500)

            setTimeout(() => {
              const duration = player.getDuration()
              setDuration(duration)

              const pollProgress = () => {
                if (!youtubePlayerRef.current) return

                const currentTime = youtubePlayerRef.current.getCurrentTime()
                const duration = youtubePlayerRef.current.getDuration()

                setCurrentTime(currentTime)

                const timeSinceLastSave = Math.abs(currentTime - lastSavedTimeRef.current)
                if (onProgressUpdateRef.current && duration > 0 && timeSinceLastSave >= 5) {
                  lastSavedTimeRef.current = currentTime
                  onProgressUpdateRef.current(currentTime, duration)
                }

                progressPollingRef.current = setTimeout(pollProgress, 1000)
              }

              pollProgress()
            }, 1000)
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED && onEndedRef.current) {
              onEndedRef.current()
            }
          },
          onError: (event) => {
            console.error('YouTube Player error:', event.data)
          },
        },
      })
    }

    initializePlayer()

    return () => {
      if (youtubePlayerRef.current) {
        youtubePlayerRef.current.destroy()
        youtubePlayerRef.current = null
      }
      if (progressPollingRef.current) {
        clearTimeout(progressPollingRef.current)
        progressPollingRef.current = null
      }
    }
  }, [isYouTube, youtubeVideoId])

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
      if (progressUpdateTimeoutRef.current) {
        clearTimeout(progressUpdateTimeoutRef.current)
      }
      if (progressPollingRef.current) {
        clearTimeout(progressPollingRef.current)
      }
    }
  }, [])

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progressPercentage = (currentTime / duration) * 100 || 0
  const bufferedPercentage = (buffered / duration) * 100 || 0

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-black group"
      onMouseMove={resetControlsTimeout}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {isYouTube && youtubeVideoId ? (
        <div ref={youtubeDivRef} className="w-full h-full" />
      ) : (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="w-full h-full"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={onEnded}
          onClick={togglePlay}
        />
      )}

      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-4 left-4 z-50 flex items-center gap-2 text-white hover:text-gray-300 transition-all"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      )}

      {title && (
        <div className="absolute top-4 left-20 z-50 text-white text-xl font-semibold">
          {title}
        </div>
      )}

      {!isYouTube && (
        <>
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center z-30">
              <button
                onClick={togglePlay}
                className="w-20 h-20 flex items-center justify-center bg-black/50 rounded-full hover:bg-black/70 transition-all"
              >
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          )}

          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent z-40 transition-all duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}
          >
        <div className="px-4 pb-2">
          <div className="relative group/progress">
            <div className="h-1 bg-gray-600 rounded-full overflow-hidden cursor-pointer">
              <div
                className="absolute h-full bg-gray-500 transition-all"
                style={{ width: `${bufferedPercentage}%` }}
              />
              <div
                className="absolute h-full bg-red-600 transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={(e) => handleSeek(Number(e.target.value))}
              className="absolute inset-0 w-full h-1 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center justify-between px-4 pb-4">
          <div className="flex items-center gap-4">
            <button onClick={togglePlay} className="text-white hover:text-gray-300 transition-colors">
              {isPlaying ? (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <button onClick={skipBackward} className="text-white hover:text-gray-300 transition-colors">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.99 5V1l-5 5 5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6h-2c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
              </svg>
            </button>

            <button onClick={skipForward} className="text-white hover:text-gray-300 transition-colors">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.01 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z" />
              </svg>
            </button>

            <div className="flex items-center gap-2 group/volume">
              <button onClick={toggleMute} className="text-white hover:text-gray-300 transition-colors">
                {isMuted || volume === 0 ? (
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : (
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                  </svg>
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                className="w-0 group-hover/volume:w-20 transition-all duration-200 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
            </div>

            <div className="text-white text-sm font-medium">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={toggleFullscreen} className="text-white hover:text-gray-300 transition-colors">
              {isFullscreen ? (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
        </>
      )}

      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-20" />
    </div>
  )
}
