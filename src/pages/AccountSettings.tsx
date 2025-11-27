import { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router'
import { useAtom } from 'jotai'
import { Header } from '../components/header/Header'
import { Footer } from '../components/footer/Footer'
import { profilesAtom } from '../store/profiles'
import { useAccountSettings } from '../hooks/useAccountSettings'
import { getAvatarUrl } from '../types/profile'

type SettingsSection = 'account' | 'playback' | 'activity' | 'profiles'

export default function AccountSettings() {
  const { user } = useUser()
  const navigate = useNavigate()
  const [profiles] = useAtom(profilesAtom)
  const [activeSection, setActiveSection] = useState<SettingsSection>('account')
  const { settings, updateSettings } = useAccountSettings(user?.id || '')

  const handleToggleSetting = (key: keyof typeof settings) => {
    updateSettings({ [key]: !settings[key] })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="pt-20 pb-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Account Settings</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <nav className="md:col-span-1">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveSection('account')}
                    className={`w-full text-left px-4 py-2 rounded transition-colors ${
                      activeSection === 'account'
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-900'
                    }`}
                  >
                    Account
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('profiles')}
                    className={`w-full text-left px-4 py-2 rounded transition-colors ${
                      activeSection === 'profiles'
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-900'
                    }`}
                  >
                    Profiles
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('playback')}
                    className={`w-full text-left px-4 py-2 rounded transition-colors ${
                      activeSection === 'playback'
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-900'
                    }`}
                  >
                    Playback
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('activity')}
                    className={`w-full text-left px-4 py-2 rounded transition-colors ${
                      activeSection === 'activity'
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-900'
                    }`}
                  >
                    Viewing Activity
                  </button>
                </li>
              </ul>
            </nav>

            <div className="md:col-span-3">
              {activeSection === 'account' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Account Information</h2>
                    <div className="bg-gray-900 rounded-lg p-6 space-y-4">
                      <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                        <div>
                          <p className="text-gray-400 text-sm">Email</p>
                          <p className="text-lg">{user?.primaryEmailAddress?.emailAddress}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                        <div>
                          <p className="text-gray-400 text-sm">Member since</p>
                          <p className="text-lg">
                            {user?.createdAt
                              ? new Date(user.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                })
                              : 'N/A'}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-gray-400 text-sm">User ID</p>
                          <p className="text-sm font-mono text-gray-500">{user?.id}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'profiles' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Profiles</h2>
                    <button
                      onClick={() => navigate('/profiles/manage')}
                      className="bg-white text-black px-4 py-2 rounded font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Manage Profiles
                    </button>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-6">
                    <div className="space-y-4">
                      {profiles.map((profile) => (
                        <div
                          key={profile.id}
                          className="flex items-center justify-between border-b border-gray-800 pb-4 last:border-0 last:pb-0"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded overflow-hidden bg-zinc-700">
                              <img
                                src={getAvatarUrl(profile.avatar)}
                                alt={profile.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-semibold">{profile.name}</p>
                              {profile.isKids && (
                                <span className="inline-block bg-yellow-600 text-xs px-2 py-1 rounded mt-1">
                                  Kids Profile
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'playback' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Playback Settings</h2>
                  <div className="bg-gray-900 rounded-lg p-6 space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">Autoplay next episode</h3>
                        <p className="text-sm text-gray-400">
                          Automatically play the next episode in a series
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggleSetting('autoplayNextEpisode')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.autoplayNextEpisode ? 'bg-red-600' : 'bg-gray-700'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.autoplayNextEpisode ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex justify-between items-start border-t border-gray-800 pt-6">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">Autoplay previews</h3>
                        <p className="text-sm text-gray-400">
                          Automatically play previews while browsing
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggleSetting('autoplayPreviews')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.autoplayPreviews ? 'bg-red-600' : 'bg-gray-700'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.autoplayPreviews ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex justify-between items-start border-t border-gray-800 pt-6">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">Skip intro automatically</h3>
                        <p className="text-sm text-gray-400">
                          Automatically skip intros when available
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggleSetting('skipIntro')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.skipIntro ? 'bg-red-600' : 'bg-gray-700'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.skipIntro ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="border-t border-gray-800 pt-6">
                      <h3 className="font-semibold mb-3">Video Quality</h3>
                      <select
                        value={settings.videoQuality}
                        onChange={(e) =>
                          updateSettings({
                            videoQuality: e.target.value as 'auto' | 'low' | 'medium' | 'high',
                          })
                        }
                        className="w-full md:w-auto bg-gray-800 text-white border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-white"
                      >
                        <option value="auto">Auto</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                      <p className="text-sm text-gray-400 mt-2">
                        Higher quality uses more data
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'activity' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Viewing Activity</h2>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-6">
                    <p className="text-gray-400 text-center py-8">
                      Your viewing activity will be displayed here. This feature tracks all the content
                      you watch across all profiles.
                    </p>
                    <div className="flex justify-center mt-4">
                      <button className="text-red-600 hover:text-red-500 font-semibold">
                        View Full Activity
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
