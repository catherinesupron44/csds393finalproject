import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import GetMarketInformation from '../../components/GetMarketInformation';
import { getMarketInformation } from '../../api';

// Mock the API call
jest.mock('../../api', () => ({
  getMarketInformation: jest.fn()
}));

describe('GetMarketInformation Component', () => {
  const mockMarketId = '123';
  const mockMarketInfo = {
    id: '123',
    name: 'Test Market',
    description: 'A test market',
    price: 100
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders component and fetches market information successfully', async () => {
    // Mock successful API call
    (getMarketInformation as jest.Mock).mockResolvedValue(mockMarketInfo);

    render(<GetMarketInformation marketId={mockMarketId} />);

    // Wait for the component to update
    await waitFor(() => {
      // Check for the market information display
      const preElement = screen.getByRole('region', { name: /market information/i });
      expect(preElement).toHaveTextContent(JSON.stringify(mockMarketInfo, null, 2));
    });
  });

  test('renders no market data message when market info is empty', async () => {
    // Mock empty market info
    (getMarketInformation as jest.Mock).mockResolvedValue({});

    render(<GetMarketInformation marketId={mockMarketId} />);

    // Wait for the component to update
    await waitFor(() => {
      const noDataMessage = screen.getByText(/no market data available/i);
      expect(noDataMessage).toBeInTheDocument();
    });
  });

  test('handles missing marketInfo prop gracefully', async () => {
    // Mock API error or no data
    (getMarketInformation as jest.Mock).mockRejectedValue(new Error('No data'));

    render(<GetMarketInformation marketId={mockMarketId} />);

    // Wait for the component to update
    await waitFor(() => {
      const noDataMessage = screen.getByText(/no market data available/i);
      expect(noDataMessage).toBeInTheDocument();
    });
  });
});