import React from "react";
import { Link } from "react-router-dom";

function Cart({ cartItems, handleRemoveFromCart }) {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl transition-all duration-300 hover:scale-105">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 bg-[white] rounded-lg shadow-sm transition-all duration-300 hover:bg-[#e21d12]"
            >
              <Link
                to={`/products/${item.id}`}
                className="flex items-center gap-4 transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={`/ecommerce/images/${item.imageUrl}`}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg shadow-md"
                />
                <p className="text-lg font-semibold text-gray-900">{item.name}</p>
              </Link>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="text-red-600 hover:text-[black] transition-colors duration-300"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
