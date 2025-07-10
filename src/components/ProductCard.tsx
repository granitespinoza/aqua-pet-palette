import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/hooks/useFilteredProducts';
import { Link } from 'react-router-dom';
import { formatPrice } from '@/lib/formatPrice';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { ShoppingCart, Eye, Heart, Share2, Star, Zap } from 'lucide-react';
import AddToCartModal from '@/components/AddToCartModal';
interface ProductCardProps {
  product: Product;
}
const ProductCard = ({
  product
}: ProductCardProps) => {
  const {
    addItem
  } = useCart();
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id, 1);
    toast.success(`${product.nombre} añadido al carrito`, {
      description: "¡Excelente elección para tu mascota! 🐾"
    });
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
    toast.success(isFavorite ? 'Removido de favoritos 💔' : 'Añadido a favoritos 💖');
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
      toast.success('Link copiado al portapapeles 📋');
    }
  };
  return <>
      <Card className="group card-professional border-0 shadow-soft hover:shadow-large overflow-hidden bg-white transition-all duration-500 hover:-translate-y-1">
        <CardContent className="p-0">
          <Link to={`/producto/${product.id}`} className="block">
            {/* Image Section */}
            <div className="relative overflow-hidden">
              <div className="aspect-square relative">
                <img src={product.img} alt={product.nombre} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* Badges */}
              {product.descuento > 0 && <Badge className="absolute top-3 left-3 bg-gradient-to-r from-error-500 to-error-600 text-white font-bold text-sm px-3 py-1 shadow-medium border-0">
                  <Zap className="w-3 h-3 mr-1" />
                  -{product.descuento}%
                </Badge>}
              
              <Badge className="absolute top-3 right-3 bg-gradient-to-r from-success-500 to-success-600 text-white font-medium text-xs px-2 py-1 shadow-medium border-0">
                <Star className="w-3 h-3 mr-1" />
                Premium
              </Badge>
              
              {/* Action Buttons */}
              <div className="absolute bottom-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                <Button variant="secondary" size="sm" className="h-10 w-10 p-0 glass-effect hover:scale-110 transition-all duration-300 border-0 shadow-medium bg-white/90 hover:bg-white" onClick={handleToggleFavorite}>
                  <Heart className={`h-4 w-4 ${isFavorite ? 'fill-error-500 text-error-500' : 'text-neutral-600'} transition-colors`} />
                </Button>
                <Button variant="secondary" size="sm" className="h-10 w-10 p-0 glass-effect hover:scale-110 transition-all duration-300 border-0 shadow-medium bg-white/90 hover:bg-white" onClick={handleShare}>
                  <Share2 className="h-4 w-4 text-neutral-600" />
                </Button>
              </div>
            </div>
            
            {/* Content Section */}
            <div className="p-6 space-y-4">
              <h3 className="font-bold text-neutral-900 line-clamp-2 leading-tight min-h-[3rem] group-hover:text-primary transition-colors duration-300 text-lg">
                {product.nombre}
              </h3>
              
              {/* Price Section */}
              <div className="space-y-2">
                {product.precioOferta ? <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-bold text-neutral-900">
                        {formatPrice(product.precioOferta)}
                      </span>
                      <Badge className="bg-error-50 text-error-600 border-error-200 font-semibold">
                        ¡OFERTA!
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg text-neutral-400 line-through font-medium">
                        {formatPrice(product.precio)}
                      </span>
                      <span className="text-sm font-bold text-success-600">
                        Ahorras {formatPrice(product.precio - product.precioOferta)}
                      </span>
                    </div>
                  </div> : <span className="text-2xl font-bold text-neutral-900">
                    {formatPrice(product.precio)}
                  </span>}
              </div>

              {/* Rating */}
              
            </div>
          </Link>
          
          {/* Action Buttons */}
          <div className="px-6 pb-6 flex space-x-3">
            <Button className="flex-1 glass-effect text-neutral-700 hover:text-neutral-900 font-semibold border border-neutral-200 hover:border-neutral-300 hover:scale-[1.02] transition-all duration-300 bg-white hover:bg-neutral-50" variant="secondary" size="sm" onClick={e => {
            e.preventDefault();
            window.location.href = `/producto/${product.id}`;
          }}>
              <Eye className="w-4 h-4 mr-2" />
              Ver producto
            </Button>
            
            <Button size="sm" onClick={handleAddToCart} className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold hover:scale-[1.02] transition-all duration-300 shadow-medium hover:shadow-large border-0 px-6">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Agregar
            </Button>
          </div>
        </CardContent>
      </Card>

      <AddToCartModal product={product} open={showAddToCartModal} onOpenChange={setShowAddToCartModal} />
    </>;
};
export default ProductCard;