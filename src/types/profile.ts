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

export interface AvatarOption {
  id: string
  url: string
  category: 'classic' | 'kids' | 'icons'
}

export const AVATAR_OPTIONS: AvatarOption[] = [
  { id: 'red-smile', url: 'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=netflix1&backgroundColor=e53935', category: 'classic' },
  { id: 'blue-cool', url: 'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=netflix2&backgroundColor=1e88e5', category: 'classic' },
  { id: 'green-happy', url: 'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=netflix3&backgroundColor=43a047', category: 'classic' },
  { id: 'yellow-bright', url: 'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=netflix4&backgroundColor=fdd835', category: 'classic' },
  { id: 'purple-chill', url: 'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=netflix5&backgroundColor=8e24aa', category: 'classic' },
  { id: 'pink-fun', url: 'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=netflix6&backgroundColor=d81b60', category: 'classic' },
  { id: 'orange-warm', url: 'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=netflix7&backgroundColor=ef6c00', category: 'classic' },
  { id: 'teal-fresh', url: 'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=netflix8&backgroundColor=00897b', category: 'classic' },
  { id: 'indigo-deep', url: 'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=netflix9&backgroundColor=3949ab', category: 'classic' },
  { id: 'cyan-electric', url: 'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=netflix10&backgroundColor=00acc1', category: 'classic' },
  { id: 'kids-panda', url: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=panda', category: 'kids' },
  { id: 'kids-tiger', url: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=tiger', category: 'kids' },
  { id: 'kids-bear', url: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=bear', category: 'kids' },
  { id: 'kids-bunny', url: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=bunny', category: 'kids' },
  { id: 'kids-cat', url: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=catface', category: 'kids' },
  { id: 'kids-dog', url: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=dogface', category: 'kids' },
  { id: 'icon-alien', url: 'https://api.dicebear.com/9.x/icons/svg?seed=alien&backgroundColor=6366f1', category: 'icons' },
  { id: 'icon-robot', url: 'https://api.dicebear.com/9.x/icons/svg?seed=robot&backgroundColor=14b8a6', category: 'icons' },
  { id: 'icon-ghost', url: 'https://api.dicebear.com/9.x/icons/svg?seed=ghost&backgroundColor=a855f7', category: 'icons' },
  { id: 'icon-skull', url: 'https://api.dicebear.com/9.x/icons/svg?seed=skull&backgroundColor=64748b', category: 'icons' },
]

export const DEFAULT_AVATAR = AVATAR_OPTIONS[0]

export function getAvatarUrl(avatarId: string): string {
  const avatar = AVATAR_OPTIONS.find(a => a.id === avatarId)
  return avatar?.url || DEFAULT_AVATAR.url
}

export const PROFILE_AVATARS = AVATAR_OPTIONS.map(a => a.id)

export type ProfileAvatar = string

export const MAX_PROFILES_PER_ACCOUNT = 5
