import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import MyList from './pages/MyList'
import SearchResults from './pages/SearchResults'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/my-list" element={<MyList />} />
      <Route path="/search" element={<SearchResults />} />
    </Routes>
  )
}

export default App
