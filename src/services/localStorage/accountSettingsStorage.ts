import type { AccountSettings } from '../../hooks/useAccountSettings'

const STORAGE_KEY = 'netflix-clone-account-settings'

export const accountSettingsStorage = {
  getSettings(userId: string): AccountSettings | null {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}-${userId}`)
      return stored ? JSON.parse(stored) : null
    } catch (error) {
      console.error('Failed to load account settings:', error)
      return null
    }
  },

  saveSettings(userId: string, settings: AccountSettings): void {
    try {
      localStorage.setItem(`${STORAGE_KEY}-${userId}`, JSON.stringify(settings))
    } catch (error) {
      console.error('Failed to save account settings:', error)
    }
  },

  clearSettings(userId: string): void {
    try {
      localStorage.removeItem(`${STORAGE_KEY}-${userId}`)
    } catch (error) {
      console.error('Failed to clear account settings:', error)
    }
  },
}
