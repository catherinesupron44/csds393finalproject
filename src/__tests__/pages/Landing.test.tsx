import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { getCurrentUser } from 'aws-amplify/auth';
import Landing from '../../pages/Landing';
import { Trophy, Users, Star } from 'lucide-react';
import '@testing-library/jest-dom';

// Mock dependencies
jest.mock('aws-amplify/auth', () => ({
  getCurrentUser: jest.fn(),
}));

const mockedGetCurrentUser = getCurrentUser as jest.Mock;

// Mock Lucide icons to simplify testing
jest.mock('lucide-react', () => ({
  Trophy: () => <div data-testid="trophy-icon">Trophy</div>,
  Users: () => <div data-testid="users-icon">Users</div>,
  Star: () => <div data-testid="star-icon">Star</div>,
}));

describe('Landing Component', () => {
  const mockOnGetStarted = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders main heading and description', () => {
    mockedGetCurrentUser.mockRejectedValue(new Error('Not logged in'));

    render(<Landing onGetStarted={mockOnGetStarted} />);

    expect(screen.getByText('Welcome to BetBuddy')).toBeInTheDocument();
    expect(screen.getByText(/Track friendly bets and compete with friends/i)).toBeInTheDocument();
  });

  describe('Authentication State', () => {
    test('shows Get Started button when not logged in', async () => {
      mockedGetCurrentUser.mockRejectedValue(new Error('Not logged in'));

      render(<Landing onGetStarted={mockOnGetStarted} />);

      await waitFor(() => {
        const getStartedButton = screen.getByText('Get Started');
        expect(getStartedButton).toBeInTheDocument();
      });
    });

    test('hides Get Started button when logged in', async () => {
      const mockUser = { userId: 'test-user' };
      mockedGetCurrentUser.mockResolvedValue(mockUser);

      render(<Landing onGetStarted={mockOnGetStarted} />);

      await waitFor(() => {
        const getStartedButton = screen.queryByText('Get Started');
        expect(getStartedButton).not.toBeInTheDocument();
      });
    });

    test('calls onGetStarted when Get Started button is clicked', async () => {
      mockedGetCurrentUser.mockRejectedValue(new Error('Not logged in'));

      render(<Landing onGetStarted={mockOnGetStarted} />);

      await waitFor(() => {
        const getStartedButton = screen.getByText('Get Started');
        fireEvent.click(getStartedButton);
        expect(mockOnGetStarted).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Feature Cards', () => {
    const expectedFeatures = [
      {
        title: 'Track Your Wins',
        description: 'Effortlessly track your winnings and losses as you rise to the top.',
        iconTestId: 'trophy-icon',
      },
      {
        title: 'Join Exciting Markets',
        description: 'Get in on the action by creating or joining markets that match your interests.',
        iconTestId: 'users-icon',
      },
      {
        title: 'Bet, Compete & Win',
        description: 'Challenge friends, place your bets, and prove you’ve got the best instincts.',
        iconTestId: 'star-icon',
      },
    ];

    test('renders all feature cards', () => {
      mockedGetCurrentUser.mockRejectedValue(new Error('Not logged in'));

      render(<Landing onGetStarted={mockOnGetStarted} />);

      expectedFeatures.forEach((feature) => {
        // Check if title is rendered
        expect(screen.getByText(feature.title)).toBeInTheDocument();
        
        // Use `toHaveTextContent` for description to handle potential splitting or formatting
        expect(screen.getByText(feature.description)).toHaveTextContent(feature.description);
        
        // Check if icon is rendered via test id
        expect(screen.getByTestId(feature.iconTestId)).toBeInTheDocument();
      });
    });
  });

  test('matches snapshot', async () => {
    mockedGetCurrentUser.mockRejectedValue(new Error('Not logged in'));

    const { asFragment } = render(<Landing onGetStarted={mockOnGetStarted} />);

    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
