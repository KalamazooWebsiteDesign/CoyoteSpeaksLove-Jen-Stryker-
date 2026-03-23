import { useState, useEffect } from "react";
import Navigation from "../../components/feature/Navigation";
import Footer from "../../components/feature/Footer";

// WooCommerce-ready product type
interface WCProduct {
  id: number;
  title: string;          // [WC_PRODUCT_TITLE]
  description: string;    // [WC_PRODUCT_DESCRIPTION]
  price: string;          // [WC_PRODUCT_PRICE]
  image: string;          // [WC_PRODUCT_IMAGE]
  productUrl: string;     // [WC_PRODUCT_URL]
  addToCartUrl: string;   // [WC_ADD_TO_CART_URL]
  category: string;
}

const categories = ["All", "Books", "Apparel", "Accessories"];

// All products are WooCommerce-mapped placeholders.
// Replace each field with data from your WooCommerce API when connected.
const products: WCProduct[] = [
  {
    id: 1,
    title: "[WC_PRODUCT_TITLE]",
    description: "[WC_PRODUCT_DESCRIPTION]",
    price: "[WC_PRODUCT_PRICE]",
    image: "https://coyotespeakslove.com/staging/9788/wp-content/uploads/2026/03/Placeholder-Image-2-1011x1024.jpg",
    productUrl: "[WC_PRODUCT_URL]",
    addToCartUrl: "[WC_ADD_TO_CART_URL]",
    category: "Books",
  },
  {
    id: 2,
    title: "[WC_PRODUCT_TITLE]",
    description: "[WC_PRODUCT_DESCRIPTION]",
    price: "[WC_PRODUCT_PRICE]",
    image: "https://coyotespeakslove.com/staging/9788/wp-content/uploads/2026/03/Placeholder-Image-1-1.jpg",
    productUrl: "[WC_PRODUCT_URL]",
    addToCartUrl: "[WC_ADD_TO_CART_URL]",
    category: "Books",
  },
  {
    id: 3,
    title: "[WC_PRODUCT_TITLE]",
    description: "[WC_PRODUCT_DESCRIPTION]",
    price: "[WC_PRODUCT_PRICE]",
    image: "https://readdy.ai/api/search-image?query=white%20premium%20unisex%20t-shirt%20on%20clean%20minimal%20background%20warm%20neutral%20tones%20soft%20shadow%20flat%20lay%20product%20photography%20high%20quality%20fashion%20apparel&width=400&height=500&seq=wc-apparel-1&orientation=portrait",
    productUrl: "[WC_PRODUCT_URL]",
    addToCartUrl: "[WC_ADD_TO_CART_URL]",
    category: "Apparel",
  },
  {
    id: 4,
    title: "[WC_PRODUCT_TITLE]",
    description: "[WC_PRODUCT_DESCRIPTION]",
    price: "[WC_PRODUCT_PRICE]",
    image: "https://readdy.ai/api/search-image?query=natural%20linen%20canvas%20tote%20bag%20on%20white%20minimal%20background%20clean%20product%20photography%20warm%20neutral%20backdrop%20simple%20elegant%20shopping%20bag&width=400&height=500&seq=wc-tote-1&orientation=portrait",
    productUrl: "[WC_PRODUCT_URL]",
    addToCartUrl: "[WC_ADD_TO_CART_URL]",
    category: "Accessories",
  },
  {
    id: 5,
    title: "[WC_PRODUCT_TITLE]",
    description: "[WC_PRODUCT_DESCRIPTION]",
    price: "[WC_PRODUCT_PRICE]",
    image: "https://readdy.ai/api/search-image?query=premium%20white%20ceramic%20mug%20on%20clean%20wooden%20surface%20minimal%20morning%20photography%20soft%20natural%20warm%20light%20coffee%20lifestyle%20product%20shot&width=400&height=500&seq=wc-mug-1&orientation=portrait",
    productUrl: "[WC_PRODUCT_URL]",
    addToCartUrl: "[WC_ADD_TO_CART_URL]",
    category: "Accessories",
  },
  {
    id: 6,
    title: "[WC_PRODUCT_TITLE]",
    description: "[WC_PRODUCT_DESCRIPTION]",
    price: "[WC_PRODUCT_PRICE]",
    image: "https://readdy.ai/api/search-image?query=elegant%20cream%20hardcover%20journal%20notebook%20with%20pen%20on%20warm%20wooden%20desk%20minimal%20stationery%20photography%20natural%20light%20bookworm%20gift&width=400&height=500&seq=wc-journal-1&orientation=portrait",
    productUrl: "[WC_PRODUCT_URL]",
    addToCartUrl: "[WC_ADD_TO_CART_URL]",
    category: "Accessories",
  },
];

