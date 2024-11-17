import React, { useState } from 'react';
import { joinGroup } from '../api/joinGroup';           // Import the joinGroup function
import { getGroupLeaderboard } from '../api/getGroupLeaderboard';  // Import the getGroupLeaderboard function

const Group = () => {
  const [groupId, setGroupId] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleJoinGroup = async () => {
    try {
      setLoading(true);
      await joinGroup(groupId);
      setMessage('Successfully joined group');
    } catch (error) {
      setMessage('Error joining group');
    } finally {
      setLoading(false);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const response = await getGroupLeaderboard(groupId);
      setLeaderboard(response.data);
    } catch (error) {
      setMessage('Error fetching leaderboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Group Management</h2>
      <input 
        type="text" 
        placeholder="Group ID" 
        value={groupId} 
        onChange={(e) => setGroupId(e.target.value)} 
      />
      <button onClick={handleJoinGroup} disabled={loading}>
        {loading ? 'Joining...' : 'Join Group'}
      </button>
      <button onClick={fetchLeaderboard} disabled={loading || !groupId}>
        {loading ? 'Loading Leaderboard...' : 'View Leaderboard'}
      </button>
      {message && <p>{message}</p>}
      <ul>
        {leaderboard.map((entry, index) => (
          <li key={index}>{entry.userName}: {entry.points}</li>
        ))}
      </ul>
    </div>
  );
};

export default Group;
