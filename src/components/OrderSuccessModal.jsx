import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function OrderSuccessModal({ isOpen, onClose, orderDetails }) {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleBackToShop = () => {
    clearCart();
    onClose();
    navigate('/');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity animate-fade-in"
        onClick={handleBackToShop}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-md mx-auto my-6 px-4 z-50 animate-fade-in">
        <div className="border-0 rounded-2xl shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none p-8 text-center items-center gap-5">
          
          {/* Animated check circle */}
          <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center text-primary animate-pulse">
            <FiCheckCircle size={48} className="stroke-[2.5]" />
          </div>

          <div>
            <h3 className="text-2xl font-extrabold text-customGray-darkText">
              Order Placed Successfully!
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Thank you for shopping with PickBazar. Your order is being prepared and will be delivered shortly.
            </p>
          </div>

          {/* Details summary panel */}
          {orderDetails && (
            <div className="w-full bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col gap-2.5 text-sm">
              <div className="flex justify-between items-center text-gray-500">
                <span>Order Reference:</span>
                <span className="font-bold text-customGray-darkText font-mono">
                  {orderDetails.ref}
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-500">
                <span>Total Amount Paid:</span>
                <span className="font-extrabold text-primary text-base">
                  ${orderDetails.total.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-500">
                <span>Delivery Address:</span>
                <span className="font-semibold text-customGray-darkText max-w-[200px] truncate" title={orderDetails.address}>
                  {orderDetails.address}
                </span>
              </div>
            </div>
          )}

          {/* Checkout page redirect button */}
          <button
            onClick={handleBackToShop}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-primary/20 focus:outline-none"
          >
            <span>Continue Shopping</span>
            <FiArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
