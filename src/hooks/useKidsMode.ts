import { useAtomValue } from 'jotai'
import { currentProfileAtom } from '../store/profiles'

export function useKidsMode() {
  const currentProfile = useAtomValue(currentProfileAtom)

  return {
    isKidsProfile: currentProfile?.isKids ?? false,
    currentProfile,
  }
}
