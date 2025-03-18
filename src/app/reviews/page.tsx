"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface Review {
  id: number;
  productId: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

const initialReviews: Review[] = [
  { id: 1, productId: 1, user: "Alice", rating: 5, comment: "Amazing product!", date: "2024-03-15" },
  { id: 2, productId: 2, user: "Bob", rating: 4, comment: "Great value for the price.", date: "2024-03-12" },
];

export default function ReviewPage() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [user, setUser] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !comment) return alert("Please enter your name and review.");

    const newReview: Review = {
      id: reviews.length + 1,
      productId: 1, // Set dynamically if needed
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
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Product Reviews</h1>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="mb-6">
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
  );
}
