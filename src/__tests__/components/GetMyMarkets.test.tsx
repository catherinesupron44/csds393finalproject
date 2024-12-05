import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GetMyMarkets from '../../components/GetMyMarkets';
import { getMyMarkets, settleMarket } from '../../api';
import { getCurrentUser } from 'aws-amplify/auth';

// Mock dependencies
jest.mock('aws-amplify/auth', () => ({
  getCurrentUser: jest.fn()
}));

jest.mock('../../api', () => ({
  getMyMarkets: jest.fn(),
  settleMarket: jest.fn()
}));

// Create a query client for testing
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// Wrapper component for providing QueryClient
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

// Mock data for testing
const mockUser = {
  userId: 'user123'
};

const mockMarkets = [
  {
    market_id: 'market1',
    name: 'Test Market 1',
    description: 'First test market',
    sides: { sideOne: 'Team A', sideTwo: 'Team B' },
    odds: { sideOne: '1.5', sideTwo: '2.0' },
    settled: 'to be settled',
    closing_date: '2024-01-15T10:00:00Z'
  },
  {
    market_id: 'market2',
    name: 'Test Market 2',
    description: 'Second test market',
    sides: { sideOne: 'Option X', sideTwo: 'Option Y' },
    odds: { sideOne: '1.8', sideTwo: '2.2' },
    settled: false,
    closing_date: '2024-02-20T15:30:00Z'
  }
];

describe('GetMyMarkets Component', () => {
  // Set up common mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock successful user retrieval
    (getCurrentUser as jest.Mock).mockResolvedValue(mockUser);
  });

  const renderComponent = () => {
    return render(
      <TestWrapper>
        <GetMyMarkets />
      </TestWrapper>
    );
  };

  test('renders loading state initially', async () => {
    // Keep the markets fetch pending
    (getMyMarkets as jest.Mock).mockImplementation(() => new Promise(() => {}));

    renderComponent();

    // Check for loading message
    expect(screen.getByText(/Loading markets.../i)).toBeInTheDocument();
  });

  test('renders markets successfully', async () => {
    // Mock successful markets fetch
    (getMyMarkets as jest.Mock).mockResolvedValue({
      data: mockMarkets
    });

    renderComponent();

    // Wait for markets to render
    await waitFor(() => {
      expect(screen.getByText('Test Market 1')).toBeInTheDocument();
      expect(screen.getByText('Test Market 2')).toBeInTheDocument();
    });

    // Verify market details are displayed
    mockMarkets.forEach(market => {
      expect(screen.getByText(market.name)).toBeInTheDocument();
      expect(screen.getByText(market.description)).toBeInTheDocument();
      expect(screen.getByText(market.sides.sideOne)).toBeInTheDocument();
      expect(screen.getByText(market.sides.sideTwo)).toBeInTheDocument();
    });
  });

  test('handles empty markets array', async () => {
    // Mock empty markets response
    (getMyMarkets as jest.Mock).mockResolvedValue({
      data: []
    });

    renderComponent();

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText(/Loading markets.../i)).toBeInTheDocument();
    });
  });

  test('handles market fetch error', async () => {
    // Mock API error
    (getMyMarkets as jest.Mock).mockRejectedValue(new Error('Fetch failed'));

    renderComponent();

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/Error fetching active markets/i)).toBeInTheDocument();
    });
  });

  test('opens settle market modal for unsettled market', async () => {
    // Mock markets with a market to be settled
    (getMyMarkets as jest.Mock).mockResolvedValue({
      data: mockMarkets
    });

    renderComponent();

    // Wait for markets to render
    await waitFor(() => {
      expect(screen.getByText('Test Market 1')).toBeInTheDocument();
    });

    // Find and click the "Settle Market" button
    const settleButtons = screen.getAllByText('Settle Market');
    expect(settleButtons).toHaveLength(1); // Only unsettled markets should have this button

    // Simulate user clicking settle market
    userEvent.click(settleButtons[0]);

    // Verify settle market modal is opened
    await waitFor(() => {
      expect(screen.getByText(/Choose the winner for the market/i)).toBeInTheDocument();
    });
  });

  test('settles market successfully', async () => {
    // Mock markets and settle market API
    (getMyMarkets as jest.Mock).mockResolvedValue({
      data: mockMarkets
    });
    (settleMarket as jest.Mock).mockResolvedValue({
      data: { settled: true }
    });

    renderComponent();

    // Wait for markets to render
    await waitFor(() => {
      expect(screen.getByText('Test Market 1')).toBeInTheDocument();
    });

    // Open settle market modal
    const settleButtons = screen.getAllByText('Settle Market');
    userEvent.click(settleButtons[0]);

    // Choose winner
    const winnerButton = screen.getByText('Team A Wins');
    userEvent.click(winnerButton);

    // Verify settle market was called
    await waitFor(() => {
      expect(settleMarket).toHaveBeenCalledWith(
        mockMarkets[0].market_id, 
        mockMarkets[0].sides.sideOne
      );
    });
  });

  test('handles market settlement error', async () => {
    // Mock markets and settle market API error
    (getMyMarkets as jest.Mock).mockResolvedValue({
      data: mockMarkets
    });
    (settleMarket as jest.Mock).mockRejectedValue(new Error('Settlement failed'));

    renderComponent();

    // Wait for markets to render
    await waitFor(() => {
      expect(screen.getByText('Test Market 1')).toBeInTheDocument();
    });

    // Open settle market modal
    const settleButtons = screen.getAllByText('Settle Market');
    userEvent.click(settleButtons[0]);

    // Choose winner
    const winnerButton = screen.getByText('Team A Wins');
    userEvent.click(winnerButton);

    // Verify error handling
    await waitFor(() => {
      expect(screen.getByText(/Error settling market/i)).toBeInTheDocument();
    });
  });
});