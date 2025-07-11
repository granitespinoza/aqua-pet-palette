
import { useSearchParams } from 'react-router-dom';
import { useApiProducts, useProductSearch } from '@/hooks/useApiProducts';
import ApiProductCard from '@/components/ApiProductCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTenant } from '@/contexts/TenantContext';

const Catalogo = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localSearch, setLocalSearch] = useState('');
  const { tenantId } = useTenant();
  
  const searchQuery = searchParams.get('q');
  const categoria = searchParams.get('categoria');
  const marca = searchParams.get('marca');
  
  // Hook para productos con filtros
  const { 
    products, 
    loading: productsLoading, 
    error: productsError, 
    refetch,
    isEmpty 
  } = useApiProducts({
    categoria: categoria || undefined,
    marca: marca || undefined,
    limite: 20
  });

  // Hook para búsqueda
  const { 
    results: searchResults, 
    loading: searchLoading, 
    error: searchError, 
    search,
    clear: clearSearch 
  } = useProductSearch();

  const isSearchMode = !!searchQuery;
  const displayProducts = isSearchMode ? searchResults : products;
  const loading = isSearchMode ? searchLoading : productsLoading;
  const error = isSearchMode ? searchError : productsError;

  // Efecto para búsqueda automática
  useEffect(() => {
    if (searchQuery) {
      search(searchQuery);
      setLocalSearch(searchQuery);
    } else {
      clearSearch();
      setLocalSearch('');
    }
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('q', query);
      // Limpiar otros filtros cuando se busca
      newParams.delete('categoria');
      newParams.delete('marca');
      setSearchParams(newParams);
    } else {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('q');
      setSearchParams(newParams);
    }
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
    setLocalSearch('');
  };

  const getTenantName = () => {
    switch (tenantId) {
      case 'dogshop': return 'DogShop';
      case 'catshop': return 'CatShop'; 
      case 'vetshop': return 'VetShop';
      default: return 'GO Pet';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-yellow-50/30 watercolor-section">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {isSearchMode ? (
                  <>
                    <span className="pet-icon-interactive mr-2">🔍</span>
                    Resultados para "{searchQuery}"
                  </>
                ) : (
                  <>
                    <span className="pet-icon-interactive mr-2">🛍️</span>
                    Catálogo {getTenantName()}
                  </>
                )}
              </h1>
              
              <p className="text-gray-700 font-medium text-lg">
                {loading ? (
                  <>
                    <span className="pet-icon-interactive mr-1">⏳</span>
                    Cargando productos...
                  </>
                ) : error ? (
                  <>
                    <span className="pet-icon-interactive mr-1">⚠️</span>
                    {error}
                  </>
                ) : (
                  <>
                    <span className="pet-icon-interactive mr-1">📊</span>
                    {displayProducts.length} producto{displayProducts.length !== 1 ? 's' : ''} encontrado{displayProducts.length !== 1 ? 's' : ''}
                  </>
                )}
              </p>
            </div>

            {/* Barra de búsqueda */}
            <div className="flex gap-2 max-w-md w-full">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Buscar productos..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch(localSearch);
                    }
                  }}
                  className="pl-10 pr-4"
                />
              </div>
              <Button 
                onClick={() => handleSearch(localSearch)}
                disabled={loading}
                className="px-4"
              >
                <Search className="w-4 h-4" />
              </Button>
              {error && (
                <Button 
                  onClick={refetch}
                  variant="outline"
                  className="px-4"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
          
          {/* Filtros activos */}
          {(categoria || marca || searchQuery) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {categoria && (
                <Badge className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  <span className="pet-icon-interactive mr-1">🏷️</span>
                  Categoría: {categoria}
                </Badge>
              )}
              {marca && (
                <Badge className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-yellow-50 text-yellow-700 border border-yellow-200">
                  <span className="pet-icon-interactive mr-1">🏢</span>
                  Marca: {marca}
                </Badge>
              )}
              {searchQuery && (
                <Badge className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-green-50 text-green-700 border border-green-200">
                  <span className="pet-icon-interactive mr-1">🔍</span>
                  Búsqueda: {searchQuery}
                </Badge>
              )}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearFilters}
                className="text-gray-500 hover:text-gray-700"
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse pet-card-glow">
                <CardContent className="p-4">
                  <div className="w-full h-48 bg-blue-100 rounded-lg mb-4"></div>
                  <div className="h-4 bg-blue-100 rounded mb-2"></div>
                  <div className="h-4 bg-blue-100 rounded w-3/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Card className="max-w-md mx-auto pet-card-glow">
            <CardContent className="p-8 text-center">
              <div className="text-8xl mb-4 pet-icon-interactive">⚠️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 pet-glow-blue">
                Error al cargar productos
              </h3>
              <p className="text-gray-700 font-medium text-lg mb-4">
                {error}
              </p>
              <Button onClick={refetch} className="bg-blue-600 hover:bg-blue-700">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reintentar
              </Button>
            </CardContent>
          </Card>
        ) : displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayProducts.map((product) => (
              <ApiProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <Card className="max-w-md mx-auto pet-card-glow">
            <CardContent className="p-8 text-center">
              <div className="text-8xl mb-4 pet-icon-interactive">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 pet-glow-blue">
                <span className="pet-icon-interactive mr-2">😔</span>
                No se encontraron resultados
              </h3>
              <p className="text-gray-700 font-medium text-lg">
                {isSearchMode ? (
                  <>
                    <span className="pet-icon-interactive mr-1">🐕</span>
                    No encontramos productos para "{searchQuery}". Intenta con otros términos.
                    <span className="pet-icon-interactive ml-1">🔍</span>
                  </>
                ) : (
                  <>
                    <span className="pet-icon-interactive mr-1">🐱</span>
                    Intenta cambiar los filtros o busca otros productos.
                    <span className="pet-icon-interactive ml-1">🎯</span>
                  </>
                )}
              </p>
              {(categoria || marca) && (
                <Button 
                  onClick={clearFilters} 
                  className="mt-4 bg-blue-600 hover:bg-blue-700"
                >
                  Ver todos los productos
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Catalogo;
