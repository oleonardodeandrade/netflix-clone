import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import type { Profile } from '../types/profile'

export const profilesAtom = atom<Profile[]>([])

export const currentProfileAtom = atomWithStorage<Profile | null>(
  'netflix-clone-current-profile',
  null
)

export const isProfilesLoadingAtom = atom<boolean>(false)
