import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import Sidebar from '../components/Sidebar';
import ProductCard, { ProductCardSkeleton } from '../components/ProductCard';
import FloatingCart from '../components/FloatingCart';
import CartDrawer from '../components/CartDrawer';
import { fetchProducts } from '../services/api';
import { useCart } from '../context/CartContext';
import { FiShoppingBag, FiInfo, FiRefreshCw } from 'react-icons/fi';

export default function Home() {
  const { searchTerm, selectedCategory, showOffersOnly, shopType } = useCart();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products once on mount
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setAllProducts(data);
        setError(null);
      } catch (err) {
        console.error('Home Page loading error:', err);
        setError('Failed to load products. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  // Filter by shopType + category + search + offers
  const filteredProducts = allProducts.filter((product) => {
    // 1. Must match active shop type
    const matchesShop = product.shopType === shopType;

    // 2. Must match selected category (if any)
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;

    // 3. Must match search term (if any)
    const matchesSearch = searchTerm
      ? product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    // 4. Must be on offer (if offers filter active)
    const matchesOffers = showOffersOnly
      ? product.originalPrice > product.price
      : true;

    return matchesShop && matchesCategory && matchesSearch && matchesOffers;
  });

  const shopLabels = {
    grocery: 'Grocery',
    bakery: 'Bakery',
    makeup: 'Makeup',
    clothing: 'Clothing',
    furniture: 'Furniture',
  };

  return (
    <div className="mx-auto max-w-[1920px] px-4 md:px-8 py-6 flex flex-col gap-6 min-h-[calc(100vh-5rem)]">
      {/* Banner Hero */}
      <Banner />

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-6 relative">
        {/* Category Sidebar */}
        <Sidebar />

        {/* Product Listing Grid Area */}
        <main className="flex-1">
          {/* Active filters summary */}
          {(selectedCategory || searchTerm || showOffersOnly) && (
            <div className="flex flex-wrap items-center gap-2 mb-6 text-sm font-semibold text-gray-500">
              <span>Showing results for:</span>
              {selectedCategory && (
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">
                  📂 {selectedCategory}
                </span>
              )}
              {searchTerm && (
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs truncate max-w-[200px]" title={searchTerm}>
                  🔍 &ldquo;{searchTerm}&rdquo;
                </span>
              )}
              {showOffersOnly && (
                <span className="bg-orange-100 text-orange-500 px-3 py-1 rounded-full text-xs">
                  🏷️ Offers & Discounts
                </span>
              )}
              <span className="text-xs text-gray-400 font-medium ml-auto">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} found
              </span>
            </div>
          )}

          {/* Store header when no filters active */}
          {!selectedCategory && !searchTerm && !showOffersOnly && (
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                {shopLabels[shopType] || 'Grocery'} Store
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {filteredProducts.length} products available
              </p>
            </div>
          )}

          {/* States */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center text-center gap-4 py-20 bg-white rounded-xl border border-red-100 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                <FiInfo size={32} />
              </div>
              <h4 className="text-lg font-bold text-gray-800">Connection Error</h4>
              <p className="text-sm text-gray-400 max-w-sm">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-lg transition-colors focus:outline-none"
              >
                <FiRefreshCw size={14} /> Retry
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center gap-4 py-20 bg-white rounded-xl border border-gray-100 shadow-sm select-none">
              <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                <FiShoppingBag size={36} />
              </div>
              <h4 className="text-lg font-bold text-gray-700">No Products Found</h4>
              <p className="text-sm text-gray-400 max-w-sm">
                We couldn&apos;t find anything matching your selection. Try clearing your filters or switching the store type.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Floating cart trigger */}
      <FloatingCart />

      {/* Slide-out cart drawer */}
      <CartDrawer />
    </div>
  );
}
