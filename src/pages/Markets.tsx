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
        <h1 className="text-2xl font-bold">My Bet History</h1>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center">Loading...</p>
      ) : bets.length === 0 ? (
        <p className="text-gray-500 text-center">No bets found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GetMyMarkets />
        </div>
      )}
    </div>
  );
}

