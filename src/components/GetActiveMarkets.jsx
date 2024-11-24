import React, { useState, useEffect, use } from 'react';
import { getActiveMarkets, placeBet } from '../api';
import CreateMarketModal from './CreateMarketModal';
import { getCurrentUser } from 'aws-amplify/auth';

const GetActiveMarkets = () => {
  const [markets, setMarkets] = useState([]);
  const [message, setMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    const fetchActiveMarkets = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (err) {
        console.error(err);
      }

      try {
        const response = await getActiveMarkets();
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

    fetchActiveMarkets();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Single Active Markets section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Active Markets</h2>
        <button
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create Market
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {markets.length > 0 ? (
          markets.map((market, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <MarketTile
                title={market.name}
                description={market.description}
                sides={market.sides}
                odds={market.odds}
                id={market.market_id}
              />
            </div>
          ))
        ) : (
          <p>{message || 'Loading markets...'}</p>
        )}
      </div>

      {/* Create Market Modal */}
      <CreateMarketModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        currentUser={currentUser}
      />
    </div>
  );
};

const MarketTile = ({ title, description, sides, odds, id}) => {
  const [selectedSide, setSelectedSide] = useState(null);
  const [stake, setStake] = useState('');
  const [currentUserId, setCurrentUser] = useState(null);
  const [message, setMessage] = useState("");

  const handleSideClick = (side) => {
    setSelectedSide(side);
  };

  const onSubmit = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user.userId);
    } catch (err) {
      console.error(err);
    }

    console.log("here");

    try {
      console.log("and here");
      const response = await placeBet({ currentUserId, id, selectedSide, stake});
      console.log(response);
      setMessage(`Bet created with ID: ${response.data.market_id}`);
    } catch (error) {
      setMessage('Error creating bet');
    }
  };

  const handleStakeChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value) && value >= 0) {
      setStake(value);
    }
  };

  const handleLine = (line) => {
    if (line > 0) {
      return "+" + line;
    }

    return line;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
      {/* Title and Description */}
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>

      {/* Sides and Odds */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {sides &&
          Object.entries(sides).map(([key, value], index) => (
            <div key={index} className="text-center">
              <button
                className={`w-full px-4 py-3 rounded text-white text-center ${
                  selectedSide === value ? 'bg-indigo-900' : 'bg-indigo-500'
                } hover:bg-indigo-600`}
                onClick={() => handleSideClick(value)}
              >
                {handleLine(odds?.[key]) || 'N/A'}
              </button>
              <p className="font-bold text-gray-800 mt-2">{value}</p>
            </div>
          ))}
      </div>

      {/* Coins Input */}
      <div className="flex flex-col items-start mb-6">
        <label htmlFor="stake" className="text-gray-600 font-medium mb-2">
          Coins:
        </label>
        <input
          id="stake"
          type="number"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter your stake"
          value={stake}
          onChange={handleStakeChange}
        />
      </div>

      {/* Submit Button */}
      <button
        className="w-full mt-6 px-6 py-3 bg-black text-white rounded hover:bg-gray-800"
        onClick={() => onSubmit(selectedSide, stake)}
        disabled={!selectedSide || !stake}
      >
        Submit Bet
      </button>
    </div>
  );
};

export default GetActiveMarkets;
