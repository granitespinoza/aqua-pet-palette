
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/hooks/useFilteredProducts';
import { Link } from 'react-router-dom';
import { formatPrice } from '@/lib/formatPrice';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border border-blue-100 pet-card-glow pet-card-subtle scroll-reveal">
      <CardContent className="p-4">
        <Link to={`/producto/${product.id}`} className="block">
          <div className="relative mb-4">
            <img
              src={product.img}
              alt={product.nombre}
              className="w-full h-48 object-cover rounded-lg bg-gradient-to-br from-blue-50 to-yellow-50 pet-image-glow group-hover:scale-105 transition-transform duration-500"
            />
            {product.descuento > 0 && (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white font-semibold pet-glow-red pet-button-particles animate-pulse">
                <span className="pet-icon-interactive mr-1">🔥</span>
                -{product.descuento}%
              </Badge>
            )}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-yellow-400 pet-icon-interactive text-xl">⭐</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900 line-clamp-2 leading-tight min-h-[2.5rem] group-hover:text-primary transition-colors pet-link-glow">
              <span className="pet-icon-interactive mr-1">🎯</span>
              {product.nombre}
            </h3>
            
            <div className="space-y-1">
              {product.precioOferta ? (
                <>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-primary pet-glow-blue">
                      <span className="pet-icon-interactive mr-1">💰</span>
                      {formatPrice(product.precioOferta)}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.precio)}
                    </span>
                  </div>
                </>
              ) : (
                <span className="text-lg font-bold text-gray-900 pet-glow-green">
                  <span className="pet-icon-interactive mr-1">💰</span>
                  {formatPrice(product.precio)}
                </span>
              )}
            </div>
          </div>
        </Link>
        
        <div className="mt-4">
          <Button 
            className="w-full bg-gray-100 text-gray-700 hover:bg-primary hover:text-white transition-colors pet-button-glow pet-button-interactive pet-button-particles group-hover:scale-105 duration-300"
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `/producto/${product.id}`;
            }}
          >
            <span className="pet-icon-interactive mr-2">👀</span>
            Ver producto
            <span className="pet-icon-interactive ml-2">🛍️</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
