
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, Calendar, MapPin } from 'lucide-react';
import { formatPrice } from '@/lib/formatPrice';
import { useTenant } from '@/contexts/TenantContext';
import { Link } from 'react-router-dom';

interface OrderConfirmationProps {
  order: {
    id: string;
    total: number;
    productos: Array<{
      id: string;
      nombre: string;
      precio: number;
      cantidad: number;
    }>;
    fecha: string;
    tenantId: string;
    direccion?: string;
  };
}

const OrderConfirmation = ({ order }: OrderConfirmationProps) => {
  const { tenantId } = useTenant();

  const getTenantInfo = (tenant: string) => {
    switch (tenant) {
      case 'dogshop':
        return { name: 'DogShop', emoji: '🐕', color: 'text-orange-600' };
      case 'catshop':
        return { name: 'CatShop', emoji: '🐱', color: 'text-purple-600' };
      case 'vetshop':
        return { name: 'VetShop', emoji: '🏥', color: 'text-blue-600' };
      default:
        return { name: 'GO Pet', emoji: '🐾', color: 'text-gray-600' };
    }
  };

  const tenantInfo = getTenantInfo(order.tenantId);

  return (
    <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm border border-green-200">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <CardTitle className="text-2xl text-green-700">
          ¡Pedido Confirmado!
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Order Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{tenantInfo.emoji}</span>
            <div>
              <h3 className="font-semibold">Pedido #{order.id.slice(-8)}</h3>
              <p className={`text-sm ${tenantInfo.color}`}>{tenantInfo.name}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>{new Date(order.fecha).toLocaleDateString('es-ES')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-gray-500" />
              <span>{order.productos.length} productos</span>
            </div>
          </div>
          
          {order.direccion && (
            <div className="flex items-center gap-2 mt-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{order.direccion}</span>
            </div>
          )}
        </div>

        {/* Products Summary */}
        <div>
          <h4 className="font-medium mb-3">Productos pedidos:</h4>
          <div className="space-y-2">
            {order.productos.map((producto, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <div className="flex-1">
                  <p className="font-medium text-sm">{producto.nombre}</p>
                  <p className="text-xs text-gray-600">
                    Cantidad: {producto.cantidad} × {formatPrice(producto.precio)}
                  </p>
                </div>
                <p className="font-semibold text-sm">
                  {formatPrice(producto.precio * producto.cantidad)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total pagado:</span>
            <span className="text-2xl font-bold text-green-700">
              {formatPrice(order.total)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Link to="/pedidos" className="flex-1">
            <Button className="w-full">Ver todos mis pedidos</Button>
          </Link>
          <Link to="/catalogo" className="flex-1">
            <Button variant="outline" className="w-full">Seguir comprando</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderConfirmation;
