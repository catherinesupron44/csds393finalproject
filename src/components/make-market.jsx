import React from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Home, Users, User, DollarSign, MessageSquare } from "lucide-react"

function Component() {
  const [visibility, setVisibility] = React.useState(false)

  return (
    <div className="max-w-md mx-auto bg-background text-foreground p-4 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Make a Market</h1>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
          <Input id="name" placeholder="Market name" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
          <Textarea id="description" placeholder="Market description" />
        </div>
        <div>
          <label htmlFor="sides" className="block text-sm font-medium mb-1">Sides</label>
          <Textarea id="sides" placeholder="Enter market sides" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="odds" className="block text-sm font-medium mb-1">Odds</label>
            <Input id="odds" placeholder="Enter odds" />
          </div>
          <div>
            <label htmlFor="closes" className="block text-sm font-medium mb-1">Closes</label>
            <Input id="closes" type="datetime-local" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="visibility" className="text-sm font-medium">Visibility</label>
          <Switch
            id="visibility"
            checked={visibility}
            onCheckedChange={setVisibility}
          />
        </div>
        <Button className="w-full bg-red-500 hover:bg-red-600 text-white">CREATE</Button>
      </form>
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t flex justify-around py-2">
        <Button variant="ghost" className="flex flex-col items-center">
          <Home className="h-6 w-6" />
          <span className="text-xs">Home</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center">
          <Users className="h-6 w-6" />
          <span className="text-xs">Groups</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center">
          <User className="h-6 w-6" />
          <span className="text-xs">Profile</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center">
          <DollarSign className="h-6 w-6" />
          <span className="text-xs">Bet</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center">
          <MessageSquare className="h-6 w-6" />
          <span className="text-xs">Feed</span>
        </Button>
      </nav>
    </div>
  )
}

export default Component
