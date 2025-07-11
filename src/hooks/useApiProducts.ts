
import { useState, useEffect } from 'react';
import { productService, type ApiProduct, type ProductSearchParams } from '@/services/productService';
import { useTenant } from '@/contexts/TenantContext';

export const useApiProducts = (params: ProductSearchParams = {}) => {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { tenantId } = useTenant();

  const loadProducts = async (searchParams: ProductSearchParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      // Incluir tenant_id automáticamente
      const finalParams = {
        ...params,
        ...searchParams,
        tenant_id: tenantId || undefined
      };

      console.log('🔄 useApiProducts - Cargando productos con parámetros:', finalParams);
      
      const result = await productService.listarProductos(finalParams);
      setProducts(result);
      
      console.log('✅ useApiProducts - Productos cargados:', result.length);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar productos';
      setError(errorMessage);
      console.error('❌ useApiProducts - Error:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [tenantId, JSON.stringify(params)]);

  return {
    products,
    loading,
    error,
    refetch: loadProducts,
    isEmpty: products.length === 0 && !loading
  };
};

export const useProductSearch = () => {
  const [results, setResults] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { tenantId } = useTenant();

  const search = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 useProductSearch - Buscando:', query);
      
      const searchResults = await productService.buscarProductos(query, tenantId || undefined);
      setResults(searchResults);
      
      console.log('✅ useProductSearch - Resultados:', searchResults.length);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error en búsqueda';
      setError(errorMessage);
      console.error('❌ useProductSearch - Error:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    results,
    loading,
    error,
    search,
    clear: () => setResults([])
  };
};

export const useProduct = (id: number) => {
  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await productService.obtenerProducto(id);
        setProduct(result);
        
        if (!result) {
          setError('Producto no encontrado');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al cargar producto';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  return { product, loading, error };
};
