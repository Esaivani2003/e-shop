"use client"; // ✅ Ensure it's a Client Component

import { useCart } from "@/app/context/CartContext"; // ✅ Use absolute import
import Image from "next/image"; // ✅ Import Next.js Image component

export default function CartPage() {
  const { cartItems = [], removeFromCart } = useCart(); // ✅ Prevents "undefined" error

  console.log("Cart Items:", cartItems); // ✅ Debugging log

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">🛒 Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={`${item.id}`} // ✅ Ensures unique key
                className="flex items-center justify-between border-b pb-4 last:border-none"
              >
                {/* Product Image */}
                <Image
                  src={item.image}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="w-16 h-16 object-cover rounded-md"
                />

                {/* Product Details */}
                <div className="flex-1 px-4">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Remove ❌
                </button>
              </li>
            ))}
          </ul>

          {/* Checkout Button */}
          <div className="mt-6 text-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition text-lg">
              Proceed to Checkout 💳
            </button>
          </div>
        </div>
      )}
    </div>
  );
}