import { useState } from 'react';
import { X } from 'lucide-react';
import { useCreateBet } from '../lib/queries';

interface CreateBetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateBetModal({ isOpen, onClose }: CreateBetModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [endDate, setEndDate] = useState('');
  const [stake, setStake] = useState('');
  const [category, setCategory] = useState('sports');
  const [side, setSide] = useState('');  // New state for 'side'
  const [amount, setAmount] = useState('');  // New state for 'amount'

  const createBetMutation = useCreateBet();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create the market_info object
    const marketInfo = {
      name: 'Test Market',  // This could be derived from the form or a static value
      description: 'Test Description',  // This could be derived from the form or a static value
      closing_date: endDate,  // Using the form value
    };

    const status = 'active';  // Assuming a default status
    const betSide = side || 'Test Side';  // Using the 'side' from form or a default
    const betAmount = parseInt(amount, 10) || 0;  // Parsing amount from form

    try {
      await createBetMutation.mutateAsync({
        title,
        description,
        endDate,
        stake: parseInt(stake, 10),
        category,
        market_info: marketInfo,
        status,
        side: betSide,
        amount: betAmount,
      });
      onClose();
      // Reset form
      setTitle('');
      setDescription('');
      setEndDate('');
      setStake('');
      setCategory('sports');
      setSide('');
      setAmount('');
    } catch (error) {
      console.error('Failed to create bet:', error);
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

        <h2 className="text-2xl font-bold text-center mb-6">Create New Bet</h2>

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
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="stake" className="block text-sm font-medium text-gray-700 mb-1">
              Stake (coins)
            </label>
            <input
              id="stake"
              type="number"
              value={stake}
              onChange={(e) => setStake(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              min="1"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="sports">Sports</option>
              <option value="entertainment">Entertainment</option>
              <option value="politics">Politics</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          <div>
            <label htmlFor="side" className="block text-sm font-medium text-gray-700 mb-1">
              Side (Team/Choice)
            </label>
            <input
              id="side"
              type="text"
              value={side}
              onChange={(e) => setSide(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount (coins)
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              min="1"
              required
            />
          </div>

          <button
            type="submit"
            disabled={createBetMutation.isPending}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
          >
            {createBetMutation.isPending ? 'Creating...' : 'Create Bet'}
          </button>
        </form>
      </div>
    </div>
  );
}
