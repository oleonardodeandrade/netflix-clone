import { useCallback, useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { watchProgressStorage, type WatchProgress } from '../services'
import type { Movie } from '../types/movie'
import { currentProfileAtom } from '../store/profiles'

interface UseWatchProgressReturn {
  progress: WatchProgress | null
  saveProgress: (progress: number, duration: number, completed?: boolean) => void
  removeProgress: () => void
  getProgressPercentage: () => number
}

export function useWatchProgress(movieId: string, movie: Movie): UseWatchProgressReturn {
  const [progress, setProgress] = useState<WatchProgress | null>(null)
  const currentProfile = useAtomValue(currentProfileAtom)

  useEffect(() => {
    if (!currentProfile?.id) return
    const savedProgress = watchProgressStorage.getProgress(movieId, currentProfile.id)
    setProgress(savedProgress)
  }, [movieId, currentProfile?.id])

  const saveProgress = useCallback(
    (currentProgress: number, duration: number, completed: boolean = false) => {
      if (!currentProfile?.id) return

      const newProgress: WatchProgress = {
        movieId,
        movie,
        progress: currentProgress,
        duration,
        lastWatched: new Date().toISOString(),
        completed,
        profileId: currentProfile.id,
      }

      setProgress(newProgress)
      watchProgressStorage.saveProgress(movieId, movie, currentProgress, duration, currentProfile.id, completed)
    },
    [movieId, movie, currentProfile?.id]
  )

  const removeProgress = useCallback(() => {
    if (!currentProfile?.id) return
    setProgress(null)
    watchProgressStorage.removeProgress(movieId, currentProfile.id)
  }, [movieId, currentProfile?.id])

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
