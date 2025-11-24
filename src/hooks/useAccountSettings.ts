import { useState, useEffect } from 'react'
import { accountSettingsStorage } from '../services/localStorage/accountSettingsStorage'

export interface AccountSettings {
  autoplayNextEpisode: boolean
  autoplayPreviews: boolean
  skipIntro: boolean
  videoQuality: 'auto' | 'low' | 'medium' | 'high'
}

const DEFAULT_SETTINGS: AccountSettings = {
  autoplayNextEpisode: true,
  autoplayPreviews: true,
  skipIntro: false,
  videoQuality: 'auto',
}

export function useAccountSettings(userId: string) {
  const [settings, setSettings] = useState<AccountSettings>(DEFAULT_SETTINGS)

  useEffect(() => {
    if (!userId) return

    const savedSettings = accountSettingsStorage.getSettings(userId)
    if (savedSettings) {
      setSettings(savedSettings)
    }
  }, [userId])

  const updateSettings = (newSettings: Partial<AccountSettings>) => {
    if (!userId) return

    const updatedSettings = { ...settings, ...newSettings }
    setSettings(updatedSettings)
    accountSettingsStorage.saveSettings(userId, updatedSettings)
  }

  return { settings, updateSettings }
}
