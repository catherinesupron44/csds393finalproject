import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GetMyMarkets from '../../components/GetMyMarkets';
import { getMyMarkets, settleMarket } from '../../api';
import { getCurrentUser } from 'aws-amplify/auth';

// Mock dependencies
jest.mock('../api');
jest.mock('aws-amplify/auth');

describe('GetMyMarkets Component', () => {
  const mockUserId = 'user123';
  const mockMarkets = [
    {
      market_id: '1',
      name: 'Test Market 1',
      description: 'First test market',
      sides: { sideOne: 'Team A', sideTwo: 'Team B' },
      odds: { sideOne: 1.5, sideTwo: 2.0 },
      settled: 'to be settled',
      closing_date: '2023-12-31T23:59:59Z'
    },
    {
      market_id: '2',
      name: 'Test Market 2',
      description: 'Second test market',
      sides: { sideOne: 'Option X', sideTwo: 'Option Y' },
      odds: { sideOne: 1.8, sideTwo: 1.9 },
      settled: false,
      closing_date: '2024-01-15T23:59:59Z'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock getCurrentUser to return a user
    getCurrentUser.mockResolvedValue({ userId: mockUserId });
  });

  test('renders markets successfully when API returns array', async () => {
    // Mock API to return markets as an array
    getMyMarkets.mockResolvedValue({ data: mockMarkets });

    render(<GetMyMarkets />);

    // Wait for markets to be rendered
    await waitFor(() => {
      expect(screen.getByText('Test Market 1')).toBeInTheDocument();
      expect(screen.getByText('Test Market 2')).toBeInTheDocument();
    });

    // Verify API was called with correct user ID
    expect(getCurrentUser).toHaveBeenCalledTimes(1);
    expect(getMyMarkets).toHaveBeenCalledTimes(1);
    expect(getMyMarkets).toHaveBeenCalledWith(mockUserId);
  });

  test('renders markets when API returns object', async () => {
    // Mock API to return markets as an object
    const marketObject = {
      '1': mockMarkets[0],
      '2': mockMarkets[1]
    };
    getMyMarkets.mockResolvedValue({ data: marketObject });

    render(<GetMyMarkets />);

    // Wait for markets to be rendered
    await waitFor(() => {
      expect(screen.getByText('Test Market 1')).toBeInTheDocument();
      expect(screen.getByText('Test Market 2')).toBeInTheDocument();
    });
  });

  test('handles error when fetching markets fails', async () => {
    // Mock API to throw an error
    getMyMarkets.mockRejectedValue(new Error('Fetch failed'));

    render(<GetMyMarkets />);

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('Error fetching active markets')).toBeInTheDocument();
    });
  });

  test('settling a market successfully', async () => {
    // Mock API to return markets and settle market
    getMyMarkets.mockResolvedValue({ data: mockMarkets });
    settleMarket.mockResolvedValue({ data: { settled: true } });

    render(<GetMyMarkets />);

    // Wait for markets to be rendered
    await waitFor(() => {
      expect(screen.getByText('Test Market 1')).toBeInTheDocument();
    });

    // Find and click the "Settle Market" button for the first market
    const settleButtons = screen.getAllByText('Settle Market');
    fireEvent.click(settleButtons[0]);

    // Verify settle modal opens and buttons are present
    await waitFor(() => {
      expect(screen.getByText(`Choose the winner for the market "${mockMarkets[0].name}"`)).toBeInTheDocument();
      expect(screen.getByText(`${mockMarkets[0].sides.sideOne} Wins`)).toBeInTheDocument();
      expect(screen.getByText(`${mockMarkets[0].sides.sideTwo} Wins`)).toBeInTheDocument();
    });

    // Click to settle with first side
    const sideOneWinsButton = screen.getByText(`${mockMarkets[0].sides.sideOne} Wins`);
    fireEvent.click(sideOneWinsButton);

    // Verify settle market API was called
    await waitFor(() => {
      expect(settleMarket).toHaveBeenCalledTimes(1);
      expect(settleMarket).toHaveBeenCalledWith(
        mockMarkets[0].market_id, 
        mockMarkets[0].sides.sideOne
      );
    });
  });

  test('handles market settlement error', async () => {
    // Mock API to return markets and fail market settlement
    getMyMarkets.mockResolvedValue({ data: mockMarkets });
    settleMarket.mockRejectedValue(new Error('Settlement failed'));

    render(<GetMyMarkets />);

    // Wait for markets to be rendered
    await waitFor(() => {
      expect(screen.getByText('Test Market 1')).toBeInTheDocument();
    });

    // Find and click the "Settle Market" button for the first market
    const settleButtons = screen.getAllByText('Settle Market');
    fireEvent.click(settleButtons[0]);

    // Click to settle with first side
    const sideOneWinsButton = screen.getByText(`${mockMarkets[0].sides.sideOne} Wins`);
    fireEvent.click(sideOneWinsButton);

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('Error settling market')).toBeInTheDocument();
    });
  });
});