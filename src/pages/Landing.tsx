import { Trophy, Users, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getCurrentUser } from 'aws-amplify/auth'; // Assuming you're using AWS Amplify for authentication

interface LandingProps {
  onGetStarted: () => void;
}

export default function Landing({ onGetStarted }: LandingProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in
  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await getCurrentUser(); // Check if user is logged in
        if (user) {
          setIsLoggedIn(true); // User is logged in
        } else {
          setIsLoggedIn(false); // User is not logged in
        }
      } catch (error) {
        setIsLoggedIn(false); // User is not logged in
      }
    };

    checkUser();
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-5xl font-bold text-indigo-900 mb-6">
        Welcome to BetBuddy
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Track friendly bets and compete with friends - all without real money stakes!
      </p>

      {/* Conditionally render the Get Started button */}
      {!isLoggedIn && (
        <button
          onClick={onGetStarted}
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Get Started
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <FeatureCard 
          icon={<Trophy className="w-8 h-8 text-indigo-600" />}
          title="Track Your Wins"
          description="Effortlessly track your winnings and losses as you rise to the top."
        />
        <FeatureCard 
          icon={<Users className="w-8 h-8 text-indigo-600" />}
          title="Join Exciting Markets"
          description="Get in on the action by creating or joining markets that match your interests."
        />
        <FeatureCard 
          icon={<Star className="w-8 h-8 text-indigo-600" />}
          title="Bet, Compete & Win"
          description="Challenge friends, place your bets, and prove you’ve got the best instincts."
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
