"use client"
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center p-4">
      <p>© {new Date().getFullYear()} My Application. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a href="#" className="hover:text-orange-400">Privacy Policy</a>
        <a href="#" className="hover:text-orange-400">Terms of Service</a>
        <a href="#" className="hover:text-orange-400">Contact Us</a>
      </div>
    </footer>
  );
};

export default Footer;