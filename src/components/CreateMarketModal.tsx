import { useState } from 'react';
import { X } from 'lucide-react';
import { useCreateBet } from '../lib/queries';
import { createMarket } from '../api';

interface CreateMarketModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
}

export default function CreateMarketModal({
  isOpen,
  onClose,
  currentUser,
}: CreateMarketModalProps) {
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

  const handleCreateMarket = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure the odds are properly parsed as numbers and avoid concatenation
    const parsedSideOneOdds = parseFloat(sideOneOdds.toString());
    const parsedSideTwoOdds = parseFloat(sideTwoOdds.toString());

    // Validate the odds are valid numbers before proceeding
    if (isNaN(parsedSideOneOdds) || isNaN(parsedSideTwoOdds)) {
      console.error('Invalid odds values');
      return;
    }

    const sides = { sideOne, sideTwo };
    const odds = { sideOne: parsedSideOneOdds, sideTwo: parsedSideTwoOdds };

    try {
      await createMarket(
        currentUser.userId,
        title,
        description,
        sides,
        odds,
        closing_date
      );
      onClose();
      // Reset form after submission
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
      console.error('Error creating market:', error);
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

        <form onSubmit={handleCreateMarket} className="space-y-4">
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
            <label htmlFor="sideOne" className="block text-sm font-medium text-gray-700 mb-1">
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
            <label htmlFor="sideOneOdds" className="block text-sm font-medium text-gray-700 mb-1">
              Side 1 Odds
            </label>
            <input
              id="sideOneOdds"
              type="number"
              value={sideOneOdds}
              onChange={(e) => setSideOneOdds(parseFloat(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="sideTwo" className="block text-sm font-medium text-gray-700 mb-1">
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
            <label htmlFor="sideTwoOdds" className="block text-sm font-medium text-gray-700 mb-1">
              Side 2 Odds
            </label>
            <input
              id="sideTwoOdds"
              type="number"
              value={sideTwoOdds}
              onChange={(e) => setSideTwoOdds(parseFloat(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
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
