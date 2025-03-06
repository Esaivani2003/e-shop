"use client";

import { createContext, useContext, useState,ReactNode} from "react";

// Define types for the product and context
interface Product {
  id: number;
  name: string;
  price: number;
  image:string;
  // Add other properties as per your product structure
}

interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  sampleProducts:Product[]
}

// Create context with a default value of null
const CartContext = createContext<CartContextType | null>(null);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  
  const sampleProducts: Product[] = [
    { id: 1, name: "Laptop", price: 899.99, image: "/images/laptop.jpg" },
    { id: 2, name: "Smartphone", price: 499.99, image: "/images/smartphone.jpg" },
    { id: 3, name: "Headphones", price: 199.99, image: "/images/headphones.jpg" },
    { id: 4, name: "Keyboard", price: 49.99, image: "/images/keyboard.jpg" },
  ];
  
  // Add item to cart
  const addToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
  };

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems,sampleProducts, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom Hook
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
