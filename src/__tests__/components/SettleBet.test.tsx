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
    jest.clearAllMocks(); // Clear mocks before each test
  });

  // Test initial rendering
  it('renders component correctly', () => {
    render(<SettleBet />);

    // Ensure the "Settle Bet" button and placeholder text for Bet ID are in the document
    expect(screen.getByRole('button', { name: /settle bet/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Bet ID')).toBeInTheDocument();
  });

  // Test handling of user input for Bet ID
  it('updates bet ID input correctly', () => {
    render(<SettleBet />);

    const betIdInput = screen.getByPlaceholderText('Bet ID');

    // Simulate user input
    fireEvent.change(betIdInput, { target: { value: 'newBetId' } });

    // Ensure input value is updated correctly
    expect(betIdInput).toHaveValue('newBetId');
  });

  // Test successful bet settlement
  it('settles bet successfully', async () => {
    // Mock successful bet settlement response
    settleBet.mockResolvedValue({});

    render(<SettleBet />);

    const betIdInput = screen.getByPlaceholderText('Bet ID');
    const settleBetButton = screen.getByRole('button', { name: /settle bet/i });

    // Fill in bet ID and click the button
    fireEvent.change(betIdInput, { target: { value: 'testBet123' } });
    fireEvent.click(settleBetButton);

    // Wait for the success message
    await waitFor(() => {
      expect(settleBet).toHaveBeenCalledWith('testBet123');
      expect(screen.getByText('Bet settled successfully')).toBeInTheDocument();
    });
  });

  // Test bet settlement failure
  it('handles bet settlement error', async () => {
    // Mock failed bet settlement response
    settleBet.mockRejectedValue(new Error('Settlement failed'));

    render(<SettleBet />);

    const betIdInput = screen.getByPlaceholderText('Bet ID');
    const settleBetButton = screen.getByRole('button', { name: /settle bet/i });

    // Fill in bet ID and click the button
    fireEvent.change(betIdInput, { target: { value: 'testBet123' } });
    fireEvent.click(settleBetButton);

    // Wait for the error message
    await waitFor(() => {
      expect(settleBet).toHaveBeenCalledWith('testBet123');
      expect(screen.getByText('Error settling bet')).toBeInTheDocument();
    });
  });
})