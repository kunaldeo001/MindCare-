"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem } from '@/lib/data';

interface CartItem extends MenuItem {
  quantity: number;
}

interface Order {
  id: string;
  restaurant: string;
  date: string;
  status: string;
  amount: number;
  items: string[];
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  confirmOrder: (restaurantName: string) => void;
  orderHistory: Order[];
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('foodfetch_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    const savedHistory = localStorage.getItem('foodfetch_order_history');
    if (savedHistory) {
      setOrderHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('foodfetch_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('foodfetch_order_history', JSON.stringify(orderHistory));
  }, [orderHistory]);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev => {
      return prev.map(i => {
        if (i.id === itemId) {
          const newQty = Math.max(0, i.quantity + delta);
          return { ...i, quantity: newQty };
        }
        return i;
      }).filter(i => i.quantity > 0);
    });
  };

  const clearCart = () => setCart([]);

  const confirmOrder = (restaurantName: string) => {
    if (cart.length === 0) return;

    const newOrder: Order = {
      id: `FF-${Math.floor(100 + Math.random() * 900)}`,
      restaurant: restaurantName,
      date: new Date().toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }),
      status: "Delivered",
      amount: totalPrice + 45,
      items: cart.map(i => i.name)
    };

    setOrderHistory(prev => [newOrder, ...prev]);
    clearCart();
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      confirmOrder,
      orderHistory,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
