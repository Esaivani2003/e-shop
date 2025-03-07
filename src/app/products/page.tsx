"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import Layout2 from "@/app/components/layout";
import { useEffect, useState } from "react";
import Image from "next/image";

// Define Product interface
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

// Sample Products
const sampleProducts: Product[] = [
  { id: 1, name: "Laptop", price: 899.99, image: "/images/laptop.jpg" },
  { id: 2, name: "Smartphone", price: 499.99, image: "/images/smartphone.jpg" },
  { id: 3, name: "Headphones", price: 199.99, image: "/images/headphones.jpg" },
  { id: 4, name: "Keyboard", price: 49.99, image: "/images/keyboard.jpg" },
];

// Special Offers for Carousel
const offers = [
  { id: 1, text: "🔥 20% OFF on Laptops!", gradient: "bg-gradient-to-r from-red-500 to-orange-400" },
  { id: 2, text: "📱 Free Shipping on Smartphones!", gradient: "bg-gradient-to-r from-green-500 to-teal-400" },
];

export default function ProductPage() {
  const { addToCart } = useCart();
  const [currentOffer, setCurrentOffer] = useState(0);

  // Auto-scroll for offers
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout2>
      {/* 🔥 Special Offers Carousel */}
      <div className="relative w-full h-14 my-6 flex justify-center item center overflow-hidden z-10" >
      
          {offers.map((offer, index) => (
            <div
              key={offer.id}
              className={`absolute w-80 text-center text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-500 ${offer.gradient} ${
                index === currentOffer ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            >
              {offer.text}
            </div>
          ))}
        </div>
    

      {/* 🛍 Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {sampleProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-xl rounded-lg p-4 transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-gray-200"
          >
            <Link href={`/products/sampleProducts/${product.id}`} className="block">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                className="w-full h-40 object-cover rounded-lg"
                priority
              />
            </Link>

            <div className="mt-4">
              <Link href={`/products/sampleProducts/${product.id}`} className="text-lg font-semibold hover:text-blue-500">
                {product.name}
              </Link>
              <p className="text-gray-700 font-medium">${product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-2 w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all"
              >
                Buy Now 🛒
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout2>
  );
}