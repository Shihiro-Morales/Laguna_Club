'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Usuario } from '@/lib/types';
import { login, register, logout, getCurrentUser, setCurrentUser, getTokens } from '@/lib/api-client';

interface AuthContextType {
  user: Usuario | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
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

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await login(email, password);
      setUser(response.user);
      setCurrentUser(response.user);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (userData: any) => {
    setLoading(true);
    try {
      const response = await register(userData);
      setUser(response.user);
      setCurrentUser(response.user);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    localStorage.removeItem('user');
  };

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
