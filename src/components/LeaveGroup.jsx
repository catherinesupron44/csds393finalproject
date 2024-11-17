import React, { useState } from 'react';
import { leaveGroup } from '../api';

const LeaveGroup = () => {
  const [groupId, setGroupId] = useState('');
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await leaveGroup(groupId, userId);
      setMessage(`Left group successfully: ${response.data}`);
    } catch (error) {
      setMessage('Error leaving group');
    }
  };

  return (
    <div>
      <h2>Leave Group</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Group ID" value={groupId} onChange={(e) => setGroupId(e.target.value)} />
        <input type="text" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <button type="submit">Leave Group</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LeaveGroup;
