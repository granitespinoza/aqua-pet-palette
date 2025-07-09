
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface TenantConfig {
  id: string;
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  favicon: string;
  domain: string;
}

interface TenantContextType {
  tenant: TenantConfig | null;
  tenantId: string | null;
  isLoading: boolean;
  isPortal: boolean;
  setSelectedTenant: (tenantId: string | null) => void;
}

const TenantContext = createContext<TenantContextType>({
  tenant: null,
  tenantId: null,
  isLoading: true,
  isPortal: false,
  setSelectedTenant: () => {},
});

const TENANT_CONFIGS: Record<string, TenantConfig> = {
  catshop: {
    id: 'catshop',
    name: 'Cat Shop - GO Pet',
    logo: '🐱',
    primaryColor: 'hsl(183, 100%, 94%)',
    secondaryColor: 'hsl(235, 55%, 85%)',
    favicon: '🐱',
    domain: 'catshop.gopet.com'
  },
  dogshop: {
    id: 'dogshop',
    name: 'Dog Shop - GO Pet',
    logo: '🐕',
    primaryColor: 'hsl(27, 100%, 88%)',
    secondaryColor: 'hsl(352, 100%, 81%)',
    favicon: '🐕',
    domain: 'dogshop.gopet.com'
  },
  vetshop: {
    id: 'vetshop',
    name: 'Vet Shop - GO Pet',
    logo: '🏥',
    primaryColor: 'hsl(162, 63%, 83%)',
    secondaryColor: 'hsl(60, 100%, 93%)',
    favicon: '🏥',
    domain: 'vetshop.gopet.com'
  }
};

const STORAGE_KEY = 'gopet_selected_tenant';

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tenant, setTenant] = useState<TenantConfig | null>(null);
  const [tenantId, setTenantId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPortal, setIsPortal] = useState(false);

  const setSelectedTenant = (selectedTenantId: string | null) => {
    console.log('Setting selected tenant:', selectedTenantId);
    
    if (selectedTenantId && TENANT_CONFIGS[selectedTenantId]) {
      const tenantConfig = TENANT_CONFIGS[selectedTenantId];
      setTenantId(selectedTenantId);
      setTenant(tenantConfig);
      setIsPortal(false);
      
      // Persistir en localStorage
      localStorage.setItem(STORAGE_KEY, selectedTenantId);
      
      // Update document title and favicon
      document.title = tenantConfig.name;
      
      // Update favicon
      const favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
      if (favicon) {
        favicon.href = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${tenantConfig.favicon}</text></svg>`;
      }
    } else {
      // Volver al portal
      setTenantId(null);
      setTenant(null);
      setIsPortal(true);
      
      // Limpiar localStorage
      localStorage.removeItem(STORAGE_KEY);
      document.title = 'GO Pet - El universo para tu mascota';
    }
  };

  useEffect(() => {
    const detectTenant = () => {
      console.log('Detecting tenant...');
      
      // Paso 1: Verificar si hay un tenant guardado en localStorage
      const savedTenantId = localStorage.getItem(STORAGE_KEY);
      if (savedTenantId && TENANT_CONFIGS[savedTenantId]) {
        console.log('Tenant detected from localStorage:', savedTenantId);
        setSelectedTenant(savedTenantId);
        setIsLoading(false);
        return;
      }

      // Paso 2: Verificar parámetro de URL para desarrollo
      const urlParams = new URLSearchParams(window.location.search);
      const tenantParam = urlParams.get('tenant');
      
      if (tenantParam && TENANT_CONFIGS[tenantParam]) {
        console.log('Tenant detected from URL param:', tenantParam);
        setSelectedTenant(tenantParam);
        setIsLoading(false);
        return;
      }

      // Paso 3: Extraer subdomain para producción
      const hostname = window.location.hostname;
      const subdomain = hostname.split('.')[0];
      if (TENANT_CONFIGS[subdomain]) {
        console.log('Tenant detected from subdomain:', subdomain);
        setSelectedTenant(subdomain);
        setIsLoading(false);
        return;
      }
      
      // Paso 4: No hay tenant, mostrar portal
      console.log('No tenant detected, showing portal');
      setTenantId(null);
      setTenant(null);
      setIsPortal(true);
      localStorage.removeItem(STORAGE_KEY);
      document.title = 'GO Pet - El universo para tu mascota';
      setIsLoading(false);
    };

    // Ejecutar detección inmediatamente
    detectTenant();
  }, []); // Solo ejecutar una vez al montar el componente

  return (
    <TenantContext.Provider value={{ tenant, tenantId, isLoading, isPortal, setSelectedTenant }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};
