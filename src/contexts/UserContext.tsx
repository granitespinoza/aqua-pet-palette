
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { userService, UserRegistrationData, UserLoginData, getTenantId } from '@/services/userService';
import { useTenant } from '@/contexts/TenantContext';
import { purchaseService } from '@/services/purchaseService';

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

  // Limpiar órdenes globales obsoletas al cargar
  useEffect(() => {
    purchaseService.cleanupGlobalOrders();
  }, []);

  const saveUserSession = (userSession: User) => {
    setUser(userSession);
    localStorage.setItem('current_user', JSON.stringify(userSession));
    
    // Guardar token por separado para fácil acceso
    if (userSession.token) {
      localStorage.setItem('authToken', userSession.token);
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log('🔑 === INICIANDO PROCESO DE LOGIN EN USERCONTEXT ===');
      console.log('🏪 Tenant actual:', tenantId);
      console.log('👤 Email a validar:', email);
      
      // Preparar datos para API con tenant_id
      const apiTenantId = getTenantId(tenantId);
      console.log('🔄 Tenant mapeado:', `${tenantId} → ${apiTenantId}`);
      
      const loginData: UserLoginData = {
        email,
        password,
        tenant_id: apiTenantId
      };
      
      console.log('📋 === DATOS PREPARADOS PARA LOGIN ===');
      console.log('📋 LoginData estructura:', {
        email: loginData.email,
        tenant_id: loginData.tenant_id,
        password: `[OCULTA - length: ${loginData.password?.length || 0}]`
      });
      
      // Validación previa
      console.log('🔍 === VALIDACIÓN PREVIA ===');
      if (!loginData.email || loginData.email.trim() === '') {
        console.log('❌ Email vacío');
        return { success: false, error: 'email-required' };
      }
      if (!loginData.password || loginData.password.trim() === '') {
        console.log('❌ Password vacío');
        return { success: false, error: 'password-required' };
      }
      if (!loginData.tenant_id || loginData.tenant_id.trim() === '') {
        console.log('❌ Tenant ID vacío');
        return { success: false, error: 'tenant-required' };
      }
      
      console.log('✅ Validación previa pasada');
      console.log('🚀 Llamando a userService.login...');
      
      // Intentar login con API real
      const apiResult = await userService.login(loginData);
      console.log('📨 Resultado del userService:', apiResult);
      
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
        
        console.log('💾 Guardando sesión de usuario');
        saveUserSession(userSession);
        
        console.log('✅ === LOGIN EXITOSO ===');
        return { success: true };
      }
      
      console.log('⚠️ API login failed, usando localStorage fallback');
      console.log('❌ Error de API:', apiResult.error);
      
      // Fallback a localStorage si API falla
      const usersDB = localStorage.getItem('users_db');
      const users: UserProfile[] = usersDB ? JSON.parse(usersDB) : [];
      
      console.log('📁 Usuarios en localStorage:', users.length);
      
      const foundUser = users.find(u => u.email === email);
      
      if (!foundUser) {
        console.log('❌ Usuario no encontrado en localStorage');
        return { success: false, error: 'no-user' };
      }
      
      if (foundUser.password !== password) {
        console.log('❌ Password incorrecto en localStorage');
        return { success: false, error: 'bad-pass' };
      }
      
      console.log('✅ Login exitoso con localStorage');
      
      // Login exitoso con localStorage
      const userSession: User = {
        email: foundUser.email,
        profile: foundUser
      };
      
      saveUserSession(userSession);
      
      console.log('✅ === LOGIN EXITOSO (LOCALSTORAGE) ===');
      return { success: true };
      
    } catch (error) {
      console.error('💥 === ERROR EN LOGIN ===');
      console.error('💥 Error:', error);
      console.error('💥 Stack:', error instanceof Error ? error.stack : 'No stack');
      return { success: false, error: 'unknown' };
    }
  };

  const register = async (userData: UserProfile): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log('📝 === INICIANDO PROCESO DE REGISTRO EN USERCONTEXT ===');
      console.log('🏪 Tenant actual:', tenantId);
      console.log('👤 Datos del usuario:', {
        ...userData,
        password: `[OCULTA - length: ${userData.password?.length || 0}]`
      });
      
      // Preparar datos para API con tenant_id
      const apiTenantId = getTenantId(tenantId);
      console.log('🔄 Tenant mapeado:', `${tenantId} → ${apiTenantId}`);
      
      const registrationData: UserRegistrationData = {
        ...userData,
        tenant_id: apiTenantId
      };
      
      console.log('📋 === DATOS PREPARADOS PARA REGISTRO ===');
      console.log('📋 RegistrationData estructura:', {
        nombre: registrationData.nombre,
        apellidos: registrationData.apellidos,
        email: registrationData.email,
        direccion: registrationData.direccion,
        tenant_id: registrationData.tenant_id,
        password: `[OCULTA - length: ${registrationData.password?.length || 0}]`
      });
      
      // Validación previa
      console.log('🔍 === VALIDACIÓN PREVIA ===');
      const requiredFields = ['nombre', 'apellidos', 'email', 'direccion', 'password'];
      for (const field of requiredFields) {
        const value = (registrationData as any)[field];
        if (!value || value.trim() === '') {
          console.log(`❌ Campo requerido vacío: ${field}`);
          return { success: false, error: `${field}-required` };
        }
        console.log(`✅ ${field}: OK`);
      }
      
      if (!registrationData.tenant_id || registrationData.tenant_id.trim() === '') {
        console.log('❌ Tenant ID vacío');
        return { success: false, error: 'tenant-required' };
      }
      
      console.log('✅ Validación previa completa');
      console.log('🚀 Llamando a userService.register...');
      
      // Intentar registro con API real
      const apiResult = await userService.register(registrationData);
      console.log('📨 Resultado del userService:', apiResult);
      
      if (apiResult.success) {
        console.log('✅ API registration successful');
        console.log('📊 API Response:', apiResult.data);
        
        // Registro exitoso con API, iniciar sesión automáticamente
        const userSession: User = {
          email: userData.email,
          profile: userData,
          token: apiResult.data?.token
        };
        
        console.log('💾 Guardando sesión después del registro');
        saveUserSession(userSession);
        
        console.log('✅ === REGISTRO EXITOSO ===');
        return { success: true };
      }
      
      console.log('⚠️ API registration failed, usando localStorage fallback');
      console.log('❌ Error de API:', apiResult.error);
      
      // Fallback a localStorage si API falla
      const usersDB = localStorage.getItem('users_db');
      const users: UserProfile[] = usersDB ? JSON.parse(usersDB) : [];
      
      console.log('📁 Usuarios en localStorage:', users.length);
      
      // Verificar si el email ya existe en localStorage
      const existingUser = users.find(u => u.email === userData.email);
      if (existingUser) {
        console.log('❌ Email ya existe en localStorage');
        return { success: false, error: 'email-exists' };
      }
      
      console.log('💾 Agregando usuario a localStorage');
      
      // Agregar nuevo usuario a localStorage
      users.push(userData);
      localStorage.setItem('users_db', JSON.stringify(users));
      
      // Iniciar sesión automáticamente
      const userSession: User = {
        email: userData.email,
        profile: userData
      };
      
      saveUserSession(userSession);
      
      console.log('✅ === REGISTRO EXITOSO (LOCALSTORAGE) ===');
      return { success: true };
      
    } catch (error) {
      console.error('💥 === ERROR EN REGISTRO ===');
      console.error('💥 Error:', error);
      console.error('💥 Stack:', error instanceof Error ? error.stack : 'No stack');
      return { success: false, error: 'unknown' };
    }
  };

  const logout = () => {
    console.log('🚪 Cerrando sesión de usuario');
    setUser(null);
    localStorage.removeItem('current_user');
    localStorage.removeItem('authToken');
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
