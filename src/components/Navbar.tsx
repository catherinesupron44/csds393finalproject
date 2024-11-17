import { Menu, User } from 'lucide-react';
import { useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCurrentUser} from "aws-amplify/auth";
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  isAuthenticated: boolean;
  onAuthClick: () => void;
  onLogout: () => void; // New prop for logout functionality
}

export default function Navbar({ isAuthenticated, onAuthClick, onLogout }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [isAuth, setIsAuth] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser()
        
        if (user) {
          setIsAuth(true)
        }
      } catch (err) {
        setIsAuth(false)
        console.log(err);
      }
    };

    checkAuth();
  }, []);

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
                <button
                  onClick={onLogout} // Logout button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <button
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile menu */}
        {isMenuOpen && isAuthenticated && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <MobileNavLink to="/dashboard" active={location.pathname === '/dashboard'}>
                Dashboard
              </MobileNavLink>
              <MobileNavLink to="/bets" active={location.pathname === '/bets'}>
                My Bets
              </MobileNavLink>
              <MobileNavLink to="/groups" active={location.pathname === '/groups'}>
                Groups
              </MobileNavLink>
              <MobileNavLink to="/leaderboard" active={location.pathname === '/leaderboard'}>
                Leaderboard
              </MobileNavLink>
              <MobileNavLink to="/profile" active={location.pathname === '/profile'}>
                Profile
              </MobileNavLink>
              <button
                onClick={onLogout} // Mobile logout button
                className="block px-4 py-2 text-left text-red-500 hover:bg-gray-100 rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLink({ to, active, children }: { 
  to: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link 
      to={to}
      className={`${
        active ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
      } transition-colors`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ to, active, children }: { 
  to: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link 
      to={to}
      className={`block px-4 py-2 rounded-lg ${
        active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {children}
    </Link>
  );
}
