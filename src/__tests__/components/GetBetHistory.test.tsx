import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import GetBetHistory from '../../components/GetBetHistory';
import { getBetHistory } from '../../api';

// Mock the API module
jest.mock('../../api');

describe('GetBetHistory Component', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders component and fetches bet history successfully', async () => {
    // Prepare mock bet history data
    const mockBetHistory = [
      { description: 'Bet 1' },
      { description: 'Bet 2' }
    ];

    // Mock the API call to return successful response
    getBetHistory.mockResolvedValue({ data: mockBetHistory });

    // Render the component
    render(<GetBetHistory />);

    // Check if heading is rendered
    expect(screen.getByText('Bet History')).toBeInTheDocument();

    // Wait for and check bet history items
    await waitFor(() => {
      expect(screen.getByText('Bet 1')).toBeInTheDocument();
      expect(screen.getByText('Bet 2')).toBeInTheDocument();
    });

    // Verify API was called
    expect(getBetHistory).toHaveBeenCalledTimes(1);
  });

  test('handles error when fetching bet history fails', async () => {
    // Mock the API call to throw an error
    getBetHistory.mockRejectedValue(new Error('Fetch failed'));

    // Render the component
    render(<GetBetHistory />);

    // Wait for and check error message
    await waitFor(() => {
      expect(screen.getByText('Error fetching bet history')).toBeInTheDocument();
    });

    // Verify API was called
    expect(getBetHistory).toHaveBeenCalledTimes(1);
  });

  test('renders empty list when no bet history is available', async () => {
    // Mock the API call to return an empty array
    getBetHistory.mockResolvedValue({ data: [] });

    // Render the component
    render(<GetBetHistory />);

    // Check if heading is rendered
    expect(screen.getByText('Bet History')).toBeInTheDocument();

    // Verify no list items are present
    await waitFor(() => {
      const listItems = screen.queryAllByRole('listitem');
      expect(listItems).toHaveLength(0);
    });
  });
});