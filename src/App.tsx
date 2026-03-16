import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Landing } from './pages/Landing/Landing'
import { LogIn } from './pages/LogIn/LogIn'
import { SignUp } from './pages/SignUp/SignUp'
import { Home } from './pages/Home/Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<LogIn/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/home" element={<Home/>} />
    </Routes>
  )
}

export default App
