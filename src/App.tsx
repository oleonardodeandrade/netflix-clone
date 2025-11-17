import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'
import { ProtectedRoute } from './components/route'

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Movies = lazy(() => import('./pages/Movies'))
const TvShows = lazy(() => import('./pages/TvShows'))
const MyList = lazy(() => import('./pages/MyList'))
const SearchResults = lazy(() => import('./pages/SearchResults'))
const Watch = lazy(() => import('./pages/Watch'))
const ProfileSelector = lazy(() => import('./pages/ProfileSelector'))
const ManageProfiles = lazy(() => import('./pages/ManageProfiles'))

function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/profiles"
          element={
            <ProtectedRoute requireProfile={false}>
              <ProfileSelector />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movies"
          element={
            <ProtectedRoute>
              <Movies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tv-shows"
          element={
            <ProtectedRoute>
              <TvShows />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-list"
          element={
            <ProtectedRoute>
              <MyList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchResults />
            </ProtectedRoute>
          }
        />
        <Route
          path="/watch/:id"
          element={
            <ProtectedRoute>
              <Watch />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profiles/manage"
          element={
            <ProtectedRoute>
              <ManageProfiles />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  )
}

export default App
