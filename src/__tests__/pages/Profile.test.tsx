import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Profile from '../../pages/Profile';
import { useAuthStore } from '../../lib/store';

/**
 * @jest-environment node
 */

const mockProfile = {
  id: '1',
  username: 'testuser',
  email: 'test@example.com',
  coins: 1000,
  badges: ['early_adopter', 'bet_master'],
  groupIds: ['1', '2'],
  profileIcon: 'https://api.dicebear.com/7.x/avataaars/svg?seed=testuser'
};

describe('Profile Page', () => {
  beforeEach(() => {
    useAuthStore.setState({ 
      isAuthenticated: true,
      profile: mockProfile
    });
  });

  it('renders profile information', () => {
    render(<Profile />);
    
    expect(screen.getByText(mockProfile.username)).toBeInTheDocument();
    expect(screen.getByText(mockProfile.email)).toBeInTheDocument();
    expect(screen.getByText('1000')).toBeInTheDocument();
    expect(screen.getByText('early adopter')).toBeInTheDocument();
    expect(screen.getByText('bet master')).toBeInTheDocument();
  });

  it('allows editing username', async () => {
    render(<Profile />);
    
    await userEvent.click(screen.getByRole('button', { name: '' })); // Edit button
    
    const input = screen.getByDisplayValue(mockProfile.username);
    await userEvent.clear(input);
    await userEvent.type(input, 'newusername');
    
    await userEvent.click(screen.getByText('Save'));
    
    expect(screen.getByText('newusername')).toBeInTheDocument();
  });

  it('shows statistics', () => {
    render(<Profile />);
    
    expect(screen.getByText('Win Rate')).toBeInTheDocument();
    expect(screen.getByText('Total Wins')).toBeInTheDocument();
    expect(screen.getByText('Total Bets')).toBeInTheDocument();
  });

  it('displays recent activity', () => {
    render(<Profile />);
    
    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
    expect(screen.getByText(/Won bet on/)).toBeInTheDocument();
  });
});