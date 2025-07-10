
import { API_CONFIG, buildApiUrl } from '@/config/apiConfig';

export interface UserRegistrationData {
  nombre: string;
  apellidos: string;
  email: string;
  direccion: string;
  password: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export class UserService {
  private async makeRequest<T>(
    endpoint: string, 
    method: 'GET' | 'POST' = 'POST', 
    data?: any
  ): Promise<ApiResponse<T>> {
    try {
      const url = buildApiUrl('USERS', endpoint);
      console.log(`Making ${method} request to:`, url);
      
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
    return this.makeRequest(API_CONFIG.USERS.ENDPOINTS.REGISTRO, 'POST', userData);
  }

  async login(loginData: UserLoginData): Promise<ApiResponse> {
    return this.makeRequest(API_CONFIG.USERS.ENDPOINTS.LOGIN, 'POST', loginData);
  }

  async validate(token: string): Promise<ApiResponse> {
    return this.makeRequest(API_CONFIG.USERS.ENDPOINTS.VALIDAR, 'POST', { token });
  }
}

export const userService = new UserService();
