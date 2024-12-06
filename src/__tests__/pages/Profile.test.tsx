import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Bets from '../../pages/Bets';
import { getBetHistory } from '../../api';

// Mock dependencies
jest.mock('../../api', () => ({
  getBetHistory: jest.fn()
}));

jest.mock('../../components/BetCard', () => {
  return function MockBetCard({ bet }) {
    return <div data-testid="bet-card">{bet.bet_id}</div>;
  };
});

const mockBets = [
  { bet_id: 'bet1', status: 'active', title: 'First Bet' },
  { bet_id: 'bet2', status: 'completed', title: 'Second Bet' }
];

describe('Bets Component', () => {
  /*
  test('fetches and renders bets successfully', async () => {
    (getBetHistory as jest.Mock).mockResolvedValue({ data: mockBets });

    render(<Bets />);
    await waitFor(() => {
      const betCards = screen.getAllByTestId('bet-card');
      expect(betCards).toHaveLength(mockBets.length);
    });
  });

  test('handles error when fetching bets fails', async () => {
    (getBetHistory as jest.Mock).mockRejectedValue(new Error('Fetch failed'));

    render(<Bets />);
    await waitFor(() => {
      expect(screen.getByText(/Error fetching bet history/i)).toBeInTheDocument();
    });
  });
  */

  test('handles empty bet list', async () => {
    (getBetHistory as jest.Mock).mockResolvedValue({ data: [] });

    render(<Bets />);
    await waitFor(() => {
      const betCards = screen.queryAllByTestId('bet-card');
      expect(betCards).toHaveLength(0);
    });
  });

  test('handles non-array bet data', async () => {
    (getBetHistory as jest.Mock).mockResolvedValue({
      data: {
        bet1: { bet_id: 'bet1', status: 'active' },
        bet2: { bet_id: 'bet2', status: 'completed' }
      }
    });

    render(<Bets />);
    await waitFor(() => {
      const betCards = screen.queryAllByTestId('bet-card');
      expect(betCards).toHaveLength(0); // No cards should render due to invalid data structure
    });
  });
});
