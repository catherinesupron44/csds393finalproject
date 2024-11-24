import React, { useState, useEffect } from 'react';
import { getMyMarkets } from '../api';
import CreateBetModal from './CreateBetModal';
import { getCurrentUser } from 'aws-amplify/auth';

const GetMyMarkets = () => {
  const [markets, setMarkets] = useState([]);
  const [message, setMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Track modal visibility

  useEffect(() => {    
    const fetchMyMarkets = async () => {
      try {
        const user = await getCurrentUser();
        const response = await getMyMarkets(user.userId);
        console.log('API Response:', response); // Log the whole response
        console.log('API Response Data:', response.data); // Log the data part of the response

        if (Array.isArray(response.data)) {
          setMarkets(response.data);
        } else if (response.data && typeof response.data === 'object') {
          setMarkets(Object.values(response.data));
        } else {
          setMessage('Invalid data format');
        }
      } catch (error) {
        console.error('Error fetching active markets:', error);
        setMessage('Error fetching active markets');
      }
    };

    fetchMyMarkets();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {markets.length > 0 ? (
          markets.map((market, index) => (
            <div key={index}>
              <MarketTile
                title={market.name || 'Unnamed Market'}
                description={market.description || 'No description'}
                sides={market.sides}
                odds={market.odds}
                settled={market.settled}
                closing_date = {market.closing_date}
              />
            </div>
          ))
        ) : (
          <p>{message || 'Loading markets...'}</p>
        )}
      </div>

      {/* Create Bet Modal */}
      <CreateBetModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)} // Close modal
      />
    </div>
  );
};

const MarketTile = ({ title, description, sides, odds, settled, closing_date }) => {
  const formatDateTime = (datetime) => {
    const date = new Date(datetime);
  
    // Options for formatting the date and time
    const options = {
      weekday: 'long', // Full day name (e.g., "Friday")
      year: 'numeric', // Full year
      month: 'long',   // Full month name (e.g., "November")
      day: 'numeric',  // Day of the month
      hour: '2-digit', // Hour (e.g., "05 PM")
      minute: '2-digit', // Minute (e.g., ":53")
    };
  
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow relative">
      {settled === 'to be settled' && (
        <button
          className="absolute top-4 right-4 bg-indigo-600 text-white text-sm font-medium py-1 px-3 rounded hover:bg-indigo-700 transition"
        >
          Settle Market
        </button>
      )}

      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="font-medium">{sides?.sideOne || 'N/A'}</p>
          <p className="text-sm text-gray-500">Odds: {odds?.sideOne || 'N/A'}</p>
        </div>
        <div>
          <p className="font-medium">{sides?.sideTwo || 'N/A'}</p>
          <p className="text-sm text-gray-500">Odds: {odds?.sideTwo || 'N/A'}</p>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>
          <strong>Status:</strong> {settled || 'Not Settled'}
        </p>
        <p>
          <strong>Closes:</strong> {closing_date ? formatDateTime(closing_date) : 'Unknown'}
        </p>
      </div>
    </div>
  );
};

export default GetMyMarkets;