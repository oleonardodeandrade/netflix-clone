import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const MyList = lazy(() => import('./pages/MyList'))
const SearchResults = lazy(() => import('./pages/SearchResults'))
const Watch = lazy(() => import('./pages/Watch'))

function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-list" element={<MyList />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/watch/:id" element={<Watch />} />
      </Routes>
    </Suspense>
  )
}

export default App
