import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../../pages/Dashboard';
import '@testing-library/jest-dom';

// Mock the GetActiveMarkets component
jest.mock('../../components/GetActiveMarkets.jsx', () => {
  return function MockGetActiveMarkets() {
    return <div data-testid="get-active-markets">Mocked Active Markets</div>;
  };
});

describe('Dashboard Component', () => {
  test('renders the dashboard container', () => {
    render(<Dashboard />);

    // Query the dashboard container using the test id
    const dashboardContainer = screen.getByTestId('dashboard-container');
    
    // Check if the element has the correct classes
    expect(dashboardContainer).toHaveClass('container mx-auto px-4 py-8 min-h-screen');
    expect(dashboardContainer).toHaveClass('min-h-screen');
  });

  test('renders GetActiveMarkets component', () => {
    render(<Dashboard />);

    // Check if the GetActiveMarkets component is rendered
    const activeMarketsComponent = screen.getByTestId('get-active-markets');
    expect(activeMarketsComponent).toBeInTheDocument();
    expect(activeMarketsComponent).toHaveTextContent('Mocked Active Markets');
  });

  test('matches snapshot', () => {
    const { asFragment } = render(<Dashboard />);
    expect(asFragment()).toMatchSnapshot();
  });
});
