"use client"; // This file needs to be a client component

import React from "react";
// import "./styles/globals.css"; // Add global styles for your layout here
import Navbar from "./Navbar";



// Define the layout structure
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    
    <div className="layout-container">
      {/* Header Section */}
      
      <Navbar />
      {/* Main Content */}
      <div className="main-content">
       
        {/* Page content goes here */}
        <main className="content">{children}</main>
      </div>

    
       
    </div>
  );
  
};

export default Layout;
