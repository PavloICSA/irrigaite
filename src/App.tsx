import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import TranslationErrorBoundary from './components/TranslationErrorBoundary';
import Landing from './pages/Landing';
import PETEvaluation from './pages/PETEvaluation';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Guidelines from './pages/Guidelines';
import About from './pages/About';
import Support from './pages/Support';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import ReferenceBook from './pages/ReferenceBook';
import MyCalculations from './pages/MyCalculations';
import LicenseActivation from './pages/LicenseActivation';

function App() {
  return (
    <TranslationErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Router>
          <Routes>
            {/* Public routes without layout */}
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            
            {/* Routes with layout */}
            <Route path="/*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/pet-evaluation" element={
                    <ProtectedRoute>
                      <PETEvaluation />
                    </ProtectedRoute>
                  } />
                  <Route path="/my-calculations" element={
                    <ProtectedRoute>
                      <MyCalculations />
                    </ProtectedRoute>
                  } />
                  <Route path="/license-activation" element={
                    <ProtectedRoute>
                      <LicenseActivation />
                    </ProtectedRoute>
                  } />
                  <Route path="/guidelines" element={<Guidelines />} />
                  <Route path="/reference-book" element={<ReferenceBook />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                </Routes>
              </Layout>
            } />
          </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </TranslationErrorBoundary>
  );
}

export default App;