import { Bet } from '../components/BetCard';
import { Group } from '../components/GroupCard';

// Types
export interface CreateBetData {
  title: string;
  description: string;
  endDate: string;
  stake: number;
  category: string;
}

export interface CreateGroupData {
  name: string;
  description: string;
  category: string;
  isPrivate: boolean;
}

// Mock database
let bets: Bet[] = [
  {
    id: '1',
    title: 'Super Bowl LVIII Winner',
    description: 'Kansas City Chiefs vs San Francisco 49ers',
    status: 'active',
    endDate: '2024-02-11',
    participants: 8,
    stake: 100,
    category: 'sports',
  }
];

let groups: Group[] = [
  {
    id: '1',
    name: 'Sports Enthusiasts',
    description: 'A group for discussing and betting on major sporting events',
    memberCount: 24,
    activeBets: 8,
    category: 'sports',
    lastActivity: '2h ago',
  }
];

// Helper function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API functions
export const api = {
  // Bets
  async getBets(): Promise<Bet[]> {
    await delay(500);
    return bets;
  },

  async createBet(data: CreateBetData): Promise<Bet> {
    await delay(500);
    const newBet: Bet = {
      id: String(Date.now()),
      ...data,
      status: 'active',
      participants: 1,
    };
    bets = [...bets, newBet];
    return newBet;
  },

  async joinBet(betId: string): Promise<Bet> {
    await delay(500);
    bets = bets.map(bet => 
      bet.id === betId 
        ? { ...bet, participants: bet.participants + 1 }
        : bet
    );
    return bets.find(bet => bet.id === betId)!;
  },

  // Groups
  async getGroups(): Promise<Group[]> {
    await delay(500);
    return groups;
  },

  async createGroup(data: CreateGroupData): Promise<Group> {
    await delay(500);
    const newGroup: Group = {
      id: String(Date.now()),
      ...data,
      name: data.name,
      memberCount: 1,
      activeBets: 0,
      lastActivity: 'Just now',
    };
    groups = [...groups, newGroup];
    return newGroup;
  },

  async joinGroup(groupId: string): Promise<Group> {
    await delay(500);
    groups = groups.map(group =>
      group.id === groupId
        ? { ...group, memberCount: group.memberCount + 1, lastActivity: 'Just now' }
        : group
    );
    return groups.find(group => group.id === groupId)!;
  },
};