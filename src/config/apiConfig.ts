
// Configuración de APIs que detecta automáticamente el entorno
const isDevelopment = import.meta.env.DEV;

// URLs base para desarrollo (usando proxy) y producción (directo)
const getBaseUrl = (service: 'USERS' | 'PRODUCTS' | 'PURCHASES') => {
  if (isDevelopment) {
    // En desarrollo, usar el proxy de Vite
    switch (service) {
      case 'USERS':
        return '/api/users';
      case 'PRODUCTS':
        return '/api/products';
      case 'PURCHASES':
        return '/api/purchases';
    }
  } else {
    // En producción, usar URLs directas
    switch (service) {
      case 'USERS':
        return 'https://ifi23uyye0.execute-api.us-east-1.amazonaws.com/dev/usuario';
      case 'PRODUCTS':
        return 'https://y2zenkmkx8.execute-api.us-east-1.amazonaws.com/dev/producto';
      case 'PURCHASES':
        return 'https://fiyjws2ty5.execute-api.us-east-1.amazonaws.com/dev/compras';
    }
  }
};

export const API_CONFIG = {
  USERS: {
    BASE_URL: getBaseUrl('USERS'),
    ENDPOINTS: {
      REGISTRO: '/registro',
      LOGIN: '/login',
      VALIDAR: '/validar'
    }
  },
  PRODUCTS: {
    BASE_URL: getBaseUrl('PRODUCTS'),
    ENDPOINTS: {
      CREAR: '/crear',
      BUSCAR: '/buscar',
      ELIMINAR: '/eliminar',
      LISTAR: '/listar',
      MODIFICAR: '/modificar'
    }
  },
  PURCHASES: {
    BASE_URL: getBaseUrl('PURCHASES'),
    ENDPOINTS: {
      REGISTRAR: '/registrar',
      LISTAR: '/listar'
    }
  }
};

// Helper para construir URLs completas
export const buildApiUrl = (service: keyof typeof API_CONFIG, endpoint: string) => {
  const config = API_CONFIG[service];
  const fullUrl = `${config.BASE_URL}${endpoint}`;
  
  console.log(`🔗 API URL construida (${isDevelopment ? 'DEV-PROXY' : 'PROD-DIRECT'}):`, fullUrl);
  
  return fullUrl;
};

// Helper para debugging de configuración
export const getApiInfo = () => ({
  isDevelopment,
  config: API_CONFIG,
  environment: isDevelopment ? 'development (using proxy)' : 'production (direct)'
});
