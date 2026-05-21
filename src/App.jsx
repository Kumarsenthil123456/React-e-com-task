import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import { CartProvider } from './context/CartContext';
import {
  FiPhone, FiMail, FiMapPin, FiClock, FiSend
} from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

function ContactSection() {
  const [form, setForm] = React.useState({ name: '', email: '', message: '' });
  const [sent, setSent] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section
      id="contact"
      className="w-full bg-white border-t border-gray-100 mt-12"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-hover py-12 px-4 text-white text-center">
        <h2 className="text-3xl font-extrabold mb-2">Get in Touch</h2>
        <p className="text-white/80 text-sm max-w-xl mx-auto">
          Have questions, feedback, or need help? We're here for you 24/7.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4 md:px-8 py-12 grid md:grid-cols-2 gap-12">

        {/* Left – Contact Info */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-bold text-gray-800">Contact Information</h3>

          <div className="flex flex-col gap-4">
            {[
              { Icon: FiPhone,  label: 'Phone',    value: '+1 (800) PICKBZR' },
              { Icon: FiMail,   label: 'Email',    value: 'support@pickbazar.com' },
              { Icon: FiMapPin, label: 'Address',  value: '123 Grocery Lane, Fresh City, FC 10001' },
              { Icon: FiClock,  label: 'Hours',    value: 'Mon – Sat: 8am – 10pm · Sun: 9am – 6pm' },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</p>
                  <p className="text-sm font-semibold text-gray-700 mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Social links */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Follow Us</p>
            <div className="flex gap-3">
              {[
                { Icon: FaFacebookF, color: 'bg-blue-600',  label: 'Facebook' },
                { Icon: FaInstagram, color: 'bg-pink-500',  label: 'Instagram' },
                { Icon: FaTwitter,   color: 'bg-sky-500',   label: 'Twitter' },
                { Icon: FaYoutube,   color: 'bg-red-600',   label: 'YouTube' },
              ].map(({ Icon, color, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className={`w-9 h-9 ${color} text-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity`}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right – Contact Form */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-5">Send Us a Message</h3>

          {sent ? (
            <div className="flex flex-col items-center justify-center gap-3 py-12 bg-primary/5 rounded-xl border border-primary/20 text-center">
              <span className="text-4xl">✅</span>
              <p className="font-bold text-gray-800">Message Sent!</p>
              <p className="text-sm text-gray-500">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                required
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <input
                required
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <textarea
                required
                rows={4}
                placeholder="Your message…"
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold text-sm transition-all focus:outline-none"
              >
                <FiSend size={15} />
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer bar */}
      <div className="border-t border-gray-100 py-5 px-4 text-center text-xs font-semibold text-gray-400">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} PickBazar Clone. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-primary transition-colors">Help Center</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen bg-gray-50/30">
        {/* Sticky Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>

        {/* Contact section + Footer */}
        <ContactSection />
      </div>
    </CartProvider>
  );
}
