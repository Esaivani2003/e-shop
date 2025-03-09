"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100 py-10 flex justify-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 border-b pb-3 mb-4">🛒 Shopping Cart</h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm">
                  <div className="flex items-center gap-4">
                  <Image 
                      src={item.image} 
                      alt={item.name} 
                      width={64} 
                      height={64} 
                      className="object-cover rounded-md"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-gray-600">${item.price} x {item.quantity}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      removeFromCart(item.id);
                      alert(`${item.name} removed from cart.`);
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            {/* Total Price */}
            <div className="mt-6 text-xl font-semibold text-gray-700 border-t pt-4">
              Total: <span className="text-green-600">${totalPrice.toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <div className="mt-6 flex justify-end">
              <button className="bg-green-500 text-white px-6 py-3 rounded-md text-lg hover:bg-green-600 transition">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}