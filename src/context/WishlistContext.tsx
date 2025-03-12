import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  clearWishlist: () => void;
  toggleWishlist: (item: WishlistItem) => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    if (typeof window !== "undefined") {
      const storedWishlist = localStorage.getItem("wishlist");
      return storedWishlist ? JSON.parse(storedWishlist) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
}, [wishlist]);

const addToWishlist = (item: WishlistItem) => {
  setWishlist((prev) => {
    const updatedWishlist = [...prev, item];
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    return updatedWishlist;
  });
};

const removeFromWishlist = (id: number) => {
  setWishlist((prev) => {
    const updatedWishlist = prev.filter((item) => item.id !== id);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    return updatedWishlist;
  });
};

const isInWishlist = (id: number) => {
  return wishlist.some((item) => item.id === id);
};

const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem("wishlist");
  };

  const toggleWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      const updatedWishlist = prev.some((wishlistItem) => wishlistItem.id === item.id)
        ? prev.filter((wishlistItem) => wishlistItem.id !== item.id)
        : [...prev, item];

      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};