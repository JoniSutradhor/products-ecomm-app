"use client";
import React from "react";
import { useCart } from "../utils/cartContext";

const Header: React.FC = () => {
  const { cart } = useCart();

  return (
    <header className="bg-gray-200 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl text-blue-500">Product Store</h1>
        <p className="relative text-blue-500">Cart ({cart.length})</p>
      </div>
    </header>
  );
};

export default Header;
