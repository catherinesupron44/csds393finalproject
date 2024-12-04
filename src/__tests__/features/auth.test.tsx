import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../../App';
import { useAuthStore } from '../../lib/store';

const renderApp = (ui: React.ReactElement) => {
  return render(ui); // Remove BrowserRouter wrapper, assuming App already handles routing.
};

describe('Authentication Flow', () => {
  beforeEach(() => {
    useAuthStore.getState().logout();  // Ensure clean state before each test
  });

  it('shows login modal when clicking sign in button', async () => {
    renderApp(<App />);
    
    await userEvent.click(screen.getByText('Sign In'));
    
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('handles successful login flow', async () => {
    renderApp(<App />);
    
    // Open login modal
    await userEvent.click(screen.getByText('Sign In'));
    
    // Fill in credentials
    await userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Password'), 'password123');
    
    // Submit form
    await userEvent.click(screen.getByRole('button', { name: 'Sign In' }));
    
    // Verify user is logged in
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('handles sign up flow', async () => {
    renderApp(<App />);
    
    // Open login modal
    await userEvent.click(screen.getByText('Sign In'));
    
    // Switch to sign up
    await userEvent.click(screen.getByText("Don't have an account? Sign up"));
    
    // Fill in sign up form
    await userEvent.type(screen.getByLabelText('Email'), 'newuser@example.com');
    await userEvent.type(screen.getByLabelText('Password'), 'newpassword123');
    
    // Submit form
    await userEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
    
    // Verify user is logged in
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
  });

  it('redirects to dashboard after login', async () => {
    renderApp(<App />);
    
    await userEvent.click(screen.getByText('Sign In'));
    await userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Password'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: 'Sign In' }));
    
    expect(window.location.pathname).toBe('/dashboard');
  });

  it('displays error on failed login attempt', async () => {
    renderApp(<App />);
    
    // Open login modal
    await userEvent.click(screen.getByText('Sign In'));
    
    // Fill in incorrect credentials
    await userEvent.type(screen.getByLabelText('Email'), 'wrong@example.com');
    await userEvent.type(screen.getByLabelText('Password'), 'wrongpassword');
    
    // Submit form
    await userEvent.click(screen.getByRole('button', { name: 'Sign In' }));
    
    // Verify error message is shown
    expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });

  it('displays error on failed signup attempt with existing email', async () => {
    renderApp(<App />);
    
    // Open login modal and switch to sign up
    await userEvent.click(screen.getByText('Sign In'));
    await userEvent.click(screen.getByText("Don't have an account? Sign up"));
    
    // Fill in an email that's already registered
    await userEvent.type(screen.getByLabelText('Email'), 'test@example.com');  // Assume this email already exists
    await userEvent.type(screen.getByLabelText('Password'), 'password123');
    
    // Submit form
    await userEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
    
    // Verify error message is shown
    expect(screen.getByText('Email already exists')).toBeInTheDocument();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });

});
