import './App.css';

import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';

import { AuthProvider } from './contexts/AuthContext';
import { TasksProvider } from './contexts/TasksContext';
import { CheckinProvider } from './contexts/CheckinContext';
import { ProfileProvider } from './contexts/ProfileContext';

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
    <AuthProvider>
      <ProfileProvider>
      <TasksProvider>
        <CheckinProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />

            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/diary" element={<ProtectedRoute><Diary /></ProtectedRoute>} />
            <Route path="/agenda" element={<ProtectedRoute><Agenda /></ProtectedRoute>} />
            <Route path="/form" element={<ProtectedRoute><Form /></ProtectedRoute>}>
              <Route index element={<ProtectedRoute><FormIntro /></ProtectedRoute>} />
              <Route path="question/:questionId" element={<ProtectedRoute><FormQuestion /></ProtectedRoute>} />
              <Route path="results" element={<ProtectedRoute><FormResults /></ProtectedRoute>} />
            </Route>
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/editprofile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
            <Route path="/form/edit-feelings" element={<ProtectedRoute><EditFeelings /></ProtectedRoute>} />
            <Route path="/edit-feelings" element={<ProtectedRoute><EditFeelings /></ProtectedRoute>} />
            <Route path="/recommendations" element={<ProtectedRoute><Recommendations /></ProtectedRoute>} />
            <Route path="/recommendations/preset" element={<ProtectedRoute><RecommendationsPreset /></ProtectedRoute>} />
            <Route path="/recommendations/loading" element={<ProtectedRoute><RecommendationsLoading /></ProtectedRoute>} />
            <Route path="/recommendations/results" element={<ProtectedRoute><RecommendationsResults /></ProtectedRoute>} />
            <Route path="/recommendations/breathing" element={<ProtectedRoute><BreathingExercise /></ProtectedRoute>} />
          </Routes>
        </CheckinProvider>
      </TasksProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
