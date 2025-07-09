
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
      <DialogContent className="modal-content max-w-md">
        <div className="modal-overlay" />
        <DialogHeader className="modal-header">
          <DialogTitle className="modal-title">Añadir al carrito</DialogTitle>
        </DialogHeader>
        
        <div className="modal-body space-y-6">
          <div className="flex items-center space-x-4">
            <img
              src={product.img}
              alt={product.nombre}
              className="w-16 h-16 object-cover rounded-lg border border-gray-200"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900">{product.nombre}</h3>
              <p className="text-xl font-bold text-blue-600">
                {product.precioOferta 
                  ? formatPrice(product.precioOferta)
                  : formatPrice(product.precio)
                }
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Cantidad
            </label>
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="btn-secondary-professional w-10 h-10 rounded-full"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-16 text-center font-bold text-xl text-gray-900">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={incrementQuantity}
                className="btn-secondary-professional w-10 h-10 rounded-full"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="btn-secondary-professional px-6"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleAddToCart} 
              className="btn-primary-professional px-6"
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
