import React, { useState, useEffect } from 'react';
import { getActiveMarkets } from '../api';

const GetActiveMarkets = () => {
  const [markets, setMarkets] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchActiveMarkets = async () => {
      try {
        const response = await getActiveMarkets();
        console.log(response);
        setMarkets(response.data);
        console.log(markets);
      } catch (error) {
        setMessage('Error fetching active markets');
      }
    };
    fetchActiveMarkets();
  }, []);

  return (
    console.log(JSON.parse(markets)));
};

export default GetActiveMarkets;
