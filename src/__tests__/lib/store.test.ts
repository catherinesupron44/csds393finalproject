import { renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAuthStore } from '../../lib/store';

describe('useAuthStore', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useAuthStore());
    act(() => {
      result.current.logout();
    });
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useAuthStore());
    
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.profile).toBeNull();
  });

  it('handles login successfully', async () => {
    const { result } = renderHook(() => useAuthStore());
    
    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });
    
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.profile).toEqual(expect.objectContaining({
      email: 'test@example.com',
      username: 'demo_user',
    }));
  });

  it('handles logout', () => {
    const { result } = renderHook(() => useAuthStore());
    
    act(() => {
      result.current.logout();
    });
    
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.profile).toBeNull();
  });

  it('updates profile', async () => {
    const { result } = renderHook(() => useAuthStore());
    
    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });
    
    act(() => {
      result.current.updateProfile({ username: 'new_username' });
    });
    
    expect(result.current.profile?.username).toBe('new_username');
  });
});