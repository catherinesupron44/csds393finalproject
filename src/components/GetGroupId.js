import React, { useState } from 'react';
import { getGroupId } from '../api';

const GetGroupId = () => {
  const [groupName, setGroupName] = useState('');
  const [groupId, setGroupId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getGroupId(groupName);
      setGroupId(response.data.groupId);
    } catch (error) {
      setMessage('Error retrieving group ID');
    }
  };

  return (
    <div>
      <h2>Get Group ID</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Group Name" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
        <button type="submit">Get Group ID</button>
      </form>
      {groupId && <p>Group ID: {groupId}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default GetGroupId;
