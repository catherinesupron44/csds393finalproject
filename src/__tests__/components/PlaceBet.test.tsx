import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PlaceBet from '../../components/PlaceBet';
import { placeBet } from '../../api';

// Mock the placeBet API function
jest.mock('../../api', () => ({
  placeBet: jest.fn()
}));

describe('PlaceBet Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test initial rendering
  it('renders all input fields and button', () => {
    render(<PlaceBet />);

    expect(screen.getByPlaceholderText('Bet ID')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Amount')).toBeInTheDocument();
    expect(screen.getByText('Place Bet')).toBeInTheDocument();
  });

  // Test successful bet placement
  it('places bet successfully', async () => {
    // Mock successful bet placement
    (placeBet as jest.Mock).mockResolvedValue({});

    render(<PlaceBet />);

    // Fill in bet details
    const betIdInput = screen.getByPlaceholderText('Bet ID');
    const amountInput = screen.getByPlaceholderText('Amount');
    const placeBetButton = screen.getByText('Place Bet');

    fireEvent.change(betIdInput, { target: { value: 'testBet123' } });
    fireEvent.change(amountInput, { target: { value: '100' } });

    // Click place bet button
    fireEvent.click(placeBetButton);

    // Wait for successful message
    await waitFor(() => {
      expect(placeBet).toHaveBeenCalledWith({ 
        betId: 'testBet123', 
        amount: '100' 
      });
      expect(screen.getByText('Bet placed successfully')).toBeInTheDocument();
    });
  });

  // Test bet placement failure
  it('handles bet placement error', async () => {
    // Mock failed bet placement
    (placeBet as jest.Mock).mockRejectedValue(new Error('Bet failed'));

    render(<PlaceBet />);

    // Fill in bet details
    const betIdInput = screen.getByPlaceholderText('Bet ID');
    const amountInput = screen.getByPlaceholderText('Amount');
    const placeBetButton = screen.getByText('Place Bet');

    fireEvent.change(betIdInput, { target: { value: 'testBet123' } });
    fireEvent.change(amountInput, { target: { value: '100' } });

    // Click place bet button
    fireEvent.click(placeBetButton);

    // Wait for error message
    await waitFor(() => {
      expect(placeBet).toHaveBeenCalledWith({ 
        betId: 'testBet123', 
        amount: '100' 
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

  // Test multiple bet placements
  it('allows multiple bet placements', async () => {
    // Mock successful bet placement for both attempts
    (placeBet as jest.Mock).mockResolvedValue({});

    render(<PlaceBet />);

    const betIdInput = screen.getByPlaceholderText('Bet ID');
    const amountInput = screen.getByPlaceholderText('Amount');
    const placeBetButton = screen.getByText('Place Bet');

    // First bet
    fireEvent.change(betIdInput, { target: { value: 'firstBet' } });
    fireEvent.change(amountInput, { target: { value: '100' } });
    fireEvent.click(placeBetButton);

    await waitFor(() => {
      expect(screen.getByText('Bet placed successfully')).toBeInTheDocument();
    });

    // Second bet
    fireEvent.change(betIdInput, { target: { value: 'secondBet' } });
    fireEvent.change(amountInput, { target: { value: '200' } });
    fireEvent.click(placeBetButton);

    await waitFor(() => {
      expect(placeBet).toHaveBeenCalledWith({ 
        betId: 'secondBet', 
        amount: '200' 
      });
      expect(screen.getAllByText('Bet placed successfully')).toHaveLength(2);
    });
  });
});