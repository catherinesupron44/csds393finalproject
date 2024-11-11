import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import App from '../../App';
import { useAuthStore } from '../../lib/store';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {ui}
    </BrowserRouter>
  );
};

describe('Authentication Flow', () => {
  beforeEach(() => {
    useAuthStore.getState().logout();
  });

  it('shows login modal when clicking sign in button', async () => {
    renderWithRouter(<App />);
    
    await userEvent.click(screen.getByText('Sign In'));
    
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('handles successful login flow', async () => {
    renderWithRouter(<App />);
    
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
    renderWithRouter(<App />);
    
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
    renderWithRouter(<App />);
    
    await userEvent.click(screen.getByText('Sign In'));
    await userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Password'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: 'Sign In' }));
    
    expect(window.location.pathname).toBe('/dashboard');
  });
});