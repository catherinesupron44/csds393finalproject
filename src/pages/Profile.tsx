import React, { useEffect, useState } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { getBetHistory } from "../api";

export default function BetHistory() {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchMyMarkets = async () => {
      try {
        const user = await getCurrentUser();
        const response = await getBetHistory(user.userId);
        console.log('API Response:', response);

        if (Array.isArray(response.data)) {
          setBets(response.data);
        } else if (response.data && typeof response.data === 'object') {
          setBets(Object.values(response.data));
        } else {
          setMessage('Invalid data format');
        }
      } catch (error) {
        console.error('Error fetching active markets:', error);
        setMessage('Error fetching active markets');
      }

      setLoading(false);
    };

    fetchMyMarkets();
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
          {bets.map((bet, index) => (
            <BetCard key={index} bet={bet} />
          ))}
        </div>
      )}
    </div>
  );
}

function BetCard({ bet}) {
  const statusColors = {
    Active: "bg-green-100 text-green-800",
    Completed: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{bet.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{bet.description}</p>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded ${statusColors[bet.status]}`}
        >
          {bet.status}
        </span>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">{bet.endDate}</span>
        <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          View Details
        </button>
      </div>
    </div>
  );
}
