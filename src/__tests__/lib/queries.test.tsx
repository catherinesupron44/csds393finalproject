import { renderHook, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useBets, useGroups, useCreateBet, useCreateGroup } from '../../lib/queries';
import { api } from '../../lib/api';

jest.mock('../../lib/api');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('Query Hooks', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  describe('useBets', () => {
    it('fetches bets successfully', async () => {
      const mockBets = [{ id: '1', title: 'Test Bet' }];
      (api.getBets as jest.Mock).mockResolvedValueOnce(mockBets);

      const { result } = renderHook(() => useBets(), { wrapper });

      await waitFor(() => {
        expect(result.current.data).toEqual(mockBets);
      });
    });
  });

  describe('useGroups', () => {
    it('fetches groups successfully', async () => {
      const mockGroups = [{ id: '1', name: 'Test Group' }];
      (api.getGroups as jest.Mock).mockResolvedValueOnce(mockGroups);

      const { result } = renderHook(() => useGroups(), { wrapper });

      await waitFor(() => {
        expect(result.current.data).toEqual(mockGroups);
      });
    });
  });

  describe('useCreateBet', () => {
    it('creates bet successfully', async () => {
      const newBet = {
        title: 'New Bet',
        description: 'Description',
        endDate: '2024-03-01',
        stake: 100,
        category: 'sports'
      };
      
      const mockResponse = { id: '1', ...newBet };
      (api.createBet as jest.Mock).mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useCreateBet(), { wrapper });

      await result.current.mutateAsync(newBet);

      expect(api.createBet).toHaveBeenCalledWith(newBet);
    });
  });

  describe('useCreateGroup', () => {
    it('creates group successfully', async () => {
      const newGroup = {
        name: 'New Group',
        description: 'Description',
        category: 'sports',
        isPrivate: false
      };
      
      const mockResponse = { id: '1', ...newGroup };
      (api.createGroup as jest.Mock).mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useCreateGroup(), { wrapper });

      await result.current.mutateAsync(newGroup);

      expect(api.createGroup).toHaveBeenCalledWith(newGroup);
    });
  });
});