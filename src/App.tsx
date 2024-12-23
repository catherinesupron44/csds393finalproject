import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import AuthModal from './components/AuthModal.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Bets from './pages/Bets.jsx';
import Profile from './pages/Profile.jsx';
import Landing from './pages/Landing.jsx';
import { useState } from 'react';
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";
import { signIn } from 'aws-amplify/auth';
import './amplifyconfiguration.json';
import MyMarkets from './pages/Markets.jsx';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    try {
      await signIn({ username: email, password });
      setIsAuthModalOpen(false);
    } catch (error) {
      console.error('Error signing in:', error);
      // Handle error (show error message, etc.)
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
        <Navbar />
        
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Landing onGetStarted={() => setIsAuthModalOpen(true)} />} />
          <Route 
            path="/" 
            element={<Landing onGetStarted={() => setIsAuthModalOpen(true)} />}
          />

          {/* Protected routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bets" element={<Bets />} />
            <Route path="/markets" element={<MyMarkets />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={handleLogin}
        />
      </div>
    </Router>
  );
}

export default App; 
