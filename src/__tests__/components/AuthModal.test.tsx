import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { signUp, signIn, signInWithRedirect } from 'aws-amplify/auth';
import AuthModal from '../../components/AuthModal'; 

import '@testing-library/jest-dom';


// Mock dependencies
jest.mock('aws-amplify/auth', () => ({
  signUp: jest.fn(),
  signIn: jest.fn(),
  signInWithRedirect: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

describe('AuthModal Component', () => {
  const mockOnClose = jest.fn();
  const renderComponent = (isOpen = true, props = {}) => {
    return render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route 
            path="/" 
            element={
              <AuthModal 
                isOpen={isOpen} 
                onClose={mockOnClose} 
                {...props} 
              />
            } 
          />
          <Route path="/dashboard" element={<div>Dashboard</div>} />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders sign in modal by default', () => {
    renderComponent();

    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  test('switches to sign up mode', () => {
    renderComponent();

    const switchToSignUpButton = screen.getByText("Don't have an account? Sign up");
    fireEvent.click(switchToSignUpButton);

    expect(screen.getByText('Create Account')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'New User' } });
  });

  test('handles sign in successfully', async () => {
    (signIn as jest.Mock).mockResolvedValue({ isSignedIn: true });

    renderComponent();

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Sign In'));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith({
        username: 'test@example.com',
        password: 'password123'
      });
    });
  });

  test('handles sign up successfully', async () => {
    (signUp as jest.Mock).mockResolvedValue({});

    renderComponent();

    // Switch to sign up
    const switchToSignUpButton = screen.getByText("Don't have an account? Sign up");
    fireEvent.click(switchToSignUpButton);

    // Fill out sign up form
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'newuser@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'New User' } });
    
    fireEvent.click(screen.getByText('Sign Up'));

    await waitFor(() => {
      expect(signUp).toHaveBeenCalledWith({
        username: 'newuser@example.com',
        password: 'password123',
        options: {
          userAttributes: {
            email: 'newuser@example.com',
            name: 'New User'
          },
          autoSignIn: true
        }
      });
    });
  });

  test('shows error when passwords do not match', async () => {
    renderComponent();
  
    // Switch to sign up
    const switchToSignUpButton = screen.getByText("Don't have an account? Sign up");
    fireEvent.click(switchToSignUpButton);
  
    // Fill out form with mismatched passwords
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'newuser@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'differentpassword' } });
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'New User' } });
    
    fireEvent.click(screen.getByText('Sign Up'));
  
    await waitFor(() => {
      expect(screen.getByText(/Error signing up: Passwords do not match/i)).toBeInTheDocument();

    
    });
  });
  

  test('handles Google sign in redirect', () => {
    renderComponent();

    const googleSignInButton = screen.getByText('Google');
    fireEvent.click(googleSignInButton);

    expect(signInWithRedirect).toHaveBeenCalledWith({ provider: "Google" });
  });

  test('closes modal when close button is clicked', () => {
    renderComponent();

    const closeButton = screen.getByRole('button', { name: '' }); // X button has no text
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  test('does not render when isOpen is false', () => {
    const { container } = renderComponent(false);
    expect(container.firstChild).toBeNull();
  });
});