
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { userService, UserRegistrationData, UserLoginData, getTenantId } from '@/services/userService';
import { useTenant } from '@/contexts/TenantContext';

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

  const { tenantId } = useTenant();

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log('🔑 === INICIANDO PROCESO DE LOGIN ===');
      console.log('🏪 UserContext.login - Current tenant:', tenantId);
      console.log('👤 UserContext.login - Email:', email);
      
      // Preparar datos para API con tenant_id
      const apiTenantId = getTenantId(tenantId);
      const loginData: UserLoginData = {
        email,
        password,
        tenant_id: apiTenantId
      };
      
      console.log('📋 Login data prepared:', {
        email: loginData.email,
        tenant_id: loginData.tenant_id,
        password: '[OCULTA]'
      });
      
      console.log('🚀 Attempting API login...');
      
      // Intentar login con API real
      const apiResult = await userService.login(loginData);
      
      if (apiResult.success && apiResult.data) {
        console.log('✅ API login successful');
        console.log('📊 API Response data:', apiResult.data);
        
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
        
        console.log('💾 Saving user session:', {
          ...userSession,
          profile: { ...userSession.profile, password: '[OCULTA]' }
        });
        
        setUser(userSession);
        localStorage.setItem('current_user', JSON.stringify(userSession));
        
        console.log('✅ === LOGIN EXITOSO ===');
        return { success: true };
      }
      
      console.log('⚠️ API login failed, trying localStorage fallback');
      console.log('❌ API Error:', apiResult.error);
      
      // Fallback a localStorage si API falla
      const usersDB = localStorage.getItem('users_db');
      const users: UserProfile[] = usersDB ? JSON.parse(usersDB) : [];
      
      console.log('📁 LocalStorage users found:', users.length);
      
      const foundUser = users.find(u => u.email === email);
      
      if (!foundUser) {
        console.log('❌ User not found in localStorage');
        return { success: false, error: 'no-user' };
      }
      
      if (foundUser.password !== password) {
        console.log('❌ Password mismatch in localStorage');
        return { success: false, error: 'bad-pass' };
      }
      
      console.log('✅ LocalStorage login successful');
      
      // Login exitoso con localStorage
      const userSession: User = {
        email: foundUser.email,
        profile: foundUser
      };
      
      setUser(userSession);
      localStorage.setItem('current_user', JSON.stringify(userSession));
      
      console.log('✅ === LOGIN EXITOSO (LOCALSTORAGE) ===');
      return { success: true };
      
    } catch (error) {
      console.error('💥 === ERROR EN LOGIN ===');
      console.error('💥 Error:', error);
      console.error('💥 === FIN ERROR LOGIN ===');
      return { success: false, error: 'unknown' };
    }
  };

  const register = async (userData: UserProfile): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log('📝 === INICIANDO PROCESO DE REGISTRO ===');
      console.log('🏪 UserContext.register - Current tenant:', tenantId);
      console.log('👤 UserContext.register - User data:', {
        ...userData,
        password: '[OCULTA]'
      });
      
      // Preparar datos para API con tenant_id
      const apiTenantId = getTenantId(tenantId);
      const registrationData: UserRegistrationData = {
        ...userData,
        tenant_id: apiTenantId
      };
      
      console.log('📋 Registration data prepared:', {
        ...registrationData,
        password: '[OCULTA]'
      });
      
      console.log('🚀 Attempting API registration...');
      
      // Intentar registro con API real
      const apiResult = await userService.register(registrationData);
      
      if (apiResult.success) {
        console.log('✅ API registration successful');
        console.log('📊 API Response:', apiResult.data);
        
        // Registro exitoso con API, iniciar sesión automáticamente
        const userSession: User = {
          email: userData.email,
          profile: userData,
          token: apiResult.data?.token
        };
        
        console.log('💾 Saving user session after registration');
        
        setUser(userSession);
        localStorage.setItem('current_user', JSON.stringify(userSession));
        
        console.log('✅ === REGISTRO EXITOSO ===');
        return { success: true };
      }
      
      console.log('⚠️ API registration failed, trying localStorage fallback');
      console.log('❌ API Error:', apiResult.error);
      
      // Fallback a localStorage si API falla
      const usersDB = localStorage.getItem('users_db');
      const users: UserProfile[] = usersDB ? JSON.parse(usersDB) : [];
      
      console.log('📁 LocalStorage users found:', users.length);
      
      // Verificar si el email ya existe en localStorage
      const existingUser = users.find(u => u.email === userData.email);
      if (existingUser) {
        console.log('❌ Email already exists in localStorage');
        return { success: false, error: 'email-exists' };
      }
      
      console.log('💾 Adding user to localStorage');
      
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
      
      console.log('✅ === REGISTRO EXITOSO (LOCALSTORAGE) ===');
      return { success: true };
      
    } catch (error) {
      console.error('💥 === ERROR EN REGISTRO ===');
      console.error('💥 Error:', error);
      console.error('💥 === FIN ERROR REGISTRO ===');
      return { success: false, error: 'unknown' };
    }
  };

  const logout = () => {
    console.log('🚪 Logging out user');
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
