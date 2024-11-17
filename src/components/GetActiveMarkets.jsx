// src/components/GetActiveMarkets.js

import React, { useState, useEffect } from 'react';
import { getActiveMarkets } from '../api';

const GetActiveMarkets = () => {
  const [markets, setMarkets] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchActiveMarkets = async () => {
      try {
        const response = await getActiveMarkets();
        setMarkets(response.data);
      } catch (error) {
        setMessage('Error fetching active markets');
      }
    };
    fetchActiveMarkets();
  }, []);

  return (
    <div>
      <h2>Active Markets</h2>
      <ul>
        {markets.map((market, index) => (
          <li key={index}>{market.name}</li>
        ))}
      </ul>
      {message && <p>{message}</p>}
    </div>
  );
};

export default GetActiveMarkets;
