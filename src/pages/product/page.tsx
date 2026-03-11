import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '../../components/feature/Navigation';
import Footer from '../../components/feature/Footer';
import { getProductBySlug, type WCProduct } from '../../lib/wc';
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

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<WCProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getProductBySlug(slug)
      .then(setProduct)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  const handleAddToCart = async () => {
    if (!product) return;
    setAdding(true);
    try {
      await addToCart(product.id, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (e) {
      console.error('Failed to add to cart:', e);
    } finally {
      setAdding(false);
    }
  };

  const getImage = () => {
    if (!product) return '';
    if (product.images?.length > 0 && product.images[0].src) return product.images[0].src;
    return fallbackImages[product.slug] || 'https://via.placeholder.com/600x700?text=No+Image';
  };

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#f0f8ff' }}>
        <Navigation />
        <div className="pt-32 text-center">
          <div className="inline-block w-12 h-12 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#386FA4', borderTopColor: 'transparent' }}></div>
          <p className="mt-4 text-lg" style={{ color: '#386FA4' }}>Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#f0f8ff' }}>
        <Navigation />
        <div className="pt-32 text-center px-6">
          <h1 className="text-3xl font-bold mb-4" style={{ color: '#133C55' }}>Product Not Found</h1>
          <Link to="/merchandise" className="text-[#386FA4] hover:text-[#133C55] font-semibold">
            &larr; Back to Merchandise
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Montserrat', sans-serif", backgroundColor: '#f0f8ff' }}>
      <Navigation />

      {/* Breadcrumb */}
      <div className="pt-24 pb-4 max-w-7xl mx-auto px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm" style={{ color: '#386FA4' }}>
          <Link to="/" className="hover:text-[#133C55] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/merchandise" className="hover:text-[#133C55] transition-colors">Merchandise</Link>
          <span>/</span>
          <span style={{ color: '#133C55' }}>{product.name}</span>
        </nav>
      </div>

      {/* Product Detail */}
      <section className="pb-16 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative">
            {product.featured && (
              <div className="absolute top-4 left-4 z-10 px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full" style={{ backgroundColor: '#91E5F6', color: '#133C55' }}>
                Bestseller
              </div>
            )}
            <img
              src={getImage()}
              alt={product.name}
              className="w-full h-auto rounded-2xl shadow-lg"
              style={{ maxHeight: '600px', objectFit: 'cover' }}
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full" style={{ backgroundColor: '#d0eeff', color: '#386FA4' }}>
                {product.categories[0]?.name || 'Uncategorized'}
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold" style={{ fontFamily: "'Fugaz One', cursive", color: '#133C55' }}>
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold" style={{ color: '#133C55' }}>
                ${product.price}
              </span>
              {product.sale_price && product.regular_price !== product.sale_price && (
                <span className="text-lg line-through" style={{ color: '#84D2F6' }}>
                  ${product.regular_price}
                </span>
              )}
            </div>

            {product.short_description && (
              <div
                className="text-lg leading-relaxed"
                style={{ color: '#386FA4' }}
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
            )}

            {product.description && (
              <div
                className="leading-relaxed"
                style={{ color: '#555' }}
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center border-2 rounded-lg overflow-hidden" style={{ borderColor: '#d0eeff' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center text-lg font-bold cursor-pointer hover:bg-gray-100 transition-colors"
                  style={{ color: '#133C55' }}
                >
                  -
                </button>
                <span className="w-12 h-12 flex items-center justify-center text-lg font-bold" style={{ color: '#133C55' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center text-lg font-bold cursor-pointer hover:bg-gray-100 transition-colors"
                  style={{ color: '#133C55' }}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="flex-1 px-8 py-4 font-bold rounded-lg transition-all duration-300 shadow-lg whitespace-nowrap cursor-pointer text-white disabled:opacity-70"
                style={{
                  background: added
                    ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                    : 'linear-gradient(135deg, #386FA4, #133C55)',
                }}
              >
                {adding ? 'Adding...' : added ? 'Added to Cart!' : 'Add to Cart'}
              </button>
            </div>

            <Link
              to="/cart"
              className="inline-block text-center px-8 py-3 font-semibold rounded-lg border-2 transition-all duration-300 whitespace-nowrap"
              style={{ borderColor: '#133C55', color: '#133C55' }}
            >
              View Cart
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
