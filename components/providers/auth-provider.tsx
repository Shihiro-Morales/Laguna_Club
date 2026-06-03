'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Usuario } from '@/lib/types';
import { 
  login as apiLogin, 
  register as apiRegister, 
  logout as apiLogout, 
  getCurrentUser, 
  setCurrentUser, 
  getTokens,
  APIError
} from '@/lib/api-client';
import { notifications } from '@/lib/notifications';

interface AuthContextType {
  user: Usuario | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  // Inicializar usuario desde localStorage
  useEffect(() => {
    const storedUser = getCurrentUser();
    const { accessToken } = getTokens();
    
    if (accessToken && storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const handleLogin = useCallback(async (username: string, password: string) => {
    setLoading(true);
    try {
      const response = await apiLogin(username, password);
      const userData = response.user;
      setUser(userData);
      setCurrentUser(userData);
    } catch (error) {
      throw error; // Re-throw for component to handle
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRegister = useCallback(async (userData: any) => {
    setLoading(true);
    try {
      const response = await apiRegister(userData);
      // If backend returns user data with tokens, set the user
      if (response.user) {
        setUser(response.user);
        setCurrentUser(response.user);
      } else if (response.id) {
        // Registration successful but no auto-login
        const newUser = {
          id: response.id,
          username: response.username,
          email: response.email,
          first_name: response.first_name,
          last_name: response.last_name,
          is_active: true,
        };
        setUser(newUser);
        setCurrentUser(newUser);
      }
    } catch (error) {
      throw error; // Re-throw for component to handle
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = useCallback(() => {
    apiLogout();
    setUser(null);
    notifications.logoutSuccess();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user && !!getTokens().accessToken,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
}
