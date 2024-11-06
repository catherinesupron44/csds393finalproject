import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './lib/store';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import Dashboard from './pages/Dashboard';
import Bets from './pages/Bets';
import Groups from './pages/Groups';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Landing from './pages/Landing';
import { useState } from 'react';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { isAuthenticated, login } = useAuthStore();

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
    setIsAuthModalOpen(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
        <Navbar 
          isAuthenticated={isAuthenticated} 
          onAuthClick={() => setIsAuthModalOpen(true)}
        />
        
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Landing onGetStarted={() => setIsAuthModalOpen(true)} />} 
          />
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} 
          />
          <Route 
            path="/bets" 
            element={isAuthenticated ? <Bets /> : <Navigate to="/" />} 
          />
          <Route 
            path="/groups" 
            element={isAuthenticated ? <Groups /> : <Navigate to="/" />} 
          />
          <Route 
            path="/leaderboard" 
            element={isAuthenticated ? <Leaderboard /> : <Navigate to="/" />} 
          />
          <Route 
            path="/profile" 
            element={isAuthenticated ? <Profile /> : <Navigate to="/" />} 
          />
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