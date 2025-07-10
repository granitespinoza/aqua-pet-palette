
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { userService, UserRegistrationData } from '@/services/userService';

interface UserProfile {
  nombre: string;
  apellidos: string;
  email: string;
  direccion: string;
  password: string;
}

interface User {
  email: string;
  profile: UserProfile;
  token?: string;
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: UserProfile) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  getUserProfile: () => UserProfile | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    // Verificar si hay una sesión activa
    const savedUser = localStorage.getItem('current_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (error) {
        console.error('Error loading current user:', error);
        localStorage.removeItem('current_user');
      }
    }
    return null;
  });

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log('Attempting API login for:', email);
      
      // Intentar login con API real
      const apiResult = await userService.login({ email, password });
      
      if (apiResult.success && apiResult.data) {
        console.log('API login successful');
        
        // Login exitoso con API
        const userSession: User = {
          email: email,
          profile: {
            nombre: apiResult.data.nombre || email.split('@')[0],
            apellidos: apiResult.data.apellidos || '',
            email: email,
            direccion: apiResult.data.direccion || '',
            password: password
          },
          token: apiResult.data.token
        };
        
        setUser(userSession);
        localStorage.setItem('current_user', JSON.stringify(userSession));
        
        return { success: true };
      }
      
      console.log('API login failed, trying localStorage fallback');
      
      // Fallback a localStorage si API falla
      const usersDB = localStorage.getItem('users_db');
      const users: UserProfile[] = usersDB ? JSON.parse(usersDB) : [];
      
      const foundUser = users.find(u => u.email === email);
      
      if (!foundUser) {
        return { success: false, error: 'no-user' };
      }
      
      if (foundUser.password !== password) {
        return { success: false, error: 'bad-pass' };
      }
      
      // Login exitoso con localStorage
      const userSession: User = {
        email: foundUser.email,
        profile: foundUser
      };
      
      setUser(userSession);
      localStorage.setItem('current_user', JSON.stringify(userSession));
      
      return { success: true };
      
    } catch (error) {
      console.error('Error during login:', error);
      return { success: false, error: 'unknown' };
    }
  };

  const register = async (userData: UserProfile): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log('Attempting API registration for:', userData.email);
      
      // Intentar registro con API real
      const apiResult = await userService.register(userData as UserRegistrationData);
      
      if (apiResult.success) {
        console.log('API registration successful');
        
        // Registro exitoso con API, iniciar sesión automáticamente
        const userSession: User = {
          email: userData.email,
          profile: userData,
          token: apiResult.data?.token
        };
        
        setUser(userSession);
        localStorage.setItem('current_user', JSON.stringify(userSession));
        
        return { success: true };
      }
      
      console.log('API registration failed, trying localStorage fallback');
      
      // Fallback a localStorage si API falla
      const usersDB = localStorage.getItem('users_db');
      const users: UserProfile[] = usersDB ? JSON.parse(usersDB) : [];
      
      // Verificar si el email ya existe en localStorage
      const existingUser = users.find(u => u.email === userData.email);
      if (existingUser) {
        return { success: false, error: 'email-exists' };
      }
      
      // Agregar nuevo usuario a localStorage
      users.push(userData);
      localStorage.setItem('users_db', JSON.stringify(users));
      
      // Iniciar sesión automáticamente
      const userSession: User = {
        email: userData.email,
        profile: userData
      };
      
      setUser(userSession);
      localStorage.setItem('current_user', JSON.stringify(userSession));
      
      return { success: true };
      
    } catch (error) {
      console.error('Error during registration:', error);
      return { success: false, error: 'unknown' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('current_user');
  };

  const getUserProfile = () => {
    return user?.profile || null;
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout, getUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};
