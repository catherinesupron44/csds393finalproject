// src/components/SettleMarket.js

import React, { useState } from 'react';
import { settleMarket } from '../api';

const SettleMarket = () => {
  const [marketId, setMarketId] = useState('');
  const [message, setMessage] = useState('');

  const handleSettleMarket = async () => {
    try {
      await settleMarket(marketId);
      setMessage('Market settled successfully');
    } catch (error) {
      setMessage('Error settling market');
    }
  };

  return (
    <div>
      <h2>Settle Market</h2>
      <input
        value={marketId}
        onChange={(e) => setMarketId(e.target.value)}
        placeholder="Market ID"
      />
      <button onClick={handleSettleMarket}>Settle Market</button>
      <p>{message}</p>
    </div>
  );
};

export default SettleMarket;
