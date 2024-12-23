import { Menu, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCurrentUser, signOut } from "aws-amplify/auth"; // Imported getCoins
import { getCoins } from "../api"; 
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  isAuthenticated: boolean;
  onAuthClick: () => void;
}

export default function Navbar({ isAuthenticated, onAuthClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [isAuth, setIsAuth] = useState(false);
  const [coins, setCoins] = useState<number | null>(null);
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    setIsAuth(false);
  }

  useEffect(() => {
    const checkAuthAndFetchCoins = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          setIsAuth(true);
          const userCoins = await getCoins(user.userId); // Call the imported `getCoins` directly
          setCoins(userCoins.data); // Update state with fetched coins
        }
      } catch (err) {
        setIsAuth(false);
        console.error(err);
      }
    };

    checkAuthAndFetchCoins();
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
                  className={`${
                    location.pathname === '/dashboard'
                      ? 'text-indigo-600 font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Active Markets
                </button>
                <button
                  onClick={() => navigate('/bets')}
                  className={`${
                    location.pathname === '/bets'
                      ? 'text-indigo-600 font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  My Bets
                </button>
                <button
                  onClick={() => navigate('/markets')}
                  className={`${
                    location.pathname === '/markets'
                      ? 'text-indigo-600 font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  My Markets
                </button>
              </div>

              <div className="hidden md:flex items-center space-x-4">
                {/* Display Coins */}
                <div className="flex items-center text-gray-600 space-x-2">
                  <div
                    className="w-6 h-6 rounded-full bg-yellow-400 border border-yellow-500 flex items-center justify-center text-xs font-bold text-gray-800"
                    style={{ boxShadow: '0 0 5px rgba(255, 215, 0, 0.7)' }}
                  >
                    $
                  </div>
                  <span className="font-medium text-lg">
                    {coins !== null ? coins : '...'}
                  </span>
                </div>
                <Link to="/profile">
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <User className="w-6 h-6 text-gray-600" />
                  </button>
                </Link>
                <button
                  onClick={handleSignOut} // Logout button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </nav>
  );
}
