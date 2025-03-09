"use client";
import { useCart } from "../context/CartContext";

export default function CartSidebar() {
  const { cart } = useCart();

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold">Cart ({cart.length})</h3>
    </div>
  );
}