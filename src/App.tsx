import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import MyList from './pages/MyList'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/my-list" element={<MyList />} />
    </Routes>
  )
}

export default App
