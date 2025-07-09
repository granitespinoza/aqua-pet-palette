
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/hooks/useFilteredProducts';
import { Link } from 'react-router-dom';
import { formatPrice } from '@/lib/formatPrice';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { ShoppingCart, Eye, Heart, Share2 } from 'lucide-react';
import AddToCartModal from '@/components/AddToCartModal';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id, 1);
    toast.success(`${product.nombre} añadido al carrito`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowAddToCartModal(true);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removido de favoritos' : 'Añadido a favoritos');
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: product.nombre,
        url: `${window.location.origin}/producto/${product.id}`
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/producto/${product.id}`);
      toast.success('Link copiado al portapapeles');
    }
  };

  return (
    <>
      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border border-blue-100 pet-card-glow">
        <CardContent className="p-4">
          <Link to={`/producto/${product.id}`} className="block">
            <div className="relative mb-4">
              <img
                src={product.img}
                alt={product.nombre}
                className="w-full h-48 object-cover rounded-lg bg-gradient-to-br from-blue-50 to-yellow-50 group-hover:scale-105 transition-transform duration-500"
              />
              {product.descuento > 0 && (
                <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white font-semibold animate-pulse">
                  <span className="pet-icon-interactive mr-1">🔥</span>
                  -{product.descuento}%
                </Badge>
              )}
              
              {/* Action buttons overlay */}
              <div className="absolute top-2 right-2 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                  onClick={handleToggleFavorite}
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4 text-gray-600" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900 line-clamp-2 leading-tight min-h-[2.5rem] group-hover:text-primary transition-colors">
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
                  <span className="text-lg font-bold text-gray-900">
                    <span className="pet-icon-interactive mr-1">💰</span>
                    {formatPrice(product.precio)}
                  </span>
                )}
              </div>
            </div>
          </Link>
          
          <div className="mt-4 flex space-x-2">
            <Button 
              className="flex-1 bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              variant="secondary"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `/producto/${product.id}`;
              }}
            >
              <Eye className="w-4 h-4 mr-1" />
              Ver producto
            </Button>
            
            <Button
              size="sm"
              className="pet-button-glow"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <AddToCartModal
        product={product}
        open={showAddToCartModal}
        onOpenChange={setShowAddToCartModal}
      />
    </>
  );
};

export default ProductCard;
