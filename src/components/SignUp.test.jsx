import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { signIn, signInWithRedirect } from 'aws-amplify/auth';
import userEvent from '@testing-library/user-event';
import SignUp from './SignUp';

// Mock the required modules
jest.mock('aws-amplify/auth', () => ({
  signIn: jest.fn(),
  signInWithRedirect: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Mock framer-motion to avoid animation-related issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

describe('SignUp Component (Login Page)', () => {
  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('renders the login form with all necessary elements', () => {
      renderComponent();
      
      // Check for main elements
      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
      expect(screen.getByTestId('password-input')).toBeInTheDocument();
      expect(screen.getByText(/don't have an account\?/i)).toBeInTheDocument();
      
      // Check for the submit button
      const submitButton = screen.getByText('Sign In').closest('button');
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveAttribute('type', 'submit');
      
      // Check for Google button
      expect(screen.getByText(/google/i)).toBeInTheDocument();
    });
  });

  describe('Form Interactions', () => {
    test('updates email input value on change', async () => {
      renderComponent();
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      
      await userEvent.type(emailInput, 'test@example.com');
      
      expect(emailInput.value).toBe('test@example.com');
    });

    test('updates password input value on change', async () => {
      renderComponent();
      const passwordInput = screen.getByTestId('password-input');
      
      await userEvent.type(passwordInput, 'password123');
      
      expect(passwordInput.value).toBe('password123');
    });
  });

  describe('Form Submission', () => {
    test('calls signIn with correct credentials on form submission', async () => {
      renderComponent();
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      const passwordInput = screen.getByTestId('password-input');
      const submitButton = screen.getByText('Sign In').closest('button');

      await userEvent.type(emailInput, 'test@example.com');
      await userEvent.type(passwordInput, 'password123');
      await userEvent.click(submitButton);

      expect(signIn).toHaveBeenCalledWith({
        username: 'test@example.com',
        password: 'password123',
      });
    });

    test('handles signin error correctly', async () => {
      const consoleSpy = jest.spyOn(console, 'log');
      signIn.mockRejectedValueOnce(new Error('Invalid credentials'));
      
      renderComponent();
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      const passwordInput = screen.getByTestId('password-input');
      const submitButton = screen.getByText('Sign In').closest('button');

      await userEvent.type(emailInput, 'test@example.com');
      await userEvent.type(passwordInput, 'wrongpassword');
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('error signing in', expect.any(Error));
      });
    });
  });

  describe('Google Sign In', () => {
    test('calls signInWithRedirect when Google button is clicked', async () => {
      renderComponent();
      const googleButton = screen.getByText(/google/i).closest('button');
      
      await userEvent.click(googleButton);
      
      expect(signInWithRedirect).toHaveBeenCalledWith({ provider: 'Google' });
    });
  });

  describe('Form Validation', () => {
    test('requires email field', async () => {
      renderComponent();
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      const submitButton = screen.getByText('Sign In').closest('button');
      
      // Try to submit without filling email
      await userEvent.click(submitButton);
      
      // Check if the HTML5 validation is working
      expect(emailInput).toBeInvalid();
    });

    test('requires password field', async () => {
      renderComponent();
      const passwordInput = screen.getByTestId('password-input');
      const submitButton = screen.getByText('Sign In').closest('button');
      
      // Try to submit without filling password
      await userEvent.click(submitButton);
      
      // Check if the HTML5 validation is working
      expect(passwordInput).toBeInvalid();
    });

    test('validates email format', async () => {
      renderComponent();
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      
      await userEvent.type(emailInput, 'invalid-email');
      
      // Check if the HTML5 validation is working
      expect(emailInput).toBeInvalid();
      
      await userEvent.clear(emailInput);
      await userEvent.type(emailInput, 'valid@email.com');
      
      expect(emailInput).toBeValid();
    });
  });

  describe('Navigation', () => {
    test('renders sign up link that navigates to signup page', () => {
      renderComponent();
      const signUpLink = screen.getByText('Sign Up');
      expect(signUpLink).toHaveAttribute('to', '/signup');
    });
  });
});