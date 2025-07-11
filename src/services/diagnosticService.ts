
import { buildApiUrl } from '@/config/apiConfig';

export interface ApiHealthCheck {
  service: string;
  endpoint: string;
  status: 'success' | 'error' | 'pending';
  responseTime?: number;
  error?: string;
}

class DiagnosticService {
  async checkApiHealth(): Promise<ApiHealthCheck[]> {
    const checks: ApiHealthCheck[] = [
      {
        service: 'Products',
        endpoint: buildApiUrl('PRODUCTS', '/listar'),
        status: 'pending'
      },
      {
        service: 'Purchases',
        endpoint: buildApiUrl('PURCHASES', '/listar'),
        status: 'pending'
      }
    ];

    console.log('🏥 Iniciando diagnóstico de APIs...');

    const results = await Promise.allSettled(
      checks.map(async (check) => {
        const startTime = Date.now();
        
        try {
          console.log(`🔍 Verificando ${check.service}:`, check.endpoint);
          
          const response = await fetch(check.endpoint, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const responseTime = Date.now() - startTime;
          
          if (response.ok) {
            console.log(`✅ ${check.service} OK (${responseTime}ms)`);
            return {
              ...check,
              status: 'success' as const,
              responseTime
            };
          } else {
            console.log(`❌ ${check.service} HTTP ${response.status}`);
            return {
              ...check,
              status: 'error' as const,
              responseTime,
              error: `HTTP ${response.status}: ${response.statusText}`
            };
          }
        } catch (error) {
          const responseTime = Date.now() - startTime;
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          
          console.log(`💥 ${check.service} Error:`, errorMessage);
          
          return {
            ...check,
            status: 'error' as const,
            responseTime,
            error: errorMessage
          };
        }
      })
    );

    return results.map((result, index) => 
      result.status === 'fulfilled' ? result.value : {
        ...checks[index],
        status: 'error' as const,
        error: 'Promise rejected'
      }
    );
  }

  async testCorsIssue(): Promise<boolean> {
    console.log('🔍 Probando conectividad directa (sin proxy)...');
    
    try {
      const directUrl = 'https://y2zenkmkx8.execute-api.us-east-1.amazonaws.com/dev/producto/listar';
      const response = await fetch(directUrl);
      
      console.log('✅ Conexión directa exitosa');
      return true;
    } catch (error) {
      console.log('❌ Error en conexión directa (confirma CORS):', error);
      return false;
    }
  }
}

export const diagnosticService = new DiagnosticService();
