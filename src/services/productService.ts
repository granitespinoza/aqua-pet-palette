
import { API_CONFIG, buildApiUrl } from '@/config/apiConfig';

export interface ApiProduct {
  id: number;
  nombre: string;
  marca_id: number;
  categoria_id: string;
  precio: number;
  precio_oferta?: number;
  descuento: number;
  img: string;
  is_featured: boolean;
  tenant_id?: string;
}

export interface ProductSearchParams {
  categoria?: string;
  marca?: string;
  tenant_id?: string;
  limite?: number;
  offset?: number;
  busqueda?: string;
}

class ProductService {
  private baseUrl = API_CONFIG.PRODUCTS.BASE_URL;

  // Listar productos con filtros
  async listarProductos(params: ProductSearchParams = {}): Promise<ApiProduct[]> {
    try {
      console.log('🛍️ ProductService - Listando productos con parámetros:', params);
      
      const url = buildApiUrl('PRODUCTS', API_CONFIG.PRODUCTS.ENDPOINTS.LISTAR);
      
      // Construir query parameters
      const queryParams = new URLSearchParams();
      if (params.categoria) queryParams.append('categoria_id', params.categoria);
      if (params.marca) queryParams.append('marca_id', params.marca.toString());
      if (params.tenant_id) queryParams.append('tenant_id', params.tenant_id);
      if (params.limite) queryParams.append('limite', params.limite.toString());
      if (params.offset) queryParams.append('offset', params.offset.toString());
      if (params.busqueda) queryParams.append('busqueda', params.busqueda);

      const fullUrl = queryParams.toString() ? `${url}?${queryParams.toString()}` : url;
      console.log('📡 ProductService - URL completa:', fullUrl);

      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('📊 ProductService - Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ ProductService - Error response:', errorData);
        throw new Error(`Error ${response.status}: ${errorData.error || 'Error al cargar productos'}`);
      }

      const products = await response.json();
      console.log('✅ ProductService - Productos cargados:', products.length);
      
      // Guardar en localStorage como cache
      localStorage.setItem('products_cache', JSON.stringify({
        products,
        timestamp: Date.now(),
        params
      }));

      return products;
    } catch (error) {
      console.error('💥 ProductService - Error al listar productos:', error);
      
      // Fallback a localStorage cache si existe
      const cache = localStorage.getItem('products_cache');
      if (cache) {
        try {
          const { products } = JSON.parse(cache);
          console.log('🔄 ProductService - Usando cache fallback:', products.length);
          return products;
        } catch (cacheError) {
          console.error('Error al leer cache:', cacheError);
        }
      }
      
      // Último fallback: datos estáticos
      console.log('📦 ProductService - Usando datos estáticos como fallback');
      const staticProducts = await import('@/data/products.json');
      return staticProducts.default.map(product => ({
        ...product,
        marca_id: product.marcaId,
        categoria_id: product.categoriaId,
        precio_oferta: product.precioOferta,
        is_featured: product.is_featured
      }));
    }
  }

  // Buscar productos
  async buscarProductos(query: string, tenantId?: string): Promise<ApiProduct[]> {
    try {
      console.log('🔍 ProductService - Buscando productos:', { query, tenantId });
      
      const url = buildApiUrl('PRODUCTS', API_CONFIG.PRODUCTS.ENDPOINTS.BUSCAR);
      
      const params = new URLSearchParams();
      params.append('busqueda', query);
      if (tenantId) params.append('tenant_id', tenantId);

      const response = await fetch(`${url}?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Error ${response.status}: ${errorData.error || 'Error en búsqueda'}`);
      }

      const results = await response.json();
      console.log('✅ ProductService - Resultados de búsqueda:', results.length);
      return results;
    } catch (error) {
      console.error('💥 ProductService - Error en búsqueda:', error);
      
      // Fallback: búsqueda en datos estáticos
      const staticProducts = await import('@/data/products.json');
      const filtered = staticProducts.default.filter(product =>
        product.nombre.toLowerCase().includes(query.toLowerCase())
      );
      
      return filtered.map(product => ({
        ...product,
        marca_id: product.marcaId,
        categoria_id: product.categoriaId,
        precio_oferta: product.precioOferta,
        is_featured: product.is_featured
      }));
    }
  }

  // Obtener producto por ID
  async obtenerProducto(id: number): Promise<ApiProduct | null> {
    try {
      // Primero intentar desde la API
      const productos = await this.listarProductos();
      return productos.find(p => p.id === id) || null;
    } catch (error) {
      console.error('💥 ProductService - Error al obtener producto:', error);
      return null;
    }
  }
}

export const productService = new ProductService();
