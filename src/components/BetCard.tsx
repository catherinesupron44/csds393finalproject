import { Trophy, Clock, Users } from 'lucide-react';

export interface Bet {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'pending' | 'completed' | 'expired';
  endDate: string;
  participants: number;
  stake: number;
  category: string;
  amount: number;
  side: string;

  // Nested market_info object
  market_info: {
    name: string;
    description: string;
    closing_date: string;
  };
}

interface BetCardProps {
  bet: Bet;
  onClick?: () => void;
}

export default function BetCard({ bet, onClick }: BetCardProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-blue-100 text-blue-800',
    expired: 'bg-red-100 text-red-800',
  };

<<<<<<< Updated upstream
=======
  // Explicitly type datetime as a string or Date
  const formatDateTime = (datetime: string | Date) => {
    const date = new Date(datetime);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return date.toLocaleDateString('en-US', options);
  };

>>>>>>> Stashed changes
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
      data-testid="bet-card"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{bet.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{bet.description}</p>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[bet.status]}`}
        >
          {bet.status.charAt(0).toUpperCase() + bet.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span className="text-sm">{bet.endDate}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Users className="w-4 h-4 mr-2" />
          <span className="text-sm">{bet.participants} joined</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Trophy className="w-4 h-4 mr-2" />
          <span className="text-sm">{bet.stake} coins</span>
        </div>
      </div>

      <div className="flex items-center mt-4">
        <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded-full">
          {bet.category}
        </span>
      </div>
    </div>
  );
}