export default function MerchandisePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("animate-in"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".scroll-animate").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filteredProducts =
    selectedCategory === "All" ? products : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Montserrat', sans-serif", backgroundColor: "#f0f8ff" }}>
      <style>{`
        .scroll-animate{opacity:0;transform:translateY(28px);transition:opacity .6s ease-out,transform .6s ease-out;}
        .scroll-animate.animate-in{opacity:1;transform:translateY(0);}
        .hover-lift{transition:transform .3s ease;}
        .hover-lift:hover{transform:translateY(-6px);}
        .wc-card{border:2px dashed #84D2F6;}
      `}</style>

      <Navigation />

      {/* Hero */}
      <section
        className="pt-36 pb-16"
        style={{ background: "linear-gradient(135deg, #133C55 0%, #386FA4 60%, #59A5D8 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div
            className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full mb-6"
            style={{ backgroundColor: "#91E5F6", color: "#133C55" }}
          >
            Official Store
          </div>
          <h1
            className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "'Fugaz One', cursive" }}
          >
            Merchandise
          </h1>
          <p className="text-base lg:text-lg max-w-xl mx-auto" style={{ color: "#d0eeff" }}>
            Official books and exclusive merchandise from Jen Stryker&apos;s creative world.
            Products launch when WooCommerce is connected.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-5 bg-white border-b" style={{ borderColor: "#84D2F6" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 whitespace-nowrap cursor-pointer"
                  style={
                    selectedCategory === cat
                      ? { backgroundColor: "#133C55", color: "#FFFFFF", border: "1px solid #133C55" }
                      : { backgroundColor: "transparent", color: "#386FA4", border: "1px solid #84D2F6" }
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold"
              style={{ borderColor: "#84D2F6", color: "#133C55" }}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-shopping-bag-line" />
              </div>
              Cart ({cartCount})
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16" style={{ background: "linear-gradient(180deg, #f0f8ff 0%, #d0eeff 100%)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* WooCommerce integration note */}
          <div
            className="mb-10 px-5 py-4 rounded-xl border text-sm flex items-center gap-3"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#84D2F6", color: "#386FA4" }}
          >
            <i className="ri-information-line text-lg flex-shrink-0" style={{ color: "#133C55" }} />
            <span>
              Product data below is structured for WooCommerce. Replace each{" "}
              <code className="font-mono text-xs bg-blue-50 px-1 rounded" style={{ color: "#133C55" }}>[WC_*]</code>{" "}
              field with your WooCommerce API data when connected.
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center" style={{ color: "#386FA4" }}>
              <i className="ri-store-2-line text-5xl block mb-4 opacity-40" />
              <p className="text-lg font-semibold">No products in this category yet.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="wc-card bg-white rounded-2xl overflow-hidden scroll-animate hover-lift group"
                  style={{ transitionDelay: `${index * 70}ms` }}
                  data-product-shop
                >
                  {/* [WC_PRODUCT_IMAGE] */}
                  <div className="relative w-full h-72 overflow-hidden">
                    <div
                      className="absolute top-3 right-3 z-10 px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full"
                      style={{ backgroundColor: "#d0eeff", color: "#386FA4" }}
                    >
                      Coming Soon
                    </div>
                    <img
                      src={product.image}
                      alt="[WC_PRODUCT_IMAGE]"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                        style={{ backgroundColor: "#d0eeff", color: "#386FA4" }}
                      >
                        {product.category}
                      </span>
                      {/* [WC_PRODUCT_PRICE] */}
                      <span className="text-base font-bold font-mono" style={{ color: "#84D2F6" }}>
                        {product.price}
                      </span>
                    </div>

                    {/* [WC_PRODUCT_TITLE] */}
                    <h3
                      className="text-sm font-bold mb-2 leading-snug font-mono"
                      style={{ color: "#84D2F6" }}
                    >
                      {product.title}
                    </h3>

                    {/* [WC_PRODUCT_DESCRIPTION] */}
                    <p className="text-xs leading-relaxed mb-4 font-mono" style={{ color: "#84D2F6" }}>
                      {product.description}
                    </p>

                    <div className="flex gap-2">
                      {/* [WC_ADD_TO_CART_URL] */}
                      <a
                        href={product.addToCartUrl}
                        className="flex-1 px-4 py-2.5 font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-center text-sm border-2 border-dashed"
                        style={{ borderColor: "#84D2F6", color: "#84D2F6", backgroundColor: "transparent" }}
                      >
                        {product.addToCartUrl}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #133C55 0%, #386FA4 100%)" }}
      >
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-3 text-white" style={{ fontFamily: "'Fugaz One', cursive" }}>
            Be First to Know
          </h2>
          <p className="text-sm mb-8" style={{ color: "#d0eeff" }}>
            Get notified when the store goes live — new merch, book drops, and exclusive offers.
          </p>
          <form
            id="newsletter-merch"
            data-readdy-form
            action="https://readdy.ai/api/form/d6legiaqoe30lj0v7uhg"
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const data = new URLSearchParams(new FormData(form) as unknown as Record<string, string>);
              try {
                await fetch("https://readdy.ai/api/form/d6legiaqoe30lj0v7uhg", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: data.toString() });
                form.reset();
              } catch { /* silent */ }
            }}
          >
            <input
              type="email" name="email" placeholder="Your email address"
              className="flex-1 px-5 py-3.5 rounded-lg text-sm focus:outline-none"
              style={{ backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.3)", color: "#FFFFFF" }}
              required
            />
            <button
              type="submit"
              className="px-7 py-3.5 font-semibold rounded-lg whitespace-nowrap cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
              style={{ backgroundColor: "#91E5F6", color: "#133C55" }}
            >
              Notify Me
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
