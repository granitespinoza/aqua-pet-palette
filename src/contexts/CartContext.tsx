
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTenant } from './TenantContext';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category?: string;
  brand?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  processOrder: (orderData: any) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { tenantId } = useTenant();

  // Load cart items from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(`cart_${tenantId || 'default'}`);
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, [tenantId]);

  // Save cart items to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem(`cart_${tenantId || 'default'}`, JSON.stringify(items));
  }, [items, tenantId]);

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === newItem.id);
      
      if (existingItem) {
        return currentItems.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...currentItems, { ...newItem, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const processOrder = (orderData: any) => {
    // Crear el pedido con tenantId
    const order = {
      id: Date.now().toString(),
      tenantId: tenantId || 'default',
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total: total,
      date: new Date().toLocaleDateString('es-ES'),
      ...orderData
    };

    // Guardar en localStorage
    try {
      const existingOrders = JSON.parse(localStorage.getItem('user_orders') || '[]');
      const updatedOrders = [...existingOrders, order];
      localStorage.setItem('user_orders', JSON.stringify(updatedOrders));
      
      // Limpiar carrito después de procesar pedido
      clearCart();
      
      console.log('Order processed successfully:', order);
    } catch (error) {
      console.error('Error processing order:', error);
    }
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      total,
      itemCount,
      processOrder
    }}>
      {children}
    </CartContext.Provider>
  );
};
