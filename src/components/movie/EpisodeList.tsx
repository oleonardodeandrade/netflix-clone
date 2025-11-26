import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import type { Season, Episode } from '../../types/movie'
import { movieService } from '../../services'

type EpisodeListProps = {
  tvShowId: string
  seasons: Season[]
}

export function EpisodeList({ tvShowId, seasons }: EpisodeListProps) {
  const navigate = useNavigate()
  const [selectedSeason, setSelectedSeason] = useState(seasons[0]?.seasonNumber || 1)
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [loading, setLoading] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const currentSeason = seasons.find(s => s.seasonNumber === selectedSeason)

  useEffect(() => {
    const fetchEpisodes = async () => {
      setLoading(true)
      try {
        const eps = await movieService.getTvSeasonEpisodes(tvShowId, selectedSeason)
        setEpisodes(eps)
      } catch (error) {
        console.error('Error fetching episodes:', error)
        setEpisodes([])
      } finally {
        setLoading(false)
      }
    }

    fetchEpisodes()
  }, [tvShowId, selectedSeason])

  const handleEpisodeClick = (episode: Episode) => {
    navigate(`/watch/${tvShowId}?season=${episode.seasonNumber}&episode=${episode.episodeNumber}`)
  }

  if (seasons.length === 0) return null

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Episodes</h3>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded px-4 py-2 text-sm font-medium transition-colors"
          >
            {currentSeason?.name || `Season ${selectedSeason}`}
            <svg
              className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-1 bg-zinc-800 border border-zinc-600 rounded shadow-xl z-20 min-w-[200px] max-h-[300px] overflow-y-auto">
              {seasons.map(season => (
                <button
                  key={season.id}
                  onClick={() => {
                    setSelectedSeason(season.seasonNumber)
                    setIsDropdownOpen(false)
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-zinc-700 transition-colors flex items-center justify-between ${
                    selectedSeason === season.seasonNumber ? 'bg-zinc-700' : ''
                  }`}
                >
                  <span>{season.name}</span>
                  <span className="text-sm text-gray-400">{season.episodeCount} ep</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-zinc-800/50 rounded h-24 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {episodes.map(episode => (
            <div
              key={episode.id}
              onClick={() => handleEpisodeClick(episode)}
              className="bg-zinc-800/50 rounded hover:bg-zinc-800 transition-colors cursor-pointer group"
            >
              <div className="flex gap-4 p-3">
                <div className="flex-shrink-0 w-32 h-20 bg-zinc-700 rounded overflow-hidden relative">
                  {episode.previewUrl && !episode.previewUrl.includes('placeholder') ? (
                    <img
                      src={episode.previewUrl}
                      alt={episode.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-700">
                      <svg className="w-8 h-8 text-zinc-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-white truncate">
                      {episode.episodeNumber}. {episode.title}
                    </h4>
                    {episode.runtime && (
                      <span className="text-sm text-gray-400 flex-shrink-0">
                        {episode.runtime}min
                      </span>
                    )}
                  </div>
                  {episode.description && (
                    <p className="text-sm text-gray-400 line-clamp-2 mt-1">
                      {episode.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
