import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateMarketModal from '../../components/CreateMarketModal';
import { useCreateBet } from '../../lib/queries';
import { createMarket } from '../../api';
import '@testing-library/jest-dom';

// Mock the dependencies
jest.mock('../../lib/queries', () => ({
  useCreateBet: jest.fn()
}));

jest.mock('../../api', () => ({
  createMarket: jest.fn()
}));

describe('CreateMarketModal', () => {
  const mockOnClose = jest.fn();
  const mockCurrentUser = {
    userId: 'test-user-123'
  };

  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    currentUser: mockCurrentUser
  };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Setup default mock implementations
    (useCreateBet as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false
    });

    (createMarket as jest.Mock).mockResolvedValue({
      data: { market_id: 'new-market-123' }
    });
  });

  test('renders modal when isOpen is true', () => {
    render(<CreateMarketModal {...defaultProps} />);
    
    expect(screen.getByText('Create New Market')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('End Date')).toBeInTheDocument();
  });

  test('does not render modal when isOpen is false', () => {
    const { container } = render(
      <CreateMarketModal {...defaultProps} isOpen={false} />
    );
    
    expect(container.firstChild).toBeNull();
  });

  test('closes modal when close button is clicked', () => {
    render(<CreateMarketModal {...defaultProps} />);
    
    const closeButton = screen.getByRole('button', { name: '' });
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('handles form submission with valid data', async () => {
    const mockMutateAsync = jest.fn().mockResolvedValue({});
    (useCreateBet as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false
    });

    render(<CreateMarketModal {...defaultProps} />);
    
    // Fill out the form
    await userEvent.type(screen.getByLabelText('Title'), 'Test Market');
    await userEvent.type(screen.getByLabelText('Description'), 'Test Description');
    await userEvent.type(screen.getByLabelText('End Date'), '2024-12-31T23:59');
    await userEvent.type(screen.getByLabelText('Side 1'), 'Team A');
    await userEvent.type(screen.getByLabelText('Side 1 Odds'), '110');
    await userEvent.type(screen.getByLabelText('Side 2'), 'Team B');
    await userEvent.type(screen.getByLabelText('Side 2 Odds'), '120');

    const createButton = screen.getByRole('button', { name: /create market/i });
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(createMarket).toHaveBeenCalledWith(
        mockCurrentUser.userId,
        'Test Market',
        'Test Description',
        { sideOne: 'Team A', sideTwo: 'Team B' },
        { sideOne: 110, sideTwo: 120 },
        '2024-12-31T23:59'
      );
    });
  });

  test('handles form submission error', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const createMarketError = new Error('Market creation failed');
    (createMarket as jest.Mock).mockRejectedValue(createMarketError);

    render(<CreateMarketModal {...defaultProps} />);
    
    // Fill out the form
    await userEvent.type(screen.getByLabelText('Title'), 'Test Market');
    await userEvent.type(screen.getByLabelText('Description'), 'Test Description');
    await userEvent.type(screen.getByLabelText('End Date'), '2024-12-31T23:59');
    await userEvent.type(screen.getByLabelText('Side 1'), 'Team A');
    await userEvent.type(screen.getByLabelText('Side 1 Odds'), '110');
    await userEvent.type(screen.getByLabelText('Side 2'), 'Team B');
    await userEvent.type(screen.getByLabelText('Side 2 Odds'), '120');

    const createButton = screen.getByRole('button', { name: /create market/i });
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error creating market');
    });

    consoleErrorSpy.mockRestore();
  });

  test('validates required fields', async () => {
    render(<CreateMarketModal {...defaultProps} />);
    
    const createButton = screen.getByRole('button', { name: /create market/i });
    fireEvent.click(createButton);

    // Check that form fields are marked as invalid
    const titleInput = screen.getByLabelText('Title');
    expect(titleInput).toBeInvalid();
  });

  test('disables create button when mutation is pending', () => {
    (useCreateBet as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: true
    });

    render(<CreateMarketModal {...defaultProps} />);
    
    const createButton = screen.getByRole('button', { name: /creating.../i });
    expect(createButton).toBeDisabled();
  });
});