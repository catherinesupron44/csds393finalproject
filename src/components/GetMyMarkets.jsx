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
  // ... (previous implementation)
};

export default GetMyMarkets;