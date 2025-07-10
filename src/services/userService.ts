
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
    console.warn('⚠️ No tenant ID provided, defaulting to PETSHOPGATOS');
    return 'PETSHOPGATOS';
  }
  
  const mappedTenantId = TENANT_ID_MAPPING[frontendTenantId];
  if (!mappedTenantId) {
    console.warn(`⚠️ Unknown tenant ID: ${frontendTenantId}, defaulting to PETSHOPGATOS`);
    return 'PETSHOPGATOS';
  }
  
  console.log(`✅ Mapped tenant: ${frontendTenantId} → ${mappedTenantId}`);
  return mappedTenantId;
};

export class UserService {
  private async makeRequest<T>(
    endpoint: string, 
    method: 'GET' | 'POST' = 'POST', 
    data?: any
  ): Promise<ApiResponse<T>> {
    const startTime = Date.now();
    
    try {
      const url = buildApiUrl('USERS', endpoint);
      
      console.log('🚀 === INICIANDO PETICIÓN API ===');
      console.log(`📍 URL: ${url}`);
      console.log(`🔧 Método: ${method}`);
      console.log('📦 === PAYLOAD ANÁLISIS DETALLADO ===');
      
      if (data) {
        console.log('📋 Payload original:', data);
        console.log('📋 Payload keys:', Object.keys(data));
        console.log('📋 Payload values (sin password):');
        Object.entries(data).forEach(([key, value]) => {
          if (key === 'password') {
            console.log(`   ${key}: [OCULTA - length: ${String(value).length}]`);
          } else {
            console.log(`   ${key}: "${value}" (tipo: ${typeof value})`);
          }
        });
        
        // Verificar campos específicos
        console.log('🔍 === VALIDACIÓN DE CAMPOS ===');
        const requiredFields = endpoint.includes('registro') 
          ? ['nombre', 'apellidos', 'email', 'direccion', 'password', 'tenant_id']
          : ['email', 'password', 'tenant_id'];
          
        console.log('📝 Campos requeridos:', requiredFields);
        
        requiredFields.forEach(field => {
          const value = data[field];
          const isPresent = value !== undefined && value !== null && value !== '';
          console.log(`   ${field}: ${isPresent ? '✅' : '❌'} (valor: ${field === 'password' ? '[OCULTO]' : `"${value}"`})`);
        });
        
        // JSON que se enviará
        const jsonString = JSON.stringify(data);
        console.log('📤 JSON exacto a enviar:', jsonString);
        console.log('📏 Tamaño del JSON:', jsonString.length, 'bytes');
      }
      
      console.log(`⏰ Timestamp: ${new Date().toISOString()}`);
      
      const requestConfig = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
      };
      
      console.log('🔧 Headers enviados:', requestConfig.headers);
      
      // Realizar la petición
      console.log('📡 Enviando petición...');
      const response = await fetch(url, requestConfig);
      
      const duration = Date.now() - startTime;
      console.log(`⏱️ Duración: ${duration}ms`);
      console.log(`📊 Status HTTP: ${response.status} ${response.statusText}`);
      console.log('📋 Response headers:', Object.fromEntries(response.headers.entries()));
      
      // Intentar parsear la respuesta
      let result;
      const contentType = response.headers.get('content-type');
      console.log('📄 Content-Type:', contentType);
      
      if (contentType?.includes('application/json')) {
        result = await response.json();
        console.log('📥 === RESPUESTA COMPLETA DEL SERVIDOR ===');
        console.log('📥 Response body (JSON):', JSON.stringify(result, null, 2));
        
        if (result.error) {
          console.log('❌ Error específico del servidor:', result.error);
          console.log('❌ Mensaje completo:', result.message || 'Sin mensaje adicional');
        }
      } else {
        const textResult = await response.text();
        console.log('📥 Response body (Text):', textResult);
        result = { message: textResult };
      }

      if (!response.ok) {
        console.log('❌ === PETICIÓN FALLÓ ===');
        console.log(`❌ HTTP Error: ${response.status} - ${response.statusText}`);
        console.log('❌ Error details:', result);
        
        // Diagnóstico específico para error 400
        if (response.status === 400) {
          console.log('🔍 === DIAGNÓSTICO ERROR 400 ===');
          console.log('🔍 Esto indica que el servidor recibió la petición pero hay un problema con los datos');
          console.log('🔍 Campos que enviamos vs lo que puede esperar el servidor:');
          if (data) {
            console.log('🔍 Enviados:', Object.keys(data).join(', '));
          }
          console.log('🔍 Mensaje del servidor:', result?.error || result?.message);
        }
        
        return {
          success: false,
          error: result?.message || result?.error || `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      console.log('✅ Petición exitosa');
      console.log('✅ === FIN PETICIÓN API ===');
      
      return {
        success: true,
        data: result,
      };
      
    } catch (error) {
      const duration = Date.now() - startTime;
      console.log(`⏱️ Duración hasta error: ${duration}ms`);
      console.error('💥 === ERROR EN PETICIÓN API ===');
      console.error('💥 Error type:', error?.constructor?.name);
      console.error('💥 Error message:', error instanceof Error ? error.message : String(error));
      
      // Diagnóstico de red
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.error('🌐 DIAGNÓSTICO: Error de red o CORS');
        console.error('🔍 Posibles causas:');
        console.error('   - Servidor no disponible');
        console.error('   - Error CORS');
        console.error('   - Conexión a internet perdida');
        console.error('   - URL incorrecta');
      }
      
      console.error('💥 === FIN ERROR ===');
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  async register(userData: UserRegistrationData): Promise<ApiResponse> {
    console.log('🔐 === REGISTRO DE USUARIO ===');
    console.log('👤 UserService.register called');
    console.log('📋 Datos recibidos para registro:', {
      ...userData,
      password: '[OCULTA]'
    });
    
    return this.makeRequest(API_CONFIG.USERS.ENDPOINTS.REGISTRO, 'POST', userData);
  }

  async login(loginData: UserLoginData): Promise<ApiResponse> {
    console.log('🔐 === LOGIN DE USUARIO ===');
    console.log('👤 UserService.login called');
    console.log('📋 Datos recibidos para login:', {
      ...loginData,
      password: '[OCULTA]'
    });
    
    return this.makeRequest(API_CONFIG.USERS.ENDPOINTS.LOGIN, 'POST', loginData);
  }

  async validate(token: string): Promise<ApiResponse> {
    console.log('🔐 === VALIDACIÓN DE TOKEN ===');
    console.log('🎫 Token provided:', token ? '[TOKEN_PROVIDED]' : '[NO_TOKEN]');
    
    return this.makeRequest(API_CONFIG.USERS.ENDPOINTS.VALIDAR, 'POST', { token });
  }
}

export const userService = new UserService();
