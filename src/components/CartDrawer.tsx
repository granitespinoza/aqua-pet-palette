
import { ShoppingCart, Plus, Minus, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '@/lib/formatPrice';
import products from '@/data/products.json';

const CartDrawer = () => {
  const { items, incrementItem, decrementItem, removeItem, getTotalItems } = useCart();
  const navigate = useNavigate();

  const cartProducts = items.map(item => {
    const product = products.find(p => String(p.id) === item.id);
    return product ? { ...product, quantity: item.quantity } : null;
  }).filter(Boolean);

  const getSubtotal = () => {
    return cartProducts.reduce((total, item) => {
      if (!item) return total;
      const price = item.precioOferta || item.precio;
      return total + (price * item.quantity);
    }, 0);
  };

  const totalItems = getTotalItems();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="relative icon-interactive">
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold p-0">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md bg-white border-l border-gray-200">
        <SheetHeader className="border-b border-gray-200 pb-4">
          <SheetTitle className="flex items-center space-x-2 text-xl font-bold text-gray-900">
            <ShoppingCart className="w-6 h-6 text-blue-600" />
            <span>Mi Carrito ({totalItems})</span>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {cartProducts.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
              <Button
                onClick={() => navigate('/catalogo')}
                className="mt-6 btn-primary-professional"
              >
                Ir a comprar
              </Button>
            </div>
          ) : (
            <>
              {/* Lista de productos */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {cartProducts.map((item) => {
                  if (!item) return null;
                  const price = item.precioOferta || item.precio;
                  const subtotal = price * item.quantity;

                  return (
                    <div key={item.id} className="professional-card p-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.img}
                          alt={item.nombre}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900 line-clamp-2">
                            {item.nombre}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {formatPrice(price)}
                          </p>
                          <p className="text-sm font-bold text-blue-600 mt-1">
                            Subtotal: {formatPrice(subtotal)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => decrementItem(String(item.id))}
                            className="w-8 h-8 p-0 btn-secondary-professional"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-semibold text-gray-900">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => incrementItem(String(item.id))}
                            className="w-8 h-8 p-0 btn-secondary-professional"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(String(item.id))}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total y botones */}
              <div className="border-t border-gray-200 pt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">Total:</span>
                  <span className="text-xl font-bold text-blue-600">
                    {formatPrice(getSubtotal())}
                  </span>
                </div>
                
                <Button
                  onClick={() => navigate('/cart')}
                  className="w-full btn-primary-professional text-lg py-3"
                >
                  Ver carrito completo
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
