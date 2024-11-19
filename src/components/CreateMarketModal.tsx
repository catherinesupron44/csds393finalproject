import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useCreateBet } from '../lib/queries';
import { createMarket } from '../api';

interface CreateMarketModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: any
}

export default function CreateMarketModal({ isOpen, onClose, userId }: CreateMarketModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [closing_date, setEndDate] = useState('');
  const [stake, setStake] = useState('');
  const [category, setCategory] = useState('sports');
  const [sideOne, setSideOne] = useState('');
  const [sideTwo, setSideTwo] = useState('');
  const [sideOneOdds, setSideOneOdds] = useState(100);
  const [sideTwoOdds, setSideTwoOdds] = useState(100);


  const createBetMutation = useCreateBet();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBetMutation.mutateAsync({
        title,
        description,
        closing_date,
        stake: parseInt(stake),
        category,
      });
      onClose();
      // Reset form
      setTitle('');
      setDescription('');
      setEndDate('');
      setStake('');
      setCategory('sports');
      setSideOne('');
      setSideTwo('');
      setSideOneOdds(100);
      setSideTwoOdds(100);
    } catch (error) {
      console.error('Failed to create bet:', error);
    }
  };

  const handleCreateMarket = async () => {
    try {
      const sides = {'sideOne' : sideOne, 'sideTwo' : sideTwo};
      const odds = {'sideOne' : sideOneOdds, 'sideTwo' : sideTwoOdds}
      const response = await createMarket(userId, title, description, sides, odds, closing_date);
      console.log(response);
      //console.log(`Market created with ID: ${response.data.market_id}`);
    } catch (error) {
      console.log(error);
      console.log('Error creating market');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">Create New Market</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows={3}
              required
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              id="endDate"
              type="datetime-local"
              value={closing_date}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Side 1
            </label>
            <input
              id="sideOne"
              type="text"
              value={sideOne}
              onChange={(e) => setSideOne(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Side 1 Odds
            </label>
            <input
              id="sideOneOdds"
              type="int"
              value={sideOneOdds}
              onChange={(e) => setSideOneOdds(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Side 2
            </label>
            <input
              id="sideTwo"
              type="text"
              value={sideTwo}
              onChange={(e) => setSideTwo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Side 2 Odds
            </label>
            <input
              id="sideTwoOdds"
              type="int"
              value={sideTwoOdds}
              onChange={(e) => setSideTwoOdds(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            onClick={handleCreateMarket}
            disabled={createBetMutation.isPending}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
          >
            {createBetMutation.isPending ? 'Creating...' : 'Create Market'}
          </button>
        </form>
      </div>
    </div>
  );
}
