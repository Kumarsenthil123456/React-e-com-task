// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiX, FiShoppingBag, FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { 
    cartItems, 
    cartTotal, 
    cartCount, 
    isCartOpen, 
    closeCart, 
    increaseQuantity, 
    decreaseQuantity, 
    removeFromCart 
  } = useCart();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity animate-fade-in"
        onClick={closeCart}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        {/* Drawer container */}
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-slide-in-right">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-2 text-primary font-bold">
              <FiShoppingBag size={20} />
              <span className="text-base">
                {cartCount} {cartCount === 1 ? 'Item' : 'Items'}
              </span>
            </div>
            
            <button
              onClick={closeCart}
              className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none"
              aria-label="Close cart"
            >
              <FiX size={22} />
            </button>
          </div>

          {/* Cart Content (Scrollable) */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cartItems.length === 0 ? (
              /* Empty State */
              <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-12 select-none">
                <div className="w-32 h-32 rounded-full bg-primary-light/50 flex items-center justify-center text-primary mb-2">
                  <FiShoppingBag size={56} className="stroke-[1.5]" />
                </div>
                <h4 className="text-lg font-bold text-customGray-darkText">
                  Your cart is empty
                </h4>
                <p className="text-sm text-gray-400 max-w-[240px]">
                  No products in the cart. Start shopping to add some fresh groceries!
                </p>
                <button
                  onClick={closeCart}
                  className="mt-2 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-lg transition-all focus:outline-none"
                >
                  Shop Now
                </button>
              </div>
            ) : (
              /* Items List */
              <div className="flex flex-col gap-4 divide-y divide-gray-100">
                {cartItems.map((item, idx) => (
                  <div key={item.id} className={`flex items-center gap-4 ${idx > 0 ? 'pt-4' : ''}`}>
                    {/* Vertical Counter Panel */}
                    <div className="flex flex-col items-center bg-gray-50 rounded-lg overflow-hidden w-8 border border-gray-150">
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 transition-colors focus:outline-none"
                        aria-label="Increase count"
                      >
                        <FiPlus size={12} />
                      </button>
                      <span className="text-xs font-bold text-customGray-darkText py-0.5">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 transition-colors focus:outline-none"
                        aria-label="Decrease count"
                      >
                        <FiMinus size={12} />
                      </button>
                    </div>

                    {/* Product Image */}
                    <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center p-2 shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-semibold text-customGray-darkText truncate">
                        {item.title}
                      </h5>
                      <span className="text-xs font-medium text-gray-400">
                        ${item.price.toFixed(2)} &times; {item.quantity}
                      </span>
                      <div className="text-xs font-bold text-primary mt-1">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    {/* Remove Action Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors focus:outline-none"
                      aria-label="Remove item"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Checkout Sticky Bottom Section */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-100 px-6 py-6 bg-gray-50">
              <div className="flex items-center justify-between text-sm font-semibold text-gray-500 mb-2">
                <span>Subtotal</span>
                <span className="text-customGray-darkText font-bold">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-medium text-gray-400 mb-6">
                <span>Taxes & Shipping calculated at checkout</span>
                <span>Free Shipping</span>
              </div>

              <button
                onClick={handleCheckoutClick}
                className="w-full flex items-center justify-between bg-primary hover:bg-primary-hover text-white rounded-xl py-4 px-6 text-sm font-bold shadow-lg transition-all focus:outline-none"
              >
                <span>Proceed To Checkout</span>
                <span className="bg-primary-dark/30 px-3 py-1 rounded-lg text-xs font-extrabold tracking-wide">
                  ${cartTotal.toFixed(2)}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
