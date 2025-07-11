
import { buildApiUrl } from '@/config/apiConfig';

export interface CompraRegistro {
  usuario: string;
  productos: Array<{
    id: string;
    nombre: string;
    precio: number;
    cantidad: number;
  }>;
  total: number;
  fecha: string;
  direccion: string;
  tenantId: string;
}

export interface CompraResponse {
  id: string;
  usuario: string;
  productos: Array<{
    id: string;
    nombre: string;
    precio: number;
    cantidad: number;
  }>;
  total: number;
  fecha: string;
  direccion: string;
  tenantId: string;
  estado: string;
}

class PurchaseService {
  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private getUserOrdersKey(usuario: string): string {
    return `user_orders_${usuario}`;
  }

  private async makeRequest<T>(url: string, options: RequestInit = {}): Promise<T> {
    const token = this.getAuthToken();
    
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    console.log('Purchase API Request:', {
      url,
      method: config.method || 'GET',
      headers: config.headers,
      hasToken: !!token,
      body: config.body
    });

    try {
      const response = await fetch(url, config);
      
      console.log('Purchase API Response Status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Purchase API Error Response:', errorText);
        throw new Error(`Error ${response.status}: ${errorText || response.statusText}`);
      }

      const data = await response.json();
      console.log('Purchase API Success Response:', data);
      return data;
    } catch (error) {
      console.error('Purchase API Network Error:', error);
      throw error;
    }
  }

  async registrarCompra(compraData: CompraRegistro): Promise<CompraResponse> {
    const url = buildApiUrl('PURCHASES', '/registrar');
    
    console.log('Registrando compra:', compraData);
    
    try {
      const response = await this.makeRequest<CompraResponse>(url, {
        method: 'POST',
        body: JSON.stringify(compraData),
      });
      
      console.log('Compra registrada exitosamente:', response);
      return response;
    } catch (error) {
      console.error('Error al registrar compra:', error);
      
      // Fallback: guardar en localStorage específico del usuario
      const backupOrder: CompraResponse = {
        ...compraData,
        id: Date.now().toString(),
        estado: 'pending_api'
      };
      
      const userOrdersKey = this.getUserOrdersKey(compraData.usuario);
      const existingOrders = JSON.parse(localStorage.getItem(userOrdersKey) || '[]');
      const updatedOrders = [backupOrder, ...existingOrders];
      localStorage.setItem(userOrdersKey, JSON.stringify(updatedOrders));
      
      console.log(`Orden guardada como backup en localStorage para usuario: ${compraData.usuario}`);
      throw error;
    }
  }

  async listarCompras(usuario?: string): Promise<CompraResponse[]> {
    const url = buildApiUrl('PURCHASES', '/listar');
    
    console.log('Listando compras para usuario:', usuario);
    
    try {
      const response = await this.makeRequest<CompraResponse[]>(url, {
        method: 'GET',
      });
      
      console.log('Compras obtenidas exitosamente:', response);
      return response || [];
    } catch (error) {
      console.error('Error al listar compras:', error);
      
      // Fallback: usar datos específicos del usuario desde localStorage
      if (!usuario) {
        console.warn('No se puede usar fallback sin especificar usuario');
        return [];
      }

      const userOrdersKey = this.getUserOrdersKey(usuario);
      const backupOrders = JSON.parse(localStorage.getItem(userOrdersKey) || '[]');
      console.log(`Usando órdenes de backup desde localStorage para usuario ${usuario}:`, backupOrders.length);
      
      // Convertir formato de localStorage al formato de API
      return backupOrders.map((order: any) => ({
        id: order.id,
        usuario: usuario,
        productos: order.productos || order.items || [],
        total: order.total,
        fecha: order.fecha || order.date,
        direccion: order.direccion || 'Dirección no disponible',
        tenantId: order.tenantId || 'default',
        estado: order.estado || 'completed'
      }));
    }
  }

  // Método para limpiar órdenes globales obsoletas
  cleanupGlobalOrders(): void {
    console.log('🧹 Limpiando órdenes globales obsoletas...');
    const globalOrders = localStorage.getItem('user_orders');
    if (globalOrders) {
      console.log('🗑️ Removiendo user_orders global obsoleto');
      localStorage.removeItem('user_orders');
    }
  }
}

export const purchaseService = new PurchaseService();
