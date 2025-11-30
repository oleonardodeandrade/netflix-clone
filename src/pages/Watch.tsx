import { useNavigate, useParams, useSearchParams } from 'react-router'
import { useEffect, useState, useCallback } from 'react'
import { movieService } from '../services'
import type { Movie, Episode } from '../types/movie'
import { VideoPlayer } from '../components/video/VideoPlayer'
import { useWatchProgress } from '../hooks/useWatchProgress'

const INTRO_START_TIME = 0
const INTRO_END_TIME = 30

export default function Watch() {
  const { id } = useParams<{ id: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null)
  const [nextEpisode, setNextEpisode] = useState<Episode | null>(null)
  const [loading, setLoading] = useState(true)

  const seasonNumber = searchParams.get('season')
  const episodeNumber = searchParams.get('episode')
  const isTvShow = seasonNumber !== null && episodeNumber !== null

  useEffect(() => {
    if (!id) {
      navigate('/')
      return
    }

    const fetchContent = async () => {
      try {
        if (isTvShow) {
          const tvShowData = await movieService.getTvShowDetails(id)
          setMovie(tvShowData)
          const episodes = await movieService.getTvSeasonEpisodes(id, Number(seasonNumber))
          const episode = episodes.find(ep => ep.episodeNumber === Number(episodeNumber))
          setCurrentEpisode(episode || null)

          const currentEpNum = Number(episodeNumber)
          const next = episodes.find(ep => ep.episodeNumber === currentEpNum + 1)
          setNextEpisode(next || null)
        } else {
          const movieData = await movieService.getMovieDetails(id)
          setMovie(movieData)
        }
      } catch (error) {
        console.error('Error fetching content:', error)
        navigate('/')
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [id, navigate, isTvShow, seasonNumber, episodeNumber])

  const { progress, saveProgress } = useWatchProgress(id || '', movie || ({} as Movie))

  const handleBack = () => {
    navigate(-1)
  }

  const handleEnded = () => {
    if (movie && id) {
      saveProgress(0, 0, true)
    }
  }

  const handleProgressUpdate = (currentTime: number, duration: number) => {
    if (movie && id) {
      saveProgress(currentTime, duration)
    }
  }

  const handleNextEpisode = useCallback(() => {
    if (nextEpisode && id) {
      setSearchParams({
        season: String(nextEpisode.seasonNumber),
        episode: String(nextEpisode.episodeNumber),
      })
    }
  }, [nextEpisode, id, setSearchParams])

  if (loading) {
    return <div className="min-h-screen bg-black" />
  }

  if (!movie) {
    return null
  }

  const displayTitle = currentEpisode
    ? `${movie.title} - S${seasonNumber}E${episodeNumber}: ${currentEpisode.title}`
    : movie.title

  const videoSrc = currentEpisode?.previewUrl || movie.previewUrl
  const posterSrc = currentEpisode?.previewUrl || movie.backdropUrl

  return (
    <div className="min-h-screen bg-black">
      <div className="w-full h-screen">
        <VideoPlayer
          src={videoSrc}
          poster={posterSrc}
          title={displayTitle}
          showTitle={movie.title}
          initialTime={progress?.progress || 0}
          onBack={handleBack}
          onEnded={handleEnded}
          onProgressUpdate={handleProgressUpdate}
          introStartTime={isTvShow ? INTRO_START_TIME : undefined}
          introEndTime={isTvShow ? INTRO_END_TIME : undefined}
          nextEpisode={nextEpisode}
          onNextEpisode={handleNextEpisode}
        />
      </div>
    </div>
  )
}
