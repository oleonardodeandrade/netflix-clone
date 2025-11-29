import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAtom, useSetAtom } from 'jotai'
import { useUser } from '@clerk/clerk-react'
import { ProfileCard } from '../components/profile/ProfileCard'
import { profilesAtom, currentProfileAtom, isProfilesLoadingAtom } from '../store/profiles'
import { profilesService } from '../services'
import { DEFAULT_AVATAR } from '../types/profile'

export default function ProfileSelector() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [profiles, setProfiles] = useAtom(profilesAtom)
  const setCurrentProfile = useSetAtom(currentProfileAtom)
  const [isLoading, setIsLoading] = useAtom(isProfilesLoadingAtom)

  useEffect(() => {
    if (!user) return

    const loadProfiles = async () => {
      setIsLoading(true)
      try {
        const userProfiles = await profilesService.getProfiles(user.id)
        setProfiles(userProfiles)

        if (userProfiles.length === 0) {
          const defaultProfile = await profilesService.createProfile({
            userId: user.id,
            name: user.firstName || user.username || 'User',
            avatar: DEFAULT_AVATAR.id,
            isKids: false,
          })
          setProfiles([defaultProfile])
        }
      } catch (error) {
        console.error('Error loading profiles:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProfiles()
  }, [user, setProfiles, setIsLoading])

  const handleProfileSelect = (profile: typeof profiles[0]) => {
    setCurrentProfile(profile)
    navigate('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading profiles</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
      <h1 className="text-white text-5xl font-medium mb-12">Who's watching?</h1>

      <div className="flex flex-wrap gap-8 justify-center max-w-4xl">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onClick={() => handleProfileSelect(profile)}
          />
        ))}

        {profiles.length < 5 && (
          <button
            onClick={() => navigate('/profiles/manage')}
            className="group flex flex-col items-center gap-3 transition-all hover:scale-110"
          >
            <div className="w-32 h-32 rounded-md border-4 border-gray-600 group-hover:border-white transition-all flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-gray-400 group-hover:text-white text-lg transition-colors">
              Add Profile
            </span>
          </button>
        )}
      </div>

      <button
        onClick={() => navigate('/profiles/manage')}
        className="mt-16 px-6 py-2 border-2 border-gray-600 text-gray-400 hover:border-white hover:text-white transition-all text-lg"
      >
        Manage Profiles
      </button>
    </div>
  )
}
