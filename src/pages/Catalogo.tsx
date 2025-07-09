
import { useSearchParams } from 'react-router-dom';
import { useFilteredProducts } from '@/hooks/useFilteredProducts';
import { useSearchResults } from '@/hooks/useSearchResults';
import ProductCard from '@/components/ProductCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const Catalogo = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');
  
  const searchResults = useSearchResults(searchQuery || '');
  const filteredProducts = useFilteredProducts(20); // 20 productos por página
  
  const isSearchMode = !!searchQuery;
  const products = isSearchMode ? searchResults.results : filteredProducts.products;
  const totalProducts = isSearchMode ? searchResults.totalResults : filteredProducts.totalProducts;
  const isLoading = isSearchMode ? searchResults.isLoading : filteredProducts.loading;

  const categoria = searchParams.get('categoria');
  const marca = searchParams.get('marca');

  const handlePageChange = (page: number) => {
    if (!isSearchMode) {
      filteredProducts.updatePage(page);
    }
  };

  const renderPagination = () => {
    if (isSearchMode || filteredProducts.totalPages <= 1) return null;

    const { currentPage, totalPages } = filteredProducts;
    const pages = [];

    // Always show first page
    pages.push(1);

    // Add ellipsis if needed
    if (currentPage > 3) {
      pages.push('ellipsis1');
    }

    // Add pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    // Add ellipsis if needed
    if (currentPage < totalPages - 2) {
      pages.push('ellipsis2');
    }

    // Always show last page if more than 1 page
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return (
      <div className="flex justify-center mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageChange(currentPage - 1)}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:bg-blue-50'}
              />
            </PaginationItem>
            
            {pages.map((page, index) => (
              <PaginationItem key={index}>
                {page === 'ellipsis1' || page === 'ellipsis2' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    onClick={() => handlePageChange(page as number)}
                    isActive={currentPage === page}
                    className="cursor-pointer hover:bg-blue-50"
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => handlePageChange(currentPage + 1)}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:bg-blue-50'}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-yellow-50/30 watercolor-section">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
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
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  <span className="pet-icon-interactive mr-1">🏷️</span>
                  Categoría: {categoria}
                </span>
              )}
              {marca && (
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-yellow-50 text-yellow-700 border border-yellow-200">
                  <span className="pet-icon-interactive mr-1">🏢</span>
                  Marca: {marca}
                </span>
              )}
            </div>
          )}
          
          <p className="text-gray-700 font-medium text-lg">
            {isLoading ? (
              <>
                <span className="pet-icon-interactive mr-1">⏳</span>
                Buscando...
              </>
            ) : (
              <>
                <span className="pet-icon-interactive mr-1">📊</span>
                {totalProducts} producto{totalProducts !== 1 ? 's' : ''} encontrado{totalProducts !== 1 ? 's' : ''}
                {!isSearchMode && filteredProducts.totalPages > 1 && (
                  <span className="ml-2 text-blue-600">
                    (Página {filteredProducts.currentPage} de {filteredProducts.totalPages})
                  </span>
                )}
              </>
            )}
          </p>
        </div>

        {/* Products Grid */}
        {isLoading ? (
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
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {renderPagination()}
          </>
        ) : (
          <Card className="max-w-md mx-auto pet-card-glow">
            <CardContent className="p-8 text-center">
              <div className="text-8xl mb-4 pet-icon-interactive">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 pet-glow-blue">
                <span className="pet-icon-interactive mr-2">😔</span>
                No se encontraron resultados
              </h3>
              <p className="text-gray-700 font-medium text-lg">
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
