"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type CartItem = { id: string; name: string; price: number; qty: number; };
type CartContextType = {
  items: CartItem[];
  add: (item: CartItem) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  total: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function add(item: CartItem) {
    setItems((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.map((p) => p.id === item.id ? { ...p, qty: p.qty + item.qty } : p);
      }
      return [...prev, item];
    });
  }

  function updateQty(id: string, qty: number) {
    setItems((prev) => prev.map(p => p.id === id ? { ...p, qty } : p).filter(p => p.qty > 0));
  }

  function clear() { setItems([]); }
  function total() { return items.reduce((s, it) => s + it.price * it.qty, 0); }

  return (
    <CartContext.Provider value={{ items, add, updateQty, clear, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
