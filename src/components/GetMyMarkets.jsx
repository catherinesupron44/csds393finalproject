import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMyMarkets, settleMarket } from '../api';
import { getCurrentUser } from 'aws-amplify/auth';

const GetMyMarkets = () => {
  const queryClient = useQueryClient();
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [isSettleModalOpen, setIsSettleModalOpen] = useState(false);

  // Fetch markets query
  const { data: markets, isLoading, error } = useQuery({
    queryKey: ['myMarkets'],
    queryFn: async () => {
      const user = await getCurrentUser();
      const response = await getMyMarkets(user.userId);
      return Array.isArray(response.data) 
        ? response.data 
        : response.data && typeof response.data === 'object'
        ? Object.values(response.data)
        : [];
    },
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  // Settle market mutation
  const settleMarketMutation = useMutation({
    mutationFn: (params) => settleMarket(params.marketId, params.winner),
    onSuccess: () => {
      // Invalidate and refetch markets after successful settlement
      queryClient.invalidateQueries({ queryKey: ['myMarkets'] });
      setIsSettleModalOpen(false);
    },
    onError: (error) => {
      console.error('Error settling market:', error);
    }
  });

  const handleSettleMarket = (market) => {
    setSelectedMarket(market);
    setIsSettleModalOpen(true);
  };

  const handleConfirmWinner = (winner) => {
    settleMarketMutation.mutate({
      marketId: selectedMarket.market_id,
      winner
    });
  };

  if (isLoading) return <p>Loading markets...</p>;
  if (error) return <p>Error fetching active markets</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {markets.length > 0 ? (
          markets.map((market) => (
            <MarketTile
              key={market.market_id}
              market={market}
              onSettleMarket={handleSettleMarket}
            />
          ))
        ) : (
          <p>No markets available</p>
        )}
      </div>

      {/* Settle Market Modal (similar to previous implementation) */}
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
                onClick={() => setIsSettleModalOpen(false)}
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

// MarketTile component remains the same as in the previous implementation
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