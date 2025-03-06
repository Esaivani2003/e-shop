"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import Layout2 from "@/app/components/layout";

// Define Product interface
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

// Sample Products (Same as above for now)
const sampleProducts: Product[] = [
  { id: 1, name: "Laptop", price: 899.99, image: "/images/laptop.jpg" },
  { id: 2, name: "Smartphone", price: 499.99, image: "/images/smartphone.jpg" },
  { id: 3, name: "Headphones", price: 199.99, image: "/images/headphones.jpg" },
  { id: 4, name: "Keyboard", price: 49.99, image: "/images/keyboard.jpg" },
];

export default function SampleProductPage() {
  const { addToCart } = useCart();

  // Function to handle adding a product to the cart
  const handleBuyNow = (product: Product) => {
    addToCart(product);
    console.log("Added to cart:", product); // Debugging log
  };

  return (
    <Layout2>
      <div>
        {sampleProducts.map((product) => (
          <div key={product.id} className="mb-5 p-4 border rounded-lg shadow-md">
            <Link href={`/products/sampleProducts/${product.id}`} className="text-lg font-bold text-blue-600 hover:underline">
              {product.name}
            </Link>
            <p className="text-gray-700 font-medium">${product.price}</p>
            <button
              onClick={() => handleBuyNow(product)}
              className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </Layout2>
  );
}