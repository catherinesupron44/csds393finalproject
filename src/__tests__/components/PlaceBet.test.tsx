import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PlaceBet from '../../components/PlaceBet';
import { placeBet } from '../../api';
import '@testing-library/jest-dom';

// Mock the placeBet API function
jest.mock('../../api', () => ({
  placeBet: jest.fn()
}));

describe('PlaceBet Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all input fields and button', () => {
    render(<PlaceBet />);

    expect(screen.getByPlaceholderText('Bet ID')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Amount')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /place bet/i })).toBeInTheDocument(); // Use role
  });

  it('places bet successfully', async () => {
    (placeBet as jest.Mock).mockResolvedValue({});

    render(<PlaceBet />);

    const betIdInput = screen.getByPlaceholderText('Bet ID');
    const amountInput = screen.getByPlaceholderText('Amount');
    const placeBetButton = screen.getByRole('button', { name: /place bet/i });

    fireEvent.change(betIdInput, { target: { value: 'testBet123' } });
    fireEvent.change(amountInput, { target: { value: '100' } });

    fireEvent.click(placeBetButton);

    await waitFor(() => {
      expect(placeBet).toHaveBeenCalledWith({
        betId: 'testBet123',
        amount: '100',
      });
      expect(screen.getByText('Bet placed successfully')).toBeInTheDocument();
    });
  });

  it('handles bet placement error', async () => {
    (placeBet as jest.Mock).mockRejectedValue(new Error('Bet failed'));

    render(<PlaceBet />);

    const betIdInput = screen.getByPlaceholderText('Bet ID');
    const amountInput = screen.getByPlaceholderText('Amount');
    const placeBetButton = screen.getByRole('button', { name: /place bet/i });

    fireEvent.change(betIdInput, { target: { value: 'testBet123' } });
    fireEvent.change(amountInput, { target: { value: '100' } });

    fireEvent.click(placeBetButton);

    await waitFor(() => {
      expect(placeBet).toHaveBeenCalledWith({
        betId: 'testBet123',
        amount: '100',
      });
      expect(screen.getByText('Error placing bet')).toBeInTheDocument();
    });
  });

  // Test input state changes
  it('updates input values correctly', () => {
    render(<PlaceBet />);

    const betIdInput = screen.getByPlaceholderText('Bet ID');
    const amountInput = screen.getByPlaceholderText('Amount');

    // Simulate user input
    fireEvent.change(betIdInput, { target: { value: 'newBetId' } });
    fireEvent.change(amountInput, { target: { value: '250' } });

    // Check input values
    expect(betIdInput).toHaveValue('newBetId');
    expect(amountInput).toHaveValue('250');
  });
});