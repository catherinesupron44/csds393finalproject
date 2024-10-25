import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Login from './SignUp';  // Note: Component might need renaming for clarity
import { signIn, signInWithRedirect } from 'aws-amplify/auth';

// Mock the required dependencies
jest.mock('aws-amplify/auth', () => ({
  signIn: jest.fn(),
  signInWithRedirect: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test component rendering
  it('renders login form correctly', () => {
    renderLogin();
    
    // Check for login-specific text and elements
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /google/i })).toBeInTheDocument();
  });

  // Test form interaction
  it('allows user to enter credentials', async () => {
    renderLogin();
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'mypassword');

    expect(emailInput).toHaveValue('user@example.com');
    expect(passwordInput).toHaveValue('mypassword');
  });

  // Test successful login
  it('handles successful login and redirects to home', async () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);
    
    signIn.mockResolvedValueOnce({});
    
    renderLogin();

    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'correctpassword');
    
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith({
        username: 'user@example.com',
        password: 'correctpassword',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });

  // Test login failures
  describe('handles login failures', () => {
    it('handles invalid credentials', async () => {
      const mockError = new Error('Invalid credentials');
      signIn.mockRejectedValueOnce(mockError);
      
      const consoleSpy = jest.spyOn(console, 'log');
      
      renderLogin();

      await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com');
      await userEvent.type(screen.getByLabelText(/password/i), 'wrongpassword');
      
      fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(signIn).toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalledWith('error signing in', mockError);
      });
    });

    it('requires email field', async () => {
      renderLogin();
      
      const emailInput = screen.getByLabelText(/email/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      await userEvent.type(screen.getByLabelText(/password/i), 'password123');
      fireEvent.click(submitButton);

      expect(emailInput).toBeInvalid();
    });

    it('requires password field', async () => {
      renderLogin();
      
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com');
      fireEvent.click(submitButton);

      expect(passwordInput).toBeInvalid();
    });
  });

  // Test Google sign in
  it('initiates Google sign in when clicking Google button', async () => {
    renderLogin();
    
    const googleButton = screen.getByRole('button', { name: /google/i });
    fireEvent.click(googleButton);

    await waitFor(() => {
      expect(signInWithRedirect).toHaveBeenCalledWith({ provider: 'Google' });
    });
  });

  // Test UI elements
  describe('UI elements', () => {
    it('renders sign up link for new users', () => {
      renderLogin();
      
      const signUpLink = screen.getByText(/sign up/i);
      expect(signUpLink).toBeInTheDocument();
      expect(signUpLink).toHaveAttribute('href', '/signup');
    });

    it('has proper styling classes on the sign in button', () => {
      renderLogin();
      
      const signInButton = screen.getByRole('button', { name: /sign in/i });
      expect(signInButton).toHaveClass('bg-violet-500');
      expect(signInButton).toHaveClass('rounded-full');
    });

    it('renders the divider with "Or continue with" text', () => {
      renderLogin();
      
      expect(screen.getByText(/or continue with/i)).toBeInTheDocument();
    });
  });

  // Test form validation
  describe('form validation', () => {
    it('validates email format', async () => {
      renderLogin();
      
      const emailInput = screen.getByLabelText(/email/i);
      await userEvent.type(emailInput, 'invalid-email');
      
      expect(emailInput).toBeInvalid();
    });

    it('prevents form submission with empty fields', async () => {
      const mockSubmit = jest.fn();
      renderLogin();
      
      const form = screen.getByRole('form');
      form.onsubmit = mockSubmit;
      
      fireEvent.submit(form);
      
      expect(mockSubmit).not.toHaveBeenCalled();
    });
  });
});