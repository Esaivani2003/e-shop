"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/context/CartContext"; // Import Cart Context
import Image from "next/image"; // ✅ Use Next.js Image component

const products = [
  { id: 1, name: "Smartphone", price: 599, image: "/images/smartphone.jpg", description: "A high-end smartphone with great camera quality." },
  { id: 2, name: "Laptop", price: 1099, image: "/images/laptop.jpg", description: "Powerful laptop for gaming and work." },
  { id: 3, name: "Headphones", price: 199, image: "/images/headphones.jpg", description: "Noise-canceling wireless headphones." },
  { id: 4, name: "keyboard", price: 299, image: "/images/keyboard.jpg", description: "Feature-packed smartwatch with health tracking." }, // ✅ Fixed Image Path
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart(); // Use cart context
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <h1 className="text-center text-red-500 text-xl mt-10">Product not found</h1>;
  }

  // ✅ Assigning Quantity to the Product
  const productWithQuantity = { ...product, quantity: 1 };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg">
        {/* ✅ Using Next.js Optimized Image */}
        <Image
          src={product.image}
          alt={product.name}
          width={400} // ✅ Set appropriate width
          height={300} // ✅ Set appropriate height
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-xl font-semibold text-blue-600">${product.price}</p>

        {/* Add to Cart Button */}
        <button
          className="mt-3 w-full flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          onClick={() => addToCart(productWithQuantity)} // ✅ Corrected Usage
        >
          <FaShoppingCart /> Add to Cart
        </button>

        {/* Back to Products Link */}
        <Link href="/products" className="mt-4 block text-center text-gray-500 hover:text-gray-700">
          ← Back to Products
        </Link>
      </div>
    </div>
  );
}