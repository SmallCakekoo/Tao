import './App.css';

import { Routes, Route } from 'react-router-dom';

import { Landing } from './pages/Landing/Landing';
import { LogIn } from './pages/LogIn/LogIn';
import { SignUp } from './pages/SignUp/SignUp';
import { PrivacyPolicy } from './pages/LegalPages/PrivacyPolicy/PrivacyPolicy';
import { Legal } from './pages/LegalPages/LegalNotice/Legal';
import { Terms } from './pages/LegalPages/Terms/Terms';

import { ScrollToTop } from './components/Utils/ScrollToTop';

import { Home } from './pages/Home/Home';
import { Diary } from './pages/Diary/Diary';
import { Agenda } from './pages/Agenda/Agenda';
import { Form } from './pages/Form/Form';

import { Profile } from './pages/Profile/Profile';
import { EditProfile } from './pages/EditProfile/EditProfile';

import { FormIntro } from './pages/Form/Intro/FormIntro';
import { FormQuestion } from './pages/Form/Question/FormQuestion';
import { FormResults } from './pages/Form/Results/FormResults';

import { Recommendations } from './pages/Recommendations/Hub/Recommendations';
import { RecommendationsPreset } from './pages/Recommendations/Preset/RecommendationsPreset';
import { RecommendationsLoading } from './pages/Recommendations/Loading/RecommendationsLoading';
import { RecommendationsResults } from './pages/Recommendations/Results/RecommendationsResults';

import { BreathingExercise } from './pages/BreathingExercise/BreathingExercise';
import { EditFeelings } from './pages/EditFeelings/EditFeelings';
import { NotFound } from './pages/NotFound/NotFound';

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
        <Route path="/home" element={<Home />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/form" element={<Form />}>
          <Route index element={<FormIntro />} />
          <Route path="question/:questionId" element={<FormQuestion />} />
          <Route path="results" element={<FormResults />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/form/edit-feelings" element={<EditFeelings />} />
        <Route path="/edit-feelings" element={<EditFeelings />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/recommendations/preset" element={<RecommendationsPreset />} />
        <Route path="/recommendations/loading" element={<RecommendationsLoading />} />
        <Route path="/recommendations/results" element={<RecommendationsResults />} />
        <Route path="/recommendations/breathing" element={<BreathingExercise />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
