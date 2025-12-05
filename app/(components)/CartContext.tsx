"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

type CartItem = { id: string; name: string; price: number; qty: number; };
type CartContextType = {
  items: CartItem[];
  add: (item: CartItem) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  total: () => number;
};

const STORAGE_KEY = "antarshanti_cart_v1";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) return JSON.parse(raw) as CartItem[];
    } catch (e) {
      // ignore parse errors
    }
    return [];
  });

  // persist to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      // ignore
    }
  }, [items]);

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

  function clear() { 
    setItems([]); 
    try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
  }
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
