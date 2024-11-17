// src/components/SettleBet.js

import React, { useState } from 'react';
import { settleBet } from '../api';

const SettleBet = () => {
  const [betId, setBetId] = useState('');
  const [message, setMessage] = useState('');

  const handleSettleBet = async () => {
    try {
      await settleBet(betId);
      setMessage('Bet settled successfully');
    } catch (error) {
      setMessage('Error settling bet');
    }
  };

  return (
    <div>
      <h2>Settle Bet</h2>
      <input
        value={betId}
        onChange={(e) => setBetId(e.target.value)}
        placeholder="Bet ID"
      />
      <button onClick={handleSettleBet}>Settle Bet</button>
      <p>{message}</p>
    </div>
  );
};

export default SettleBet;
