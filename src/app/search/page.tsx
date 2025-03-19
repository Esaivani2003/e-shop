"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import products from "../../data/products.json"; // Ensure this file exists!

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query)
  );

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Search Results for &quot;{query}&quot;</h2>
      {filteredProducts.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <li key={product.id} className="border p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="text-gray-500">Loading search results...</p>}>
      <SearchResults />
    </Suspense>
  );
}