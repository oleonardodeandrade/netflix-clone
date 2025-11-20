import { useCallback, useEffect, useState } from 'react'
import { watchProgressStorage, type WatchProgress } from '../services'
import type { Movie } from '../types/movie'

interface UseWatchProgressReturn {
  progress: WatchProgress | null
  saveProgress: (progress: number, duration: number, completed?: boolean) => void
  removeProgress: () => void
  getProgressPercentage: () => number
}

export function useWatchProgress(movieId: string, movie: Movie): UseWatchProgressReturn {
  const [progress, setProgress] = useState<WatchProgress | null>(null)

  useEffect(() => {
    const savedProgress = watchProgressStorage.getProgress(movieId)
    setProgress(savedProgress)
  }, [movieId])

  const saveProgress = useCallback(
    (currentProgress: number, duration: number, completed: boolean = false) => {
      const newProgress: WatchProgress = {
        movieId,
        movie,
        progress: currentProgress,
        duration,
        lastWatched: new Date().toISOString(),
        completed,
      }

      setProgress(newProgress)
      watchProgressStorage.saveProgress(movieId, movie, currentProgress, duration, completed)
    },
    [movieId, movie]
  )

  const removeProgress = useCallback(() => {
    setProgress(null)
    watchProgressStorage.removeProgress(movieId)
  }, [movieId])

  const getProgressPercentage = useCallback(() => {
    if (!progress || !progress.duration) return 0
    return (progress.progress / progress.duration) * 100
  }, [progress])

  return {
    progress,
    saveProgress,
    removeProgress,
    getProgressPercentage,
  }
}
