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
  });

  it('allows editing username', async () => {
    render(<Profile />);

    // Click the edit button for username (selects the first button that likely enables editing)
    const editButton = screen.getByRole('button', { name: /Edit Username/i });
    await userEvent.click(editButton);

    // Wait for input field to be in the DOM with the current username as its value
    const input = await waitFor(() => screen.getByDisplayValue(mockProfile.username));
    
    // Clear and type a new username
    await userEvent.clear(input);
    await userEvent.type(input, 'newusername');
    
    // Click save button to submit the new username
    await userEvent.click(screen.getByText('Save'));

    // Wait for and verify that the new username is displayed
    await waitFor(() => expect(screen.getByText('newusername')).toBeInTheDocument());
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
