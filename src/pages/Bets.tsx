import { useState, useEffect} from 'react';
import { Plus, Filter } from 'lucide-react';
import BetCard from '../components/BetCard';
import { getCurrentUser } from 'aws-amplify/auth';
import { getActiveBets } from '../api';

export default function Bets() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [bets, setBets] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchMyMarkets = async () => {
      try {
        const user = await getCurrentUser();
        const response = await getActiveBets(user.userId);
        console.log('API Response:', response);

        if (Array.isArray(response.data)) {
          setBets(response.data);
        } else if (response.data && typeof response.data === 'object') {
          setBets(Object.values(response.data));
        } else {
          setMessage('Invalid data format');
        }
      } catch (error) {
        console.error('Error fetching active markets:', error);
        setMessage('Error fetching active markets');
      }

      setLoading(false);
    };

    fetchMyMarkets();
  }, []);

  const filteredBets = bets.filter((bet) => {
    const statusMatch = selectedStatus === 'all' || bet.status === selectedStatus;
    return statusMatch;
  });

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
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
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
              key={bet.bet_id}
              bet={bet}
            />
          ))}
        </div>
      </div>
    </div>
  );
}