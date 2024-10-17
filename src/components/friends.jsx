import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, UserPlus, Trophy, Home, TrendingUp, User, DollarSign } from 'lucide-react';
import  '../pages/friends.css';

export default function GroupsPage() {
  const [inGroup, setInGroup] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

//hard coded leaderboard data
  const leaderboardData = [
    { rank: 1, name: 'Catherine', points: 1000 },
    { rank: 2, name: 'Maddy', points: 950 },
    { rank: 3, name: 'Dale', points: 900 },
    { rank: 4, name: 'Amelia', points: 850 },
    { rank: 5, name: 'Cullen', points: 800 },
  ];

  const handleJoinGroup = () => {
    setInGroup(true);
    setShowJoinModal(false);
  };

  const handleCreateGroup = () => {
    setInGroup(true);
    setShowCreateModal(false);
  };

  return (
    <div className="container">
      <div className="content">
        <h1 className="title">Groups</h1>
        {!inGroup ? (
          <div className="buttonContainer">
            <button className="button" onClick={() => setShowJoinModal(true)}>
              <Users size={24} />
              Join a Group
            </button>
            <button className="button" onClick={() => setShowCreateModal(true)}>
              <UserPlus size={24} />
              Create a Group
            </button>
          </div>
        ) : (
          <div className="leaderboard">
            <h2 className="leaderboardTitle">
              <Trophy size={24} />
              Leaderboard
            </h2>
            <table className="leaderboardTable">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((user) => (
                  <tr key={user.rank}>
                    <td>{user.rank}</td>
                    <td>{user.name}</td>
                    <td>{user.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <nav className="navigation">
        <Link to="/" className="navItem">
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
        <Link to="/profile" className="navItem">
          <User size={24} />
          <span>Profile</span>
        </Link>
      </nav>

      {showJoinModal && (
        <div className="modal">
          <h2>Join a Group</h2>
          <input type="text" placeholder="Enter group code" className="input" />
          <button className="button" onClick={handleJoinGroup}>Join</button>
          <button className="button" onClick={() => setShowJoinModal(false)}>Cancel</button>
        </div>
      )}

      {showCreateModal && (
        <div className="modal">
          <h2>Create a Group</h2>
          <input type="text" placeholder="Enter group ID" className="input" />
          <button className="button" onClick={handleCreateGroup}>Create</button>
          <button className="button" onClick={() => setShowCreateModal(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}