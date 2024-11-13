import { Menu, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCurrentUser} from "aws-amplify/auth";
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  isAuthenticated: boolean;
  onAuthClick: () => void;
}

export default function Navbar({onAuthClick }: NavbarProps) {
  const location = useLocation();
  const [isAuth, setIsAuth] = useState(false);

  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const user = await getCurrentUser()

      if (user){
        setIsAuth(true)
      }
    } catch (err) {
      setIsAuth(false)
      console.log(err);
    }
  };

  checkAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              BetBuddy
            </Link>
          </div>

          {isAuth ? (
            <>
              <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => navigate('/dashboard')}
                className={`${location.pathname === '/dashboard' ? 'text-indigo-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => navigate('/bets')}
                className={`${location.pathname === '/bets' ? 'text-indigo-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
              >
                My Bets
              </button>
              <button 
                onClick={() => navigate('/groups')}
                className={`${location.pathname === '/groups' ? 'text-indigo-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Groups
              </button>
              <button 
                onClick={() => navigate('/leaderboard')}
                className={`${location.pathname === '/leaderboard' ? 'text-indigo-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Leaderboard
              </button>
              </div>

             <div className="hidden md:flex items-center space-x-4">
                <Link to="/profile">
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <User className="w-6 h-6 text-gray-600" />
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <button
              onClick={onAuthClick}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}