"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Product } from "./types";

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartLoadedFromLocal, setIsCartLoadedFromLocal] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        } else {
          console.warn("Parsed cart is not an array:", parsedCart);
        }
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
    setIsCartLoadedFromLocal(true);
  }, []);

  useEffect(() => {
    if (isCartLoadedFromLocal) {
      try {
        localStorage.setItem("cart", JSON.stringify(cart));
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error);
      }
    }
  }, [cart, isCartLoadedFromLocal]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        const updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return updatedCart;
      } else {
        const newCart = [...prevCart, { ...product, quantity: 1 }];
        return newCart;
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === productId);
      if (existingProduct?.quantity === 1) {
        const updatedCart = prevCart.filter((item) => item.id !== productId);
        return updatedCart;
      } else {
        const updatedCart = prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        return updatedCart;
      }
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
