import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, TrendingUp, User, DollarSign } from 'lucide-react';
import styles from '../pages/homepage.css';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home');

  //hard coded need to change
  const bets = [
    { id: 'A', name: 'Bet A', odds: '1.5' },
    { id: 'B', name: 'Bet B', odds: '2.0' },
    { id: 'C', name: 'Bet C', odds: '3.2' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.marketsCard}>
          <h2 className={styles.cardTitle}>Active Markets</h2>
          {bets.map((bet) => (
            <div key={bet.id} className={styles.betItem}>
              <span>{bet.name}</span>
              <span className={styles.odds}>{bet.odds}</span>
            </div>
          ))}
          <div className={styles.balance}>
            <span className={styles.balanceAmount}>$</span>
            <span className={styles.balanceLabel}>Total Balance</span>
          </div>
        </div>
      </div>
      <nav className={styles.navigation}>
        <div className={styles.navItems}>
          <Link to="/" 
            className={`${styles.navItem} ${activeTab === 'home' ? styles.active : ''}`}
            onClick={() => setActiveTab('home')}
          >
            <Home size={24} />
            <span className={styles.navLabel}>Home</span>
          </Link>
          <Link to="/friends" 
            className={`${styles.navItem} ${activeTab === 'friends' ? styles.active : ''}`}
            onClick={() => setActiveTab('friends')}
          >
            <Users size={24} />
            <span className={styles.navLabel}>Friends</span>
          </Link>
          <Link to="/markets" 
            className={`${styles.navItem} ${activeTab === 'markets' ? styles.active : ''}`}
            onClick={() => setActiveTab('markets')}
          >
            <TrendingUp size={24} />
            <span className={styles.navLabel}>Markets</span>
          </Link>
          <Link to="/wallet" 
            className={`${styles.navItem} ${activeTab === 'wallet' ? styles.active : ''}`}
            onClick={() => setActiveTab('wallet')}
          >
            <DollarSign size={24} />
            <span className={styles.navLabel}>Wallet</span>
          </Link>
          <Link to="/profile" 
            className={`${styles.navItem} ${activeTab === 'profile' ? styles.active : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={24} />
            <span className={styles.navLabel}>Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}