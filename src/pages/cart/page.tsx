import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../../components/feature/Navigation';
import Footer from '../../components/feature/Footer';
import { useCart } from '../../lib/CartContext';

export default function CartPage() {
  const { items, itemCount, total, loading, removeItem, updateQuantity } = useCart();
  const [removingKey, setRemovingKey] = useState<string | null>(null);

  const handleRemove = async (key: string) => {
    setRemovingKey(key);
    try {
      await removeItem(key);
    } finally {
      setRemovingKey(null);
    }
  };

  const handleQuantityChange = async (key: string, newQty: number) => {
    if (newQty < 1) return;
    await updateQuantity(key, newQty);
  };

  const formatPrice = (priceStr: string) => {
    const cents = parseInt(priceStr);
    return (cents / 100).toFixed(2);
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Montserrat', sans-serif", backgroundColor: '#f0f8ff' }}>
      <Navigation />

      {/* Breadcrumb */}
      <div className="pt-24 pb-4 max-w-5xl mx-auto px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm" style={{ color: '#386FA4' }}>
          <Link to="/" className="hover:text-[#133C55] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/merchandise" className="hover:text-[#133C55] transition-colors">Merchandise</Link>
          <span>/</span>
          <span style={{ color: '#133C55' }}>Cart</span>
        </nav>
      </div>

      <section className="pb-16 max-w-5xl mx-auto px-6 lg:px-8">
        <h1 className="text-4xl lg:text-5xl font-bold mb-8" style={{ fontFamily: "'Fugaz One', cursive", color: '#133C55' }}>
          Your Cart
        </h1>

        {loading && items.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-block w-12 h-12 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#386FA4', borderTopColor: 'transparent' }}></div>
            <p className="mt-4 text-lg" style={{ color: '#386FA4' }}>Loading cart...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16">
            <i className="ri-shopping-cart-line text-6xl mb-4 block" style={{ color: '#84D2F6' }}></i>
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#133C55' }}>Your cart is empty</h2>
            <p className="text-lg mb-8" style={{ color: '#386FA4' }}>Browse our merchandise and find something you love!</p>
            <Link
              to="/merchandise"
              className="inline-block px-8 py-4 font-bold rounded-lg text-white transition-all duration-300 shadow-lg"
              style={{ background: 'linear-gradient(135deg, #386FA4, #133C55)' }}
            >
              Shop Merchandise
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.key}
                  className="flex gap-4 p-4 rounded-xl shadow-sm"
                  style={{ backgroundColor: 'white' }}
                >
                  {/* Item Image */}
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden" style={{ backgroundColor: '#f0f8ff' }}>
                    {item.images?.[0]?.src ? (
                      <img
                        src={item.images[0].src}
                        alt={item.images[0].alt || item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <i className="ri-image-line text-2xl" style={{ color: '#84D2F6' }}></i>
                      </div>
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg truncate" style={{ color: '#133C55' }}>
                      {item.name}
                    </h3>
                    <p className="text-sm mt-1" style={{ color: '#386FA4' }}>
                      ${formatPrice(item.prices.price)} each
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border rounded-lg overflow-hidden" style={{ borderColor: '#d0eeff' }}>
                        <button
                          onClick={() => handleQuantityChange(item.key, item.quantity - 1)}
                          disabled={loading}
                          className="w-8 h-8 flex items-center justify-center text-sm font-bold cursor-pointer hover:bg-gray-100 transition-colors disabled:opacity-50"
                          style={{ color: '#133C55' }}
                        >
                          -
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center text-sm font-bold" style={{ color: '#133C55' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.key, item.quantity + 1)}
                          disabled={loading}
                          className="w-8 h-8 flex items-center justify-center text-sm font-bold cursor-pointer hover:bg-gray-100 transition-colors disabled:opacity-50"
                          style={{ color: '#133C55' }}
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemove(item.key)}
                        disabled={removingKey === item.key}
                        className="text-sm font-semibold cursor-pointer transition-colors hover:text-red-600 disabled:opacity-50"
                        style={{ color: '#386FA4' }}
                      >
                        {removingKey === item.key ? 'Removing...' : 'Remove'}
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="text-right flex-shrink-0">
                    <span className="font-bold text-lg" style={{ color: '#133C55' }}>
                      ${formatPrice(item.totals.line_total)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="rounded-xl p-6 shadow-sm sticky top-28" style={{ backgroundColor: 'white' }}>
                <h2 className="text-xl font-bold mb-4" style={{ color: '#133C55' }}>Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm" style={{ color: '#386FA4' }}>
                    <span>Items ({itemCount})</span>
                    <span>${total}</span>
                  </div>
                  <div className="flex justify-between text-sm" style={{ color: '#386FA4' }}>
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <hr style={{ borderColor: '#d0eeff' }} />
                  <div className="flex justify-between font-bold text-lg" style={{ color: '#133C55' }}>
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>

                <a
                  href="/checkout"
                  className="block w-full text-center px-8 py-4 font-bold rounded-lg text-white transition-all duration-300 shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #386FA4, #133C55)' }}
                >
                  Proceed to Checkout
                </a>

                <Link
                  to="/merchandise"
                  className="block w-full text-center mt-3 px-8 py-3 font-semibold rounded-lg border-2 transition-all duration-300"
                  style={{ borderColor: '#133C55', color: '#133C55' }}
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
