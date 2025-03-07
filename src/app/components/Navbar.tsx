"use client"; // Required for Next.js App Router

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react"; // Icons for mobile menu

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <h1
          className="text-3xl font-extrabold text-transparent bg-clip-text 
                     bg-gradient-to-r from-orange-400 to-yellow-300 cursor-pointer"
          onClick={() => router.push("/")}
        >
          E_Shop
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg font-medium">
          {["Home", "Products", "Cart"].map((item) => (
            <li key={item}>
              <button
                className="relative px-4 py-2 text-white transition duration-300 hover:text-orange-400 
                           after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 
                           after:bg-orange-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
                onClick={() => router.push(item === "Home" ? "/" : `/${item.toLowerCase()}`)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu - Slide-in effect */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-gradient-to-b from-gray-900 to-gray-700 
                    shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"} 
                    transition-transform duration-300 md:hidden z-50`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>
            <X size={28} className="text-white" />
          </button>
        </div>

        {/* Mobile Menu Links */}
        <ul className="flex flex-col space-y-6 text-center text-xl font-medium">
          {["Home", "Products", "Cart"].map((item) => (
            <li key={item}>
              <button
                className="block w-full py-2 text-white hover:text-orange-400 transition"
                onClick={() => {
                  router.push(item === "Home" ? "/" : `/${item.toLowerCase()}`);
                  setIsOpen(false); // ✅ Close menu after clicking
                }}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
