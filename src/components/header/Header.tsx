import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { UserButton } from '@clerk/clerk-react'
import { SearchBar } from './SearchBar'

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-8">
          <Link to="/">
            <h1 className="text-red-600 text-3xl font-bold cursor-pointer">
              NETFLIX
            </h1>
          </Link>

          <nav className="hidden md:flex gap-6">
            <Link to="/" className="text-white hover:text-gray-300 transition-colors">
              Home
            </Link>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">
              TV Shows
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">
              Movies
            </a>
            <Link to="/my-list" className="text-white hover:text-gray-300 transition-colors">
              My List
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <SearchBar />
          <UserButton afterSwitchSessionUrl="/login" />
        </div>
      </div>
    </header>
  )
}
