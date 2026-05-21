// eslint-disable-next-line no-unused-vars
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FiSearch, FiMenu, FiChevronDown, FiShoppingBag, FiX,
  FiUser, FiLock, FiMail, FiPhone, FiMapPin, FiEye, FiEyeOff
} from 'react-icons/fi';
import { FaApple, FaPaintBrush, FaBreadSlice, FaTshirt, FaCouch } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const SHOP_TYPES = [
  { key: 'grocery',  label: 'Grocery',   Icon: FaApple,       color: 'text-green-600' },
  { key: 'makeup',   label: 'Makeup',    Icon: FaPaintBrush,  color: 'text-pink-500' },
  { key: 'bakery',   label: 'Bakery',    Icon: FaBreadSlice,  color: 'text-amber-600' },
  { key: 'clothing', label: 'Clothing',  Icon: FaTshirt,      color: 'text-blue-500' },
  { key: 'furniture',label: 'Furniture', Icon: FaCouch,       color: 'text-purple-500' },
];

/* ─── Small reusable Modal shell ─── */
function Modal({ open, onClose, children }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl p-8 animate-slide-in-right"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
        >
          <FiX size={20} />
        </button>
        {children}
      </div>
    </div>
  );
}

/* ─── Login Modal ─── */
function LoginModal({ open, onClose, onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess({ name: email.split('@')[0], email });
      onClose();
    }, 900);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="text-center mb-6">
        <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <FiUser size={26} className="text-primary" />
        </div>
        <h2 className="text-2xl font-extrabold text-gray-800">Welcome back!</h2>
        <p className="text-sm text-gray-400 mt-1">Login to your PickBazar account</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <FiMail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            required type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="relative">
          <FiLock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            required type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full pl-9 pr-10 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          <button type="button" onClick={() => setShowPw(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none">
            {showPw ? <FiEyeOff size={16} /> : <FiEye size={16} />}
          </button>
        </div>
        <button
          type="submit" disabled={loading}
          className="w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold text-sm transition-all focus:outline-none disabled:opacity-60"
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
      <p className="text-center text-xs text-gray-400 mt-4">
        Demo: any email & password will work!
      </p>
    </Modal>
  );
}

/* ─── Become a Seller Modal ─── */
function SellerModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleChange = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1000);
  };

  const handleClose = () => { setDone(false); setForm({ name: '', email: '', phone: '', address: '' }); onClose(); };

  return (
    <Modal open={open} onClose={handleClose}>
      {done ? (
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🎉</span>
          </div>
          <h2 className="text-xl font-extrabold text-gray-800 mb-2">Application Submitted!</h2>
          <p className="text-sm text-gray-400">We'll review your seller application and get back to you within 2 business days.</p>
          <button onClick={handleClose} className="mt-6 px-8 py-2.5 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primary-hover transition-colors focus:outline-none">
            Got it!
          </button>
        </div>
      ) : (
        <>
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiShoppingBag size={24} className="text-primary" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-800">Become a Seller</h2>
            <p className="text-sm text-gray-400 mt-1">Start selling on PickBazar today</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <FiUser size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input required type="text" value={form.name} onChange={handleChange('name')} placeholder="Full name"
                className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
            </div>
            <div className="relative">
              <FiMail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input required type="email" value={form.email} onChange={handleChange('email')} placeholder="Email address"
                className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
            </div>
            <div className="relative">
              <FiPhone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input required type="tel" value={form.phone} onChange={handleChange('phone')} placeholder="Phone number"
                className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
            </div>
            <div className="relative">
              <FiMapPin size={16} className="absolute left-3 top-3.5 text-gray-400" />
              <textarea value={form.address} onChange={handleChange('address')} placeholder="Business address (optional)" rows={2}
                className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold text-sm transition-all focus:outline-none disabled:opacity-60">
              {loading ? 'Submitting…' : 'Apply Now'}
            </button>
          </form>
        </>
      )}
    </Modal>
  );
}

/* ─── Contact Section (scrolled to from Navbar) ─── */

