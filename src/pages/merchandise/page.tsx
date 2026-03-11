import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../../components/feature/Navigation';
import Footer from '../../components/feature/Footer';
import { getProducts, type WCProduct } from '../../lib/wc';
import { useCart } from '../../lib/CartContext';

const fallbackImages: Record<string, string> = {
  'my-neighbors-are-vampires-t-shirt': 'https://readdy.ai/api/search-image?query=white%20cotton%20t-shirt%20with%20book%20cover%20design%20on%20front%20flat%20lay%20on%20clean%20surface%20minimal%20product%20photography&width=400&height=500&seq=merch1&orientation=portrait',
  'keanu-tails-hardcover': 'https://coyotespeakslove.com/staging/9788/wp-content/uploads/2026/03/Placeholder-Image-1-1.jpg',
  'my-navpit-hardcover': 'https://coyotespeakslove.com/staging/9788/wp-content/uploads/2026/03/Placeholder-Image-2-1011x1024.jpg',
  'keanu-tails-tote-bag': 'https://readdy.ai/api/search-image?query=canvas%20tote%20bag%20with%20book%20inspired%20design%20hanging%20on%20white%20wall%20minimal%20clean%20product%20photography%20natural%20light&width=400&height=500&seq=merch4&orientation=portrait',
  'author-signature-hoodie': 'https://readdy.ai/api/search-image?query=premium%20navy%20blue%20hoodie%20folded%20neatly%20on%20white%20surface%20minimal%20product%20photography%20soft%20lighting&width=400&height=500&seq=merch5&orientation=portrait',
  'vampire-neighbors-mug': 'https://readdy.ai/api/search-image?query=white%20ceramic%20coffee%20mug%20with%20book%20themed%20design%20on%20clean%20white%20surface%20minimal%20product%20photography%20soft%20shadows&width=400&height=500&seq=merch6&orientation=portrait',
  'book-character-art-print': 'https://readdy.ai/api/search-image?query=framed%20art%20print%20with%20book%20illustration%20on%20white%20wall%20minimal%20clean%20interior%20photography%20natural%20light&width=400&height=500&seq=merch7&orientation=portrait',
  'writers-journal': 'https://readdy.ai/api/search-image?query=elegant%20hardcover%20journal%20notebook%20with%20pen%20on%20wooden%20desk%20minimal%20stationery%20photography%20soft%20lighting&width=400&height=500&seq=merch8&orientation=portrait',
  'keanu-tails-sweatshirt': 'https://readdy.ai/api/search-image?query=cozy%20crewneck%20sweatshirt%20folded%20on%20white%20background%20minimal%20product%20photography%20clean%20aesthetic&width=400&height=500&seq=merch9&orientation=portrait',
};

function getProductImage(product: WCProduct): string {
  if (product.images && product.images.length > 0 && product.images[0].src) {
    return product.images[0].src;
  }
  return fallbackImages[product.slug] || 'https://via.placeholder.com/400x500?text=No+Image';
}

