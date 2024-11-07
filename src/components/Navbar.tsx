import { Menu, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  isAuthenticated: boolean;
  onAuthClick: () => void;
}

export default function Navbar({ isAuthenticated, onAuthClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              BetBuddy
            </Link>
          </div>

          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center space-x-8">
                <NavLink to="/dashboard" active={location.pathname === '/dashboard'}>
                  Dashboard
                </NavLink>
                <NavLink to="/bets" active={location.pathname === '/bets'}>
                  My Bets
                </NavLink>
                <NavLink to="/groups" active={location.pathname === '/groups'}>
                  Groups
                </NavLink>
                <NavLink to="/leaderboard" active={location.pathname === '/leaderboard'}>
                  Leaderboard
                </NavLink>
              </div>

             <div className="hidden md:flex items-center space-x-4">
                <Link to="/profile">
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <User className="w-6 h-6 text-gray-600" />
                  </button>
                </Link>
              </div>

              <div className="md:hidden">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <Menu className="w-6 h-6 text-gray-600" />
                </button>
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