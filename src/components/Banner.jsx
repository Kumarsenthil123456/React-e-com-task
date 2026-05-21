// eslint-disable-next-line no-unused-vars
import React from "react";
import { useCart } from "../context/CartContext";

export default function Banner() {
  const { setSearchTerm } = useCart();

  const quickCategories = [
    { label: "Fruits", value: "Apple", emoji: "🍎" },
    { label: "Meat", value: "Chicken", emoji: "🍗" },
    { label: "Dairy", value: "Milk", emoji: "🥛" },
    { label: "Snacks", value: "Cookies", emoji: "🍪" },
  ];

  return (
    <section className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-primary-dark via-primary to-primary-hover px-4 py-7 md:px-6 md:py-8 shadow-md mb-4">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-52 h-52 bg-black/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:28px_28px]" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-white/15 border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] md:text-xs font-semibold text-white mb-3 shadow-sm">
          🚀 Fast Grocery Delivery
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-4xl font-black text-white leading-tight tracking-tight">
          Groceries Delivered
          <span className="block text-yellow-300">
            In 90 Minutes
          </span>
        </h1>

        {/* Description */}
        <p className="mt-3 text-white/80 text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
          Fresh groceries & essentials delivered quickly to your doorstep.
        </p>

        {/* Quick Categories */}
        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {quickCategories.map((item) => (
            <button
              key={item.label}
              onClick={() => setSearchTerm(item.value)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white text-xs font-medium transition-all duration-300"
            >
              <span>{item.emoji}</span>
              {item.label}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-5">
          {[
            { number: "10K+", label: "Products" },
            { number: "500+", label: "Brands" },
            { number: "24/7", label: "Support" },
            { number: "90 Min", label: "Delivery" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-lg py-2.5 px-2"
            >
              <h3 className="text-base md:text-lg font-bold text-white">
                {item.number}
              </h3>
              <p className="text-white/70 text-[10px] md:text-xs mt-0.5">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}