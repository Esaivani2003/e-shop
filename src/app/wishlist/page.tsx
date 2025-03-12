"use client";

import React from "react";
import { useWishlist } from "@/context/WishlistContext";
import Image from "next/image";

const WishlistPage: React.FC = () => {
    const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">My Wishlist ({wishlist.length})</h1>

            {wishlist.length === 0 ? (
                <p className="text-gray-600 text-lg">Your wishlist is empty.</p>
            ) : (
                <>
                    <ul className="space-y-4">
                        {wishlist.map((item) => (
                            <li key={item.id} className="flex items-center gap-4 border-b pb-2">
                                <Image src={item.image} alt={item.name} width={50} height={50} className="rounded-md" />
                                <p className="text-lg font-medium">
                                    {item.name} - <span className="text-gray-700">${item.price}</span>
                                </p>
                                <button
                                    onClick={() => removeFromWishlist(item.id)}
                                    className="text-red-500 hover:text-red-700 text-xl"
                                >
                                    ❌
                                </button>
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={clearWishlist}
                        className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
                    >
                        Clear Wishlist
                    </button>
                </>
            )}
        </div>
    );
};

export default WishlistPage;