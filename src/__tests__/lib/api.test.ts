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
        description: 'Test Description',
        endDate: '2024-11-15',
        stake: 100,
        category: 'sports'
      });
      
      expect(newBet).toHaveProperty('id');
      expect(newBet.title).toBe('Test Bet');
      expect(newBet.status).toBe('active');
    });
  });

  describe('getGroups', () => {
    it('returns array of groups', async () => {
      const groups = await api.getGroups();
      expect(Array.isArray(groups)).toBe(true);
      expect(groups[0]).toHaveProperty('id');
      expect(groups[0]).toHaveProperty('name');
    });
  });

  describe('createGroup', () => {
    it('creates a new group', async () => {
      const newGroup = await api.createGroup({
        name: 'Test Group',
        description: 'Test Description',
        category: 'sports',
        isPrivate: false
      });
      
      expect(newGroup).toHaveProperty('id');
      expect(newGroup.name).toBe('Test Group');
      expect(newGroup.memberCount).toBe(1);
    });
  });
});