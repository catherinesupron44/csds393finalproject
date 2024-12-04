import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GetActiveMarkets from '../../components/GetActiveMarkets';
import { getActiveMarkets, placeBet } from '../../api';
import { getCurrentUser } from 'aws-amplify/auth';
import '@testing-library/jest-dom';

// Mock dependencies
jest.mock('../../api', () => ({
  getActiveMarkets: jest.fn(),
  placeBet: jest.fn()
}));

jest.mock('aws-amplify/auth', () => ({
  getCurrentUser: jest.fn()
}));

// Mock child components
jest.mock('../CreateMarketModal', () => {
  return function MockCreateMarketModal(props) {
    return props.isOpen ? (
      <div data-testid="create-market-modal">
        Mocked Create Market Modal
      </div>
    ) : null;
  };
});

describe('GetActiveMarkets Component', () => {
  const mockMarkets = [
    {
      market_id: '1',
      name: 'Super Bowl Winner',
      description: 'Predict the Super Bowl champion',
      sides: { sideOne: 'Kansas City Chiefs', sideTwo: 'San Francisco 49ers' },
      odds: { sideOne: 150, sideTwo: -130 }
    },
    {
      market_id: '2',
      name: 'NBA MVP',
      description: 'Predict the NBA Most Valuable Player',
      sides: { sideOne: 'Player A', sideTwo: 'Player B' },
      odds: { sideOne: 200, sideTwo: -180 }
    }
  ];

  const mockUser = {
    userId: 'test-user-123'
  };

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Setup default mock implementations
    (getCurrentUser as jest.Mock).mockResolvedValue(mockUser);
    (getActiveMarkets as jest.Mock).mockResolvedValue({
      data: mockMarkets
    });
  });

  test('renders active markets correctly', async () => {
    render(<GetActiveMarkets />);

    await waitFor(() => {
      expect(screen.getByText('Active Markets')).toBeInTheDocument();
      expect(screen.getByText('Create Market')).toBeInTheDocument();

      // Check market titles
      expect(screen.getByText('Super Bowl Winner')).toBeInTheDocument();
      expect(screen.getByText('NBA MVP')).toBeInTheDocument();
    });
  });

  test('opens create market modal', async () => {
    render(<GetActiveMarkets />);

    const createMarketButton = screen.getByText('Create Market');
    fireEvent.click(createMarketButton);

    await waitFor(() => {
      expect(screen.getByTestId('create-market-modal')).toBeInTheDocument();
    });
  });

  test('handles empty markets', async () => {
    (getActiveMarkets as jest.Mock).mockResolvedValue({ data: [] });

    render(<GetActiveMarkets />);

    await waitFor(() => {
      expect(screen.getByText('Loading markets...')).toBeInTheDocument();
    });
  });

  test('handles market fetch error', async () => {
    (getActiveMarkets as jest.Mock).mockRejectedValue(new Error('Fetch error'));

    render(<GetActiveMarkets />);

    await waitFor(() => {
      expect(screen.getByText('Error fetching active markets')).toBeInTheDocument();
    });
  });
});

describe('MarketTile Component', () => {
  const mockMarket = {
    title: 'Super Bowl Winner',
    description: 'Predict the Super Bowl champion',
    sides: { sideOne: 'Kansas City Chiefs', sideTwo: 'San Francisco 49ers' },
    odds: { sideOne: 150, sideTwo: -130 },
    id: 'market-1'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getCurrentUser as jest.Mock).mockResolvedValue({
      userId: 'test-user-123'
    });
    (placeBet as jest.Mock).mockResolvedValue({
      data: { market_id: 'new-bet-123' }
    });
  });

  test('renders market details correctly', () => {
    render(
      <div>
        <MarketTile {...mockMarket} />
      </div>
    );

    expect(screen.getByText('Super Bowl Winner')).toBeInTheDocument();
    expect(screen.getByText('Predict the Super Bowl champion')).toBeInTheDocument();
    expect(screen.getByText('Kansas City Chiefs')).toBeInTheDocument();
    expect(screen.getByText('San Francisco 49ers')).toBeInTheDocument();
  });

  test('handles side selection', async () => {
    render(
      <div>
        <MarketTile {...mockMarket} />
      </div>
    );

    const chiefsSideButton = screen.getByText('+150');
    fireEvent.click(chiefsSideButton);

    await userEvent.type(screen.getByPlaceholderText('Enter your stake'), '100');

    const submitButton = screen.getByText('Submit Bet');
    expect(submitButton).toBeEnabled();
  });

  test('submits bet successfully', async () => {
    render(
      <div>
        <MarketTile {...mockMarket} />
      </div>
    );

    // Select a side
    const chiefsSideButton = screen.getByText('+150');
    fireEvent.click(chiefsSideButton);

    // Enter stake
    await userEvent.type(screen.getByPlaceholderText('Enter your stake'), '100');

    // Submit bet
    const submitButton = screen.getByText('Submit Bet');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(placeBet).toHaveBeenCalledWith(
        'test-user-123', 
        'market-1', 
        'Kansas City Chiefs', 
        150, 
        '100'
      );
    });
  });

  test('disables submit button without side or stake', () => {
    render(
      <div>
        <MarketTile {...mockMarket} />
      </div>
    );

    const submitButton = screen.getByText('Submit Bet');
    expect(submitButton).toBeDisabled();
  });

  test('handles stake input validation', async () => {
    render(
      <div>
        <MarketTile {...mockMarket} />
      </div>
    );

    const stakeInput = screen.getByPlaceholderText('Enter your stake');
    
    // Try invalid input
    await userEvent.type(stakeInput, '-10');
    expect(stakeInput).toHaveValue(0);
  });
});