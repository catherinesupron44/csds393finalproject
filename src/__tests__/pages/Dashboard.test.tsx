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
    expect(screen.getByText('Active Groups')).toBeInTheDocument();
    expect(screen.getByText('Active Bets')).toBeInTheDocument();
    expect(screen.getByText('Total Bets')).toBeInTheDocument();
  });

  it('displays active bets section', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>
    );
    
    expect(screen.getByText('Active Bets')).toBeInTheDocument();
    expect(screen.getByText('View All')).toBeInTheDocument();
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