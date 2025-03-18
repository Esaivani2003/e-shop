"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Image from "next/image";
import { useState } from "react";
import { Star } from "lucide-react";

const products = [
  { id: 1, name: "Smartphone", price: 599, image: "/images/smartphone.jpg", description: "A high-end smartphone with great camera quality." },
  { id: 2, name: "Laptop", price: 1099, image: "/images/laptop.jpg", description: "Powerful laptop for gaming and work." },
  { id: 3, name: "Headphones", price: 199, image: "/images/headphones.jpg", description: "Noise-canceling wireless headphones." },
  { id: 4, name: "Keyboard", price: 299, image: "/images/keyboard.jpg", description: "Mechanical keyboard with RGB backlighting." },
  { id: 5, name: "Watch", price: 299, image: "/images/watch.jpg", description: "Stylish smartwatch with health tracking features." },
  { id: 6, name: "AirPods", price: 299, image: "/images/airpod.jpg", description: "Wireless AirPods with immersive sound quality." },
];

// Sample Reviews
interface Review {
  id: number;
  productId: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

const initialReviews: Review[] = [
  { id: 1, productId: 1, user: "Alice", rating: 5, comment: "Great phone!", date: "2024-03-15" },
  { id: 2, productId: 2, user: "Bob", rating: 4, comment: "Solid laptop, but battery could be better.", date: "2024-03-12" },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const product = products.find((p) => p.id === Number(id));
  const [reviews, setReviews] = useState<Review[]>(initialReviews.filter((r) => r.productId === Number(id)));
  const [user, setUser] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  if (!product) {
    return <h1 className="text-center text-red-500 text-xl mt-10">Product not found</h1>;
  }

  const productWithQuantity = { ...product, quantity: 1 };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !comment) return alert("Please enter your name and review.");

    const newReview: Review = {
      id: reviews.length + 1,
      productId: product.id,
      user,
      rating,
      comment,
      date: new Date().toISOString().split("T")[0],
    };

    setReviews([newReview, ...reviews]);
    setUser("");
    setRating(5);
    setComment("");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        {/* Product Image */}
        <Image src={product.image} alt={product.name} width={400} height={300} className="w-full h-64 object-cover rounded-md mb-4" />

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
            <FaHeart /> {isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>
        </div>

        {/* Back to Products Link */}
        <Link href="/products">
          <p className="mt-4 text-center text-gray-500 hover:text-gray-700 cursor-pointer">
            ← Back to Products
          </p>
        </Link>

        {/* Reviews Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

          {/* Review Form */}
          <form onSubmit={handleReviewSubmit} className="mb-6">
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Your Name"
              className="w-full border rounded-lg px-4 py-2 mb-3"
            />
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full border rounded-lg px-4 py-2 mb-3"
            >
              {[5, 4, 3, 2, 1].map((star) => (
                <option key={star} value={star}>
                  {star} Stars
                </option>
              ))}
            </select>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
              className="w-full border rounded-lg px-4 py-2 mb-3"
              rows={3}
            />
            <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Submit Review
            </button>
          </form>

          {/* Review List */}
          <div>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 mb-4">
                  <p className="font-bold">{review.user} - {review.date}</p>
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-500" fill="yellow" />
                    ))}
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
