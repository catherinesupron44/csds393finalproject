import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Settings, Home, Users, User, DollarSign, MessageSquare } from "lucide-react"

export default function Component() {
  const [activeTab, setActiveTab] = useState("history")

  const activities = [
    "Made your first bet!",
    "Joined your first group!",
    "Won a bet!",
    "Placed a new bet",
    "Invited a friend",
    "Reached level 5"
  ]

  return (
    <div className="max-w-md mx-auto bg-background text-foreground p-4 relative min-h-screen sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <Button variant="ghost" size="icon">
          <Settings className="h-6 w-6" />
        </Button>
        <div className="font-semibold">$200</div>
      </div>

      <div className="text-center mb-6 sm:flex sm:items-center sm:text-left">
        <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-2 overflow-hidden sm:mr-4 sm:mb-0">
          <img src="/placeholder.svg?height=96&width=96" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">Jane Doe</h1>
          <p className="text-sm text-muted-foreground sm:text-base">@jane.doe.bets</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
        </TabsList>
        <TabsContent value="history">
          <ScrollArea className="h-[200px] w-full rounded-md border p-4 sm:h-[300px] md:h-[400px]">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-center mb-2">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                <p className="text-sm sm:text-base">{activity}</p>
              </div>
            ))}
          </ScrollArea>
        </TabsContent>
        <TabsContent value="stats">
          <div className="p-4 border rounded-md">
            <h3 className="font-semibold mb-2">Your Betting Stats</h3>
            <ul className="space-y-2">
              <li>Total Bets: 42</li>
              <li>Win Rate: 65%</li>
              <li>Favorite Category: Sports</li>
              <li>Biggest Win: $500</li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="badges">
          <div className="grid grid-cols-3 gap-4">
            {['Newcomer', 'Big Winner', 'Group Master', 'Streak King', 'Risk Taker', 'Analyst'].map((badge) => (
              <div key={badge} className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2"></div>
                <p className="text-sm">{badge}</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t flex justify-around py-2 sm:relative sm:mt-8 sm:border-t-0">
        <Button variant="ghost" className="flex flex-col items-center sm:flex-row sm:justify-start">
          <Home className="h-6 w-6 sm:mr-2" />
          <span className="text-xs sm:text-sm">Home</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center sm:flex-row sm:justify-start">
          <Users className="h-6 w-6 sm:mr-2" />
          <span className="text-xs sm:text-sm">Groups</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center sm:flex-row sm:justify-start">
          <User className="h-6 w-6 sm:mr-2" />
          <span className="text-xs sm:text-sm">Profile</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center sm:flex-row sm:justify-start">
          <DollarSign className="h-6 w-6 sm:mr-2" />
          <span className="text-xs sm:text-sm">Bet</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center sm:flex-row sm:justify-start">
          <MessageSquare className="h-6 w-6 sm:mr-2" />
          <span className="text-xs sm:text-sm">Feed</span>
        </Button>
      </nav>
    </div>
  )
}
