import { useState } from 'react';
import { useAuthStore } from '../lib/store';
import { Trophy, Award, History, Edit2 } from 'lucide-react';

const MOCK_RECENT_ACTIVITY = [
  {
    id: 1,
    type: 'win',
    description: 'Won bet on "Super Bowl LVIII Winner"',
    date: '2h ago',
    coins: 500
  },
  {
    id: 2,
    type: 'join',
    description: 'Joined group "Sports Enthusiasts"',
    date: '1d ago'
  },
  {
    id: 3,
    type: 'badge',
    description: 'Earned badge "Streak Master"',
    date: '2d ago'
  }
];

export default function Profile() {
  const { profile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(profile?.username || '');

  if (!profile) return null;

  const handleSaveProfile = () => {
    // TODO: Implement profile update
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center">
              <img
                src={profile.profileIcon}
                alt={profile.username}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              
              {isEditing ? (
                <div className="mb-4">
                  <input
                    type="text"
                    value={editedUsername}
                    onChange={(e) => setEditedUsername(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center mb-4">
                  <h2 className="text-2xl font-bold">{profile.username}</h2>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              <p className="text-gray-600 mb-4">{profile.email}</p>
              
              <div className="flex justify-center space-x-2">
                {profile.badges.map((badge) => (
                  <span
                    key={badge}
                    className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                  >
                    {badge.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-600">{profile.coins}</p>
                  <p className="text-sm text-gray-600">Coins</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-600">{profile.groupIds.length}</p>
                  <p className="text-sm text-gray-600">Groups</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats and Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                icon={<Trophy className="w-6 h-6 text-green-600" />}
                title="Win Rate"
                value="68%"
              />
              <StatCard
                icon={<Award className="w-6 h-6 text-blue-600" />}
                title="Total Wins"
                value="98"
              />
              <StatCard
                icon={<History className="w-6 h-6 text-purple-600" />}
                title="Total Bets"
                value="156"
              />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {MOCK_RECENT_ACTIVITY.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 border-b border-gray-100 last:border-0 pb-4 last:pb-0"
                >
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    ${activity.type === 'win' ? 'bg-green-100' : ''}
                    ${activity.type === 'join' ? 'bg-blue-100' : ''}
                    ${activity.type === 'badge' ? 'bg-purple-100' : ''}
                  `}>
                    {activity.type === 'win' && <Trophy className="w-4 h-4 text-green-600" />}
                    {activity.type === 'join' && <Users className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'badge' && <Award className="w-4 h-4 text-purple-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                  </div>
                  {activity.coins && (
                    <span className="text-sm font-medium text-green-600">+{activity.coins} coins</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center space-x-3">
        {icon}
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}