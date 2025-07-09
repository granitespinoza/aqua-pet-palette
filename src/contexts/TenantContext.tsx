
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
}

const TenantContext = createContext<TenantContextType>({
  tenant: null,
  tenantId: null,
  isLoading: true,
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
  },
  default: {
    id: 'default',
    name: 'GO Pet',
    logo: '🐾',
    primaryColor: 'hsl(183, 100%, 94%)',
    secondaryColor: 'hsl(235, 55%, 85%)',
    favicon: '🐾',
    domain: 'gopet.com'
  }
};

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tenant, setTenant] = useState<TenantConfig | null>(null);
  const [tenantId, setTenantId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const detectTenant = () => {
      const hostname = window.location.hostname;
      console.log('Detecting tenant from hostname:', hostname);
      
      // Extract subdomain
      const subdomain = hostname.split('.')[0];
      
      // Check if subdomain matches any tenant
      let detectedTenantId = 'default';
      if (TENANT_CONFIGS[subdomain]) {
        detectedTenantId = subdomain;
      }
      
      // For development/localhost, allow override via URL parameter
      const urlParams = new URLSearchParams(window.location.search);
      const tenantParam = urlParams.get('tenant');
      if (tenantParam && TENANT_CONFIGS[tenantParam]) {
        detectedTenantId = tenantParam;
      }
      
      console.log('Detected tenant:', detectedTenantId);
      
      const tenantConfig = TENANT_CONFIGS[detectedTenantId];
      setTenantId(detectedTenantId);
      setTenant(tenantConfig);
      
      // Update document title and favicon
      document.title = tenantConfig.name;
      
      // Update favicon (simple text-based favicon)
      const favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
      if (favicon) {
        favicon.href = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${tenantConfig.favicon}</text></svg>`;
      }
      
      setIsLoading(false);
    };

    detectTenant();
  }, []);

  return (
    <TenantContext.Provider value={{ tenant, tenantId, isLoading }}>
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
