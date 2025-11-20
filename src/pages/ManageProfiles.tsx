import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAtom } from 'jotai'
import { useUser } from '@clerk/clerk-react'
import { profilesAtom } from '../store/profiles'
import { profilesService } from '../services'
import { PROFILE_AVATARS, MAX_PROFILES_PER_ACCOUNT } from '../types/profile'
import type { Profile } from '../types/profile'

export default function ManageProfiles() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [profiles, setProfiles] = useAtom(profilesAtom)
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    avatar: 'default' as string,
    isKids: false,
  })

  useEffect(() => {
    if (!user) return

    const loadProfiles = async () => {
      try {
        const userProfiles = await profilesService.getProfiles(user.id)
        setProfiles(userProfiles)
      } catch (error) {
        console.error('Error loading profiles:', error)
      }
    }

    loadProfiles()
  }, [user, setProfiles])

  const handleCreateProfile = async () => {
    if (!user || !formData.name.trim()) return

    try {
      const newProfile = await profilesService.createProfile({
        userId: user.id,
        ...formData,
      })
      setProfiles([...profiles, newProfile])
      setIsCreating(false)
      setFormData({ name: '', avatar: 'default', isKids: false })
    } catch (error) {
      console.error('Error creating profile:', error)
      alert('Failed to create profile. Maximum 5 profiles per account.')
    }
  }

  const handleUpdateProfile = async () => {
    if (!editingProfile || !formData.name.trim()) return

    try {
      const updated = await profilesService.updateProfile(editingProfile.id, formData)
      setProfiles(profiles.map((p) => (p.id === updated.id ? updated : p)))
      setEditingProfile(null)
      setFormData({ name: '', avatar: 'default', isKids: false })
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile')
    }
  }

  const handleDeleteProfile = async (profileId: string) => {
    if (profiles.length <= 1) {
      alert('Cannot delete the last profile')
      return
    }

    if (!confirm('Are you sure you want to delete this profile?')) return

    try {
      await profilesService.deleteProfile(profileId)
      setProfiles(profiles.filter((p) => p.id !== profileId))
    } catch (error) {
      console.error('Error deleting profile:', error)
      alert('Failed to delete profile')
    }
  }

  const startEditing = (profile: Profile) => {
    setEditingProfile(profile)
    setFormData({
      name: profile.name,
      avatar: profile.avatar,
      isKids: profile.isKids,
    })
    setIsCreating(false)
  }

  const startCreating = () => {
    setIsCreating(true)
    setEditingProfile(null)
    setFormData({ name: '', avatar: 'default', isKids: false })
  }

  const cancelEditing = () => {
    setEditingProfile(null)
    setIsCreating(false)
    setFormData({ name: '', avatar: 'default', isKids: false })
  }

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
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-5xl font-medium">Manage Profiles</h1>
          <button
            onClick={() => navigate('/profiles')}
            className="px-6 py-2 border-2 border-gray-600 hover:border-white transition-all"
          >
            Done
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {profiles.map((profile) => (
            <div key={profile.id} className="flex flex-col items-center gap-4">
              <div
                className={`w-32 h-32 rounded-md ${getAvatarColor(profile.avatar)} flex items-center justify-center text-5xl font-bold cursor-pointer hover:opacity-80 transition-opacity`}
                onClick={() => startEditing(profile)}
              >
                {profile.name[0].toUpperCase()}
              </div>
              <div className="text-center">
                <p className="text-lg mb-2">{profile.name}</p>
                <button
                  onClick={() => startEditing(profile)}
                  className="text-sm text-gray-400 hover:text-white mr-4"
                >
                  Edit
                </button>
                {profiles.length > 1 && (
                  <button
                    onClick={() => handleDeleteProfile(profile.id)}
                    className="text-sm text-gray-400 hover:text-red-500"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}

          {profiles.length < MAX_PROFILES_PER_ACCOUNT && !isCreating && !editingProfile && (
            <button
              onClick={startCreating}
              className="flex flex-col items-center gap-4 hover:opacity-80 transition-opacity"
            >
              <div className="w-32 h-32 rounded-md border-4 border-gray-600 flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-lg text-gray-400">Add Profile</span>
            </button>
          )}
        </div>

        {(isCreating || editingProfile) && (
          <div className="mt-12 max-w-2xl mx-auto bg-zinc-900 p-8 rounded-lg">
            <h2 className="text-3xl mb-6">
              {isCreating ? 'Create Profile' : 'Edit Profile'}
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-zinc-800 border border-gray-600 rounded px-4 py-3 text-white focus:outline-none focus:border-white"
                  placeholder="Profile name"
                  maxLength={20}
                />
              </div>

              <div>
                <label className="block text-sm mb-4">Avatar Color</label>
                <div className="grid grid-cols-5 gap-4">
                  {PROFILE_AVATARS.map((avatar) => (
                    <button
                      key={avatar}
                      onClick={() => setFormData({ ...formData, avatar })}
                      className={`w-16 h-16 rounded-md ${getAvatarColor(avatar)} border-4 ${
                        formData.avatar === avatar ? 'border-white' : 'border-transparent'
                      } transition-all`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isKids"
                  checked={formData.isKids}
                  onChange={(e) => setFormData({ ...formData, isKids: e.target.checked })}
                  className="w-6 h-6"
                />
                <label htmlFor="isKids" className="text-lg">
                  Kids Profile (age-appropriate content only)
                </label>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  onClick={isCreating ? handleCreateProfile : handleUpdateProfile}
                  className="px-8 py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors"
                  disabled={!formData.name.trim()}
                >
                  {isCreating ? 'Create' : 'Save'}
                </button>
                <button
                  onClick={cancelEditing}
                  className="px-8 py-3 border-2 border-gray-600 rounded hover:border-white transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
