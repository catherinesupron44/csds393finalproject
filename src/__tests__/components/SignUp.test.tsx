import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { signUp, signInWithRedirect } from 'aws-amplify/auth';
import SignUp from '../../components/SignUp';  // Adjust the import path as needed

// Mock dependencies
jest.mock('aws-amplify/auth', () => ({
  signUp: jest.fn(),
  signInWithRedirect: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

describe('SignUp Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock useNavigate
    require('react-router-dom').useNavigate.mockImplementation(() => mockNavigate);
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
  };

  const fillOutForm = (
    name = 'John Doe', 
    email = 'john@example.com', 
    password = 'Password123!', 
    confirmPassword = 'Password123!'
  ) => {
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^create password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    fireEvent.change(nameInput, { target: { value: name } });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.change(confirmPasswordInput, { target: { value: confirmPassword } });
  };

  test('renders signup form correctly', () => {
    renderComponent();

    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^create password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  test('handles form submission successfully', async () => {
    // Mock successful signup
    signUp.mockResolvedValue({});

    renderComponent();

    // Fill out the form
    fillOutForm();

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /sign up/i });
    fireEvent.click(submitButton);

    // Wait for navigation
    await waitFor(() => {
      expect(signUp).toHaveBeenCalledWith({
        username: 'john@example.com',
        password: 'Password123!',
        options: {
          userAttributes: {
            email: 'john@example.com',
            name: 'John Doe'
          },
          autoSignIn: true
        }
      });
      expect(mockNavigate).toHaveBeenCalledWith('/home', { state: { email: 'john@example.com' } });
    });
  });

  test('displays error when passwords do not match', async () => {
    renderComponent();

    // Fill out the form with mismatched passwords
    fillOutForm('John Doe', 'john@example.com', 'Password123!', 'DifferentPassword');

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /sign up/i });
    fireEvent.click(submitButton);

    // Check for error message
    await waitFor(() => {
      expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
      expect(signUp).not.toHaveBeenCalled();
    });
  });

  test('handles signup error', async () => {
    // Mock signup error
    const mockError = new Error('Signup failed');
    signUp.mockRejectedValue(mockError);

    renderComponent();

    // Fill out the form
    fillOutForm();

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /sign up/i });
    fireEvent.click(submitButton);

    // Wait for and check error message
    await waitFor(() => {
      expect(screen.getByText(/Error signing up: Signup failed/i)).toBeInTheDocument();
    });
  });

  test('google signup button calls signInWithRedirect', () => {
    renderComponent();

    const googleButton = screen.getByRole('button', { name: /Google/i });
    fireEvent.click(googleButton);

    expect(signInWithRedirect).toHaveBeenCalledWith({ provider: 'Google' });
  });

  test('renders login link', () => {
    renderComponent();

    const loginLink = screen.getByRole('link', { name: /login/i });
    expect(loginLink).toHaveAttribute('href', '/login');
  });
});