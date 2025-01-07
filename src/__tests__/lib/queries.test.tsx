import { renderHook, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useBets, useCreateBet} from '../../lib/queries';
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


  describe('useCreateBet', () => {
    it('creates bet successfully', async () => {
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
      
      const mockResponse = { id: '1', ...newBet };
      (api.createBet as jest.Mock).mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useCreateBet(), { wrapper });

      await result.current.mutateAsync(newBet);

      expect(api.createBet).toHaveBeenCalledWith(newBet);
    });
  });
});