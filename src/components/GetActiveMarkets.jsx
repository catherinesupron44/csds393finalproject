import React, { useState, useEffect } from 'react';
import { getActiveMarkets } from '../api';
import CreateMarketModal from './CreateMarketModal';
import MarketTile from './MarketTile';  // Add this import
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

      <CreateMarketModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        currentUser={currentUser}
      />
    </div>
  );
};

export default GetActiveMarkets;
