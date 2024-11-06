import { useState } from 'react';
import { Trophy, Medal, Search, Filter } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  winRate: number;
  totalBets: number;
  coins: number;
  badges: string[];
}

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    username: "BetMaster",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=BetMaster",
    winRate: 78,
    totalBets: 245,
    coins: 15000,
    badges: ["champion", "streak_master", "early_adopter"]
  },
  {
    rank: 2,
    username: "LuckyPro",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=LuckyPro",
    winRate: 72,
    totalBets: 189,
    coins: 12500,
    badges: ["high_roller", "consistent"]
  },
  {
    rank: 3,
    username: "PredictionKing",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PredictionKing",
    winRate: 70,
    totalBets: 203,
    coins: 11000,
    badges: ["analyst", "streak_master"]
  }
];

export default function Leaderboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFrame, setTimeFrame] = useState('all');

  const filteredLeaderboard = MOCK_LEADERBOARD.filter(entry =>
    entry.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Global Leaderboard</h1>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={timeFrame}
                onChange={(e) => setTimeFrame(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Time</option>
                <option value="month">This Month</option>
                <option value="week">This Week</option>
                <option value="day">Today</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Rank</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">User</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Win Rate</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Total Bets</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Coins</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Badges</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaderboard.map((entry) => (
                <tr key={entry.rank} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      {entry.rank === 1 ? (
                        <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
                      ) : entry.rank === 2 ? (
                        <Medal className="w-5 h-5 text-gray-400 mr-2" />
                      ) : entry.rank === 3 ? (
                        <Medal className="w-5 h-5 text-amber-600 mr-2" />
                      ) : (
                        <span className="w-5 mr-2">{entry.rank}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <img
                        src={entry.avatar}
                        alt={entry.username}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <span className="font-medium">{entry.username}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-green-600 font-medium">{entry.winRate}%</span>
                  </td>
                  <td className="px-4 py-4">{entry.totalBets}</td>
                  <td className="px-4 py-4">{entry.coins.toLocaleString()}</td>
                  <td className="px-4 py-4">
                    <div className="flex gap-1">
                      {entry.badges.map((badge) => (
                        <span
                          key={badge}
                          className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full"
                        >
                          {badge.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}