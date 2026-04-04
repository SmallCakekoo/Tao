import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Landing } from './pages/Landing/Landing'
import { LogIn } from './pages/LogIn/LogIn'
import { SignUp } from './pages/SignUp/SignUp'
import { PrivacyPolicy } from './pages/LegalPages/PrivacyPolicy/PrivacyPolicy'
import { Legal } from './pages/LegalPages/LegalNotice/Legal'
import { Terms } from './pages/LegalPages/Terms/Terms'
import { ScrollToTop } from './components/Utils/ScrollToTop'
import { Home } from './pages/Home/Home'
import { Diary } from './pages/Diary/Diary'
import {Agenda} from './pages/Agenda/Agenda'
import { Form } from './pages/Form/Form'
import { Profile } from './pages/Profile/Profile'
import { EditProfile } from './pages/EditProfile/EditProfile'
import { useState } from 'react'

function App() {
  const [userName, setUserName] = useState("Migue");
  const [userQuote, setUserQuote] = useState("The key is not to prioritize what's on your schedule, but to schedule your priorities.");
  const [userQuoteAuthor, setUserQuoteAuthor] = useState("— Stephen Covey");

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
      <Route path="/home" element={<Home userName={userName} />} />
      <Route path="/diary" element={<Diary />} />
      <Route path="/agenda" element={<Agenda userQuote={userQuote} userQuoteAuthor={userQuoteAuthor}  />} />
      <Route path="/form" element={<Form />} />
      <Route path="/profile" element={<Profile userName={userName} />} />
      <Route path="/editprofile" element={<EditProfile setUserName={setUserName} setUserQuote={setUserQuote} setUserQuoteAuthor={setUserQuoteAuthor} />} />

      </Routes>
    </>
  )
}

export default App
