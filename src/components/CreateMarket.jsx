import React, { useState } from 'react';
import { createMarket } from '../api';

const CreateMarket = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateMarket = async () => {
    try {
      const response = await createMarket({ name, description });
      setMessage(`Market created with ID: ${response.data.market_id}`);
    } catch (error) {
      setMessage('Error creating market');
    }
  };

  return (
    <div>
      <h2>Create Market</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Market Name"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button onClick={handleCreateMarket}>Create Market</button>
      <p>{message}</p>
    </div>
  );
};

export default CreateMarket;
