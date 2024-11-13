// src/components/GetBetHistory.js

import React, { useState, useEffect } from 'react';
import { getBetHistory } from '../api';

const GetBetHistory = () => {
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchBetHistory = async () => {
      try {
        const response = await getBetHistory();
        setHistory(response.data);
      } catch (error) {
        setMessage('Error fetching bet history');
      }
    };
    fetchBetHistory();
  }, []);

  return (
    <div>
      <h2>Bet History</h2>
      <ul>
        {history.map((bet, index) => (
          <li key={index}>{bet.description}</li>
        ))}
      </ul>
      {message && <p>{message}</p>}
    </div>
  );
};

export default GetBetHistory;
