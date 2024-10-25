import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Home, Users, TrendingUp, User, DollarSign } from 'lucide-react';
import { getCurrentUser, fetchUserAttributes, signOut } from "aws-amplify/auth";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import '../pages/homepage.css';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      console.log(err);
    }
  };

  fetchCurrentUser();

  const handleSignOut = async () => {
    try {
      await signOut();
      console.log('success');
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  //hard coded need to change
  const balance = 1000
  const bets = [
    { id: 'A', name: 'Bet A', odds: '1.5' },
    { id: 'B', name: 'Bet B', odds: '2.0' },
    { id: 'C', name: 'Bet C', odds: '3.2' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">${balance.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Markets</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {bets.map((bet) => (
                <li key={bet.id} className="flex justify-between items-center p-2 bg-muted rounded-lg">
                  <span className="font-medium">{bet.name}</span>
                  <span className="text-muted-foreground">Odds: {bet.odds}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>
      <nav className="navigation">
        <Link 
          to="/home" 
          className={`navItem ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <Home size={24} />
          <span>Home</span>
        </Link>
        <Link href="/friends" className="flex flex-col items-center">
          <Button variant="ghost" size="sm" className="h-12 px-0">
            <Users className="h-6 w-6" />
          </Button>
          <span className="text-xs">Friends</span>
        </Link>
        <Link href="/markets" className="flex flex-col items-center">
          <Button variant="ghost" size="sm" className="h-12 px-0">
            <TrendingUp className="h-6 w-6" />
          </Button>
          <span className="text-xs">Markets</span>
        </Link>
        <Link href="/wallet" className="flex flex-col items-center">
          <Button variant="ghost" size="sm" className="h-12 px-0">
            <DollarSign className="h-6 w-6" />
          </Button>
          <span className="text-xs">Wallet</span>
        </Link>
        <Link 
          to="/profile" 
          className={`navItem ${activeTab === '' ? 'active' : ''}`}
          onClick={handleSignOut}
        >
          <User size={24} />
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  )
}
