
import { useUser } from '@/contexts/UserContext';
import { useTenant } from '@/contexts/TenantContext';
import { useOrders } from '@/hooks/useOrders';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ArrowLeft, ShoppingBag, RefreshCw, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const Orders = () => {
  const { user } = useUser();
  const { tenantId } = useTenant();
  const { orders, allOrders, ordersByTenant, isLoading, error, refreshOrders } = useOrders();

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

  const handleRefresh = async () => {
    try {
      await refreshOrders();
      toast.success('Pedidos actualizados');
    } catch (error) {
      toast.error('Error al actualizar pedidos');
    }
  };

  // Si estamos en una tienda específica, mostrar solo pedidos de esa tienda
  if (tenantId) {
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
              <h1 className="text-3xl font-bold text-gray-900">Mis Pedidos - {currentTenantInfo.name}</h1>
              <Button 
                onClick={handleRefresh} 
                variant="outline" 
                size="sm"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Orders for current tenant */}
            <Card className="glass-effect bg-white/80 backdrop-blur-md border border-white/30">
              <CardHeader>
                <CardTitle className={`flex items-center gap-3 ${currentTenantInfo.textColor}`}>
                  <span className="text-2xl">{currentTenantInfo.emoji}</span>
                  <Package className="h-6 w-6" />
                  Pedidos en {currentTenantInfo.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Cargando pedidos...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-8">
                    <p className="text-red-600 mb-4">Error al cargar pedidos: {error}</p>
                    <Button onClick={handleRefresh} variant="outline">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reintentar
                    </Button>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No has realizado pedidos en {currentTenantInfo.name} aún</p>
                    <Link to="/catalogo" className="mt-4 inline-block">
                      <Button>Explorar Productos</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4 bg-white/50">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="text-sm text-gray-600">Pedido #{order.id.slice(-8)}</p>
                            <p className="text-sm text-gray-500">{new Date(order.fecha).toLocaleDateString('es-ES')}</p>
                            <p className="text-xs text-gray-400">{order.direccion}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">S/ {order.total.toFixed(2)}</p>
                            <span className={`text-xs px-2 py-1 rounded ${
                              order.estado === 'completed' ? 'bg-green-100 text-green-700' : 
                              order.estado === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {order.estado}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          {order.productos.map((item, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">{item.nombre}</p>
                                <p className="text-sm text-gray-600">Cantidad: {item.cantidad}</p>
                              </div>
                              <p className="font-semibold">S/ {(item.precio * item.cantidad).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Vista del portal: Agrupar pedidos por tenant
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
            <Button 
              onClick={handleRefresh} 
              variant="outline" 
              size="sm"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Loading or Error State */}
          {isLoading ? (
            <Card className="glass-effect bg-white/80 backdrop-blur-md border border-white/30">
              <CardContent className="text-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Cargando pedidos...</p>
              </CardContent>
            </Card>
          ) : error ? (
            <Card className="glass-effect bg-white/80 backdrop-blur-md border border-white/30">
              <CardContent className="text-center py-12">
                <p className="text-red-600 mb-4">Error al cargar pedidos: {error}</p>
                <Button onClick={handleRefresh} variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reintentar
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Orders by Store */}
              <div className="space-y-8">
                {Object.entries(ordersByTenant).map(([tenant, tenantOrders]) => {
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
                        {tenantOrders.length === 0 ? (
                          <div className="text-center py-8">
                            <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">No has realizado pedidos en {tenantInfo.name} aún</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {tenantOrders.map((order) => (
                              <div key={order.id} className="border border-gray-200 rounded-lg p-4 bg-white/50">
                                <div className="flex justify-between items-start mb-3">
                                  <div>
                                    <p className="text-sm text-gray-600">Pedido #{order.id.slice(-8)}</p>
                                    <p className="text-sm text-gray-500">{new Date(order.fecha).toLocaleDateString('es-ES')}</p>
                                    <p className="text-xs text-gray-400">{order.direccion}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-bold text-lg">S/ {order.total.toFixed(2)}</p>
                                    <span className={`text-xs px-2 py-1 rounded ${
                                      order.estado === 'completed' ? 'bg-green-100 text-green-700' : 
                                      order.estado === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                      'bg-gray-100 text-gray-700'
                                    }`}>
                                      {order.estado}
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  {order.productos.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center">
                                      <div>
                                        <p className="font-medium">{item.nombre}</p>
                                        <p className="text-sm text-gray-600">Cantidad: {item.cantidad}</p>
                                      </div>
                                      <p className="font-semibold">S/ {(item.precio * item.cantidad).toFixed(2)}</p>
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

              {allOrders.length === 0 && (
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
