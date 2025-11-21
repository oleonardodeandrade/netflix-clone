import type { Movie } from '../../types/movie'

const WATCH_PROGRESS_KEY = 'netflix-clone-watch-progress'

export interface WatchProgress {
  movieId: string
  movie: Movie
  progress: number
  duration: number
  lastWatched: string
  completed: boolean
  profileId: string
}

export const watchProgressStorage = {
  getProgress(movieId: string, profileId: string): WatchProgress | null {
    try {
      const allProgress = this.getAllProgress()
      return allProgress.find((item) => item.movieId === movieId && item.profileId === profileId) || null
    } catch (error) {
      console.error('Failed to get watch progress from localStorage:', error)
      return null
    }
  },

  getAllProgress(): WatchProgress[] {
    try {
      const stored = localStorage.getItem(WATCH_PROGRESS_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Failed to load watch progress from localStorage:', error)
      return []
    }
  },

  getContinueWatching(profileId: string): WatchProgress[] {
    try {
      const allProgress = this.getAllProgress()

      const continueWatching = allProgress.filter((item) => {
        if (item.profileId !== profileId) return false
        if (item.completed) return false
        const progressPercent = (item.progress / item.duration) * 100
        return progressPercent >= 5 && progressPercent < 95
      })

      return continueWatching.sort(
        (a, b) => new Date(b.lastWatched).getTime() - new Date(a.lastWatched).getTime()
      )
    } catch (error) {
      console.error('Failed to get continue watching list:', error)
      return []
    }
  },

  saveProgress(
    movieId: string,
    movie: Movie,
    progress: number,
    duration: number,
    profileId: string,
    completed: boolean = false
  ): void {
    try {
      const allProgress = this.getAllProgress()
      const existingIndex = allProgress.findIndex((item) => item.movieId === movieId && item.profileId === profileId)

      const watchProgress: WatchProgress = {
        movieId,
        movie,
        progress,
        duration,
        lastWatched: new Date().toISOString(),
        completed,
        profileId,
      }

      if (existingIndex >= 0) {
        allProgress[existingIndex] = watchProgress
      } else {
        allProgress.push(watchProgress)
      }

      const trimmedProgress = allProgress
        .sort((a, b) => new Date(b.lastWatched).getTime() - new Date(a.lastWatched).getTime())
        .slice(0, 50)

      localStorage.setItem(WATCH_PROGRESS_KEY, JSON.stringify(trimmedProgress))
    } catch (error) {
      console.error('Failed to save watch progress to localStorage:', error)
    }
  },

  removeProgress(movieId: string, profileId: string): void {
    try {
      const allProgress = this.getAllProgress()
      const filtered = allProgress.filter((item) => !(item.movieId === movieId && item.profileId === profileId))
      localStorage.setItem(WATCH_PROGRESS_KEY, JSON.stringify(filtered))
    } catch (error) {
      console.error('Failed to remove watch progress:', error)
    }
  },

  clear(): void {
    try {
      localStorage.removeItem(WATCH_PROGRESS_KEY)
    } catch (error) {
      console.error('Failed to clear watch progress:', error)
    }
  },
}
