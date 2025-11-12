const SEARCH_HISTORY_KEY = 'netflix-clone-search-history'
const MAX_HISTORY_ITEMS = 10

export const searchHistoryStorage = {
  getHistory(): string[] {
    try {
      const stored = localStorage.getItem(SEARCH_HISTORY_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Failed to load search history from localStorage:', error)
      return []
    }
  },

  addSearch(query: string): void {
    if (!query.trim()) return

    try {
      const history = this.getHistory()
      const trimmedQuery = query.trim().toLowerCase()

      const filteredHistory = history.filter(item => item.toLowerCase() !== trimmedQuery)

      const newHistory = [query.trim(), ...filteredHistory].slice(0, MAX_HISTORY_ITEMS)

      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory))
    } catch (error) {
      console.error('Failed to save search to localStorage:', error)
    }
  },

  removeSearch(query: string): void {
    try {
      const history = this.getHistory()
      const newHistory = history.filter(item => item.toLowerCase() !== query.toLowerCase())
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory))
    } catch (error) {
      console.error('Failed to remove search from localStorage:', error)
    }
  },

  clearHistory(): void {
    try {
      localStorage.removeItem(SEARCH_HISTORY_KEY)
    } catch (error) {
      console.error('Failed to clear search history:', error)
    }
  },
}
