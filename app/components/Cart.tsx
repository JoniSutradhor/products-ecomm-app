"use client";
import React from "react";
import { useCart } from "../utils/cartContext";

const Cart: React.FC = () => {
  const { cart, removeFromCart } = useCart();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.productPrice.price * item.quantity,
    0
  );

  return (
    <div className="border p-4">
      <h2 className="text-lg font-bold">Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between items-center">
              <div>
                <img
                  src={item.featuredImageUrl}
                  alt={item.name}
                  className="w-16 h-16 object-cover"
                />
                <p>{item.name}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div>
                <p>${item.productPrice.price}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4">
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Cart;
