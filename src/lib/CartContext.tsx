import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getCart, addToCart as apiAddToCart, removeCartItem as apiRemoveItem, updateCartItem as apiUpdateItem } from "./wc";

interface CartItem {
  key: string;
  id: number;
  name: string;
  quantity: number;
  prices: { price: string; currency_code: string };
  images: { src: string; alt: string }[];
  totals: { line_total: string; currency_code: string };
}

interface CartState {
  items: CartItem[];
  itemCount: number;
  total: string;
  loading: boolean;
}

interface CartContextType extends CartState {
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  removeItem: (itemKey: string) => Promise<void>;
  updateQuantity: (itemKey: string, quantity: number) => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartState>({
    items: [],
    itemCount: 0,
    total: "0",
    loading: false,
  });

  const parseCart = (data: any) => {
    const items = data.items || [];
    const itemCount = items.reduce((sum: number, item: any) => sum + item.quantity, 0);
    const total = data.totals?.total_price
      ? (parseInt(data.totals.total_price) / 100).toFixed(2)
      : "0.00";
    setCart({ items, itemCount, total, loading: false });
  };

  const refreshCart = useCallback(async () => {
    try {
      const data = await getCart();
      parseCart(data);
    } catch {
      // Cart API might not be available, use local fallback
    }
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addToCart = async (productId: number, quantity = 1) => {
    setCart((prev) => ({ ...prev, loading: true }));
    try {
      const data = await apiAddToCart(productId, quantity);
      parseCart(data);
    } catch (e) {
      setCart((prev) => ({ ...prev, loading: false }));
      throw e;
    }
  };

  const removeItem = async (itemKey: string) => {
    setCart((prev) => ({ ...prev, loading: true }));
    try {
      const data = await apiRemoveItem(itemKey);
      parseCart(data);
    } catch {
      setCart((prev) => ({ ...prev, loading: false }));
    }
  };

  const updateQuantity = async (itemKey: string, quantity: number) => {
    setCart((prev) => ({ ...prev, loading: true }));
    try {
      const data = await apiUpdateItem(itemKey, quantity);
      parseCart(data);
    } catch {
      setCart((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <CartContext.Provider value={{ ...cart, addToCart, removeItem, updateQuantity, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
