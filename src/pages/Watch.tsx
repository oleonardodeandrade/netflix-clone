import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { movieService } from '../services'
import type { Movie } from '../types/movie'
import { VideoPlayer } from '../components/video/VideoPlayer'

export default function Watch() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) {
      navigate('/')
      return
    }

    const fetchMovie = async () => {
      try {
        const movieData = await movieService.getMovieDetails(id)
        setMovie(movieData)
      } catch (error) {
        console.error('Error fetching movie:', error)
        navigate('/')
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [id, navigate])

  const handleBack = () => {
    navigate(-1)
  }

  const handleEnded = () => {
    console.log('Video ended')
  }

  if (loading) {
    return <div className="min-h-screen bg-black" />
  }

  if (!movie) {
    return null
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="w-full h-screen">
        <VideoPlayer
          src={movie.backdropUrl}
          poster={movie.backdropUrl}
          title={movie.title}
          onBack={handleBack}
          onEnded={handleEnded}
        />
      </div>
    </div>
  )
}
