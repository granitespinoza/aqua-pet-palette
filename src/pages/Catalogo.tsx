
import { useFilteredProducts } from '@/hooks/useFilteredProducts';
import ProductCard from '@/components/ProductCard';
import { Card, CardContent } from '@/components/ui/card';

const Catalogo = () => {
  const { products, totalProducts } = useFilteredProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-yellow-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Catálogo de productos
          </h1>
          <p className="text-gray-600">
            {totalProducts} producto{totalProducts !== 1 ? 's' : ''} encontrado{totalProducts !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <Card className="max-w-md mx-auto bg-white/80 backdrop-blur-sm border border-blue-100">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No se encontraron resultados
              </h3>
              <p className="text-gray-600">
                Intenta cambiar los filtros o busca otros productos.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Catalogo;
