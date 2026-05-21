// eslint-disable-next-line no-unused-vars
import React from 'react';
import { FiPlus, FiMinus, FiStar } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();

  // Check if this product is already in the cart
  const cartItem = cartItems.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  // Calculate discount percentage label
  const discountLabel = product.discountPercentage > 0 ? `${product.discountPercentage}%` : null;

  return (
    <div className="group relative flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden shadow-card hover:shadow-card-hover product-card-hover">
      
      {/* Discount Badge */}
      {discountLabel && (
        <span className="absolute top-3 right-3 z-10 bg-accent-orange text-white text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
          {discountLabel} OFF
        </span>
      )}

      {/* Product Image Container */}
      <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center p-6 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Product Info Section */}
      <div className="flex flex-col p-4 md:p-5 flex-1 justify-between gap-3">
        <div>
          {/* Price & Rating Row */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <div className="flex items-center gap-1.5">
              <span className="text-base md:text-lg font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs md:text-sm text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {/* Rating */}
            <div className="flex items-center gap-0.5 bg-yellow-50 text-accent-yellow px-1.5 py-0.5 rounded text-[10px] md:text-xs font-bold">
              <FiStar className="fill-current" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Title */}
          <h4 className="text-sm font-semibold text-customGray-darkText line-clamp-2 hover:text-primary transition-colors mb-1 min-h-[2.5rem]">
            {product.title}
          </h4>

          {/* Unit Size */}
          <span className="text-xs font-medium text-gray-400">
            {product.unit}
          </span>
        </div>

        {/* Action Button: Add to Cart / Qty Control */}
        <div className="mt-2">
          {quantity === 0 ? (
            <button
              onClick={() => addToCart(product)}
              className="w-full flex items-center justify-center gap-2 py-2 border border-gray-200 hover:border-primary hover:bg-primary hover:text-white rounded-lg text-sm font-bold text-primary transition-all duration-200 focus:outline-none"
            >
              <FiPlus size={16} />
              <span>Cart</span>
            </button>
          ) : (
            <div className="flex items-center justify-between bg-primary text-white rounded-lg overflow-hidden h-9 font-bold shadow-sm">
              <button
                onClick={() => decreaseQuantity(product.id)}
                className="flex items-center justify-center w-9 h-full hover:bg-primary-dark transition-colors focus:outline-none"
                aria-label="Decrease quantity"
              >
                <FiMinus size={14} />
              </button>
              <span className="text-sm px-2">{quantity}</span>
              <button
                onClick={() => increaseQuantity(product.id)}
                className="flex items-center justify-center w-9 h-full hover:bg-primary-dark transition-colors focus:outline-none"
                aria-label="Increase quantity"
              >
                <FiPlus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Skeleton loading component
export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden shadow-card animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full aspect-square bg-gray-100" />
      
      {/* Info Skeleton */}
      <div className="flex flex-col p-4 md:p-5 flex-1 gap-3 justify-between">
        <div>
          {/* Price & Rating */}
          <div className="flex justify-between items-center mb-2">
            <div className="h-5 w-16 bg-gray-200 rounded" />
            <div className="h-4 w-10 bg-gray-200 rounded" />
          </div>
          {/* Title */}
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
          {/* Unit */}
          <div className="h-3 bg-gray-150 rounded w-12 mt-1" />
        </div>

        {/* Button */}
        <div className="h-9 bg-gray-200 rounded-lg w-full mt-2" />
      </div>
    </div>
  );
}
