"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../utils/types";
import { useCart } from "../utils/cartContext";
import Link from "next/link";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart, removeFromCart, cart } = useCart();
  const [quantity, setQuantity] = useState(product.quantity);

  useEffect(() => {
    const cartProduct = cart.find((item) => item.id === product.id);
    if (cartProduct) {
      // Update quantity based on cart state
      setQuantity(product.quantity - cartProduct.quantity);
    } else {
      setQuantity(product.quantity);
    }
  }, [cart, product.id, product.quantity]);

  const handleAddToCart = () => {
    addToCart(product);
    setQuantity((prev) => prev - 1); // Decrease quantity when adding to cart
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id);
    setQuantity((prev) => prev + 1); // Decrease quantity when adding to cart
  };

  return (
    <div className="border p-4">
      <img
        src={product.featuredImageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <Link href={`/products/${product.id}`}>
        <h2 className="text-lg font-bold mt-2">{product.name}</h2>
      </Link>
      <p>Price: ${product.productPrice.price}</p>
      <p>Available Quantity: {quantity}</p>

      <div className="flex justify-center gap-4">
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-4 py-2 mt-2"
        >
          Add to Cart
        </button>
        {cart.some((item) => item.id === product.id) && (
          <button
            onClick={handleRemoveFromCart}
            className="bg-red-500 text-white px-4 py-2 mt-2"
          >
            Remove from Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
