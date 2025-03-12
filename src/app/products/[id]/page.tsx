"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Smartphone",
    price: 599,
    image: "/images/smartphone.jpg",
    description: "A high-end smartphone with great camera quality.",
  },
  {
    id: 2,
    name: "Laptop",
    price: 1099,
    image: "/images/laptop.jpg",
    description: "Powerful laptop for gaming and work.",
  },
  {
    id: 3,
    name: "Headphones",
    price: 199,
    image: "/images/headphones.jpg",
    description: "Noise-canceling wireless headphones.",
  },
  {
    id: 4,
    name: "Keyboard",
    price: 299,
    image: "/images/keyboard.jpg",
    description: "Mechanical keyboard with RGB backlighting.",
  },
  {
    id: 5,
    name: "watch",
    price: 299,
    image: "/images/watch.jpg",
    description: "Mechanical keyboard with RGB backlighting.",
  },
  {
    id: 6,
    name: "airpod",
    price: 299,
    image: "/images/airpod.jpg",
    description: "Mechanical keyboard with RGB backlighting.",
  },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <h1 className="text-center text-red-500 text-xl mt-10">
        Product not found
      </h1>
    );
  }

  const productWithQuantity = { ...product, quantity: 1 };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg">
        {/* Product Image */}
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={300}
          className="w-full h-64 object-cover rounded-md mb-4"
        />

        {/* Product Details */}
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-xl font-semibold text-blue-600">${product.price}</p>

        {/* Add to Cart & Wishlist Buttons */}
        <div className="flex gap-4 mt-4">
          <button
            className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            onClick={() => addToCart(productWithQuantity)}
          >
            <FaShoppingCart /> Add to Cart
          </button>

          <button
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition ${
              isInWishlist(product.id) ? "bg-red-500 text-white" : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
            onClick={() => toggleWishlist(product)}
          >
            <FaHeart className="text-white" /> 
            {isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>
        </div>

        {/* Back to Products Link */}
        <Link href="/products">
          <p className="mt-4 text-center text-gray-500 hover:text-gray-700 cursor-pointer">
            ← Back to Products
          </p>
        </Link>
      </div>
    </div>
  );
}
