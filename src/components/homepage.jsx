import React from 'react';
import Link from 'next/link'
import { Home, Users, TrendingUp, User, DollarSign } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
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

      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t flex justify-around py-2">
        <Link href="/" className="flex flex-col items-center">
          <Button variant="ghost" size="sm" className="h-12 px-0">
            <Home className="h-6 w-6" />
          </Button>
          <span className="text-xs">Home</span>
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
        <Link href="/profile" className="flex flex-col items-center">
          <Button variant="ghost" size="sm" className="h-12 px-0">
            <User className="h-6 w-6" />
          </Button>
          <span className="text-xs">Profile</span>
        </Link>
      </nav>
    </div>
  )
}
