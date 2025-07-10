
import { API_CONFIG, buildApiUrl } from '@/config/apiConfig';

export interface UserRegistrationData {
  nombre: string;
  apellidos: string;
  email: string;
  direccion: string;
  password: string;
  tenant_id: string;
}

export interface UserLoginData {
  email: string;
  password: string;
  tenant_id: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Mapeo de tenant frontend a tenant_id del backend
const TENANT_ID_MAPPING: Record<string, string> = {
  'catshop': 'PETSHOPGATOS',
  'dogshop': 'PETSHOPPERROS', 
  'vetshop': 'PETSHOPMED'
};

export const getTenantId = (frontendTenantId: string | null): string => {
  if (!frontendTenantId) {
    console.warn('No tenant ID provided, defaulting to PETSHOPGATOS');
    return 'PETSHOPGATOS';
  }
  
  const mappedTenantId = TENANT_ID_MAPPING[frontendTenantId];
  if (!mappedTenantId) {
    console.warn(`Unknown tenant ID: ${frontendTenantId}, defaulting to PETSHOPGATOS`);
    return 'PETSHOPGATOS';
  }
  
  console.log(`Mapped tenant: ${frontendTenantId} → ${mappedTenantId}`);
  return mappedTenantId;
};

export class UserService {
  private async makeRequest<T>(
    endpoint: string, 
    method: 'GET' | 'POST' = 'POST', 
    data?: any
  ): Promise<ApiResponse<T>> {
    try {
      const url = buildApiUrl('USERS', endpoint);
      console.log(`Making ${method} request to:`, url);
      console.log('Request payload:', JSON.stringify(data, null, 2));
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
      });

      const result = await response.json();
      console.log('API Response:', result);

      if (!response.ok) {
        return {
          success: false,
          error: result.message || `HTTP ${response.status}`,
        };
      }

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.error('API Request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  async register(userData: UserRegistrationData): Promise<ApiResponse> {
    console.log('UserService.register called with:', userData);
    return this.makeRequest(API_CONFIG.USERS.ENDPOINTS.REGISTRO, 'POST', userData);
  }

  async login(loginData: UserLoginData): Promise<ApiResponse> {
    console.log('UserService.login called with:', loginData);
    return this.makeRequest(API_CONFIG.USERS.ENDPOINTS.LOGIN, 'POST', loginData);
  }

  async validate(token: string): Promise<ApiResponse> {
    return this.makeRequest(API_CONFIG.USERS.ENDPOINTS.VALIDAR, 'POST', { token });
  }
}

export const userService = new UserService();
