import React, { useEffect, useState } from 'react';
import GetMyMarkets from "../components/GetMyMarkets";

export default function BetHistory() {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate API call to fetch bet history
  const getBetHistory = async () => {
    setLoading(true);
    // Replace this with an actual API call
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulating a network delay
  };

  useEffect(() => {
    getBetHistory();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">My Markets</h1>
      </div>

      <GetMyMarkets />
    </div>
  );
}

