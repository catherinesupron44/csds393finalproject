import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { signUp, signInWithRedirect } from 'aws-amplify/auth';
import SignUp from '../../components/SignUp'; 
import '@testing-library/jest-dom';

// Mock dependencies
jest.mock('aws-amplify/auth', () => ({
  signUp: jest.fn(),
  signInWithRedirect: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('SignUp Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock useNavigate
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
  });

  const renderComponent = () => {
    render(
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
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: name } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: email } });
    fireEvent.change(screen.getByLabelText(/^create password/i), { target: { value: password } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: confirmPassword } });
  };

  test('renders signup form correctly', () => {
    renderComponent();
  
    // Ensure the correct number of "Sign Up" elements are found
    expect(screen.getAllByText(/Sign Up/i)).toHaveLength(2);  // Adjust for both <h2> and <button>
  
    // Check for the heading and button specifically
    expect(screen.getByRole('heading', { name: /Sign Up/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  
    // Check for form fields
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^create password/i)).toBeInTheDocument();
  });

  test('handles form submission successfully', async () => {
    // Cast `signUp` as a Jest mock and mock its implementation
    (signUp as jest.Mock).mockResolvedValue({});

    renderComponent();

    fillOutForm();

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(signUp).toHaveBeenCalledWith({
        username: 'john@example.com',
        password: 'Password123!',
        options: {
          userAttributes: {
            email: 'john@example.com',
            name: 'John Doe',
          },
          autoSignIn: true,
        },
      });
      expect(mockNavigate).toHaveBeenCalledWith('/home', { state: { email: 'john@example.com' } });
    });
  });

  test('displays error when passwords do not match', async () => {
    renderComponent();

    fillOutForm('John Doe', 'john@example.com', 'Password123!', 'DifferentPassword');

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
      expect(signUp).not.toHaveBeenCalled();
    });
  });

  test('handles signup error', async () => {
    const mockError = new Error('Signup failed');
    (signUp as jest.Mock).mockRejectedValue(mockError);

    renderComponent();

    fillOutForm();

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/Error signing up: Signup failed/i)).toBeInTheDocument();
    });
  });

  test('google signup button calls signInWithRedirect', () => {
    renderComponent();

    fireEvent.click(screen.getByRole('button', { name: /Google/i }));

    expect(signInWithRedirect).toHaveBeenCalledWith({ provider: 'Google' });
  });

  test('renders login link', () => {
    renderComponent();

    const loginLink = screen.getByRole('link', { name: /login/i });
    expect(loginLink).toHaveAttribute('href', '/login');
  });
});
