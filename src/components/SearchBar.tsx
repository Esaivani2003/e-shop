"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      router.push(`/search?q=${trimmedQuery}`);
    }
  };

  const clearSearch = () => setQuery("");

  return (
    <form onSubmit={handleSearch} className="flex gap-2 items-center bg-white p-2 rounded-lg shadow">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="border rounded-lg px-3 py-2 outline-none w-full text-gray-900"
        aria-label="Search products"
      />
      {query && (
        <button
          type="button"
          onClick={clearSearch}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
  <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        aria-label="Submit search"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;