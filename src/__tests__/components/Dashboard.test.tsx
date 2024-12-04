import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../../components/Dashboard';
import { Trophy, Users, PlusCircle, History } from 'lucide-react';
import '@testing-library/jest-dom';

// Mock the Lucide React icons to avoid rendering issues
jest.mock('lucide-react', () => ({
  Trophy: jest.fn(() => <div data-testid="trophy-icon" />),
  Users: jest.fn(() => <div data-testid="users-icon" />),
  PlusCircle: jest.fn(() => <div data-testid="plus-circle-icon" />),
  History: jest.fn(() => <div data-testid="history-icon" />)
}));

describe('Dashboard Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders dashboard layout correctly', () => {
    render(<Dashboard />);

    // Check main sections
    expect(screen.getByText('Active Bets')).toBeInTheDocument();
    expect(screen.getByText('Top Groups')).toBeInTheDocument();
    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
  });

  describe('StatCard Components', () => {
    const statCardTests = [
      { 
        title: 'Win Rate', 
        value: '68%', 
        trend: '+5% this month',
        iconTestId: 'trophy-icon'
      },
      { 
        title: 'Active Groups', 
        value: '4', 
        trend: '2 new this week',
        iconTestId: 'users-icon'
      },
      { 
        title: 'Active Bets', 
        value: '12', 
        trend: '3 pending results',
        iconTestId: 'plus-circle-icon'
      },
      { 
        title: 'Total Bets', 
        value: '156', 
        trend: 'Won 98',
        iconTestId: 'history-icon'
      }
    ];

    statCardTests.forEach(({ title, value, trend, iconTestId }) => {
      test(`renders ${title} stat card correctly`, () => {
        render(<Dashboard />);

        const statCard = screen.getByText(title);
        expect(statCard).toBeInTheDocument();
        expect(screen.getByText(value)).toBeInTheDocument();
        expect(screen.getByText(trend)).toBeInTheDocument();
        expect(screen.getByTestId(iconTestId)).toBeInTheDocument();
      });
    });
  });

  describe('BetCard Components', () => {
    test('renders bet cards', () => {
      render(<Dashboard />);

      // Check for specific bet details
      expect(screen.getByText('Super Bowl LVIII Winner')).toBeInTheDocument();
      expect(screen.getByText('Kansas City Chiefs vs San Francisco 49ers')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
      expect(screen.getByText('Ends in 2 days')).toBeInTheDocument();
      expect(screen.getByText('View Details')).toBeInTheDocument();
    });

    test('renders 3 bet cards', () => {
      render(<Dashboard />);

      const betCards = screen.getAllByText('View Details');
      expect(betCards).toHaveLength(3);
    });
  });

  describe('GroupCard Components', () => {
    test('renders group cards', () => {
      render(<Dashboard />);

      expect(screen.getByText('Sports Enthusiasts')).toBeInTheDocument();
      expect(screen.getByText('24 members')).toBeInTheDocument();
      expect(screen.getByText('View')).toBeInTheDocument();
    });

    test('renders 3 group cards', () => {
      render(<Dashboard />);

      const groupCards = screen.getAllByText('View');
      expect(groupCards).toHaveLength(3);
    });
  });

  describe('ActivityItem Components', () => {
    test('renders activity items', () => {
      render(<Dashboard />);

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('won a bet on')).toBeInTheDocument();
      expect(screen.getByText('NBA Finals MVP')).toBeInTheDocument();
      expect(screen.getByText('2 hours ago')).toBeInTheDocument();
    });

    test('renders 3 activity items', () => {
      render(<Dashboard />);

      const activityItems = screen.getAllByText('2 hours ago');
      expect(activityItems).toHaveLength(3);
    });
  });

  test('responsive grid layout', () => {
    render(<Dashboard />);

    // Check grid layout classes
    const container = screen.getByText('Active Bets').closest('div');
    expect(container).toHaveClass('grid');
    expect(container).toHaveClass('grid-cols-1');
    expect(container).toHaveClass('md:grid-cols-2');
    expect(container).toHaveClass('lg:grid-cols-4');
  });
});