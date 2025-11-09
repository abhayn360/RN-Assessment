import { useState, useEffect } from 'react';
import { getUser, isSignedIn, saveUser, clearUser } from './storage';

/**
 * Custom hook to manage user state with MMKV persistence
 * This replaces the need to rely on Redux for user data
 */
export function useUserStorage() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  const loadUserFromStorage = () => {
    try {
      const savedUser = getUser();
      const signedIn = isSignedIn();
      setUser(savedUser);
      setIsAuthenticated(signedIn && !!savedUser);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData) => {
    try {
      saveUser(userData);
      setUser(userData);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      clearUser();
      setUser(null);
      setIsAuthenticated(false);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateUser = async (updatedUserData) => {
    try {
      const newUserData = { ...user, ...updatedUserData };
      saveUser(newUserData);
      setUser(newUserData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser,
    refresh: loadUserFromStorage,
  };
}

export default useUserStorage;