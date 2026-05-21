// eslint-disable-next-line no-unused-vars
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Cart State
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('pickbazar_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // UI State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showOffersOnly, setShowOffersOnly] = useState(false);
  const [shopType, setShopType] = useState('grocery');
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSellerOpen, setIsSellerOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Reset filters when shop type changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedCategory('');
    setSearchTerm('');
    setShowOffersOnly(false);
  }, [shopType]);

  // Sync with Local Storage
  useEffect(() => {
    localStorage.setItem('pickbazar_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Derived Values
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = parseFloat(
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  );

  // Toast System
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto-remove toast after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Operations
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        showToast(`Increased quantity of ${product.title}`);
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      showToast(`Added ${product.title} to cart!`);
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    const itemToRemove = cartItems.find((item) => item.id === id);
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    if (itemToRemove) {
      showToast(`Removed ${itemToRemove.title} from cart`, 'info');
    }
  };

  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          showToast(`Increased quantity of ${item.title}`);
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((item) => item.id === id);
      if (!item) return prevItems;

      if (item.quantity === 1) {
        showToast(`Removed ${item.title} from cart`, 'info');
        return prevItems.filter((item) => item.id !== id);
      }

      showToast(`Decreased quantity of ${item.title}`);
      return prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
    showToast('Cleared your cart!', 'info');
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        isCartOpen,
        searchTerm,
        selectedCategory,
        showOffersOnly,
        toasts,
        shopType,
        setShopType,
        user,
        setUser,
        isLoginOpen,
        setIsLoginOpen,
        isSellerOpen,
        setIsSellerOpen,
        setSearchTerm,
        setSelectedCategory,
        setShowOffersOnly,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
        showToast,
        removeToast,
      }}
    >
      {children}

      {/* Dynamic Toast Notifications UI Container */}
      <div className="fixed bottom-5 left-5 z-[9999] flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-4 p-4 rounded-lg shadow-lg border text-sm font-medium transition-all duration-300 transform translate-y-0 scale-100 animate-slide-in-right ${
              toast.type === 'success'
                ? 'bg-primary text-white border-primary-dark'
                : toast.type === 'info'
                ? 'bg-gray-800 text-white border-gray-700'
                : 'bg-red-600 text-white border-red-700'
            }`}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/80 hover:text-white font-bold ml-2 focus:outline-none"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </CartContext.Provider>
  );
};
