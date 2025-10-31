import { useAtom, useSetAtom } from 'jotai'
import { favoriteMoviesAtom, selectedMovieAtom } from '../store/movies'
import { Header } from '../components/header/Header'
import { Footer } from '../components/footer/Footer'
import { MoviePreviewModal } from '../components/movie/MoviePreviewModal'
import { MovieCard } from '../components/movie/MovieCard'
import { useFavoritesPersistence } from '../hooks/useFavoritesPersistence'

export default function MyList() {
  const [favorites] = useAtom(favoriteMoviesAtom)
  const setSelectedMovie = useSetAtom(selectedMovieAtom)

  useFavoritesPersistence()

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="pt-20 px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">My List</h1>

          {favorites.length === 0 ? (
            <div className="text-center py-20">
              <svg
                className="w-20 h-20 mx-auto mb-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <h2 className="text-2xl font-semibold mb-2 text-gray-400">
                Your list is empty
              </h2>
              <p className="text-gray-500">
                Add movies and shows to your list by clicking the heart icon
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {favorites.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={setSelectedMovie}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <MoviePreviewModal />
    </div>
  )
}
