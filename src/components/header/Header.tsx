import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { useSetAtom, useAtomValue } from 'jotai'
import { UserButton } from '@clerk/clerk-react'
import { SearchBar } from './SearchBar'
import { MobileMenu } from './MobileMenu'
import { isMobileMenuOpenAtom } from '../../store/ui'
import { currentProfileAtom } from '../../store/profiles'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const setMobileMenuOpen = useSetAtom(isMobileMenuOpenAtom)
  const currentProfile = useAtomValue(currentProfileAtom)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getProfileInitial = (name: string) => {
    return name.charAt(0).toUpperCase()
  }

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
          scrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-4 md:px-8 py-4">
          <div className="flex items-center gap-4 md:gap-8">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-white hover:text-gray-300"
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <Link to="/" className="flex items-center gap-2">
              <h1 className="text-red-600 text-2xl md:text-3xl font-bold cursor-pointer">
                NETFLIX
              </h1>
              {currentProfile?.isKids && (
                <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  KIDS
                </span>
              )}
            </Link>

            <div className="hidden md:flex items-center gap-4">
              <Link to="/" className="text-white hover:text-gray-300 transition-colors text-sm font-medium cursor-pointer">
                Home
              </Link>

              <Link to="/movies" className="text-white hover:text-gray-300 transition-colors text-sm font-medium cursor-pointer">
                Movies
              </Link>

              <Link to="/tv-shows" className="text-white hover:text-gray-300 transition-colors text-sm font-medium cursor-pointer">
                TV Shows
              </Link>

              <Link to="/top10" className="text-white hover:text-gray-300 transition-colors text-sm font-medium cursor-pointer">
                Top 10
              </Link>

              <Link to="/my-list" className="text-white hover:text-gray-300 transition-colors text-sm font-medium cursor-pointer">
                My List
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <SearchBar />

            {currentProfile && (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  aria-label="Profile menu"
                >
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center text-white font-semibold text-sm"
                    style={{ backgroundColor: currentProfile.avatar }}
                  >
                    {getProfileInitial(currentProfile.name)}
                  </div>
                  <svg
                    className={`w-4 h-4 text-white transition-transform ${showProfileMenu ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-black/95 border border-gray-700 rounded shadow-lg z-50">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false)
                        navigate('/profiles')
                      }}
                      className="w-full text-left px-4 py-3 text-white hover:bg-gray-800 transition-colors text-sm"
                    >
                      Switch Profile
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false)
                        navigate('/profiles/manage')
                      }}
                      className="w-full text-left px-4 py-3 text-white hover:bg-gray-800 transition-colors text-sm border-t border-gray-700"
                    >
                      Manage Profiles
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false)
                        navigate('/account')
                      }}
                      className="w-full text-left px-4 py-3 text-white hover:bg-gray-800 transition-colors text-sm border-t border-gray-700"
                    >
                      Account Settings
                    </button>
                  </div>
                )}
              </div>
            )}

            <UserButton afterSwitchSessionUrl="/login" />
          </div>
        </div>
      </header>

      <MobileMenu />
    </>
  )
}
