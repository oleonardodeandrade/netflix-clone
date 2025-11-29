import { useState } from 'react'
import { AVATAR_OPTIONS, getAvatarUrl } from '../../types/profile'
import type { AvatarOption } from '../../types/profile'

interface AvatarPickerProps {
  selectedAvatar: string
  onSelect: (avatarId: string) => void
  showKidsOnly?: boolean
}

const CATEGORY_LABELS = {
  classic: 'Classic',
  kids: 'Kids',
  icons: 'Icons',
} as const

export function AvatarPicker({ selectedAvatar, onSelect, showKidsOnly }: AvatarPickerProps) {
  const [activeCategory, setActiveCategory] = useState<AvatarOption['category']>(
    showKidsOnly ? 'kids' : 'classic'
  )

  const categories = showKidsOnly
    ? (['kids'] as const)
    : (['classic', 'kids', 'icons'] as const)

  const filteredAvatars = AVATAR_OPTIONS.filter(a => a.category === activeCategory)

  return (
    <div className="space-y-4">
      {!showKidsOnly && (
        <div className="flex gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-white text-black'
                  : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
              }`}
            >
              {CATEGORY_LABELS[category]}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-5 gap-3">
        {filteredAvatars.map(avatar => (
          <button
            key={avatar.id}
            onClick={() => onSelect(avatar.id)}
            className={`relative aspect-square rounded-md overflow-hidden border-4 transition-all hover:scale-105 ${
              selectedAvatar === avatar.id
                ? 'border-white ring-2 ring-white ring-offset-2 ring-offset-zinc-900'
                : 'border-transparent hover:border-gray-500'
            }`}
          >
            <img
              src={avatar.url}
              alt={avatar.id}
              className="w-full h-full object-cover"
            />
            {selectedAvatar === avatar.id && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-zinc-700">
        <span className="text-sm text-gray-400">Selected:</span>
        <div className="w-16 h-16 rounded-md overflow-hidden border-2 border-white">
          <img
            src={getAvatarUrl(selectedAvatar)}
            alt="Selected avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}
