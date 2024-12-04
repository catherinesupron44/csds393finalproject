import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SettleBet from '../../components/SettleBet';
import { settleBet } from '../../api';
import '@testing-library/jest-dom';

// Mock the settleBet API function
jest.mock('../../api', () => ({
  settleBet: jest.fn()
}));

describe('SettleBet Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test initial rendering
  it('renders component correctly', () => {
    render(<SettleBet />);

    expect(screen.getByText('Settle Bet')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Bet ID')).toBeInTheDocument();
    // Change getByText to getByRole to target the button
    expect(screen.getByRole('button', { name: /settle bet/i })).toBeInTheDocument();
  });

  // Test successful bet settlement
  it('settles bet successfully', async () => {
    // Mock successful bet settlement
    (settleBet as jest.Mock).mockResolvedValue({});

    render(<SettleBet />);

    // Fill in bet ID
    const betIdInput = screen.getByPlaceholderText('Bet ID');
    const settleBetButton = screen.getByRole('button', { name: /settle bet/i });

    fireEvent.change(betIdInput, { target: { value: 'testBet123' } });
    fireEvent.click(settleBetButton);

    // Wait for successful message
    await waitFor(() => {
      expect(settleBet).toHaveBeenCalledWith('testBet123');
      expect(screen.getByText('Bet settled successfully')).toBeInTheDocument();
    });
  });

  // Test bet settlement failure
  it('handles bet settlement error', async () => {
    // Mock failed bet settlement
    (settleBet as jest.Mock).mockRejectedValue(new Error('Settlement failed'));

    render(<SettleBet />);

    // Fill in bet ID
    const betIdInput = screen.getByPlaceholderText('Bet ID');
    const settleBetButton = screen.getByRole('button', { name: /settle bet/i });

    fireEvent.change(betIdInput, { target: { value: 'testBet123' } });
    fireEvent.click(settleBetButton);

    // Wait for error message
    await waitFor(() => {
      expect(settleBet).toHaveBeenCalledWith('testBet123');
      expect(screen.getByText('Error settling bet')).toBeInTheDocument();
    });
  });

  // Test input state changes
  it('updates bet ID input correctly', () => {
    render(<SettleBet />);

    const betIdInput = screen.getByPlaceholderText('Bet ID');

    // Simulate user input
    fireEvent.change(betIdInput, { target: { value: 'newBetId' } });

    // Check input value
    expect(betIdInput).toHaveValue('newBetId');
  });

  // Test multiple bet settlements
  it('allows multiple bet settlements', async () => {
    // Mock successful bet settlement for both attempts
    (settleBet as jest.Mock).mockResolvedValue({});

    render(<SettleBet />);

    const betIdInput = screen.getByPlaceholderText('Bet ID');
    const settleBetButton = screen.getByRole('button', { name: /settle bet/i });

    // First bet settlement
    fireEvent.change(betIdInput, { target: { value: 'firstBet' } });
    fireEvent.click(settleBetButton);

    await waitFor(() => {
      expect(screen.getByText('Bet settled successfully')).toBeInTheDocument();
    });

    // Second bet settlement
    fireEvent.change(betIdInput, { target: { value: 'secondBet' } });
    fireEvent.click(settleBetButton);

    await waitFor(() => {
      expect(settleBet).toHaveBeenCalledWith('secondBet');
      expect(screen.getAllByText('Bet settled successfully')).toHaveLength(2);
    });
  });

  // Test empty bet ID submission
  it('prevents settlement with empty bet ID', async () => {
    // Mock settlement function
    (settleBet as jest.Mock).mockResolvedValue({});

    render(<SettleBet />);

    const settleBetButton = screen.getByRole('button', { name: /settle bet/i });

    // Attempt to settle with empty bet ID
    fireEvent.click(settleBetButton);

    // Verify no settlement attempt is made
    await waitFor(() => {
      expect(settleBet).not.toHaveBeenCalled();
      expect(screen.queryByText('Bet settled successfully')).not.toBeInTheDocument();
      expect(screen.queryByText('Error settling bet')).not.toBeInTheDocument();
    });
  });
});
