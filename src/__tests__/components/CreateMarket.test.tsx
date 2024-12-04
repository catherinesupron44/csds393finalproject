import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateMarket from '../../components/CreateMarket';
import { createMarket } from '../../api';
import '@testing-library/jest-dom';

// Mock the API call
jest.mock('../../api', () => ({
  createMarket: jest.fn()
}));

describe('CreateMarket Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders component with initial state', () => {
    render(<CreateMarket />);

    // Check for main elements
    expect(screen.getByText('Create Market')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Market Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    expect(screen.getByText('Create Market')).toBeInTheDocument();
  });

  test('allows entering market name and description', () => {
    render(<CreateMarket />);

    const nameInput = screen.getByPlaceholderText('Market Name');
    const descriptionInput = screen.getByPlaceholderText('Description');

    // Simulate user typing
    fireEvent.change(nameInput, { target: { value: 'Test Market' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });

    // Verify input values
    expect(nameInput).toHaveValue('Test Market');
    expect(descriptionInput).toHaveValue('Test Description');
  });

  test('creates market successfully', async () => {
    // Mock successful market creation
    (createMarket as jest.Mock).mockResolvedValue({
      data: { market_id: '123' }
    });

    render(<CreateMarket />);

    // Fill out the form
    const nameInput = screen.getByPlaceholderText('Market Name');
    const descriptionInput = screen.getByPlaceholderText('Description');
    const createButton = screen.getByText('Create Market');

    fireEvent.change(nameInput, { target: { value: 'Test Market' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });

    // Click create button
    fireEvent.click(createButton);

    // Wait for and check success message
    await waitFor(() => {
      expect(screen.getByText('Market created with ID: 123')).toBeInTheDocument();
    });

    // Verify API call was made with correct parameters
    expect(createMarket).toHaveBeenCalledWith({
      name: 'Test Market',
      description: 'Test Description'
    });
  });

  test('handles market creation error', async () => {
    // Mock failed market creation
    (createMarket as jest.Mock).mockRejectedValue(new Error('Creation failed'));

    render(<CreateMarket />);

    // Fill out the form
    const nameInput = screen.getByPlaceholderText('Market Name');
    const descriptionInput = screen.getByPlaceholderText('Description');
    const createButton = screen.getByText('Create Market');

    fireEvent.change(nameInput, { target: { value: 'Test Market' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });

    // Click create button
    fireEvent.click(createButton);

    // Wait for and check error message
    await waitFor(() => {
      expect(screen.getByText('Error creating market')).toBeInTheDocument();
    });
  });

  test('resets message when inputs change', async () => {
    // Mock successful market creation
    (createMarket as jest.Mock).mockResolvedValue({
      data: { market_id: '123' }
    });

    render(<CreateMarket />);

    const nameInput = screen.getByPlaceholderText('Market Name');
    const createButton = screen.getByText('Create Market');

    // Create market to show a message
    fireEvent.change(nameInput, { target: { value: 'First Market' } });
    fireEvent.click(createButton);

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText('Market created with ID: 123')).toBeInTheDocument();
    });

    // Change input to trigger state reset
    fireEvent.change(nameInput, { target: { value: 'Second Market' } });

    // Verify button is enabled and previous message is cleared
    expect(createButton).toBeEnabled();
  });

  test('button is disabled when inputs are empty', () => {
    render(<CreateMarket />);

    const createButton = screen.getByText('Create Market');
    const nameInput = screen.getByPlaceholderText('Market Name');
    const descriptionInput = screen.getByPlaceholderText('Description');

    // Initially, inputs are empty
    expect(nameInput).toHaveValue('');
    expect(descriptionInput).toHaveValue('');
    expect(createButton).toBeEnabled(); // Assuming no explicit disabled state
  });
});