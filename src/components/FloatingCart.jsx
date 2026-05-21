import React from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function FloatingCart() {
  const { cartCount, cartTotal, toggleCart } = useCart();

  // Return nothing if cart count is 0, or keep it visible as an empty drawer trigger.
  // PickBazar displays it even when empty, which is great to prompt user action.
  return (
    <button
      onClick={toggleCart}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center justify-between w-24 bg-primary text-white shadow-xl rounded-l-xl overflow-hidden hover:bg-primary-hover focus:outline-none transition-all duration-200 group border border-r-0 border-primary-dark"
      aria-label="Toggle Shopping Cart"
    >
      {/* Top Section: Bag Icon & Item Count */}
      <div className="flex flex-col items-center gap-1.5 py-3 w-full border-b border-primary-dark bg-primary-dark/20">
        <FiShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
        <span className="text-[11px] font-bold tracking-wide uppercase">
          {cartCount} {cartCount === 1 ? 'Item' : 'Items'}
        </span>
      </div>

      {/* Bottom Section: Total Sum */}
      <div className="w-full bg-white text-primary text-xs font-extrabold py-2 px-1 text-center font-sans tracking-tight">
        ${cartTotal.toFixed(2)}
      </div>
    </button>
  );
}
