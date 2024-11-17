import { Trophy, Users, PlusCircle, History } from 'lucide-react';
import Navbar from '../components/Navbar.tsx';
import GetActiveBets from "../components/GetActiveBets.jsx";

export default function Dashboard() {

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Trophy className="w-6 h-6 text-green-600" />}
          title="Win Rate"
          value="68%"
          trend="+5% this month"
        />
        <StatCard
          icon={<Users className="w-6 h-6 text-blue-600" />}
          title="Active Groups"
          value= "1"
          trend="2 new this week"
        />
        <StatCard
          icon={<PlusCircle className="w-6 h-6 text-purple-600" />}
          title="Active Bets"
          value="12"
          trend="3 pending results"
        />
        <StatCard
          icon={<History className="w-6 h-6 text-orange-600" />}
          title="Total Bets"
          value="156"
          trend="Won 98"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Active Bets</h2>
              <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              <GetActiveBets />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Groups</h2>
              <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((group) => (
                <GroupCard key={group} />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((activity) => (
                <ActivityItem key={activity} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, trend }: {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-gray-100 rounded-lg">{icon}</div>
      </div>
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
      <p className="text-sm text-gray-500 mt-2">{trend}</p>
    </div>
  );
}

function BetCard() {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">Super Bowl LVIII Winner</h3>
          <p className="text-sm text-gray-600 mt-1">Kansas City Chiefs vs San Francisco 49ers</p>
        </div>
        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Active</span>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">Ends in 2 days</span>
        <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          View Details
        </button>
      </div>
    </div>
  );
}

function GroupCard() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <Users className="w-5 h-5 text-gray-600" />
        </div>
        <div className="ml-3">
          <h3 className="font-medium">Sports Enthusiasts</h3>
          <p className="text-sm text-gray-500">24 members</p>
        </div>
      </div>
      <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
        View
      </button>
    </div>
  );
}

function ActivityItem() {
  return (
    <div className="flex items-start">
      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
        <Trophy className="w-4 h-4 text-indigo-600" />
      </div>
      <div className="ml-3">
        <p className="text-sm">
          <span className="font-medium">John Doe</span> won a bet on{' '}
          <span className="font-medium">NBA Finals MVP</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
      </div>
    </div>
  );
}