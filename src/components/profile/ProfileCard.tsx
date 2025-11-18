import type { Profile } from '../../types/profile'

interface ProfileCardProps {
  profile: Profile
  onClick: () => void
}

export function ProfileCard({ profile, onClick }: ProfileCardProps) {
  const getAvatarColor = (avatar: string) => {
    const colors = {
      default: 'bg-blue-600',
      avatar1: 'bg-red-600',
      avatar2: 'bg-green-600',
      avatar3: 'bg-yellow-600',
      avatar4: 'bg-purple-600',
      avatar5: 'bg-pink-600',
      kids1: 'bg-orange-600',
      kids2: 'bg-cyan-600',
      kids3: 'bg-lime-600',
    }
    return colors[avatar as keyof typeof colors] || colors.default
  }

  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-3 transition-all hover:scale-110"
    >
      <div
        className={`w-32 h-32 rounded-md border-4 border-transparent group-hover:border-white transition-all ${getAvatarColor(profile.avatar)} flex items-center justify-center text-white text-5xl font-bold`}
      >
        {profile.name[0].toUpperCase()}
      </div>
      <span className="text-gray-400 group-hover:text-white text-lg transition-colors">
        {profile.name}
      </span>
    </button>
  )
}
