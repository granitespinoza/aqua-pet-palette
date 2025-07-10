
// Configuración de APIs para entorno DEV
export const API_CONFIG = {
  USERS: {
    BASE_URL: 'https://ifi23uyye0.execute-api.us-east-1.amazonaws.com/dev/usuario',
    ENDPOINTS: {
      REGISTRO: '/registro',
      LOGIN: '/login',
      VALIDAR: '/validar'
    }
  },
  PRODUCTS: {
    BASE_URL: 'https://y2zenkmkx8.execute-api.us-east-1.amazonaws.com/dev/producto',
    ENDPOINTS: {
      CREAR: '/crear',
      BUSCAR: '/buscar',
      ELIMINAR: '/eliminar',
      LISTAR: '/listar',
      MODIFICAR: '/modificar'
    }
  },
  PURCHASES: {
    BASE_URL: 'https://fiyjws2ty5.execute-api.us-east-1.amazonaws.com/dev/compras',
    ENDPOINTS: {
      REGISTRAR: '/registrar',
      LISTAR: '/listar'
    }
  }
};

// Helper para construir URLs completas
export const buildApiUrl = (service: keyof typeof API_CONFIG, endpoint: string) => {
  const config = API_CONFIG[service];
  return `${config.BASE_URL}${endpoint}`;
};
