
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserProfile {
  nombre: string;
  apellidos: string;
  email: string;
  direccion: string;
}

interface User {
  email: string;
  role: 'guest' | 'owner';
  profile?: UserProfile;
}

interface UserContextType {
  user: User | null;
  login: (email: string, role: 'guest' | 'owner') => void;
  logout: () => void;
  isOwner: () => boolean;
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
    // Para demo, simular login automático como owner
    return { email: 'admin@gopet.pe', role: 'owner' };
  });

  useEffect(() => {
    // Cargar perfil del usuario si existe
    if (user && user.role === 'guest') {
      const savedProfile = localStorage.getItem('user_profile');
      if (savedProfile) {
        try {
          const profile = JSON.parse(savedProfile);
          setUser(prev => prev ? { ...prev, profile } : null);
        } catch (error) {
          console.error('Error loading user profile:', error);
        }
      }
    }
  }, [user?.email]);

  const login = (email: string, role: 'guest' | 'owner') => {
    const newUser: User = { email, role };
    
    if (role === 'guest') {
      const savedProfile = localStorage.getItem('user_profile');
      if (savedProfile) {
        try {
          newUser.profile = JSON.parse(savedProfile);
        } catch (error) {
          console.error('Error loading profile:', error);
        }
      }
    }
    
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_profile');
  };

  const isOwner = () => {
    return user?.role === 'owner';
  };

  const getUserProfile = () => {
    return user?.profile || null;
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isOwner, getUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};
