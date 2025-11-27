import type { Profile } from '../../types/profile'
import { getAvatarUrl } from '../../types/profile'

interface ProfileCardProps {
  profile: Profile
  onClick: () => void
}

export function ProfileCard({ profile, onClick }: ProfileCardProps) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-3 transition-all hover:scale-110"
    >
      <div className="relative">
        <div className="w-32 h-32 rounded-md border-4 border-transparent group-hover:border-white transition-all overflow-hidden bg-zinc-800">
          <img
            src={getAvatarUrl(profile.avatar)}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        </div>
        {profile.isKids && (
          <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            KIDS
          </div>
        )}
      </div>
      <span className="text-gray-400 group-hover:text-white text-lg transition-colors">
        {profile.name}
      </span>
    </button>
  )
}
