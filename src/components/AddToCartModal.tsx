
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { formatPrice } from '@/lib/formatPrice';

interface AddToCartModalProps {
  product: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddToCartModal = ({ product, open, onOpenChange }: AddToCartModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product.id, quantity);
    toast.success(`${quantity} × ${product.nombre} añadido al carrito`);
    onOpenChange(false);
    setQuantity(1);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="modal-glass max-w-md border-gray-200 shadow-2xl">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-bold text-gray-900">
            Añadir al carrito
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center space-x-4 p-4 bg-white/60 rounded-lg border border-gray-200">
            <img
              src={product.img}
              alt={product.nombre}
              className="w-16 h-16 object-cover rounded-lg border border-gray-200 shadow-sm"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 mb-1">
                {product.nombre}
              </h3>
              <p className="text-xl font-bold text-blue-600">
                {product.precioOferta 
                  ? formatPrice(product.precioOferta)
                  : formatPrice(product.precio)
                }
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-800">
              Cantidad
            </label>
            <div className="flex items-center justify-center space-x-4 p-4 bg-white/60 rounded-lg border border-gray-200">
              <Button
                variant="outline"
                size="sm"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="w-10 h-10 rounded-full border-gray-300 hover:bg-gray-100 hover:border-gray-400 disabled:opacity-50"
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </Button>
              <span className="w-16 text-center font-bold text-xl text-gray-900 bg-white px-4 py-2 rounded-lg border border-gray-200">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={incrementQuantity}
                className="w-10 h-10 rounded-full border-gray-300 hover:bg-gray-100 hover:border-gray-400"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </Button>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 bg-white"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleAddToCart} 
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md"
            >
              Agregar al carrito
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartModal;
