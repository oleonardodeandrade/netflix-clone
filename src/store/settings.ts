import { atom } from 'jotai'

export interface PlaybackSettings {
  autoplayNextEpisode: boolean
  autoplayPreviews: boolean
  skipIntro: boolean
  videoQuality: 'auto' | 'low' | 'medium' | 'high'
}

const DEFAULT_SETTINGS: PlaybackSettings = {
  autoplayNextEpisode: true,
  autoplayPreviews: true,
  skipIntro: false,
  videoQuality: 'auto',
}

export const playbackSettingsAtom = atom<PlaybackSettings>(DEFAULT_SETTINGS)

export const autoplayPreviewsAtom = atom(
  (get) => get(playbackSettingsAtom).autoplayPreviews
)
