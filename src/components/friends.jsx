import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Users, UserPlus, Trophy, Home, TrendingUp, User, DollarSign } from 'lucide-react';
import Link from "next/link"

export default function GroupsPage() {
  const [inGroup, setInGroup] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

//hard coded leaderboard data
  const leaderboardData = [
    { rank: 1, name: 'Catherine', points: 1000 },
    { rank: 2, name: 'Maddy', points: 950 },
    { rank: 3, name: 'Dale', points: 900 },
    { rank: 4, name: 'Amelia', points: 850 },
    { rank: 5, name: 'Cullen', points: 800 },
  ];

  const handleJoinGroup = () => {
    setInGroup(true);
    setShowJoinModal(false);
  };

  const handleCreateGroup = () => {
    setInGroup(true);
    setShowCreateModal(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Groups</h1>
        {!inGroup ? (
          <div className="space-y-4">
            <Dialog open={showJoinModal} onOpenChange={setShowJoinModal}>
              <DialogTrigger asChild>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Join a Group
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Join a Group</DialogTitle>
                </DialogHeader>
                <Input placeholder="Enter group code" className="mt-4" />
                <Button onClick={handleJoinGroup} className="mt-4">Join</Button>
              </DialogContent>
            </Dialog>
            <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
              <DialogTrigger asChild>
                <Button className="w-full justify-start" variant="outline">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create a Group
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a Group</DialogTitle>
                </DialogHeader>
                <Input placeholder="Enter group ID" className="mt-4" />
                <Button onClick={handleCreateGroup} className="mt-4">Create</Button>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Trophy className="mr-2 h-6 w-6" />
              Leaderboard
            </h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData.map((user) => (
                  <TableRow key={user.rank}>
                    <TableCell>{user.rank}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t flex justify-around py-2">
        <Link href="/" className="flex flex-col items-center">
          <Button variant="ghost" size="sm" className="h-12 px-0">
            <Home className="h-6 w-6" />
          </Button>
          <span className="text-xs">Home</span>
        </Link>
        <Link href="/groups" className="flex flex-col items-center">
          <Button variant="ghost" size="sm" className="h-12 px-0">
            <Users className="h-6 w-6" />
          </Button>
          <span className="text-xs">Groups</span>
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
