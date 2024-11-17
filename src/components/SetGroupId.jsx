import React, { useState } from 'react';
import { setGroupId } from '../api';

const SetGroupId = () => {
  const [groupId, setGroupId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await setGroupId(groupId);
      setMessage(`Group ID set successfully: ${response.data}`);
    } catch (error) {
      setMessage('Error setting group ID');
    }
  };

  return (
    <div>
      <h2>Set Group ID</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Group ID" value={groupId} onChange={(e) => setGroupId(e.target.value)} />
        <button type="submit">Set Group ID</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SetGroupId;
