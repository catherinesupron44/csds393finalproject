import React, { useState, useEffect } from 'react';
import { getActiveBets } from '../api';

const GetActiveBets = () => {
  const [bets, setBets] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchActiveBets = async () => {
      try {
        const response = await getActiveBets();
        setBets(response.data);
      } catch (error) {
        setMessage('Error fetching active bets');
      }
    };
    fetchActiveBets();
  }, []);

  return (
    <div>
      <h2>Active Bets</h2>
      <ul>
        {bets.map((bet, index) => (
          <li key={index}>{bet.description}</li>
        ))}
      </ul>
      {message && <p>{message}</p>}
    </div>
  );
};

export default GetActiveBets;

