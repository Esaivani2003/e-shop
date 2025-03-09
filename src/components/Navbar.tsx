"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext"; // Import useCart

export default function Navbar() {
  const router = useRouter();
  const { cart } = useCart(); // Get cart from context
  const [isOpen, setIsOpen] = useState(false);

  // Calculate total items in cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4">
        <h1
          className="text-3xl font-bold bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 cursor-pointer"
          onClick={() => router.push("/")}
        >
          E_Shop
        </h1>

        <ul className="hidden md:flex space-x-6 text-lg font-medium">
          {["Home", "Products", "Cart"].map((item) => (
            <li key={item}>
              <button
                className="hover:text-orange-400 transition"
                onClick={() => router.push(item === "Home" ? "/" : `/${item.toLowerCase()}`)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>

        {/* Cart Button with Count Badge */}
        <button onClick={() => router.push("/cart")} className="relative">
          <ShoppingCart size={28} className="text-white hover:text-orange-400" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </button>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-800 text-white p-4">
          {["Home", "Products"].map((item) => (
            <button
              key={item}
              className="block w-full py-2 text-center hover:text-orange-400"
              onClick={() => {
                router.push(item === "Home" ? "/" :`/${item.toLowerCase()}`);
                setIsOpen(false);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}