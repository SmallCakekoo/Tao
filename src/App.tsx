import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Landing } from './pages/Landing/Landing'
import { LogIn } from './pages/LogIn/LogIn'
import { SignUp } from './pages/SignUp/SignUp'
import { PrivacyPolicy } from './pages/LegalPages/PrivacyPolicy/PrivacyPolicy'
import { Legal } from './pages/LegalPages/LegalNotice/Legal'
import { Terms } from './pages/LegalPages/Terms/Terms'
import { ScrollToTop } from './components/Utils/ScrollToTop'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/legal" element={<Legal />} />
      <Route path="/terms" element={<Terms />} />
      </Routes>
    </>
  )
}

export default App
