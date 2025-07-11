
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { purchaseService, CompraResponse } from '@/services/purchaseService';
import { useUser } from '@/contexts/UserContext';
import { useTenant } from '@/contexts/TenantContext';

export const useOrders = () => {
  const { user } = useUser();
  const { tenantId } = useTenant();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Limpiar datos obsoletos una vez cuando se carga el hook
  useEffect(() => {
    if (user?.profile?.email) {
      purchaseService.cleanupGlobalOrders();
    }
  }, [user?.profile?.email]);

  const {
    data: orders = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['orders', user?.profile?.email],
    queryFn: () => purchaseService.listarCompras(user?.profile?.email),
    enabled: !!user?.profile?.email,
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: 2,
  });

  const refreshOrders = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  // Filtrar órdenes por tenant si estamos en una tienda específica
  const filteredOrders = tenantId 
    ? orders.filter(order => order.tenantId === tenantId)
    : orders;

  // Agrupar órdenes por tenant para la vista del portal
  const ordersByTenant = {
    dogshop: orders.filter(order => order.tenantId === 'dogshop'),
    catshop: orders.filter(order => order.tenantId === 'catshop'),
    vetshop: orders.filter(order => order.tenantId === 'vetshop')
  };

  console.log('useOrders - Orders data:', {
    totalOrders: orders.length,
    filteredOrders: filteredOrders.length,
    tenantId,
    isLoading,
    error: error?.message
  });

  return {
    orders: filteredOrders,
    allOrders: orders,
    ordersByTenant,
    isLoading: isLoading || isRefreshing,
    error: error?.message,
    refreshOrders,
    refetch
  };
};