export default function Navbar() {
  const {
    searchTerm, setSearchTerm,
    setSelectedCategory, setShowOffersOnly,
    cartCount, openCart, showToast,
    shopType, setShopType,
    user, setUser,
    isLoginOpen, setIsLoginOpen,
    isSellerOpen, setIsSellerOpen,
  } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const [shopDropOpen, setShopDropOpen] = useState(false);
  const shopDropRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const currentShop = SHOP_TYPES.find(s => s.key === shopType) || SHOP_TYPES[0];

  // Close shop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (shopDropRef.current && !shopDropRef.current.contains(e.target)) {
        setShopDropOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    setShowOffersOnly(false);
    setSearchTerm(e.target.value);
    if (location.pathname !== '/') navigate('/');
  };

  const goHome = (e) => {
    if (e) e.preventDefault();
    setSearchTerm('');
    setSelectedCategory('');
    setShowOffersOnly(false);
    navigate('/');
    setMobileMenuOpen(false);
  };

  const handleShopsClick = (e) => {
    if (e) e.preventDefault();
    showToast('Browsing all shops!', 'info');
    goHome(null);
    setMobileMenuOpen(false);
  };

  const handleOffersClick = (e) => {
    if (e) e.preventDefault();
    setSearchTerm('');
    setSelectedCategory('');
    setShowOffersOnly(true);
    navigate('/');
    showToast('🏷️ Showing discounted offers only!', 'info');
    setMobileMenuOpen(false);
  };

  const handleContactClick = (e) => {
    if (e) e.preventDefault();
    setMobileMenuOpen(false);
    // Navigate home first if not already there, then scroll to #contact
    const scrollToContact = () => {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(scrollToContact, 300); // wait for page render
    } else {
      scrollToContact();
    }
  };

  const handleShopTypeChange = (key) => {
    setShopType(key);
    setShopDropOpen(false);
    setSelectedCategory('');
    setSearchTerm('');
    setShowOffersOnly(false);
    if (location.pathname !== '/') navigate('/');
    const shopLabel = SHOP_TYPES.find(s => s.key === key)?.label || key;
    showToast(`Switched to ${shopLabel} store!`, 'info');
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    showToast(`Welcome back, ${userData.name}! 👋`);
  };

  const handleLogout = () => {
    setUser(null);
    showToast('Logged out successfully!', 'info');
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 shadow-navbar">
        <div className="mx-auto max-w-[1920px] px-4 md:px-8 h-16 md:h-20 flex items-center justify-between gap-4">

          {/* Left: Mobile Hamburger + Logo + Shop Dropdown */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center lg:hidden text-gray-600 focus:outline-none"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>

            {/* Logo */}
            <Link to="/" onClick={goHome} className="flex items-center gap-1.5 shrink-0">
              <span className="text-xl md:text-2xl font-extrabold text-gray-800 tracking-tight font-sans">
                <span className="text-primary font-serif">P</span>ick<span className="text-primary font-serif">B</span>azar
              </span>
            </Link>

            {/* Shop Type Dropdown */}
            <div className="hidden md:block relative" ref={shopDropRef}>
              <button
                onClick={() => setShopDropOpen(p => !p)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-200 hover:border-primary bg-white transition-all text-sm font-semibold text-primary focus:outline-none"
              >
                <currentShop.Icon size={15} className={currentShop.color} />
                <span>{currentShop.label}</span>
                <FiChevronDown size={13} className={`text-gray-400 transform transition-transform ${shopDropOpen ? 'rotate-180' : ''}`} />
              </button>

              {shopDropOpen && (
                <div className="absolute left-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50">
                  {SHOP_TYPES.map(({ key, label, Icon, color }) => (
                    <button
                      key={key}
                      onClick={() => handleShopTypeChange(key)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-left transition-colors hover:bg-gray-50 ${shopType === key ? 'text-primary bg-primary/5' : 'text-gray-700'}`}
                    >
                      <Icon size={14} className={color} />
                      {label}
                      {shopType === key && <span className="ml-auto w-2 h-2 bg-primary rounded-full" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center: Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-2xl relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <FiSearch size={17} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder={`Search in ${currentShop.label} store...`}
              className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-gray-50/50 hover:bg-white focus:bg-white transition-all text-gray-700 placeholder-gray-400"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none text-xs font-semibold">
                Clear
              </button>
            )}
          </div>

          {/* Right: Nav links + CTA buttons */}
          <div className="flex items-center gap-3 md:gap-5 text-sm font-semibold text-gray-700">

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6">
              <button
                onClick={handleShopsClick}
                className="hover:text-primary transition-colors focus:outline-none"
              >
                Shops
              </button>
              <button
                onClick={handleOffersClick}
                className="hover:text-primary transition-colors focus:outline-none"
              >
                Offers
              </button>
              <button
                onClick={handleContactClick}
                className="hover:text-primary transition-colors focus:outline-none"
              >
                Contact
              </button>

              {/* Pages dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setPagesOpen(true)}
                onMouseLeave={() => setPagesOpen(false)}
              >
                <button
                  onClick={() => setPagesOpen(p => !p)}
                  className="flex items-center gap-1 hover:text-primary transition-colors focus:outline-none"
                >
                  Pages <FiChevronDown size={13} className={`transform transition-transform ${pagesOpen ? 'rotate-180' : ''}`} />
                </button>
                {pagesOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50">
                    <button
                      onClick={(e) => { handleShopsClick(e); setPagesOpen(false); }}
                      className="w-full block px-4 py-2.5 hover:bg-gray-50 hover:text-primary text-left text-xs font-semibold text-gray-700 transition-colors"
                    >
                      🏠 Home Page
                    </button>
                    <button
                      onClick={() => { setPagesOpen(false); navigate('/checkout'); }}
                      className="w-full block px-4 py-2.5 hover:bg-gray-50 hover:text-primary text-left text-xs font-semibold text-gray-700 transition-colors"
                    >
                      🛒 Checkout Page
                    </button>
                    <button
                      onClick={(e) => { handleOffersClick(e); setPagesOpen(false); }}
                      className="w-full block px-4 py-2.5 hover:bg-gray-50 hover:text-primary text-left text-xs font-semibold text-gray-700 transition-colors"
                    >
                      🏷️ Offers & Deals
                    </button>
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile search */}
            <div className="lg:hidden relative max-w-[160px] sm:max-w-[220px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FiSearch size={13} />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search…"
                className="w-full pl-8 pr-2 py-1.5 rounded-md border border-gray-200 text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-gray-50/50 focus:bg-white text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Cart icon (mobile) */}
            <button
              onClick={openCart}
              className="md:hidden relative p-2 rounded-full hover:bg-gray-100 text-gray-600 focus:outline-none"
              aria-label="View Cart"
            >
              <FiShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Join / Profile button */}
            {user ? (
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-xs font-bold text-gray-600">Hi, {user.name}!</span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 border border-gray-300 hover:border-red-400 hover:text-red-500 text-gray-600 rounded-md text-xs font-bold transition-all focus:outline-none"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-md text-sm font-bold shadow-sm transition-all focus:outline-none"
              >
                Join
              </button>
            )}

            {/* Become a Seller */}
            <button
              onClick={() => setIsSellerOpen(true)}
              className="hidden md:inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-md text-sm font-bold shadow-sm transition-all focus:outline-none"
            >
              Become a Seller
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 z-50 bg-black/50 animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-72 h-full bg-white p-6 shadow-2xl flex flex-col justify-between" onClick={e => e.stopPropagation()}>
              <div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
                  <span className="text-lg font-bold text-gray-800">Menu</span>
                  <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-gray-600 focus:outline-none">
                    <FiX size={20} />
                  </button>
                </div>

                {/* Shop type picker (mobile) */}
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Store</p>
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {SHOP_TYPES.map(({ key, label, Icon, color }) => (
                    <button
                      key={key}
                      onClick={() => { handleShopTypeChange(key); setMobileMenuOpen(false); }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-semibold transition-all ${shopType === key ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 text-gray-600 hover:border-primary/40'}`}
                    >
                      <Icon size={12} className={color} />
                      {label}
                    </button>
                  ))}
                </div>

                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Navigation</p>
                <nav className="flex flex-col gap-1 text-sm font-medium text-gray-600">
                  <button onClick={handleShopsClick} className="flex items-center gap-3 hover:text-primary py-2.5 border-b border-gray-50 text-left focus:outline-none">
                    🏪 Shops
                  </button>
                  <button onClick={handleOffersClick} className="flex items-center gap-3 hover:text-primary py-2.5 border-b border-gray-50 text-left focus:outline-none">
                    🏷️ Offers & Deals
                  </button>
                  <button onClick={handleContactClick} className="flex items-center gap-3 hover:text-primary py-2.5 border-b border-gray-50 text-left focus:outline-none">
                    📞 Contact
                  </button>
                  <button onClick={() => { setMobileMenuOpen(false); navigate('/checkout'); }} className="flex items-center gap-3 hover:text-primary py-2.5 border-b border-gray-50 text-left focus:outline-none">
                    🛒 Checkout
                  </button>
                </nav>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                {user ? (
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-700 mb-2">👋 Hi, {user.name}!</p>
                    <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="w-full py-2 border border-red-300 text-red-500 rounded-md text-sm font-bold transition-all focus:outline-none">
                      Logout
                    </button>
                  </div>
                ) : (
                  <button onClick={() => { setIsLoginOpen(true); setMobileMenuOpen(false); }} className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white rounded-md text-sm font-bold shadow-sm transition-all focus:outline-none">
                    Join / Login
                  </button>
                )}
                <button onClick={() => { setIsSellerOpen(true); setMobileMenuOpen(false); }} className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white rounded-md text-sm font-bold shadow-sm transition-all focus:outline-none">
                  Become a Seller
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ─── Modals ─── */}
      <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} onSuccess={handleLoginSuccess} />
      <SellerModal open={isSellerOpen} onClose={() => setIsSellerOpen(false)} />
    </>
  );
}
