import { useState } from 'react';
import { useAuthStore } from '../lib/store';
import { Trophy, Award, History, Edit2, Mail, Key, Shield, Bell } from 'lucide-react';

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
];

const MOCK_PREFERENCES = {
  emailNotifications: true,
  pushNotifications: false,
  privateProfile: true,
  twoFactorAuth: false
};

export default function Profile() {
  const { profile, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(profile?.username || '');
  const [activeTab, setActiveTab] = useState<'overview' | 'settings'>('overview');
  const [preferences, setPreferences] = useState(MOCK_PREFERENCES);

  if (!profile) return null;

  const handleSaveProfile = () => {
    updateProfile({ username: editedUsername });
    setIsEditing(false);
  };

  const handlePreferenceChange = (key: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <img
              src={profile.profileIcon}
              alt={profile.username}
              className="w-32 h-32 rounded-full"
            />
            <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700">
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 text-center md:text-left">
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
              <div className="flex items-center justify-center md:justify-start mb-2">
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
            
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-indigo-600">{profile.coins}</p>
              <p className="text-sm text-gray-600">Coins</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-indigo-600">{profile.groupIds.length}</p>
              <p className="text-sm text-gray-600">Groups</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center md:justify-start mt-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 border-b-2 ${
              activeTab === 'overview'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 border-b-2 ${
              activeTab === 'settings'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Settings
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Statistics */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Statistics</h3>
              <div className="space-y-4">
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
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
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
                     
                    `}>
                      {activity.type === 'win' && <Trophy className="w-4 h-4 text-green-600" />}
                      {activity.type === 'join' && <Award className="w-4 h-4 text-blue-600" />}
                      
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
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-6">Account Settings</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Mail className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-gray-500">Receive email updates about your activity</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.emailNotifications}
                  onChange={() => handlePreferenceChange('emailNotifications')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Bell className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-medium">Push Notifications</h4>
                  <p className="text-sm text-gray-500">Receive push notifications in your browser</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.pushNotifications}
                  onChange={() => handlePreferenceChange('pushNotifications')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Shield className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-medium">Private Profile</h4>
                  <p className="text-sm text-gray-500">Make your profile private to other users</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.privateProfile}
                  onChange={() => handlePreferenceChange('privateProfile')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Key className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.twoFactorAuth}
                  onChange={() => handlePreferenceChange('twoFactorAuth')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, title, value }: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center space-x-3">
      <div className="p-2 bg-gray-50 rounded-lg">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}