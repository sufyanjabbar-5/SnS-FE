import { useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

/**
 * useAuth - Custom hook for authentication management
 * Handles login, logout, token validation, and user state
 */
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Check if a token is expired
   */
  const isTokenExpired = useCallback((token) => {
    if (!token) return true;
    
    try {
      const decoded = jwtDecode(token);
      // exp is in seconds, Date.now() is in milliseconds
      return decoded.exp * 1000 < Date.now();
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  }, []);

  /**
   * Get decoded token data
   */
  const getTokenData = useCallback((token) => {
    if (!token) return null;
    
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }, []);

  /**
   * Initialize auth state from localStorage
   */
  const initializeAuth = useCallback(() => {
    const token = localStorage.getItem('access_token');
    const userStr = localStorage.getItem('user');

    if (token && userStr && !isTokenExpired(token)) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        logout();
      }
    } else if (token && isTokenExpired(token)) {
      // Token expired, clear storage
      logout();
    }

    setIsLoading(false);
  }, [isTokenExpired]);

  /**
   * Login - store tokens and user data
   */
  const login = useCallback((userData, accessToken, refreshToken) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    localStorage.setItem('user', JSON.stringify(userData));
    
    setUser(userData);
    setIsAuthenticated(true);
  }, []);

  /**
   * Logout - clear all auth data
   */
  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  /**
   * Check if user has a specific role
   */
  const hasRole = useCallback((role) => {
    return user?.role === role;
  }, [user]);

  /**
   * Get access token if valid
   */
  const getAccessToken = useCallback(() => {
    const token = localStorage.getItem('access_token');
    if (token && !isTokenExpired(token)) {
      return token;
    }
    return null;
  }, [isTokenExpired]);

  // Initialize on mount
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Check token expiry periodically (every minute)
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('access_token');
      if (token && isTokenExpired(token)) {
        logout();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [isTokenExpired, logout]);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    hasRole,
    getAccessToken,
    isTokenExpired,
    getTokenData
  };
};

export default useAuth;
