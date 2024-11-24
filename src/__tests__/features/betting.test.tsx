import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import App from '../../App';
import { useAuthStore } from '../../lib/store';
import { api } from '../../lib/api';

jest.mock('../../lib/api');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

describe('Betting Functionality', () => {
  beforeEach(() => {
    queryClient.clear();
    useAuthStore.getState().login('test@example.com', 'password123');
  });

  it('creates a new bet', async () => {
    const mockNewBet = {
      id: '123',
      title: 'Test Bet',
      description: 'Test Description',
      status: 'active',
      endDate: '2024-03-01',
      participants: 1,
      stake: 100,
      category: 'sports'
    };

    (api.createBet as jest.Mock).mockResolvedValueOnce(mockNewBet);
    
    renderWithProviders(<App />);
    
    // Navigate to bets page
    await userEvent.click(screen.getByText('My Bets'));
    
    // Open create bet modal
    await userEvent.click(screen.getByText('Create Bet'));
    
    // Fill in bet details
    await userEvent.type(screen.getByLabelText('Title'), 'Test Bet 1');
    await userEvent.type(screen.getByLabelText('Description'), 'Test Description');
    await userEvent.type(screen.getByLabelText('End Date'), '2024-03-01T12:00');
    await userEvent.type(screen.getByLabelText('Stake (coins)'), '100');
    await userEvent.selectOptions(screen.getByLabelText('Category'), 'sports');
    
    // Submit form
    await userEvent.click(screen.getByRole('button', { name: 'Create Bet' }));
    
    // Verify bet was created
    await waitFor(() => {
      expect(api.createBet).toHaveBeenCalledWith({
        title: 'Test Bet',
        description: 'Test Description',
        endDate: '2024-03-01T12:00',
        stake: 100,
        category: 'sports'
      });
    });
  });

  it('joins an existing bet', async () => {
    const mockBet = {
      id: '123',
      title: 'Existing Bet',
      description: 'Test Description',
      status: 'active',
      endDate: '2024-03-01',
      participants: 1,
      stake: 100,
      category: 'sports'
    };

    (api.getBets as jest.Mock).mockResolvedValueOnce([mockBet]);
    (api.joinBet as jest.Mock).mockResolvedValueOnce({
      ...mockBet,
      participants: 2
    });
    
    renderWithProviders(<App />);
    
    // Navigate to bets page
    await userEvent.click(screen.getByText('My Bets'));
    
    // Wait for bets to load
    await waitFor(() => {
      expect(screen.getByText('Existing Bet')).toBeInTheDocument();
    });
    
    // Click on bet to join
    await userEvent.click(screen.getByText('Existing Bet'));
    
    // Verify join bet was called
    expect(api.joinBet).toHaveBeenCalledWith('123');
  });
})