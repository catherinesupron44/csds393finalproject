import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BetCard, { Bet } from '../../components/BetCard'; // Adjust import path as needed
import { Trophy, Clock, Users } from 'lucide-react';
import '@testing-library/jest-dom';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Trophy: jest.fn(() => <div data-testid="trophy-icon" />),
  Clock: jest.fn(() => <div data-testid="clock-icon" />),
  Users: jest.fn(() => <div data-testid="users-icon" />),
}));

describe('BetCard Component', () => {
  const mockBet: Bet = {
    id: '1',
    title: 'Test Title',
    description: 'This is a test description for the bet.',
    endDate: '2024-12-31T23:59:59Z',
    participants: 10,
    stake: 50,
    market_info: {
      name: 'Test Market',
      description: 'Test Description',
      closing_date: '2024-12-31T23:59:59Z',
    },
    status: 'active',
    side: 'Test Side',
    amount: 100,
    category: 'Sports',
  };

  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders bet card with correct information', () => {
    render(<BetCard bet={mockBet} />);

    // Check market name and description
    expect(screen.getByText('Test Market')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();

    // Check status
    const statusElement = screen.getByText('Active');
    expect(statusElement).toHaveClass('bg-green-100 text-green-800');

    // Check icons are rendered
    expect(screen.getByTestId('clock-icon')).toBeInTheDocument();
    expect(screen.getByTestId('users-icon')).toBeInTheDocument();
    expect(screen.getByTestId('trophy-icon')).toBeInTheDocument();
  });

  test('formats date correctly', () => {
    render(<BetCard bet={mockBet} />);

    // Check date is formatted correctly (this is a loose check due to locale variations)
    const dateElement = screen.getByText((content) => 
      content.includes('2024') && content.includes('December')
    );
    expect(dateElement).toBeInTheDocument();
  });

  test('applies correct status color based on status', () => {
    const testStatuses: Bet['status'][] = ['active', 'pending', 'completed', 'expired'];
    const expectedClasses = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-blue-100 text-blue-800',
      expired: 'bg-red-100 text-red-800',
    };

    testStatuses.forEach((status) => {
      const betWithStatus = { ...mockBet, status };
      const { getByText } = render(<BetCard bet={betWithStatus} />);

      const statusElement = getByText(status.charAt(0).toUpperCase() + status.slice(1));
      expect(statusElement).toHaveClass(expectedClasses[status]);
    });
  });

  test('calls onClick handler when card is clicked', () => {
    render(<BetCard bet={mockBet} onClick={mockOnClick} />);

    const betCard = screen.getByText('Test Market').closest('div');
    fireEvent.click(betCard);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('renders all bet details correctly', () => {
    render(<BetCard bet={mockBet} />);

    // Verify specific details
    expect(screen.getByText('Test Side')).toBeInTheDocument();
    expect(screen.getByText('100 coins')).toBeInTheDocument();
    expect(screen.getByText('Sports')).toBeInTheDocument();
  });

  test('handles missing optional props gracefully', () => {
    const incompleteBet: Bet = {
      id: '2',
      title: 'Incomplete Bet',
      description: '',
      endDate: '',
      participants: 0,
      stake: 0,
      market_info: {
        name: 'Incomplete Market',
        description: 'Test Description', // Include the description
        closing_date: '2024-12-31T23:59:59Z', 
      },
      status: 'pending',
      side: '',
      amount: 0,
      category: '',
    };

    render(<BetCard bet={incompleteBet} />);

    expect(screen.getByText('Incomplete Market')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  test('applies hover and cursor styles', () => {
    render(<BetCard bet={mockBet} />);
  
    // Find the element by its test ID
    const betCard = screen.getByTestId('bet-card');
  
    // Check if the class is applied correctly
    expect(betCard).toHaveClass('hover:shadow-lg transition-shadow cursor-pointer');
  });
  
});
