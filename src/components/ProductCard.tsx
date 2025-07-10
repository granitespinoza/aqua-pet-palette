import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/hooks/useFilteredProducts';
import { Link } from 'react-router-dom';
import { formatPrice } from '@/lib/formatPrice';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { ShoppingCart, Eye, Heart, Share2, Star, Sparkles } from 'lucide-react';
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
      <Card className="group pet-card-glow border-2 border-pastel-cyan/40 overflow-hidden">
        <CardContent className="p-0">
          <Link to={`/producto/${product.id}`} className="block">
            <div className="relative">
              <div className="aspect-square overflow-hidden">
                <img src={product.img} alt={product.nombre} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-2" />
              </div>
              
              {/* Enhanced badges and overlays */}
              {product.descuento > 0 && <Badge className="absolute top-3 left-3 bg-gradient-to-r from-pastel-pink to-pastel-peach text-gray-900 font-extra-bold text-sm px-3 py-1 animate-bounce-gentle shadow-lg border-2 border-white/50">
                  <span className="pet-icon-interactive mr-1">🔥</span>
                  -{product.descuento}%
                  <span className="pet-icon-interactive ml-1">💥</span>
                </Badge>}
              
              {/* Quality badge */}
              <Badge className="absolute top-3 right-3 bg-gradient-to-r from-pastel-green to-pastel-cyan text-gray-900 font-bold text-xs px-2 py-1 shadow-lg border border-white/50">
                <Star className="w-3 h-3 mr-1" />
                Premium
              </Badge>
              
              {/* Action buttons overlay */}
              <div className="absolute bottom-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                <Button variant="secondary" size="sm" className="h-10 w-10 p-0 glass-effect hover:scale-125 transition-transform duration-300 border-2 border-white/50" onClick={handleToggleFavorite}>
                  <Heart className={`h-4 w-4 ${isFavorite ? 'fill-pastel-pink text-pastel-pink' : 'text-gray-700'} pet-icon-interactive`} />
                </Button>
                <Button variant="secondary" size="sm" className="h-10 w-10 p-0 glass-effect hover:scale-125 transition-transform duration-300 border-2 border-white/50" onClick={handleShare}>
                  <Share2 className="h-4 w-4 text-gray-700 pet-icon-interactive" />
                </Button>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            <div className="p-6 space-y-4">
              <h3 className="font-extra-bold text-gray-900 line-clamp-2 leading-tight min-h-[3rem] group-hover:text-pastel-peach transition-colors duration-300 enhanced-visibility text-lg">
                <span className="pet-icon-interactive mr-2">🎯</span>
                {product.nombre}
              </h3>
              
              <div className="space-y-2">
                {product.precioOferta ? <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-extra-bold text-gray-900 pet-glow-blue enhanced-visibility">
                        <span className="pet-icon-interactive mr-2">💰</span>
                        {formatPrice(product.precioOferta)}
                      </span>
                      <Badge className="bg-pastel-pink/20 text-gray-800 font-bold">
                        ¡OFERTA!
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg text-gray-500 line-through font-semibold">
                        {formatPrice(product.precio)}
                      </span>
                      <span className="text-sm font-bold text-pastel-pink">
                        Ahorras {formatPrice(product.precio - product.precioOferta)}
                      </span>
                    </div>
                  </div> : <span className="text-2xl font-extra-bold text-gray-900 enhanced-visibility">
                    <span className="pet-icon-interactive mr-2">💰</span>
                    {formatPrice(product.precio)}
                  </span>}
              </div>

              {/* Rating stars */}
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-pastel-yellow text-pastel-yellow" />)}
                <span className="text-sm text-gray-600 font-semibold ml-2">(4.8) 127 reseñas</span>
              </div>
            </div>
          </Link>
          
          <div className="px-6 pb-6 flex space-x-3">
            <Button className="flex-1 glass-effect text-gray-900 hover:text-gray-900 font-extra-bold border-2 border-pastel-blue/40 hover:border-pastel-cyan hover:scale-105 transition-all duration-300 enhanced-visibility" variant="secondary" size="sm" onClick={e => {
            e.preventDefault();
            window.location.href = `/producto/${product.id}`;
          }}>
              <Eye className="w-4 h-4 mr-2 pet-icon-interactive" />
              Ver producto
            </Button>
            
            <Button size="sm" onClick={handleAddToCart} className="pet-button-primary hover:scale-110 transition-all duration-300 font-extra-bold px-0">
              <ShoppingCart className="w-4 h-4 mr-2" />
              <span className="pet-icon-interactive mr-1">🛒</span>
              Agregar
            </Button>
          </div>
        </CardContent>
      </Card>

      <AddToCartModal product={product} open={showAddToCartModal} onOpenChange={setShowAddToCartModal} />
    </>;
};
export default ProductCard;