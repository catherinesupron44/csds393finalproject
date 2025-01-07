import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import BetHistory from '../../pages/Profile';
import '@testing-library/jest-dom';

// Mock the GetMyMarkets component
jest.mock('../../components/GetMyMarkets', () => {
  return function MockGetMyMarkets() {
    return <div data-testid="get-my-markets">Mocked My Markets</div>;
  };
});

// Mock timer functions
jest.useFakeTimers();

describe('BetHistory Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders component title', () => {
    render(<BetHistory />);

    // Check if the page title is correct
    const titleElement = screen.getByText('My Markets');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass('text-2xl', 'font-bold');
  });

  test('renders GetMyMarkets component', () => {
    render(<BetHistory />);

    // Check if the GetMyMarkets component is rendered
    const myMarketsComponent = screen.getByTestId('get-my-markets');
    expect(myMarketsComponent).toBeInTheDocument();
    expect(myMarketsComponent).toHaveTextContent('Mocked My Markets');
  });

  test('handles loading state', async () => {
    render(<BetHistory />);

    // Advance timers to simulate loading
    jest.advanceTimersByTime(1000);

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText('My Markets')).toBeInTheDocument();
    });
  });

  test('container has correct classes', () => {
    render(<BetHistory />);

    // Check container div for correct classes
    const containerElement = screen.getByText('My Markets').closest('div');
    expect(containerElement).toHaveClass('container');
    expect(containerElement).toHaveClass('mx-auto');
    expect(containerElement).toHaveClass('px-4');
    expect(containerElement).toHaveClass('py-8');
  });

  test('matches snapshot', () => {
    const { asFragment } = render(<BetHistory />);
    
    // Advance timers to complete loading
    jest.advanceTimersByTime(1000);

    expect(asFragment()).toMatchSnapshot();
  });

  test('getBetHistory method simulates loading', async () => {
    // Spy on console to verify behavior if needed
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    render(<BetHistory />);

    // Verify loading state is initially true
    expect(screen.getByText('My Markets')).toBeInTheDocument();

    // Advance timers to simulate loading completion
    jest.advanceTimersByTime(1000);

    // Clean up spy
    consoleSpy.mockRestore();
  });
});