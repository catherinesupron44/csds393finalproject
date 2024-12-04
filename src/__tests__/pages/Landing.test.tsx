import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Landing from '../../pages/Landing';


/**
 * @jest-environment node
 */


describe('Landing Page', () => {
  const mockOnGetStarted = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders landing page content', () => {
    render(<Landing onGetStarted={mockOnGetStarted} />);
    
    expect(screen.getByText('Welcome to BetBuddy')).toBeInTheDocument();
    expect(screen.getByText('Get Started')).toBeInTheDocument();
    expect(screen.getByText('Compete & Win')).toBeInTheDocument();
    expect(screen.getByText('Join Groups')).toBeInTheDocument();
    expect(screen.getByText('Earn Badges')).toBeInTheDocument();
  });

  it('calls onGetStarted when button is clicked', async () => {
    render(<Landing onGetStarted={mockOnGetStarted} />);
    
    await userEvent.click(screen.getByText('Get Started'));
    expect(mockOnGetStarted).toHaveBeenCalledTimes(1);
  });
});