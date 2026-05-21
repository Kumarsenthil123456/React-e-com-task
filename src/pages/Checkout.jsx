// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiCreditCard, FiTrash2, FiPlus, FiMinus, FiMapPin, FiPhone } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import OrderSuccessModal from '../components/OrderSuccessModal';

export default function Checkout() {
  const { 
    cartItems, 
    cartTotal, 
    increaseQuantity, 
    decreaseQuantity, 
    removeFromCart 
  } = useCart();

  // Form States
  const [address, setAddress] = useState('123 housing board , sivakasi');
  const [phone, setPhone] = useState('+91 7904678493');
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' or 'card'
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Modal States
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  // Form errors
  const [errors, setErrors] = useState({});

  // Calculations
  const shippingFee = 0.00; // Free shipping
  const taxRate = 0.05; // 5% tax
  const taxAmount = parseFloat((cartTotal * taxRate).toFixed(2));
  const grandTotal = parseFloat((cartTotal + shippingFee + taxAmount).toFixed(2));

  const validateForm = () => {
    const tempErrors = {};
    if (!address.trim()) tempErrors.address = 'Delivery address is required';
    if (!phone.trim()) tempErrors.phone = 'Contact number is required';
    
    if (paymentMethod === 'card') {
      if (!cardNumber.trim() || cardNumber.length < 16) tempErrors.cardNumber = 'Valid 16-digit card number is required';
      if (!cardExpiry.trim()) tempErrors.cardExpiry = 'Expiry date is required';
      if (!cardCvv.trim() || cardCvv.length < 3) tempErrors.cardCvv = 'Valid CVV is required';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Simulate order creation
    const randomRef = 'PB-' + Math.floor(100000 + Math.random() * 900000);
    setOrderDetails({
      ref: randomRef,
      total: grandTotal,
      address: address,
    });
    
    setIsSuccessOpen(true);
  };

  if (cartItems.length === 0 && !isSuccessOpen) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 flex flex-col items-center justify-center text-center gap-6 min-h-[calc(100vh-12rem)] select-none">
        <div className="w-32 h-32 rounded-full bg-primary-light/50 flex items-center justify-center text-primary mb-2">
          <FiShoppingBag size={56} className="stroke-[1.5]" />
        </div>
        <h3 className="text-2xl font-extrabold text-customGray-darkText">
          Your Cart is Empty
        </h3>
        <p className="text-sm text-gray-500 max-w-md">
          You don't have any items in your shopping cart to checkout. Please head back to our store and browse our fresh groceries.
        </p>
        <Link
          to="/"
          className="px-8 py-3.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-primary/20 focus:outline-none"
        >
          Go Back To Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-8 min-h-[calc(100vh-5rem)] bg-gray-50/50">
      <h2 className="text-2xl font-extrabold text-customGray-darkText mb-8">
        Checkout
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Details (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Section 1: Delivery Address */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-card">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-5">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">
                1
              </span>
              <h3 className="text-lg font-bold text-customGray-darkText flex items-center gap-2">
                <FiMapPin /> Delivery Address
              </h3>
            </div>
            
            <div className="flex flex-col gap-2">
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your complete delivery address here..."
                rows="3"
                className={`w-full p-4 rounded-xl border ${errors.address ? 'border-red-500' : 'border-gray-200'} text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-gray-700 bg-gray-50 hover:bg-white focus:bg-white transition-all`}
              />
              {errors.address && (
                <span className="text-xs text-red-500 font-semibold">{errors.address}</span>
              )}
            </div>
          </div>

          {/* Section 2: Contact Number */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-card">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-5">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">
                2
              </span>
              <h3 className="text-lg font-bold text-customGray-darkText flex items-center gap-2">
                <FiPhone /> Contact Number
              </h3>
            </div>

            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +1 (555) 000-0000"
                className={`w-full p-4 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-200'} text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-gray-700 bg-gray-50 hover:bg-white focus:bg-white transition-all`}
              />
              {errors.phone && (
                <span className="text-xs text-red-500 font-semibold">{errors.phone}</span>
              )}
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-card">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-5">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">
                3
              </span>
              <h3 className="text-lg font-bold text-customGray-darkText flex items-center gap-2">
                <FiCreditCard /> Payment Options
              </h3>
            </div>

            <div className="flex flex-col gap-4">
              {/* COD Selection */}
              <label 
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'cod' 
                    ? 'border-primary bg-primary-light/30' 
                    : 'border-gray-100 bg-gray-50 hover:bg-gray-100/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-primary h-4.5 w-4.5"
                  />
                  <div>
                    <span className="text-sm font-bold text-customGray-darkText">Cash On Delivery</span>
                    <p className="text-xs text-gray-400 font-medium">Pay with cash when order is delivered</p>
                  </div>
                </div>
              </label>

              {/* Card Selection */}
              <label 
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'card' 
                    ? 'border-primary bg-primary-light/30' 
                    : 'border-gray-100 bg-gray-50 hover:bg-gray-100/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="accent-primary h-4.5 w-4.5"
                  />
                  <div>
                    <span className="text-sm font-bold text-customGray-darkText">Credit / Debit Card</span>
                    <p className="text-xs text-gray-400 font-medium">Secure credit transaction via Stripe</p>
                  </div>
                </div>
              </label>

              {/* Card Inputs Card details */}
              {paymentMethod === 'card' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 p-4 bg-gray-50 border border-gray-100 rounded-xl animate-fade-in">
                  <div className="md:col-span-2 flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase">Card Number</label>
                    <input
                      type="text"
                      maxLength="16"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="XXXX XXXX XXXX XXXX"
                      className={`w-full p-3 rounded-lg border ${errors.cardNumber ? 'border-red-400' : 'border-gray-200'} text-sm focus:outline-none focus:border-primary bg-white`}
                    />
                    {errors.cardNumber && (
                      <span className="text-[10px] text-red-500 font-semibold">{errors.cardNumber}</span>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className={`w-full p-3 rounded-lg border ${errors.cardExpiry ? 'border-red-400' : 'border-gray-200'} text-sm focus:outline-none focus:border-primary bg-white`}
                    />
                    {errors.cardExpiry && (
                      <span className="text-[10px] text-red-500 font-semibold">{errors.cardExpiry}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase">CVV</label>
                    <input
                      type="password"
                      maxLength="3"
                      placeholder="123"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                      className={`w-full p-3 rounded-lg border ${errors.cardCvv ? 'border-red-400' : 'border-gray-200'} text-sm focus:outline-none focus:border-primary bg-white`}
                    />
                    {errors.cardCvv && (
                      <span className="text-[10px] text-red-500 font-semibold">{errors.cardCvv}</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary (5 Cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-card flex flex-col justify-between">
            <h3 className="text-lg font-bold text-customGray-darkText border-b border-gray-100 pb-4 mb-5">
              Your Order
            </h3>

            {/* List items */}
            <div className="flex flex-col gap-4 max-h-72 overflow-y-auto mb-6 pr-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 text-sm">
                  {/* Qty panel & Title */}
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="flex items-center bg-gray-50 border border-gray-100 rounded-md overflow-hidden text-xs">
                      <button 
                        onClick={() => decreaseQuantity(item.id)}
                        className="p-1.5 hover:bg-gray-100 text-gray-500 hover:text-primary focus:outline-none"
                      >
                        <FiMinus size={10} />
                      </button>
                      <span className="px-1.5 font-bold text-customGray-darkText">{item.quantity}</span>
                      <button 
                        onClick={() => increaseQuantity(item.id)}
                        className="p-1.5 hover:bg-gray-100 text-gray-500 hover:text-primary focus:outline-none"
                      >
                        <FiPlus size={10} />
                      </button>
                    </div>

                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-10 h-10 object-contain p-1 border border-gray-100 rounded bg-gray-50 shrink-0" 
                    />
                    <span className="font-semibold text-customGray-darkText truncate" title={item.title}>
                      {item.title}
                    </span>
                  </div>

                  {/* Pricing math */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-bold text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 focus:outline-none"
                      aria-label="Remove item"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Sum section */}
            <div className="border-t border-gray-100 pt-5 flex flex-col gap-3 text-sm font-semibold">
              <div className="flex justify-between items-center text-gray-500">
                <span>Subtotal</span>
                <span className="text-customGray-darkText font-bold">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-gray-500">
                <span>Tax (5%)</span>
                <span className="text-customGray-darkText font-bold">${taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-gray-500">
                <span>Shipping</span>
                <span className="text-primary font-bold">Free</span>
              </div>
              
              <div className="border-t border-dashed border-gray-100 my-1" />
              
              <div className="flex justify-between items-center text-base font-extrabold">
                <span className="text-customGray-darkText">Total</span>
                <span className="text-primary text-lg">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Form placement click */}
            <button
              onClick={handlePlaceOrder}
              className="mt-6 w-full py-4 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-primary/20 focus:outline-none"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>

      {/* Success Trigger dialog popup */}
      <OrderSuccessModal 
        isOpen={isSuccessOpen} 
        onClose={() => setIsSuccessOpen(false)} 
        orderDetails={orderDetails} 
      />
    </div>
  );
}
