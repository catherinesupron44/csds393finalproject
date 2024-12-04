import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Bets from '../../pages/Bets';
import '@testing-library/jest-dom';
import { api } from '../../lib/api';

/**
 * @jest-environment node
 */

jest.mock('../../lib/api');

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const mockBets = [
  {
    id: '1',
    title: 'Test Bet 1',
    description: 'Description 1',
    status: 'active',
    endDate: '2024-03-01',
    participants: 5,
    stake: 100,
    category: 'sports'
  },
  {
    id: '2',
    title: 'Test Bet 2',
    description: 'Description 2',
    status: 'pending',
    endDate: '2024-03-02',
    participants: 3,
    stake: 50,
    category: 'entertainment'
  }
];

describe('Bets Page', () => {
  beforeEach(() => {
    (api.getBets as jest.Mock).mockResolvedValue(mockBets);
    queryClient.clear();
  });

  it('renders bets list', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Bets />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Bet 1')).toBeInTheDocument();
      expect(screen.getByText('Test Bet 2')).toBeInTheDocument();
    });
  });


  it('opens create bet modal', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Bets />
      </QueryClientProvider>
    );

    const createBetButton = await waitFor(() =>
        screen.getByRole('button', { name: /Create Bet/i })
      );
    
      await userEvent.click(createBetButton);
      expect(screen.getByText('Create New Bet')).toBeInTheDocument();
  });
});