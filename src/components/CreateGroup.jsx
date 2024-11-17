import React, { useState } from 'react';
import { createGroup } from '../api';

const CreateGroup = () => {
  const [groupData, setGroupData] = useState({ name: '', description: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setGroupData({ ...groupData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createGroup(groupData);
      setMessage(`Group created successfully: ${response.data}`);
    } catch (error) {
      setMessage('Error creating group');
    }
  };

  return (
    <div>
      <h2>Create a Group</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Group Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />
        <button type="submit">Create Group</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateGroup;
