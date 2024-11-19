import React, { useState, useEffect } from 'react';
import { getMyMarkets } from '../api';

const GetMyMarkets = () => {
  const [markets, setMarkets] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMyMarkets = async () => {
      try {
        const response = await getMyMarkets();
        console.log(response.data); // Log raw API response
        setMarkets(response.data); // Assume response.data is an object
      } catch (error) {
        console.error('Error fetching active markets:', error);
        setMessage('Error fetching active markets');
      }
    };

    fetchMyMarkets();
  }, []);

  return (
    <div>
      <h2>My Markets</h2>
      <ul>
        {markets &&
          Object.values(markets).map((market, index) => (
            <li key={index}>{market.name}</li>
          ))}
      </ul>
      {message && <p>{message}</p>}
    </div>
  );
};

export default GetMyMarkets;
