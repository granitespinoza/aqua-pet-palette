
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTenant } from './TenantContext';

export interface CartItem {
  id: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  incrementItem: (productId: number) => void;
  decrementItem: (productId: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { tenantId } = useTenant();

  // Load cart from localStorage on mount and tenant change
  useEffect(() => {
    if (tenantId) {
      const savedCart = localStorage.getItem(`cart_${tenantId}`);
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart));
        } catch (error) {
          console.error('Error loading cart from localStorage:', error);
          setItems([]);
        }
      } else {
        setItems([]);
      }
    }
  }, [tenantId]);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (tenantId) {
      localStorage.setItem(`cart_${tenantId}`, JSON.stringify(items));
    }
  }, [items, tenantId]);

  const addItem = (productId: number, quantity: number) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productId);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { id: productId, quantity }];
      }
    });
  };

  const removeItem = (productId: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const incrementItem = (productId: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementItem = (productId: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      incrementItem,
      decrementItem,
      clearCart,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
