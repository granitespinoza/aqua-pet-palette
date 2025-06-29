
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  email: string;
  role: 'guest' | 'owner';
}

interface UserContextType {
  user: User | null;
  login: (email: string, role: 'guest' | 'owner') => void;
  logout: () => void;
  isOwner: () => boolean;
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

  const login = (email: string, role: 'guest' | 'owner') => {
    setUser({ email, role });
  };

  const logout = () => {
    setUser(null);
  };

  const isOwner = () => {
    return user?.role === 'owner';
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isOwner }}>
      {children}
    </UserContext.Provider>
  );
};
