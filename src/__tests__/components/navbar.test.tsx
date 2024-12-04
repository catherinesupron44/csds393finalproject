import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { getCoins } from '../../api';
import Navbar from '../../components/Navbar';
import '@testing-library/jest-dom';

// Mock dependencies
jest.mock('aws-amplify/auth', () => ({
  getCurrentUser: jest.fn(),
  signOut: jest.fn()
}));

jest.mock('../../api', () => ({
  getCoins: jest.fn()
}));

// Mock react-router-dom hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({ pathname: '/' }),
  useNavigate: () => jest.fn()
}));

describe('Navbar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  // Authentication and Coin Fetching
  it('fetches user and coins on mount when authenticated', async () => {
    const mockUser = { 
      userId: 'user123',
      username: 'testuser'
    };

    const mockCoins = { data: 500 };

    (getCurrentUser as jest.Mock).mockResolvedValue(mockUser);
    (getCoins as jest.Mock).mockResolvedValue(mockCoins);

    render(
      <MemoryRouter>
        <Navbar isAuthenticated={true} onAuthClick={() => {}} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getCurrentUser).toHaveBeenCalled();
      expect(getCoins).toHaveBeenCalledWith(mockUser.userId);
      expect(screen.getByText('500')).toBeInTheDocument();
    });
  });

  // Authentication Failure
  it('handles authentication failure', async () => {
    const mockError = new Error('Auth failed');

    (getCurrentUser as jest.Mock).mockRejectedValue(mockError);
    (getCoins as jest.Mock).mockRejectedValue(mockError);

    render(
      <MemoryRouter>
        <Navbar isAuthenticated={true} onAuthClick={() => {}} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getCurrentUser).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith(mockError);
    });
  });

  // Sign Out Functionality
  it('handles sign out correctly', async () => {
    const mockUser = { 
      userId: 'user123',
      username: 'testuser'
    };

    const mockCoins = { data: 500 };

    (getCurrentUser as jest.Mock).mockResolvedValue(mockUser);
    (getCoins as jest.Mock).mockResolvedValue(mockCoins);
    (signOut as jest.Mock).mockResolvedValue({});

    render(
      <MemoryRouter>
        <Navbar isAuthenticated={true} onAuthClick={() => {}} />
      </MemoryRouter>
    );

    // Wait for user and coins to load
    await waitFor(() => {
      expect(screen.getByText('500')).toBeInTheDocument();
    });

    // Find and click logout button
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(signOut).toHaveBeenCalled();
    });
  });

  // Navigation Button Tests
  it('renders navigation buttons when authenticated', async () => {
    const mockUser = { 
      userId: 'user123',
      username: 'testuser'
    };

    const mockCoins = { data: 500 };

    (getCurrentUser as jest.Mock).mockResolvedValue(mockUser);
    (getCoins as jest.Mock).mockResolvedValue(mockCoins);

    render(
      <MemoryRouter>
        <Navbar isAuthenticated={true} onAuthClick={() => {}} />
      </MemoryRouter>
    );

    await waitFor(() => {
      const navButtons = [
        'Active Markets',
        'My Bets',
        'My Markets'
      ];

      navButtons.forEach(buttonText => {
        expect(screen.getByText(buttonText)).toBeInTheDocument();
      });
    });
  });

  // Coin Display
  it('displays loading state for coins', async () => {
    const mockUser = { 
      userId: 'user123',
      username: 'testuser'
    };

    (getCurrentUser as jest.Mock).mockResolvedValue(mockUser);
    (getCoins as jest.Mock).mockResolvedValue({ data: null });

    render(
      <MemoryRouter>
        <Navbar isAuthenticated={true} onAuthClick={() => {}} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('...')).toBeInTheDocument();
    });
  });

  // Unauthenticated State
  it('renders minimal content when not authenticated', () => {
    render(
      <MemoryRouter>
        <Navbar isAuthenticated={false} onAuthClick={() => {}} />
      </MemoryRouter>
    );

    // Check for BetBuddy logo
    expect(screen.getByText('BetBuddy')).toBeInTheDocument();
  });
});