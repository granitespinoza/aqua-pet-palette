
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/hooks/useFilteredProducts';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(price);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border border-blue-100">
      <CardContent className="p-4">
        <div className="relative mb-4">
          <img
            src={product.img}
            alt={product.nombre}
            className="w-full h-48 object-cover rounded-lg bg-gradient-to-br from-blue-50 to-yellow-50"
          />
          {product.descuento > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white font-semibold">
              -{product.descuento}%
            </Badge>
          )}
        </div>
        
        <div className="space-y-3">
          <h3 className="font-medium text-gray-900 line-clamp-2 leading-tight min-h-[2.5rem]">
            {product.nombre}
          </h3>
          
          <div className="space-y-1">
            {product.precioOferta ? (
              <>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-primary">
                    {formatPrice(product.precioOferta)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.precio)}
                  </span>
                </div>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(product.precio)}
              </span>
            )}
          </div>
          
          <Button 
            className="w-full bg-gray-100 text-gray-700 hover:bg-primary hover:text-white transition-colors"
            variant="secondary"
            size="sm"
          >
            Agregar al carrito
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
