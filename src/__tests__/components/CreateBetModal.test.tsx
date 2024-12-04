import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateBetModal from '../../components/CreateBetModal';
import { X } from 'lucide-react';
import { useCreateBet } from '../../lib/queries';
import '@testing-library/jest-dom';

// Mock dependencies
jest.mock('lucide-react', () => ({
  X: jest.fn(() => <div data-testid="close-icon" />)
}));

jest.mock('../../lib/queries', () => ({
  useCreateBet: jest.fn()
}));

describe('CreateBetModal Component', () => {
  // Mock functions
  const mockOnClose = jest.fn();
  const mockMutateAsync = jest.fn();

  // Default props for the modal
  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    mutateAsync: mockMutateAsync // Add mutateAsync to defaultProps
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup mock for useCreateBet if it's being used inside the modal
    (useCreateBet as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false
    });
  });

  test('renders modal when isOpen is true', () => {
    render(<CreateBetModal {...defaultProps} />);

    expect(screen.getByText('Create New Bet')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('End Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Stake (coins)')).toBeInTheDocument();
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
  });

  test('does not render modal when isOpen is false', () => {
    const { container } = render(<CreateBetModal {...defaultProps} isOpen={false} />);
    expect(container.firstChild).toBeNull();
  });

  test('closes modal when close button is clicked', () => {
    render(<CreateBetModal {...defaultProps} />);

    const closeButton = screen.getByTestId('close-icon').closest('button');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('submits form with correct data', async () => {
    const { getByLabelText, getByText } = render(
      <CreateBetModal 
        {...defaultProps} 
      />
    );
  
    // Fill out the form
    fireEvent.change(getByLabelText('Title'), { target: { value: 'Test Bet' } });
    fireEvent.change(getByLabelText('Description'), { target: { value: 'Test Description' } });
    fireEvent.change(getByLabelText('End Date'), { target: { value: '2024-12-31T23:59:59' } });
    fireEvent.change(getByLabelText('Stake (coins)'), { target: { value: '100' } });
    fireEvent.change(getByLabelText('Category'), { target: { value: 'entertainment' } });
    fireEvent.change(getByLabelText('Side (Team/Choice)'), { target: { value: 'Test Side' } });
    fireEvent.change(getByLabelText('Amount (coins)'), { target: { value: '100' } });
  
    // Click the submit button
    fireEvent.click(getByText('Create Bet'));
  
    // Wait for the mutation to be called
    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        title: 'Test Bet',
        description: 'Test Description',
        endDate: '2024-12-31T23:59:59.000', // Update to match the received value
        market_info: {
          closing_date: '2024-12-31T23:59:59.000', // Ensure this also matches the received value
          description: 'Test Description',
          name: 'Test Market',
        },
        side: 'Test Side',
        stake: 100,
        status: 'active',
        category: 'entertainment',
        amount: 100,
      });
    });
  });
  
  test('handles form submission error', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  
    // Simulate mutation error
    mockMutateAsync.mockRejectedValue(new Error('Submission failed'));
  
    const { container } = render(<CreateBetModal {...defaultProps} />);
  
    // Fill out the form
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test Bet' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText('End Date'), { target: { value: '2024-12-31T23:59' } });
    fireEvent.change(screen.getByLabelText('Stake (coins)'), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText('Category'), { target: { value: 'entertainment' } });
  
    const form = container.querySelector('form');
    fireEvent.submit(form);
  
    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledTimes(1);
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  
    consoleErrorSpy.mockRestore();
  });
  
  test('disables submit button when mutation is pending', () => {
    (useCreateBet as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: true
    });

    render(<CreateBetModal {...defaultProps} />);

    const submitButton = screen.getByText('Creating...');
    expect(submitButton).toBeDisabled();
  });

  test('validates form inputs', async () => {
    render(<CreateBetModal {...defaultProps} />);

    fireEvent.click(screen.getByText('Create Bet'));

    const titleInput = screen.getByLabelText('Title') as HTMLInputElement;
    expect(titleInput.validity.valueMissing).toBeTruthy();
  });

  test('renders all category options', () => {
    render(<CreateBetModal {...defaultProps} />);

    const categorySelect = screen.getByLabelText('Category');
    const options = screen.getAllByRole('option');

    expect(options).toHaveLength(4);
    expect(options[0]).toHaveTextContent('Sports');
    expect(options[1]).toHaveTextContent('Entertainment');
    expect(options[2]).toHaveTextContent('Politics');
    expect(options[3]).toHaveTextContent('Custom');
  });
});
