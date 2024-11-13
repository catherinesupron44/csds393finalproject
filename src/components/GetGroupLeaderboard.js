import React, { useState } from 'react';
import { getGroupLeaderboard } from '../api';

const GetGroupLeaderboard = () => {
  const [groupId, setGroupId] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getGroupLeaderboard(groupId);
      setLeaderboard(response.data);
    } catch (error) {
      setMessage('Error retrieving leaderboard');
    }
  };

  return (
    <div>
      <h2>Group Leaderboard</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Group ID" value={groupId} onChange={(e) => setGroupId(e.target.value)} />
        <button type="submit">Get Leaderboard</button>
      </form>
      <ul>{leaderboard.map((entry, index) => <li key={index}>{entry.username}: {entry.score}</li>)}</ul>
      {message && <p>{message}</p>}
    </div>
  );
};

export default GetGroupLeaderboard;
