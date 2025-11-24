import { useAtom } from 'jotai'
import { Link } from 'react-router'
import { isMobileMenuOpenAtom } from '../../store/ui'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useAtom(isMobileMenuOpenAtom)

  if (!isOpen) return null

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <div
        className="fixed inset-0 bg-black/80 z-40"
        onClick={closeMenu}
      />

      <div className="fixed top-0 left-0 h-full w-64 bg-black z-50 transform transition-transform duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-red-600 text-2xl font-bold">NETFLIX</h2>
          <button
            onClick={closeMenu}
            className="text-white hover:text-gray-300"
            aria-label="Close menu"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col p-6 space-y-4">
          <Link
            to="/"
            onClick={closeMenu}
            className="text-white hover:text-gray-300 transition-colors text-lg"
          >
            Home
          </Link>
          <Link
            to="/tv-shows"
            onClick={closeMenu}
            className="text-white hover:text-gray-300 transition-colors text-lg"
          >
            TV Shows
          </Link>
          <Link
            to="/movies"
            onClick={closeMenu}
            className="text-white hover:text-gray-300 transition-colors text-lg"
          >
            Movies
          </Link>
          <Link
            to="/top10"
            onClick={closeMenu}
            className="text-white hover:text-gray-300 transition-colors text-lg"
          >
            Top 10
          </Link>
          <Link
            to="/my-list"
            onClick={closeMenu}
            className="text-white hover:text-gray-300 transition-colors text-lg"
          >
            My List
          </Link>

          <div className="border-t border-gray-800 pt-4 mt-4">
            <Link
              to="/profiles/manage"
              onClick={closeMenu}
              className="text-white hover:text-gray-300 transition-colors text-lg block"
            >
              Manage Profiles
            </Link>
            <Link
              to="/account"
              onClick={closeMenu}
              className="text-white hover:text-gray-300 transition-colors text-lg block mt-4"
            >
              Account Settings
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}
