import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { movieService } from '../services'
import type { Movie } from '../types/movie'

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

  if (loading) {
    return <div className="min-h-screen bg-black" />
  }

  if (!movie) {
    return null
  }

  const videoId = movie.previewUrl?.includes('youtube')
    ? movie.previewUrl.split('v=')[1]?.split('&')[0]
    : null

  return (
    <div className="min-h-screen bg-black">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-50 flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </button>

      <div className="w-full h-screen">
        {videoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1`}
            className="w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={movie.title}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-white text-xl">No video available</p>
          </div>
        )}
      </div>
    </div>
  )
}
