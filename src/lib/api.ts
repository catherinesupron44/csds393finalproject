import { Bet } from "../components/BetCard";  // Import Bet interface

// Types
export interface CreateBetData {
  title: string;
  description: string;
  endDate: string;
  stake: number;
  market_info: {
    name: string;
    description: string;
    closing_date: string;
  };
  status: 'active' | 'pending' | 'completed' | 'expired';
  side: string;
  amount: number;
  category: string;
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
    amount: 100,
    side: 'Kansas City Chiefs',
    market_info: {
      name: 'Super Bowl LVIII',
      description: 'Kansas City Chiefs vs San Francisco 49ers',
      closing_date: '2024-02-11T23:59:59Z'
    },
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
      id: String(Date.now()),  // Generate a unique ID based on timestamp
      ...data,
      participants: 1,
    };
    bets = [...bets, newBet];  // Add the new bet to the mock database
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
  }
};
