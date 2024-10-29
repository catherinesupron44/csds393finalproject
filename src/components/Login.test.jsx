import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';
import * as auth from 'aws-amplify/auth';

// Mock the external dependencies
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('aws-amplify/auth', () => ({
  signIn: jest.fn(),
  signInWithRedirect: jest.fn(),
  getCurrentUser: jest.fn(),
}));

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

describe('Login Component', () => {
  const renderComponent = () => render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Login component', () => {
    renderComponent();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  test('updates form data on input change', () => {
    renderComponent();
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('calls signIn function on form submission', async () => {
    renderComponent();
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const signInButton = screen.getByRole('button', { name: 'Sign In' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(auth.signIn).toHaveBeenCalledWith({
        username: 'test@example.com',
        password: 'password123',
      });
    });
  });

  test('displays sign up link', () => {
    renderComponent();
    const signUpLink = screen.getByText('Sign Up');
    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink).toHaveAttribute('href', '/signup');
  });

  test('calls signInWithRedirect when Google button is clicked', () => {
    renderComponent();
    const googleButton = screen.getByText('Google');
    fireEvent.click(googleButton);
    expect(auth.signInWithRedirect).toHaveBeenCalledWith({ provider: 'Google' });
  });

  test('navigates to home page after successful sign in', async () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

    renderComponent();
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const signInButton = screen.getByRole('button', { name: 'Sign In' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });

  test('logs error when sign in fails', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    auth.signIn.mockRejectedValueOnce(new Error('Sign in failed'));

    renderComponent();
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const signInButton = screen.getByRole('button', { name: 'Sign In' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('error signing in', expect.any(Error));
    });

    consoleSpy.mockRestore();
  });
});