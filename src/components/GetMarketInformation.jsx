// src/components/GetMarketInformation.js

import React, { useState, useEffect } from 'react';
import { getMarketInformation } from '../api';

const GetMarketInformation = ({ marketId }) => {
  const [marketInfo, setMarketInfo] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMarketInfo = async () => {
      try {
        const response = await getMarketInformation(marketId);
        setMarketInfo(response.data);
      } catch (error) {
        setMessage('Error fetching market information');
      }
    };
    fetchMarketInfo();
  }, [marketId]);

  return (
    <div>
      <h2>Market Information</h2>
      {marketInfo ? <pre>{JSON.stringify(marketInfo, null, 2)}</pre> : <p>No market data available</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default GetMarketInformation;
