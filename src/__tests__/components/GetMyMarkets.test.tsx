import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import GetMarketInformation from '../../components/GetMarketInformation';

describe('GetMarketInformation Component', () => {
  const mockMarketInfo = {
    id: '12345',
    name: 'Test Market',
    price: 100.5,
    volume: 1000,
  };

  test('renders component and fetches market information successfully', async () => {
    // Render component with mock market info
    render(<GetMarketInformation marketInfo={mockMarketInfo} />);

    // Assert that the heading is displayed
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /market information/i })).toBeInTheDocument();
    });

    // Assert that the market information is displayed
    await waitFor(() => {
      const preElement = screen.getByRole('region', { name: /market information/i });
      expect(preElement).toHaveTextContent(JSON.stringify(mockMarketInfo, null, 2));
    });
  });

  test('renders no market data message when market info is empty', async () => {
    // Render component with empty market info
    render(<GetMarketInformation marketInfo={{}} />);

    // Assert that the heading is displayed
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /market information/i })).toBeInTheDocument();
    });

    // Assert that "No market data available" message is displayed
    await waitFor(() => {
      expect(screen.getByText(/no market data available/i)).toBeInTheDocument();
    });
  });

  test('handles missing marketInfo prop gracefully', async () => {
    // Render component without marketInfo prop
    render(<GetMarketInformation />);

    // Assert that the heading is displayed
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /market information/i })).toBeInTheDocument();
    });

    // Assert that "No market data available" message is displayed
    await waitFor(() => {
      expect(screen.getByText(/no market data available/i)).toBeInTheDocument();
    });
  });
});
