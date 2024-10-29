import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUp from './SignUp';
import { BrowserRouter } from 'react-router-dom';
import * as auth from 'aws-amplify/auth';

// Mock the external dependencies
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('aws-amplify/auth', () => ({
  signUp: jest.fn(),
  signInWithRedirect: jest.fn(),
}));

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

describe('SignUp Component', () => {
  const renderComponent = () => render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders SignUp component', () => {
    renderComponent();
    expect(screen.getByRole('heading', { name: 'Sign Up' })).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Create Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
  });

  test('updates form data on input change', () => {
    renderComponent();
    const emailInput = screen.getByLabelText('Email');
    const createPasswordInput = screen.getByLabelText('Create Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(createPasswordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(createPasswordInput).toHaveValue('password123');
    expect(confirmPasswordInput).toHaveValue('password123');
  });

  test('calls signUp function on form submission', async () => {
    renderComponent();
    const emailInput = screen.getByLabelText('Email');
    const createPasswordInput = screen.getByLabelText('Create Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    const signUpButton = screen.getByRole('button', { name: 'Sign Up' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(createPasswordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(signUpButton);

    await waitFor(() => {
      expect(auth.signUp).toHaveBeenCalledWith({
        username: 'test@example.com',
        password: 'password123',
        attributes: {
          email: 'test@example.com',
        },
      });
    });
  });

  test('displays login link', () => {
    renderComponent();
    const loginLink = screen.getByText('Login');
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');
  });

  test('calls signInWithRedirect when Google button is clicked', () => {
    renderComponent();
    const googleButton = screen.getByText('Google');
    fireEvent.click(googleButton);
    expect(auth.signInWithRedirect).toHaveBeenCalledWith({ provider: 'Google' });
  });
});