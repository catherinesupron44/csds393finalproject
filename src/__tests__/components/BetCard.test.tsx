import { render, screen } from '@testing-library/react';
import BetCard, { Bet } from '../../components/BetCard';
import '@testing-library/jest-dom';

const mockBet: Bet = {
  id: '1',
  title: 'Test Bet',
  description: 'Test Description',
  status: 'active',
  endDate: '2024-03-01',
  participants: 5,
  stake: 100,
  category: 'sports'
};

describe('BetCard', () => {
  it('renders bet information correctly', () => {
    render(<BetCard bet={mockBet} />);
    
    expect(screen.getByText(mockBet.title)).toBeInTheDocument();
    expect(screen.getByText(mockBet.description)).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('5 joined')).toBeInTheDocument();
    expect(screen.getByText('100 coins')).toBeInTheDocument();
    expect(screen.getByText(mockBet.category)).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<BetCard bet={mockBet} onClick={handleClick} />);
    
    screen.getByText(mockBet.title).click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});