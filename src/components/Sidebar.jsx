// eslint-disable-next-line no-unused-vars
import React from 'react';
import {
  FaAppleAlt, FaDog, FaEgg, FaCookie, FaCoffee, FaSpa,
  FaHome, FaArrowRight, FaUtensils, FaBreadSlice,
  // eslint-disable-next-line no-unused-vars
  FaPaintBrush, FaTshirt, FaCouch, FaShoppingBag
} from 'react-icons/fa';
import { GiChickenLeg, GiBroom, GiDiamondRing, GiSofa } from 'react-icons/gi';
import { MdChair, MdBed, MdTableRestaurant } from 'react-icons/md';
import { useCart } from '../context/CartContext';

/* ── Category lists per shopType ── */
const CATEGORIES_MAP = {
  grocery: [
    { name: 'Fruits & Vegetables', icon: FaAppleAlt },
    { name: 'Meat & Fish',         icon: GiChickenLeg },
    { name: 'Dairy & Eggs',        icon: FaEgg },
    { name: 'Cooking Essentials',  icon: FaUtensils },
    { name: 'Beverages',           icon: FaCoffee },
    { name: 'Pet Care',            icon: FaDog },
    { name: 'Home & Cleaning',     icon: GiBroom },
  ],
  bakery: [
    { name: 'Bread',    icon: FaBreadSlice },
    { name: 'Cakes',    icon: FaCookie },
    { name: 'Cookies',  icon: FaCookie },
    { name: 'Pastries', icon: FaShoppingBag },
  ],
  makeup: [
    { name: 'Face',      icon: FaSpa },
    { name: 'Eyes',      icon: FaSpa },
    { name: 'Lips',      icon: FaSpa },
    { name: 'Skincare',  icon: FaSpa },
    { name: 'Fragrance', icon: FaSpa },
  ],
  clothing: [
    { name: 'Tops & Shirts', icon: FaTshirt },
    { name: 'Dresses',       icon: FaTshirt },
    { name: 'Shoes',         icon: FaShoppingBag },
    { name: 'Bags',          icon: FaShoppingBag },
    { name: 'Accessories',   icon: GiDiamondRing },
  ],
  furniture: [
    { name: 'Chairs',     icon: MdChair },
    { name: 'Tables',     icon: MdTableRestaurant },
    { name: 'Sofas',      icon: GiSofa },
    { name: 'Beds',       icon: MdBed },
    { name: 'Home Decor', icon: FaCouch },
  ],
};

export default function Sidebar() {
  const { selectedCategory, setSelectedCategory, shopType } = useCart();

  const categories = CATEGORIES_MAP[shopType] || CATEGORIES_MAP.grocery;

  const handleCategoryClick = (name) => {
    setSelectedCategory(selectedCategory === name ? '' : name);
  };

  /* ── shared button style ── */
  const btnClass = (active) =>
    `w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 group text-left ${
      active
        ? 'bg-primary-light text-primary border-l-4 border-primary pl-2'
        : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
    }`;

  const pillClass = (active) =>
    `shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border ${
      active
        ? 'bg-primary text-white border-primary shadow-sm'
        : 'bg-white text-gray-600 border-gray-200 hover:border-primary/50'
    }`;

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:block w-72 shrink-0 bg-white border border-gray-100 rounded-lg p-5 shadow-card self-start sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">
          Categories
        </h3>

        <div className="flex flex-col gap-1">
          {/* All */}
          <button onClick={() => setSelectedCategory('')} className={btnClass(selectedCategory === '')}>
            <div className="flex items-center gap-3">
              <FaHome size={15} className={selectedCategory === '' ? 'text-primary' : 'text-gray-400 group-hover:text-primary'} />
              <span>All Categories</span>
            </div>
            <FaArrowRight size={11} className={`transition-opacity ${selectedCategory === '' ? 'opacity-100 text-primary' : 'opacity-0 group-hover:opacity-100 text-gray-400'}`} />
          </button>

          {categories.map(({ name, icon: Icon }) => {
            const active = selectedCategory === name;
            return (
              <button key={name} onClick={() => handleCategoryClick(name)} className={btnClass(active)}>
                <div className="flex items-center gap-3">
                  <Icon size={15} className={active ? 'text-primary' : 'text-gray-400 group-hover:text-primary'} />
                  <span>{name}</span>
                </div>
                <FaArrowRight size={11} className={`transition-opacity ${active ? 'opacity-100 text-primary' : 'opacity-0 group-hover:opacity-100 text-gray-400'}`} />
              </button>
            );
          })}
        </div>
      </aside>

      {/* ── Mobile Horizontal Pills ── */}
      <div className="lg:hidden w-full overflow-x-auto pb-4 pt-2 -mx-4 px-4 flex gap-2 scrollbar-none select-none">
        <button onClick={() => setSelectedCategory('')} className={pillClass(selectedCategory === '')}>
          <FaHome size={11} />
          <span>All</span>
        </button>

        {categories.map(({ name, icon: Icon }) => (
          <button key={name} onClick={() => handleCategoryClick(name)} className={pillClass(selectedCategory === name)}>
            <Icon size={11} />
            <span>{name}</span>
          </button>
        ))}
      </div>
    </>
  );
}
