import React, { createContext, useState, useEffect } from 'react';
import { BASE_URL as API_URL, mapToUser } from '@/utils';
import { UserType } from '@/type/monicka';

type AuthContextType = {
  accessToken: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAccessToken: (token: string) => void;
  authenticate: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  refreshAccessToken: () => Promise<void>;
  logout: () => Promise<void>;
  user: UserType | undefined;
};

export const AuthContext = createContext<AuthContextType>({
  accessToken: '',
  isAuthenticated: false,
  isLoading: true,
  setAccessToken: () => {},
  authenticate: async () => ({ success: false, error: 'Not implemented' }),
  refreshAccessToken: async () => {},
  logout: async () => {},
  user: undefined,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserType>()

  useEffect(() => {
    // On app load, try to refresh access if refresh exists
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      await refreshAccessToken();
    } catch (error) {
      console.error('Failed to initialize auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const authenticate = async (username: string, password: string) => {
    try {
      console.log('[Auth] Attempting to authenticate:', username);
      const response = await fetch(`${API_URL}/api/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      
      if (!response.ok) {
        const error = await response.text();
        console.error('[Auth] Authentication failed:', response.status, error);
        throw new Error('Authentication failed: ' + response.status);
      }
      
      const { access, refresh, user } = await response.json();
      setUser(mapToUser(user));
      console.log('[Auth] Received tokens, storing...');
      
      // Store tokens securely
      await (window as any).electronAPI.storeToken('refresh', refresh);
      await (window as any).electronAPI.storeToken('access', access);
      
      console.log('[Auth] Tokens stored successfully');
      
      setAccessToken(access);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      console.error('[Auth] Authentication error:', error);
      setIsAuthenticated(false);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  };

  const refreshAccessToken = async () => {
    try {
      console.log('[Auth Refresh] Attempting to refresh token...');
      const refresh = await (window as any).electronAPI.getToken('refresh');
      console.log('[Auth Refresh] Refresh token retrieved:', refresh ? 'Found' : 'Not found');

      // If no refresh token exists, we can't refresh - user needs to login
      if (!refresh) {
        console.log('[Auth Refresh] No refresh token available, user needs to authenticate');
        setIsAuthenticated(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh }),
      });
      console.log('[Auth Refresh] Response status:', response.status);
      if (!response.ok) throw new Error('Refresh failed');
      const { access, user } = await response.json();
      setUser(mapToUser(user));
      
      console.log('[Auth Refresh] New access token received, storing...');
      // Store new access token
      await (window as any).electronAPI.storeToken('access', access);
      
      setAccessToken(access);
      setIsAuthenticated(true);
      console.log('[Auth Refresh] Successfully refreshed token');
    } catch (error) {
      console.error('[Auth Refresh] Refresh failed:', error);
      // Logout or prompt re-login
      await (window as any).electronAPI.deleteToken('refresh');
      await (window as any).electronAPI.deleteToken('access');
      setAccessToken('');
      setIsAuthenticated(false);
    }
  };

  const logout = async () => {
    await (window as any).electronAPI.deleteToken('refresh');
    await (window as any).electronAPI.deleteToken('access');
    setAccessToken('');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ accessToken, isAuthenticated, isLoading, setAccessToken, authenticate, refreshAccessToken, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};