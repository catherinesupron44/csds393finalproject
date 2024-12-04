<<<<<<< Updated upstream
import { useState } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> Stashed changes
import { X } from 'lucide-react';
import { signUp, signIn, signInWithRedirect } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import config from '../amplifyconfiguration.json';

Amplify.configure(config);
const client = generateClient();

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  type FormData = {
    email: string;
    newPassword: string;
    passwordConfirmation: string;
    givenName: string;
  };

  const [formData, setFormData] = useState<FormData>({
    email: '',
    newPassword: '',
    passwordConfirmation: '',
    givenName: '',
  });

  const handleChange = (data: string, value: any) => {
    setFormData({
      ...formData,
      [data]: value,
    });
  };

  if (!isOpen) return null;

  async function handleSignIn() {
    const { email, newPassword } = formData;
    try {
      const { isSignedIn } = await signIn({ username: email, password: newPassword });

      if (isSignedIn) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  const handleSignUp = async () => {
    const { email, newPassword, givenName, passwordConfirmation } = formData;

    if (newPassword !== passwordConfirmation) {
      console.error('Passwords do not match');
      setError('Error signing up: Passwords do not match');
      return;
    }

    try {
      await signUp({
        username: email, // Use the email as the username
        password: newPassword,
        options: {
          userAttributes: {
            email: email,
            name: givenName,
          },
          autoSignIn: true, // Optional
        },
      });

      navigate('/dashboard', { state: { email } });
    } catch (error: any) {
      console.error('Error signing up:', error);
      setError(`Error signing up: ${error.message}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            isSignUp ? handleSignUp() : handleSignIn();
          }}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={formData.newPassword}
              onChange={(e) => handleChange('newPassword', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {isSignUp && (
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                value={formData.passwordConfirmation}
                onChange={(e) =>
                  handleChange('passwordConfirmation', e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          )}

          {isSignUp && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.givenName} // Bound to formData.givenName
                onChange={(e) => handleChange('givenName', e.target.value)} // Updates formData.givenName
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 text-sm text-red-500 bg-red-50 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="button"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={() => signInWithRedirect({ provider: 'Google' })}
          >
            Google
          </button>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-indigo-600 hover:text-indigo-700"
          >
            {isSignUp
              ? 'Already have an account? Sign in'
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
}
