
import { useUser } from '@/contexts/UserContext';
import { useTenant } from '@/contexts/TenantContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface Order {
  id: string;
  tenantId: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  date: string;
}

const Orders = () => {
  const { user } = useUser();
  const { tenantId } = useTenant();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Acceso Restringido</h1>
          <p className="text-gray-600 mb-6">Debes iniciar sesión para ver tus pedidos.</p>
          <Link to="/">
            <Button>Ir al Inicio</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Obtener pedidos del localStorage
  const getOrders = (): Order[] => {
    try {
      const orders = localStorage.getItem('user_orders');
      return orders ? JSON.parse(orders) : [];
    } catch {
      return [];
    }
  };

  const allOrders = getOrders();
  const userOrders = allOrders.filter(order => order.tenantId);

  const getTenantInfo = (tenant: string) => {
    switch (tenant) {
      case 'dogshop':
        return { name: 'DogShop', emoji: '🐕', bgColor: 'bg-orange-50', textColor: 'text-orange-600' };
      case 'catshop':
        return { name: 'CatShop', emoji: '🐱', bgColor: 'bg-pink-50', textColor: 'text-purple-600' };
      case 'vetshop':
        return { name: 'VetShop', emoji: '🏥', bgColor: 'bg-blue-50', textColor: 'text-blue-600' };
      default:
        return { name: 'GO Pet', emoji: '🐾', bgColor: 'bg-gray-50', textColor: 'text-gray-600' };
    }
  };

  const currentTenantInfo = getTenantInfo(tenantId || '');

  // Agrupar pedidos por tenant
  const ordersByTenant = {
    dogshop: userOrders.filter(order => order.tenantId === 'dogshop'),
    catshop: userOrders.filter(order => order.tenantId === 'catshop'),
    vetshop: userOrders.filter(order => order.tenantId === 'vetshop')
  };

  return (
    <div className={`min-h-screen ${currentTenantInfo.bgColor}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Mis Pedidos</h1>
          </div>

          {/* Orders by Store */}
          <div className="space-y-8">
            {Object.entries(ordersByTenant).map(([tenant, orders]) => {
              const tenantInfo = getTenantInfo(tenant);
              
              return (
                <Card key={tenant} className="glass-effect bg-white/80 backdrop-blur-md border border-white/30">
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-3 ${tenantInfo.textColor}`}>
                      <span className="text-2xl">{tenantInfo.emoji}</span>
                      <Package className="h-6 w-6" />
                      {tenantInfo.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {orders.length === 0 ? (
                      <div className="text-center py-8">
                        <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No has realizado pedidos en {tenantInfo.name} aún</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div key={order.id} className="border border-gray-200 rounded-lg p-4 bg-white/50">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <p className="text-sm text-gray-600">Pedido #{order.id.slice(-8)}</p>
                                <p className="text-sm text-gray-500">{order.date}</p>
                              </div>
                              <p className="font-bold text-lg">S/ {order.total.toFixed(2)}</p>
                            </div>
                            
                            <div className="space-y-2">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex justify-between items-center">
                                  <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                                  </div>
                                  <p className="font-semibold">S/ {(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {userOrders.length === 0 && (
            <Card className="glass-effect bg-white/80 backdrop-blur-md border border-white/30">
              <CardContent className="text-center py-12">
                <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No tienes pedidos aún</h3>
                <p className="text-gray-600 mb-6">¡Explora nuestras tiendas y encuentra productos increíbles para tu mascota!</p>
                <Link to="/catalogo">
                  <Button>Explorar Productos</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
