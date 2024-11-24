import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from '../../pages/Dashboard';
import '@testing-library/jest-dom';
import { useAuthStore } from '../../lib/store';

/**
 * @jest-environment node
 */

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const mockProfile = {
  id: '1',
  username: 'testuser',
  email: 'test@example.com',
  coins: 1000,
  badges: ['early_adopter'],
  groupIds: ['1', '2'],
  profileIcon: 'test-icon-url'
};

describe('Dashboard Page', () => {
  beforeEach(() => {
    useAuthStore.setState({ 
      isAuthenticated: true,
      profile: mockProfile
    });
  });

  it('renders dashboard statistics', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>
    );

    expect(screen.getByText('Win Rate')).toBeInTheDocument();
    expect(screen.getAllByText('Active Bets').length).toBeGreaterThan(1); // Adjusted to handle multiple elements
    expect(screen.getByText('Total Bets')).toBeInTheDocument();
  });

  it('displays active bets section', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>
    );

    const activeBetsHeadings = screen.getAllByText('Active Bets');
    expect(activeBetsHeadings.length).toBeGreaterThan(1); // Adjusted to check for multiple matches
    expect(screen.getAllByText('View All').length).toBeGreaterThan(0); // Check if at least one "View All" button is present
  });

  it('shows recent activity', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>
    );

    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
  });
});
