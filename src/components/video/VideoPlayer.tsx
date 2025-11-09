import { useEffect, useRef } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import type Player from 'video.js/dist/types/player'

type VideoPlayerProps = {
  src: string
  poster?: string
  autoplay?: boolean
  muted?: boolean
  controls?: boolean
  onReady?: (player: Player) => void
}

export function VideoPlayer({
  src,
  poster,
  autoplay = true,
  muted = true,
  controls = false,
  onReady,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<Player | null>(null)

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      const videoElement = document.createElement('video-js')
      videoElement.classList.add('vjs-big-play-centered')
      videoRef.current.appendChild(videoElement)

      const player = (playerRef.current = videojs(videoElement, {
        autoplay,
        controls,
        muted,
        poster,
        preload: 'auto',
        fluid: true,
        sources: [{ src, type: 'application/x-mpegURL' }],
      }))

      if (onReady) {
        onReady(player)
      }
    }
  }, [src, poster, autoplay, muted, controls, onReady])

  useEffect(() => {
    const player = playerRef.current

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose()
        playerRef.current = null
      }
    }
  }, [])

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  )
}
