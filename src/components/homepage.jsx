import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Home, Users, TrendingUp, User, DollarSign } from 'lucide-react';
import { getCurrentUser, signOut } from "aws-amplify/auth";
import '../pages/homepage.css';

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCurrentUser();
  }, []); // empty dependency array to run only on mount

  const handleToggle = () => {
    setActive(!isActive);
    document.body.classList.toggle("overflow-hidden", !isActive);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      console.log('success');
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const bets = [
    { id: 'A', name: 'Bet A', odds: '1.5' },
    { id: 'B', name: 'Bet B', odds: '2.0' },
    { id: 'C', name: 'Bet C', odds: '3.2' },
  ];

  return (
    <div className="container">
      <div className="content">
        <div className="betsContainer">
          <div className="balance">
            <span>$</span>
            <span>Total Balance</span>
          </div>
          <h2>Active Markets</h2>
          {bets.map((bet) => (
            <div key={bet.id} className="betItem">
              <span className="betId">{bet.name}</span>
              <span className="betOdds">{bet.odds}</span>
            </div>
          ))}    
        </div>
      </div>

      <nav className="navigation">
        <Link to="/home" className="navItem">
          <Home size={24} />
          <span>Home</span>
        </Link>
        <Link to="/friends" className="navItem">
          <Users size={24} />
          <span>Friends</span>
        </Link>
        <Link to="/markets" className="navItem">
          <TrendingUp size={24} />
          <span>Markets</span>
        </Link>
        <Link to="/wallet" className="navItem">
          <DollarSign size={24} />
          <span>Wallet</span>
        </Link>
        <Link to="/" className="navItem" onClick={handleSignOut}>
          <User size={24} />
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
}
