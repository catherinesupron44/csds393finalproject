import React, { useState, useEffect } from 'react';
import { joinGroup } from '../api';
import { Auth } from 'aws-amplify';

const JoinGroup = () => {
  const [groupId, setGroupId] = useState('');
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch user ID from authentication (e.g., AWS Cognito)
    const getUserId = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUserId(user.attributes.sub); // Set the user ID from Cognito
      } catch (error) {
        console.error('Error getting user ID', error);
        setMessage('Error retrieving user information');
      }
    };

    getUserId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!groupId || !userId) {
      setMessage('Group ID and User ID are required');
      return;
    }

    try {
      const response = await joinGroup(groupId, userId);
      setMessage(`Joined group successfully: ${response.data}`);
    } catch (error) {
      setMessage('Error joining group');
    }
  };

  return (
    <div>
      <h2>Join Group</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Group ID" 
          value={groupId} 
          onChange={(e) => setGroupId(e.target.value)} 
        />
        <button type="submit" disabled={!groupId || !userId}>Join Group</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default JoinGroup;
