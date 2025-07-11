
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTenant } from './TenantContext';
import { useUser } from './UserContext';

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
  addItem: (id: string | number, quantity?: number) => void;
  removeItem: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  incrementItem: (id: string | number) => void;
  decrementItem: (id: string | number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  getTotalItems: () => number;
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
  const { user } = useUser();

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

  const addItem = async (id: string | number, quantity: number = 1) => {
    try {
      // Primero intentar obtener desde la API
      const { productService } = await import('@/services/productService');
      let product = await productService.obtenerProducto(Number(id));
      
      // Si no se encuentra en la API, usar datos estáticos como fallback
      if (!product) {
        const productsModule = await import('@/data/products.json');
        const staticProduct = productsModule.default.find(p => p.id === Number(id));
        if (staticProduct) {
          product = {
            ...staticProduct,
            marca_id: staticProduct.marcaId,
            categoria_id: staticProduct.categoriaId,
            precio_oferta: staticProduct.precioOferta,
            is_featured: staticProduct.is_featured
          };
        }
      }
      
      if (!product) {
        console.error('Product not found:', id);
        return;
      }

      const itemId = String(id);
      setItems(currentItems => {
        const existingItem = currentItems.find(item => item.id === itemId);
        
        if (existingItem) {
          return currentItems.map(item =>
            item.id === itemId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        
        const newItem: CartItem = {
          id: itemId,
          name: product.nombre,
          price: product.precio_oferta || product.precio,
          image: product.img,
          quantity: quantity
        };
        
        return [...currentItems, newItem];
      });

      console.log('✅ CartContext - Producto añadido al carrito:', product.nombre);
    } catch (error) {
      console.error('💥 CartContext - Error al añadir producto:', error);
    }
  };

  const removeItem = (id: string | number) => {
    const itemId = String(id);
    setItems(currentItems => currentItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (id: string | number, quantity: number) => {
    const itemId = String(id);
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const incrementItem = (id: string | number) => {
    const itemId = String(id);
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementItem = (id: string | number) => {
    const itemId = String(id);
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId 
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const processOrder = (orderData: any) => {
    if (!user?.profile?.email) {
      console.error('Cannot process order: No user email available');
      return;
    }

    // Crear el pedido con la estructura correcta y específica del usuario
    const order = {
      id: Date.now().toString(),
      usuario: user.profile.email,
      tenantId: tenantId || 'default',
      productos: items.map(item => ({
        id: item.id,
        nombre: item.name,
        precio: item.price,
        cantidad: item.quantity
      })),
      total: total,
      fecha: new Date().toISOString(),
      direccion: orderData.direccion || 'Sin dirección',
      estado: 'completed',
      ...orderData
    };

    // Guardar en localStorage específico del usuario
    try {
      const userOrdersKey = `user_orders_${user.profile.email}`;
      const existingOrders = JSON.parse(localStorage.getItem(userOrdersKey) || '[]');
      const updatedOrders = [order, ...existingOrders];
      localStorage.setItem(userOrdersKey, JSON.stringify(updatedOrders));
      
      // Limpiar carrito después de procesar pedido
      clearCart();
      
      console.log('Order processed successfully for user:', user.profile.email, order);
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
      incrementItem,
      decrementItem,
      clearCart,
      total,
      itemCount,
      getTotalItems,
      processOrder
    }}>
      {children}
    </CartContext.Provider>
  );
};