export default function MerchandisePage() {
  const [products, setProducts] = useState<WCProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [addingId, setAddingId] = useState<number | null>(null);
  const [addedId, setAddedId] = useState<number | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('animate-in');
      });
    }, observerOptions);
    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [products, selectedCategory]);

  const categories = ['All', ...Array.from(new Set(products.flatMap(p => p.categories.map(c => c.name))))];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.categories.some(c => c.name === selectedCategory));

  const handleAddToCart = async (productId: number) => {
    setAddingId(productId);
    try {
      await addToCart(productId);
      setAddedId(productId);
      setTimeout(() => setAddedId(null), 2000);
    } catch (e) {
      console.error('Failed to add to cart:', e);
    } finally {
      setAddingId(null);
    }
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Montserrat', sans-serif", backgroundColor: '#f0f8ff' }}>
      <style>{`
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .scroll-animate.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-8px);
        }
        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(145, 229, 246, 0.4); }
          50% { box-shadow: 0 0 30px rgba(145, 229, 246, 0.6); }
        }
      `}</style>

      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #133C55 0%, #386FA4 60%, #59A5D8 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl" style={{ backgroundColor: '#91E5F6' }}></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: '#84D2F6' }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-2 text-xs font-bold tracking-widest uppercase rounded-full mb-6" style={{ backgroundColor: '#91E5F6', color: '#133C55' }}>
            Official Merchandise
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6" style={{ fontFamily: "'Fugaz One', cursive" }}>
            Merchandise
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: '#d0eeff' }}>
            Bring the stories home with official books, apparel, and exclusive collectibles from Jen Stryker's creative world.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b" style={{ borderColor: '#d0eeff' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  selectedCategory === category
                    ? 'text-white shadow-lg'
                    : 'text-[#386FA4] border-2'
                }`}
                style={
                  selectedCategory === category
                    ? { backgroundColor: '#133C55' }
                    : { borderColor: '#84D2F6', backgroundColor: 'transparent' }
                }
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16" style={{ background: 'linear-gradient(180deg, #f0f8ff 0%, #d0eeff 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#386FA4', borderTopColor: 'transparent' }}></div>
              <p className="mt-4 text-lg" style={{ color: '#386FA4' }}>Loading products...</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border scroll-animate hover-lift"
                  style={{ borderColor: '#d0eeff', transitionDelay: `${index * 80}ms` }}
                >
                  <Link to={`/product/${product.slug}`} className="block">
                    <div className="relative w-full h-80 overflow-hidden">
                      {product.featured && (
                        <div className="absolute top-4 left-4 z-10 px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full" style={{ backgroundColor: '#91E5F6', color: '#133C55' }}>
                          Bestseller
                        </div>
                      )}
                      <img
                        src={getProductImage(product)}
                        alt={product.name}
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full" style={{ backgroundColor: '#d0eeff', color: '#386FA4' }}>
                        {product.categories[0]?.name || 'Uncategorized'}
                      </span>
                      <span className="text-lg font-bold" style={{ color: '#133C55' }}>
                        ${product.price}
                      </span>
                    </div>
                    <Link to={`/product/${product.slug}`}>
                      <h3 className="text-lg font-bold mb-4 leading-snug hover:text-[#386FA4] transition-colors" style={{ fontFamily: "'Fugaz One', cursive", color: '#133C55' }}>
                        {product.name}
                      </h3>
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      disabled={addingId === product.id}
                      className="w-full px-6 py-3 font-bold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap cursor-pointer text-white pulse-glow disabled:opacity-70"
                      style={{
                        background: addedId === product.id
                          ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                          : 'linear-gradient(135deg, #386FA4, #133C55)',
                      }}
                    >
                      {addingId === product.id ? 'Adding...' : addedId === product.id ? 'Added!' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Collection Banner */}
      <section className="py-16 text-white" style={{ background: 'linear-gradient(135deg, #133C55 0%, #386FA4 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 scroll-animate">
              <div className="inline-block px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full" style={{ backgroundColor: 'rgba(145,229,246,0.2)', color: '#91E5F6' }}>
                Limited Edition
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold" style={{ fontFamily: "'Fugaz One', cursive" }}>
                Exclusive Book Bundle
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: '#d0eeff' }}>
                Get both "My Neighbors Are Vampires, I Think!" and "Keanu Tails" together in this special collector's bundle. Includes signed bookplates and exclusive art prints.
              </p>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold" style={{ color: '#91E5F6' }}>$32.99</span>
                <span className="text-lg line-through" style={{ color: '#84D2F6' }}>$36.98</span>
              </div>
              <Link to="/merchandise" className="inline-block px-8 py-4 font-bold rounded-lg transition-all duration-300 shadow-lg whitespace-nowrap cursor-pointer pulse-glow" style={{ backgroundColor: '#91E5F6', color: '#133C55' }}>
                Shop Bundle
              </Link>
            </div>
            <div className="relative scroll-animate" style={{ transitionDelay: '200ms' }}>
              <div className="absolute inset-0 rounded-3xl blur-2xl opacity-30" style={{ background: 'linear-gradient(135deg, #59A5D8, #91E5F6)' }}></div>
              <div className="relative grid grid-cols-2 gap-4">
                <img src="https://coyotespeakslove.com/staging/9788/wp-content/uploads/2026/03/Placeholder-Image-2-1011x1024.jpg" alt="My Neighbors Are Vampires" className="w-full h-auto rounded-xl shadow-2xl hover:scale-105 transition-transform duration-500" />
                <img src="https://coyotespeakslove.com/staging/9788/wp-content/uploads/2026/03/Placeholder-Image-1-1.jpg" alt="Keanu Tails" className="w-full h-auto rounded-xl shadow-2xl mt-8 hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #d0eeff 0%, #91E5F6 100%)' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center scroll-animate">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: "'Fugaz One', cursive", color: '#133C55' }}>
            STAY IN THE CONVERSATION
          </h2>
          <p className="text-lg mb-8" style={{ color: '#386FA4' }}>
            Get new releases, writing tips, and story updates—sent occasionally, never spam.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const data = new URLSearchParams(new FormData(form) as unknown as Record<string, string>);
              try {
                await fetch('https://readdy.ai/api/form/d6legiaqoe30lj0v7uhg', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                  body: data.toString(),
                });
                form.reset();
                alert('Thank you for subscribing!');
              } catch {
                alert('Something went wrong. Please try again.');
              }
            }}
          >
            <input type="email" name="email" placeholder="Enter Your Email" className="flex-1 px-6 py-4 rounded-lg border-2 focus:outline-none text-sm" style={{ borderColor: '#59A5D8', color: '#133C55' }} required />
            <button type="submit" className="px-8 py-4 font-bold rounded-lg transition-all duration-300 shadow-lg whitespace-nowrap cursor-pointer text-white" style={{ background: 'linear-gradient(135deg, #386FA4, #133C55)' }}>
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
