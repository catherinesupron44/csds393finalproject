import { api } from '../../lib/api';
import '@testing-library/jest-dom';

describe('API', () => {
  describe('getBets', () => {
    it('returns array of bets', async () => {
      const bets = await api.getBets();
      expect(Array.isArray(bets)).toBe(true);
      expect(bets[0]).toHaveProperty('id');
      expect(bets[0]).toHaveProperty('title');
    });
  });

  describe('createBet', () => {
    it('creates a new bet', async () => {
      const newBet = await api.createBet({
        title: 'Test Bet',
        description: 'This is a test description for the bet.',
        endDate: '2024-12-31T23:59:59Z',
        stake: 50,
        market_info: {
          name: 'Test Market',
          description: 'Test Description',
          closing_date: '2024-12-31T23:59:59Z',
        },
        status: 'active',
        side: 'Test Side',
        amount: 100,
        category: 'Sports',
      });
      
      expect(newBet).toHaveProperty('id');
      expect(newBet.title).toBe('Test Bet');
      expect(newBet.status).toBe('active');
    });
  })})