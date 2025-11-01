import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { useUser } from '@clerk/clerk-react'
import { watchHistoryAtom } from '../store/watchHistory'
import { watchHistoryService } from '../services/api/watchHistoryService'

export function useWatchHistoryPersistence() {
  const { user, isLoaded } = useUser()
  const [, setWatchHistory] = useAtom(watchHistoryAtom)

  useEffect(() => {
    if (!isLoaded || !user?.id) return

    const loadWatchHistory = async () => {
      try {
        const history = await watchHistoryService.getWatchHistory(user.id)
        setWatchHistory(history)
      } catch (error) {
        console.error('Failed to load watch history:', error)
      }
    }

    loadWatchHistory()
  }, [user?.id, isLoaded, setWatchHistory])
}
