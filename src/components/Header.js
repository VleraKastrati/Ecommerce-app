import { Link } from "react-router-dom";
import { useState } from "react";
import iconCart from "../assets/iconCart.png";

function Header({ cartItems, handleRemoveFromCart }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="flex justify-between items-center p-5 bg-[#99120b]">
      <Link to="/">
        <h1 className="text-4xl font-extrabold text-white">Vlerë</h1>
      </Link>

      <div className="flex gap-8">
        <Link to="/" className="text-white text-lg font-medium hover:text-[#e21d12] transition duration-300">Home</Link>
        <Link to="/login" className="text-white text-lg font-medium hover:text-[#e21d12] transition duration-300">About</Link>
        <Link to="/cart" className="text-white text-lg font-medium hover:text-[#e21d12] transition duration-300">Shop</Link>
      </div>

      <div className="flex gap-8 items-center">
        <Link to="/login" className="text-white border border-[#ffffff] hover:border-[#ffffff] px-5 py-2 rounded-lg text-lg font-semibold transition duration-300">
          Login
        </Link>

        <div className="relative">
          <button onClick={() => setIsCartOpen(!isCartOpen)} className="relative">
            <img src={iconCart} alt="Cart" className="w-7 h-7" />
            {cartItems.length > 0 && (
              <span className="absolute bottom-5 left-5 text-xs bg-red-600 text-white rounded-full px-2 py-1">
                {cartItems.length}
              </span>
            )}
          </button>

          {isCartOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-3 z-10">
              <h3 className="text-lg font-bold text-gray-800">Your Cart</h3>
              {cartItems.length > 0 ? (
                <ul className="mt-2">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex justify-between items-center border-b py-2">
                      <Link to={`/products/${item.id}`} className="flex items-center gap-3">
                        <img src={`/ecommerce/images/${item.imageUrl}`} alt={item.name} className="w-12 h-12 rounded" />
                        <div>
                          <p className="text-gray-700 text-sm font-semibold hover:text-[#e21d12] transition duration-300">{item.name}</p>
                          <p className="text-gray-500 text-xs">${item.price}</p>
                        </div>
                      </Link>
                      <button onClick={() => handleRemoveFromCart(item.id)} className="text-red-600 text-lg font-bold hover:text-red-800 transition duration-300">
                        ❌
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm mt-2">Your Cart is empty.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
