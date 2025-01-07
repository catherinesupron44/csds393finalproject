import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Bets from '../../pages/Bets';
import { getCurrentUser } from 'aws-amplify/auth';
import { getBetHistory } from '../../api';

// Mock dependencies
jest.mock('aws-amplify/auth', () => ({
  getCurrentUser: jest.fn(),
}));

jest.mock('../../api', () => ({
  getBetHistory: jest.fn(),
}));

const mockUser = { userId: 'user123' };
const mockBets = [
  { bet_id: '1', title: 'Bet 1', status: 'active' },
  { bet_id: '2', title: 'Bet 2', status: 'completed' },
];

describe('Bets Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches and renders bets successfully', async () => {
    // Set up mock resolved values
    (getCurrentUser as jest.Mock).mockResolvedValue(mockUser);
    (getBetHistory as jest.Mock).mockResolvedValue({ data: mockBets });

    render(<Bets />);

    // Ensure the loading spinner is shown initially
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for the data to be fetched and rendered
    await act(async () => {
      await waitFor(() => {
        const betCards = screen.getAllByTestId('bet-card');
        expect(betCards).toHaveLength(mockBets.length);
        expect(betCards[0]).toHaveTextContent('Bet 1');
        expect(betCards[1]).toHaveTextContent('Bet 2');
      });
    });

    // Verify API calls
    expect(getCurrentUser).toHaveBeenCalledTimes(1);
    expect(getBetHistory).toHaveBeenCalledWith(mockUser.userId);
  });

  test('displays error message if API call fails', async () => {
    // Set up mock resolved/rejected values
    (getCurrentUser as jest.Mock).mockResolvedValue(mockUser);
    (getBetHistory as jest.Mock).mockRejectedValue(new Error('Error fetching bets'));

    render(<Bets />);

    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText(/error fetching active markets/i)).toBeInTheDocument();
    });

    // Verify API calls
    expect(getCurrentUser).toHaveBeenCalledTimes(1);
    expect(getBetHistory).toHaveBeenCalledWith(mockUser.userId);
  });
});
