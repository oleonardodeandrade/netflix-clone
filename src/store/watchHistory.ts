import { atom } from 'jotai'
import type { WatchHistoryResponse } from '../services/api/watchHistoryService'

export const watchHistoryAtom = atom<WatchHistoryResponse[]>([])

export const getMovieProgressAtom = atom(
  (get) => (movieId: string) => {
    const history = get(watchHistoryAtom)
    return history.find((item) => item.movieId === movieId)
  }
)
