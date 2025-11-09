import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { useSetAtom } from 'jotai'
import { UserButton } from '@clerk/clerk-react'
import { SearchBar } from './SearchBar'
import { MobileMenu } from './MobileMenu'
import { isMobileMenuOpenAtom } from '../../store/ui'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const setMobileMenuOpen = useSetAtom(isMobileMenuOpenAtom)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

            <Link to="/">
              <h1 className="text-red-600 text-2xl md:text-3xl font-bold cursor-pointer">
                NETFLIX
              </h1>
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

              <Link to="/my-list" className="text-white hover:text-gray-300 transition-colors text-sm font-medium cursor-pointer">
                My List
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <SearchBar />
            <UserButton afterSwitchSessionUrl="/login" />
          </div>
        </div>
      </header>

      <MobileMenu />
    </>
  )
}
