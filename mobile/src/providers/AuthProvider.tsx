import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import type {
  AuthContextType,
  RegisterData,
  UpdateUserData,
  User,
} from '../modules/auth/api/types';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isLoggingOut = useRef(false);

  // Load token from AsyncStorage on mount
  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('auth_token');
        const storedUser = await AsyncStorage.getItem('auth_user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error loading stored auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredAuth();
  }, []);

  // Save token/user to AsyncStorage
  useEffect(() => {
    if (isLoggingOut.current) return;

    const saveAuth = async () => {
      try {
        if (token && user) {
          await AsyncStorage.setItem('auth_token', token);
          await AsyncStorage.setItem('auth_user', JSON.stringify(user));
        } else {
          await AsyncStorage.removeItem('auth_token');
          await AsyncStorage.removeItem('auth_user');
        }
      } catch (error) {
        console.error('Error saving auth:', error);
      }
    };

    saveAuth();
  }, [token, user]);

  const login = useCallback(async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Implement actual API call
      // For now, simulate successful login
      const mockUser: User = {
        _id: '1',
        username,
        fullname: username,
        role: 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const mockToken = 'mock_token_' + Date.now();

      setUser(mockUser);
      setToken(mockToken);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Сталася невідома помилка');
      }
      setUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(
    async (data: RegisterData) => {
      setIsLoading(true);
      setError(null);

      try {
        // TODO: Implement actual API call
        // For now, simulate successful registration and login
        await login(data.username, data.password);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Сталася невідома помилка');
        }
      } finally {
        setIsLoading(false);
      }
    },
    [login]
  );

  const logout = useCallback(async () => {
    isLoggingOut.current = true;
    setUser(null);
    setToken(null);
    setError(null);

    try {
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('auth_user');
    } catch (error) {
      console.error('Error clearing auth storage:', error);
    }

    setTimeout(() => {
      isLoggingOut.current = false;
    }, 100);
  }, []);

  const updateUser = useCallback(
    async (data: UpdateUserData) => {
      if (!user || !token) return;

      setIsLoading(true);
      setError(null);

      try {
        // TODO: Implement actual API call
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Сталася невідома помилка');
        }
      } finally {
        setIsLoading(false);
      }
    },
    [user, token]
  );

  const fetchCurrentUser = useCallback(async () => {
    if (!user || !token) return;

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Implement actual API call
      // For now, just refresh the current user data
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Сталася невідома помилка');
      }
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [user, token, logout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        error,
        login,
        register,
        logout,
        updateUser,
        fetchCurrentUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
