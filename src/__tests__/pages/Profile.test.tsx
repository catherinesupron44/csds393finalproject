import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Bets from '../../pages/Bets';
import { getCurrentUser } from 'aws-amplify/auth';
import { getBetHistory } from '../../api';


// Mock dependencies
jest.mock('aws-amplify/auth', () => ({
  getCurrentUser: jest.fn()
}));

jest.mock('../../api', () => ({
  getBetHistory: jest.fn(),
  getActiveBets: jest.fn()
}));

// Mock BetCard component
jest.mock('../../components/BetCard', () => {
  return function MockBetCard({ bet }) {
    return <div data-testid="bet-card">{bet.bet_id}</div>;
  };
});

const mockUser = {
  userId: 'test-user-123'
};

const mockBets = [
  { 
    bet_id: 'bet1', 
    status: 'active',
    title: 'First Bet'
  },
  { 
    bet_id: 'bet2', 
    status: 'completed',
    title: 'Second Bet'
  },
  { 
    bet_id: 'bet3', 
    status: 'pending',
    title: 'Third Bet'
  }
];

describe('Bets Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    
    // Setup default mock implementations
    (getCurrentUser as jest.Mock).mockResolvedValue(mockUser);
    (getBetHistory as jest.Mock).mockResolvedValue({ data: mockBets });
  });

  test('renders loading state initially', async () => {
    render(<Bets />);
    
    // Check for loading state elements
    const loadingElement = screen.getByText(/my bets/i);
    const pulseElements = screen.getAllByTestId('pulse-loading');
    
    expect(loadingElement).toBeInTheDocument();
    expect(pulseElements.length).toBeGreaterThan(0);
  });

  test('fetches and renders bets successfully', async () => {
    render(<Bets />);
    
    // Wait for bets to load
    await waitFor(() => {
      const betCards = screen.getAllByTestId('bet-card');
      expect(betCards).toHaveLength(mockBets.length);
    });

    // Verify API calls
    expect(getCurrentUser).toHaveBeenCalledTimes(1);
    expect(getBetHistory).toHaveBeenCalledWith(mockUser.userId);
  });

  test('handles error when fetching bets fails', async () => {
    // Simulate API error
    (getBetHistory as jest.Mock).mockRejectedValue(new Error('Fetch failed'));

    render(<Bets />);
    
    // Wait for error message
    await waitFor(() => {
      const errorMessage = screen.getByText(/error fetching active markets/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test('handles empty bet list', async () => {
    // Simulate empty bet list
    (getBetHistory as jest.Mock).mockResolvedValue({ data: [] });

    render(<Bets />);
    
    // Wait for component to render
    await waitFor(() => {
      const betCards = screen.queryAllByTestId('bet-card');
      expect(betCards).toHaveLength(0);
    });
  });

  test('handles non-array bet data', async () => {
    // Simulate non-array bet data
    (getBetHistory as jest.Mock).mockResolvedValue({ 
      data: { 
        bet1: { bet_id: 'bet1', status: 'active' },
        bet2: { bet_id: 'bet2', status: 'completed' }
      } 
    });

    render(<Bets />);
    
    // Wait for bets to load
    await waitFor(() => {
      const betCards = screen.getAllByTestId('bet-card');
      expect(betCards).toHaveLength(2);
    });
  });
});