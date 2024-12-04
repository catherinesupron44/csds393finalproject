import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import HomePage from '../../components/homepage';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

// Mock AWS Amplify auth
jest.mock('aws-amplify/auth', () => ({
  getCurrentUser: jest.fn(),
  signOut: jest.fn()
}));

describe('HomePage Component', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  // Test user authentication and rendering
  it('fetches and displays current user on mount', async () => {
    const mockUser = { 
      username: 'testuser',
      userId: '123'
    };

    (getCurrentUser as jest.Mock).mockResolvedValue(mockUser);

    render(
      <MemoryRouter initialEntries={['/home']}>
        <HomePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getCurrentUser).toHaveBeenCalled();
    });
  });

  // Test sign out functionality
  it('handles sign out successfully', async () => {
    const mockNavigate = jest.fn();
    
    // Mock useNavigate to return our mock function
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);
    
    (signOut as jest.Mock).mockResolvedValue({});

    render(
      <MemoryRouter initialEntries={['/home']}>
        <HomePage />
      </MemoryRouter>
    );

    // Find and click the sign out link (Profile link)
    const signOutLink = screen.getByText('Profile');
    fireEvent.click(signOutLink);

    await waitFor(() => {
      expect(signOut).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  // Test sign out error handling
  it('handles sign out error', async () => {
    const mockError = new Error('Sign out failed');
    
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);
    
    (signOut as jest.Mock).mockRejectedValue(mockError);

    render(
      <MemoryRouter initialEntries={['/home']}>
        <HomePage />
      </MemoryRouter>
    );

    // Find and click the sign out link (Profile link)
    const signOutLink = screen.getByText('Profile');
    fireEvent.click(signOutLink);

    await waitFor(() => {
      expect(signOut).toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith(mockError);
    });
  });

  // Test navigation links
  it('renders all navigation links', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <HomePage />
      </MemoryRouter>
    );

    const navLinks = [
      'Home', 
      'Friends', 
      'Markets', 
      'Bet History', 
      'Profile'
    ];

    navLinks.forEach(linkText => {
      expect(screen.getByText(linkText)).toBeInTheDocument();
    });
  });

  // Test bet rendering
  it('renders bet items correctly', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <HomePage />
      </MemoryRouter>
    );

    const betNames = ['Bet A', 'Bet B', 'Bet C'];
    const betOdds = ['1.5', '2.0', '3.2'];

    betNames.forEach(name => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });

    betOdds.forEach(odds => {
      expect(screen.getByText(odds)).toBeInTheDocument();
    });
  });

  // Test menu toggle functionality
  it('toggles body class on menu toggle', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <HomePage />
      </MemoryRouter>
    );

    // Simulate menu toggle (you might need to adjust this selector based on actual implementation)
    const menuToggle = screen.getByRole('button', { name: /toggle menu/i });
    
    // Initial state
    expect(document.body.classList.contains('overflow-hidden')).toBe(false);

    // Toggle menu
    fireEvent.click(menuToggle);
    expect(document.body.classList.contains('overflow-hidden')).toBe(true);

    // Toggle again
    fireEvent.click(menuToggle);
    expect(document.body.classList.contains('overflow-hidden')).toBe(false);
  });
});