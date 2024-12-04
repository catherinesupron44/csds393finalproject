import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AuthModal from '../../components/AuthModal';
import '@testing-library/jest-dom';

describe('AuthModal', () => {
  const mockOnClose = jest.fn();
  const mockOnLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders sign in form by default', () => {
    render(
      <AuthModal 
        isOpen={true} 
        onClose={mockOnClose} 
        onLogin={mockOnLogin} 
      />
    );
    
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('toggles between sign in and sign up', async () => {
    render(
      <AuthModal 
        isOpen={true} 
        onClose={mockOnClose} 
        onLogin={mockOnLogin} 
      />
    );
    
    await userEvent.click(screen.getByText("Don't have an account? Sign up"));
    expect(screen.getByText('Create Account')).toBeInTheDocument();
    
    await userEvent.click(screen.getByText('Already have an account? Sign in'));
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
  });

  it('calls onLogin with form data when submitted', async () => {
    render(
      <AuthModal 
        isOpen={true} 
        onClose={mockOnClose} 
        onLogin={mockOnLogin} 
      />
    );
    
    await userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Password'), 'password123');
    
    fireEvent.submit(screen.getByRole('button', { name: 'Sign In' }));
    
    expect(mockOnLogin).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('calls onClose when close button is clicked', async () => {
    render(
      <AuthModal 
        isOpen={true} 
        onClose={mockOnClose} 
        onLogin={mockOnLogin} 
      />
    );
    
    await userEvent.click(screen.getByRole('button', { name: '' })); // Close button
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not render when isOpen is false', () => {
    render(
      <AuthModal 
        isOpen={false} 
        onClose={mockOnClose} 
        onLogin={mockOnLogin} 
      />
    );
    
    expect(screen.queryByText('Welcome Back')).not.toBeInTheDocument();
  });
});