"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Heart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import SearchBar from "./SearchBar";
import products from "../data/products.json";



export default function Navbar() {
  const router = useRouter();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const navItems = ["Home", "Products", "Wishlist", "Cart"];

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <h1
          className="text-3xl font-bold cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-300"
          onClick={() => router.push("/")}
        >
          E_Shop
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg font-medium">
          {navItems.map((item) => (
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

        {/* Search Bar */}
        

        {/* Icons Section */}
        <div className="flex items-center gap-4">
          {/* Wishlist Button */}
          <button onClick={() => router.push("/wishlist")} className="relative" aria-label="Wishlist">
            <Heart size={28} className="text-white hover:text-red-400" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button onClick={() => router.push("/cart")} className="relative" aria-label="Cart">
            <ShoppingCart size={28} className="text-white hover:text-orange-400" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden ml-4"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 text-white p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item}
              className="block w-full py-2 text-center hover:text-orange-400"
              onClick={() => {
                router.push(item === "Home" ? "/" : `/${item.toLowerCase()}`);
                setIsOpen(false);
              }}
            >
              {item}
            </button>
          ))}
          {/* Mobile Search Bar */}
          <div className="mt-4">
            <SearchBar products={products} />
          </div>
        </div>
      )}
    </nav>
  );
}
