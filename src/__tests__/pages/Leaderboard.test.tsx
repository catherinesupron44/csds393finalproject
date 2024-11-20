import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Leaderboard from '../../pages/Markets';

/**
 * @jest-environment node
 */

describe('Leaderboard Page', () => {
  it('renders leaderboard table', () => {
    render(<Leaderboard />);
    
    expect(screen.getByText('Global Leaderboard')).toBeInTheDocument();
  });

  it('filters users by search', async () => {
    render(<Leaderboard />);
    
    await userEvent.type(screen.getByPlaceholderText('Search users...'), 'BetMaster');
    
    expect(screen.getByText('BetMaster')).toBeInTheDocument();
    expect(screen.queryByText('LuckyPro')).not.toBeInTheDocument();
  });

  it('changes time frame', async () => {
    render(<Leaderboard />);
    
    await userEvent.selectOptions(
      screen.getByRole('combobox'),
      'month'
    );
    
    expect(screen.getByRole('combobox')).toHaveValue('month');
  });

  it('displays correct user statistics', () => {
    render(<Leaderboard />);
    
    expect(screen.getByText('78%')).toBeInTheDocument(); // Win rate
    expect(screen.getByText('245')).toBeInTheDocument(); // Total bets
    expect(screen.getByText('15,000')).toBeInTheDocument(); // Coins
  });
});