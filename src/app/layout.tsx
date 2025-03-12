"use client";
import { CartProvider } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/footer"; // Ensure case matches your file system
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WishlistProvider } from "@/context/WishlistContext";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <WishlistProvider>
        <CartProvider>
          <Navbar />
           <ToastContainer position="top-right" autoClose={2000} />
          <main className="container mx-auto p-6">{children}</main>
          <Footer />
        </CartProvider>
        </WishlistProvider>
      </body>
      </html>
      );
    }