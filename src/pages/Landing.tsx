import { Trophy, Users, Medal } from 'lucide-react';

interface LandingProps {
  onGetStarted: () => void;
}

export default function Landing({ onGetStarted }: LandingProps) {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-5xl font-bold text-indigo-900 mb-6">
        Welcome to BetBuddy
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Track friendly bets, compete with friends, and climb the leaderboard - all without real money stakes!
      </p>
      <button
        onClick={onGetStarted}
        className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
      >
        Get Started
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <FeatureCard 
          icon={<Trophy className="w-8 h-8 text-indigo-600" />}
          title="Compete & Win"
          description="Create custom bets and challenge your friends in various categories"
        />
        <FeatureCard 
          icon={<Users className="w-8 h-8 text-indigo-600" />}
          title="Join Groups"
          description="Create or join betting groups based on your interests"
        />
        <FeatureCard 
          icon={<Medal className="w-8 h-8 text-indigo-600" />}
          title="Earn Badges"
          description="Unlock achievements and climb the global leaderboard"
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}