import { Users, Trophy, Calendar } from 'lucide-react';

export interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  activeBets: number;
  category: string;
  lastActivity: string;
  image?: string;
}

interface GroupCardProps {
  group: Group;
  onClick?: () => void;
}

export default function GroupCard({ group, onClick }: GroupCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
          <Users className="w-8 h-8" />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900">{group.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{group.description}</p>
            </div>
            <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded-full">
              {group.category}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-2" />
              <span className="text-sm">{group.memberCount} members</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Trophy className="w-4 h-4 mr-2" />
              <span className="text-sm">{group.activeBets} active</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">{group.lastActivity}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}