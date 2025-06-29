
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { useUser } from '@/contexts/UserContext';
import { formatPrice } from '@/lib/formatPrice';
import { toast } from 'sonner';
import products from '@/data/products.json';
import AuthModal from '@/components/AuthModal';

const Checkout = () => {
  const { items, clearCart, getTotalItems } = useCart();
  const { user, getUserProfile } = useUser();
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [direccion, setDireccion] = useState('');

  useEffect(() => {
    if (!user) {
      setAuthModalOpen(true);
    } else {
      const profile = getUserProfile();
      if (profile) {
        setDireccion(profile.direccion);
      }
    }
  }, [user, getUserProfile]);

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  const cartProducts = items.map(item => {
    const product = products.find(p => p.id === item.id);
    return product ? { ...product, quantity: item.quantity } : null;
  }).filter(Boolean);

  const subtotal = cartProducts.reduce((total, item) => {
    if (!item) return total;
    const price = item.precioOferta || item.precio;
    return total + (price * item.quantity);
  }, 0);

  const shipping = subtotal >= 100 ? 0 : 10;
  const total = subtotal + shipping;

  const handlePayment = () => {
    // Simular proceso de pago
    const orderData = {
      id: Date.now(),
      items: cartProducts,
      subtotal,
      shipping,
      total,
      direccion,
      fecha: new Date().toISOString(),
      estado: 'pendiente'
    };

    // Guardar en historial
    const orders = JSON.parse(localStorage.getItem('user_orders') || '[]');
    orders.unshift(orderData);
    localStorage.setItem('user_orders', JSON.stringify(orders));

    clearCart();
    toast.success('¡Pedido realizado exitosamente! Te contactaremos pronto.');
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-yellow-50/30">
        <AuthModal
          open={authModalOpen}
          onOpenChange={setAuthModalOpen}
          nextRoute="/checkout"
          message="Inicia sesión para finalizar tu compra"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-yellow-50/30">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Finalizar Compra
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulario de envío */}
            <Card className="bg-white/80 backdrop-blur-sm border border-blue-100">
              <CardHeader>
                <CardTitle>Dirección de envío</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="direccion">Dirección completa *</Label>
                  <Input
                    id="direccion"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    placeholder="Ej: Av. Arequipa 123, San Isidro, Lima"
                    className="mt-1"
                  />
                </div>

                {/* QR Demo */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
                  <h4 className="font-medium mb-2">Pago por QR (Demo)</h4>
                  <div className="w-32 h-32 bg-white border-2 border-dashed border-gray-300 rounded mx-auto flex items-center justify-center">
                    <span className="text-gray-500 text-sm">QR Code</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Escanea para pagar {formatPrice(total)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Resumen del pedido */}
            <Card className="bg-white/80 backdrop-blur-sm border border-blue-100">
              <CardHeader>
                <CardTitle>Resumen del pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {cartProducts.map((item) => {
                    if (!item) return null;
                    const price = item.precioOferta || item.precio;
                    
                    return (
                      <div key={item.id} className="flex items-center space-x-3">
                        <img
                          src={item.img}
                          alt={item.nombre}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium line-clamp-1">
                            {item.nombre}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {item.quantity} × {formatPrice(price)}
                          </p>
                        </div>
                        <span className="text-sm font-medium">
                          {formatPrice(price * item.quantity)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <hr />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({getTotalItems()} productos)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Envío</span>
                    <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                      {shipping === 0 ? 'GRATIS' : formatPrice(shipping)}
                    </span>
                  </div>
                  
                  <hr />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(total)}</span>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  className="w-full bg-primary hover:bg-blue-700 text-white py-3"
                  disabled={!direccion.trim()}
                >
                  He pagado - Confirmar pedido
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate('/cart')}
                >
                  ← Volver al carrito
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
