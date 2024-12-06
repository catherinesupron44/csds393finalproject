import { useState } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { placeBet } from '../api';

const MarketTile = ({ title, description, sides, odds, id }) => {
  const [selectedSide, setSelectedSide] = useState(null);
  const [selectedOdds, setSelectedOdds] = useState(null);
  const [stake, setStake] = useState('');
  const [message, setMessage] = useState('');

  const handleSideClick = (side, sOdds) => {
    setSelectedSide(side);
    setSelectedOdds(sOdds);
  };

  const onSubmit = async () => {
    try {
      // Get current user
      const user = await getCurrentUser();
      
      if (!user) {
        setMessage('User not authenticated');
        return;
      }

      const userId = user.userId;

      // Place bet
      const response = await placeBet(userId, id, selectedSide, selectedOdds, stake);
      setMessage(`Bet created with ID: ${response.data.market_id}`);
    } catch (error) {
      console.error(error);
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
    return line > 0 ? `+${line}` : line;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {sides &&
          Object.entries(sides).map(([key, value], index) => (
            <div key={index} className="text-center">
              <button
                className={`w-full px-4 py-3 rounded text-white text-center ${
                  selectedSide === value ? 'bg-indigo-900' : 'bg-indigo-500'
                } hover:bg-indigo-600`}
                onClick={() => handleSideClick(value, odds?.[key])}
              >
                {handleLine(odds?.[key]) || 'N/A'}
              </button>
              <p className="font-bold text-gray-800 mt-2">{String(value)}</p> {/* Explicitly convert value to string */}
            </div>
          ))}
      </div>

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

      <button
        className="w-full mt-6 px-6 py-3 bg-black text-white rounded hover:bg-gray-800"
        onClick={onSubmit}
        disabled={!selectedSide || !stake}
      >
        Submit Bet
      </button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default MarketTile;
