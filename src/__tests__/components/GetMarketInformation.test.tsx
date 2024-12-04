import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import GetMarketInformation from '../../components/GetMarketInformation';
import { getMarketInformation } from '../../api';

// Mock the API module
jest.mock('../../api');

describe('GetMarketInformation Component', () => {
  const mockMarketId = '12345';

  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders component and fetches market information successfully', async () => {
    // Prepare mock market information
    const mockMarketInfo = {
      id: mockMarketId,
      name: 'Test Market',
      price: 100.50,
      volume: 1000
    };

    // Mock the API call to return successful response
    getMarketInformation.mockResolvedValue({ data: mockMarketInfo });

    // Render the component with a market ID
    render(<GetMarketInformation marketId={mockMarketId} />);

    // Check if heading is rendered
    expect(screen.getByText('Market Information')).toBeInTheDocument();

    // Wait for and check market information display
    await waitFor(() => {
      const marketInfoElement = screen.getByText(JSON.stringify(mockMarketInfo, null, 2));
      expect(marketInfoElement).toBeInTheDocument();
    });

    // Verify API was called with correct market ID
    expect(getMarketInformation).toHaveBeenCalledTimes(1);
    expect(getMarketInformation).toHaveBeenCalledWith(mockMarketId);
  });

  test('handles error when fetching market information fails', async () => {
    // Mock the API call to throw an error
    getMarketInformation.mockRejectedValue(new Error('Fetch failed'));

    // Render the component with a market ID
    render(<GetMarketInformation marketId={mockMarketId} />);

    // Wait for and check error message
    await waitFor(() => {
      expect(screen.getByText('Error fetching market information')).toBeInTheDocument();
    });

    // Verify API was called with correct market ID
    expect(getMarketInformation).toHaveBeenCalledTimes(1);
    expect(getMarketInformation).toHaveBeenCalledWith(mockMarketId);
  });

  test('renders no market data message when market info is empty', async () => {
    // Mock the API call to return an empty object
    getMarketInformation.mockResolvedValue({ data: {} });

    // Render the component with a market ID
    render(<GetMarketInformation marketId={mockMarketId} />);

    // Check if heading and "No market data" message are rendered
    await waitFor(() => {
      expect(screen.getByText('Market Information')).toBeInTheDocument();
      expect(screen.getByText('No market data available')).toBeInTheDocument();
    });
  });

});