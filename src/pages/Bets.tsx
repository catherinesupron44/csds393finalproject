import { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import BetCard from '../components/BetCard';
import CreateBetModal from '../components/CreateBetModal';
import { useBets, useJoinBet } from '../lib/queries';

export default function Bets() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const { data: bets = [], isLoading } = useBets();
  const joinBetMutation = useJoinBet();

  const filteredBets = bets.filter((bet) => {
    const categoryMatch = selectedCategory === 'all' || bet.category === selectedCategory;
    const statusMatch = selectedStatus === 'all' || bet.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  const handleJoinBet = async (betId: string) => {
    try {
      await joinBetMutation.mutateAsync(betId);
    } catch (error) {
      console.error('Failed to join bet:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Bets</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          aria-label="Create Bet"
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Bet
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Categories</option>
            <option value="sports">Sports</option>
            <option value="entertainment">Entertainment</option>
            <option value="politics">Politics</option>
            <option value="custom">Custom</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBets.map((bet) => (
            <BetCard
              key={bet.id}
              bet={bet}
              onClick={() => handleJoinBet(bet.id)}
            />
          ))}
        </div>
      </div>

      <CreateBetModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}