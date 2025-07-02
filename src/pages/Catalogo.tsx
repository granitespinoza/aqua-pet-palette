
import { useSearchParams } from 'react-router-dom';
import { useFilteredProducts } from '@/hooks/useFilteredProducts';
import { useSearchResults } from '@/hooks/useSearchResults';
import ProductCard from '@/components/ProductCard';
import { Card, CardContent } from '@/components/ui/card';

const Catalogo = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');
  
  // Use search results if query exists, otherwise use filtered products
  const searchResults = useSearchResults(searchQuery || '');
  const filteredProducts = useFilteredProducts();
  
  const isSearchMode = !!searchQuery;
  const products = isSearchMode ? searchResults.results : filteredProducts.products;
  const totalProducts = isSearchMode ? searchResults.totalResults : filteredProducts.totalProducts;
  const isLoading = isSearchMode ? searchResults.isLoading : filteredProducts.loading;

  // Get current filters for display
  const categoria = searchParams.get('categoria');
  const marca = searchParams.get('marca');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-yellow-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isSearchMode ? (
              <>
                <span className="pet-icon-interactive mr-2">🔍</span>
                Resultados para "{searchQuery}"
              </>
            ) : (
              <>
                <span className="pet-icon-interactive mr-2">🛍️</span>
                Catálogo de productos
              </>
            )}
          </h1>
          
          {/* Show active filters */}
          {(categoria || marca) && !isSearchMode && (
            <div className="flex flex-wrap gap-2 mb-4">
              {categoria && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  <span className="pet-icon-interactive mr-1">🏷️</span>
                  Categoría: {categoria}
                </span>
              )}
              {marca && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                  <span className="pet-icon-interactive mr-1">🏢</span>
                  Marca: {marca}
                </span>
              )}
            </div>
          )}
          
          <p className="text-gray-600">
            {isLoading ? (
              <>
                <span className="pet-icon-interactive mr-1">⏳</span>
                Buscando...
              </>
            ) : (
              <>
                <span className="pet-icon-interactive mr-1">📊</span>
                {totalProducts} producto{totalProducts !== 1 ? 's' : ''} encontrado{totalProducts !== 1 ? 's' : ''}
              </>
            )}
          </p>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse bg-white/80 backdrop-blur-sm border border-blue-100">
                <CardContent className="p-4">
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <Card className="max-w-md mx-auto bg-white/80 backdrop-blur-sm border border-blue-100 pet-card-glow">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4 pet-icon-interactive">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 pet-glow-orange">
                <span className="pet-icon-interactive mr-2">😔</span>
                No se encontraron resultados
              </h3>
              <p className="text-gray-600">
                {isSearchMode 
                  ? (
                    <>
                      <span className="pet-icon-interactive mr-1">🐕</span>
                      No encontramos productos para "{searchQuery}". Intenta con otros términos.
                      <span className="pet-icon-interactive ml-1">🔍</span>
                    </>
                  )
                  : (
                    <>
                      <span className="pet-icon-interactive mr-1">🐱</span>
                      Intenta cambiar los filtros o busca otros productos.
                      <span className="pet-icon-interactive ml-1">🎯</span>
                    </>
                  )
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Catalogo;
