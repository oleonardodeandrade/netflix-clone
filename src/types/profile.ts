export interface Profile {
  id: string
  userId: string
  name: string
  avatar: string
  isKids: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CreateProfileDto {
  userId: string
  name: string
  avatar?: string
  isKids?: boolean
}

export interface UpdateProfileDto {
  name?: string
  avatar?: string
  isKids?: boolean
}

export const PROFILE_AVATARS = [
  'default',
  'avatar1',
  'avatar2',
  'avatar3',
  'avatar4',
  'avatar5',
  'kids1',
  'kids2',
  'kids3',
] as const

export type ProfileAvatar = (typeof PROFILE_AVATARS)[number]

export const MAX_PROFILES_PER_ACCOUNT = 5
