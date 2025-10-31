import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { favoriteMoviesAtom } from '../store/movies'

const STORAGE_KEY = 'netflix-clone-favorites'

export function useFavoritesPersistence() {
  const [favorites, setFavorites] = useAtom(favoriteMoviesAtom)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setFavorites(parsed)
      }
    } catch (error) {
      console.error('Failed to load favorites from localStorage:', error)
    }
  }, [setFavorites])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch (error) {
      console.error('Failed to save favorites to localStorage:', error)
    }
  }, [favorites])
}
