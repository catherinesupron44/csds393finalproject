import React, { useState } from 'react';
import { placeBet } from '../api';

const PlaceBet = () => {
  const [betId, setBetId] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handlePlaceBet = async () => {
    try {
      await placeBet({ betId, amount });
      setMessage('Bet placed successfully');
    } catch (error) {
      setMessage('Error placing bet');
    }
  };

  return (
    <div>
      <h2>Place Bet</h2>
      <input
        value={betId}
        onChange={(e) => setBetId(e.target.value)}
        placeholder="Bet ID"
      />
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button onClick={handlePlaceBet}>Place Bet</button>
      <p>{message}</p>
    </div>
  );
};

export default PlaceBet;
