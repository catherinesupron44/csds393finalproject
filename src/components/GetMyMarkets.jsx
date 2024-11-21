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
        const response = await getMyMarkets(await getCurrentUser().userId);
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

      {/* Create Bet Modal */}
      <CreateBetModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)} // Close modal
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
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
      <span
        className={`text-xs px-2 py-1 rounded`}
      >
        {sides}
      </span>
    </div>
    <div className="flex justify-between items-center mt-4">
      <span className="text-sm text-gray-500">{odds}</span>
      <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
        View Details
      </button>
    </div>
  </div>
  );
};

export default GetMyMarkets;
