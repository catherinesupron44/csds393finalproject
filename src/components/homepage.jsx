import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, TrendingUp, User, DollarSign } from 'lucide-react';
import '../pages/homepage.css';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home');

  //hard coded need to change
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
        <Link 
          to="/" 
          className={`navItem ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <Home size={24} />
          <span>Home</span>
        </Link>
        <Link 
          to="/friends" 
          className={`navItem ${activeTab === 'friends' ? 'active' : ''}`}
          onClick={() => setActiveTab('friends')}
        >
          <Users size={24} />
          <span>Friends</span>
        </Link>
        <Link 
          to="/markets" 
          className={`navItem ${activeTab === 'markets' ? 'active' : ''}`}
          onClick={() => setActiveTab('markets')}
        >
          <TrendingUp size={24} />
          <span>Markets</span>
        </Link>
        <Link 
          to="/wallet" 
          className={`navItem ${activeTab === 'wallet' ? 'active' : ''}`}
          onClick={() => setActiveTab('wallet')}
        >
          <DollarSign size={24} />
          <span>Wallet</span>
        </Link>
        <Link 
          to="/profile" 
          className={`navItem ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <User size={24} />
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
}