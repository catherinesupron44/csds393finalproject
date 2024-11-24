import React, { useState, useEffect } from 'react';
import { getMyMarkets, settleMarket } from '../api'; // Ensure this points to the API file
import CreateBetModal from './CreateBetModal';
import { getCurrentUser } from 'aws-amplify/auth';

const GetMyMarkets = () => {
  const [markets, setMarkets] = useState([]);
  const [message, setMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Track modal visibility
  const [isSettleModalOpen, setIsSettleModalOpen] = useState(false); // Track settle modal visibility
  const [selectedMarket, setSelectedMarket] = useState(null); // Store selected market for settling

  useEffect(() => {
    const fetchMyMarkets = async () => {
      try {
        const user = await getCurrentUser();
        const response = await getMyMarkets(user.userId);
        console.log('API Response:', response);

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

  const handleSettleMarket = (market) => {
    setSelectedMarket(market);  // Set the selected market to be settled
    setIsSettleModalOpen(true);  // Open the settle modal
  };

  const handleConfirmWinner = async (winner) => {
    console.log(winner);
    console.log(selectedMarket);
    try {
      // Call API to settle the market and set the outcome
      console.log("here");
      const response = await settleMarket(selectedMarket.market_id, winner);

      console.log(response);

      if (response.data.settled) {
        console.log(`Market ID: ${selectedMarket.market_id} settled with winner: ${winner}`);
        
        // Optionally, you can update the local market state to reflect the outcome
        setMarkets(markets.map((market) => 
          market.market_id === selectedMarket.market_id ? { ...market, outcome: winner, settled: true } : market
        ));
        
        setIsSettleModalOpen(false); // Close the modal after successful settlement
      } else {
        setMessage('Failed to settle market');
      }
    } catch (error) {
      console.error('Error settling market:', error);
      setMessage('Error settling market');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {markets.length > 0 ? (
          markets.map((market, index) => (
            <div key={index}>
              <MarketTile
                market={market}
                onSettleMarket={handleSettleMarket}  // Pass the settle handler
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

      {/* Settle Market Modal */}
      {isSettleModalOpen && selectedMarket && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Settle Market</h3>
            <p className="mb-4">Choose the winner for the market "{selectedMarket.name}"</p>
            <div className="space-y-4">
              <button
                onClick={() => handleConfirmWinner(selectedMarket.sides?.sideOne)}
                className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
              >
                {selectedMarket.sides?.sideOne} Wins
              </button>
              <button
                onClick={() => handleConfirmWinner(selectedMarket.sides?.sideTwo)}
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
              >
                {selectedMarket.sides?.sideTwo} Wins
              </button>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => setIsSettleModalOpen(false)}  // Close modal without settling
                className="text-sm text-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MarketTile = ({ market, onSettleMarket }) => {
  const formatDateTime = (datetime) => {
    const date = new Date(datetime);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow relative">
      {market.settled === 'to be settled' && (
        <button
          onClick={() => onSettleMarket(market)} // Trigger the settle modal
          className="absolute top-4 right-4 bg-indigo-600 text-white text-sm font-medium py-1 px-3 rounded hover:bg-indigo-700 transition"
        >
          Settle Market
        </button>
      )}

      <h3 className="font-semibold text-lg mb-2">{market.name || 'Unnamed Market'}</h3>
      <p className="text-sm text-gray-600 mb-4">{market.description || 'No description'}</p>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="font-medium">{market.sides?.sideOne || 'N/A'}</p>
          <p className="text-sm text-gray-500">Odds: {market.odds?.sideOne || 'N/A'}</p>
        </div>
        <div>
          <p className="font-medium">{market.sides?.sideTwo || 'N/A'}</p>
          <p className="text-sm text-gray-500">Odds: {market.odds?.sideTwo || 'N/A'}</p>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
      <p>
    <strong>Status:</strong>{' '}
    {market.settled === true
      ? 'Settled'
      : market.settled === false
      ? 'Not Settled'
      : market.settled === 'to be settled'
      ? 'To Be Settled'
      : 'Unknown'}
  </p>
        <p>
          <strong>Closes:</strong> {market.closing_date ? formatDateTime(market.closing_date) : 'Unknown'}
        </p>
      </div>
    </div>
  );
};

export default GetMyMarkets;
