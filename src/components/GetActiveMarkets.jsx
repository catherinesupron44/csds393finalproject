import React, { useState, useEffect } from 'react';
import { getActiveMarkets } from '../api';
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

const MarketTile = ({ title, description, sides, odds }) => {
  const [selectedSide, setSelectedSide] = useState(null);

  const handleSideClick = (sideName) => {
    setSelectedSide(sideName);
    alert(`You selected: ${sideName}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>

      <div className="flex justify-between gap-4 mb-6">
        {sides &&
          Object.entries(sides).map(([key, value], index) => (
            <button
              key={index}
              className={`flex-1 px-4 py-3 rounded text-white text-center ${
                selectedSide === value.S ? 'bg-indigo-700' : 'bg-indigo-500'
              } hover:bg-indigo-600`}
              onClick={() => handleSideClick(value.S)}
              style={{
                minWidth: '45%',
              }}
            >
              {value.S}
            </button>
          ))}
      </div>

      <div className="flex justify-between gap-4 mb-6">
        {odds &&
          Object.entries(odds).map(([key, value], index) => (
            <div key={index} className="text-gray-500 text-sm">
              <p className="font-medium">{key}</p>
              <p>Odds: {value.N}</p>
            </div>
          ))}
      </div>

      <button className="w-full mt-6 px-6 py-3 bg-black text-white rounded hover:bg-gray-800">
        Submit Bet
      </button>
    </div>
  );
};

export default GetActiveMarkets;
