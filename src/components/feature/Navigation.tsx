import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;
  const isBlogActive =
    location.pathname === "/blog" || location.pathname.startsWith("/blog/");
  const isBooksActive =
    location.pathname.startsWith("/books") ||
    location.pathname === "/current-releases";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-lg" : ""
      }`}
      style={{ backgroundColor: isScrolled ? "#133C55" : "transparent" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <img
              src="https://static.readdy.ai/image/577c45d6defa6ac02f4bf39c73856fa0/5de219f324d8badbf633abd542b08ef3.webp"
              alt="Jen Stryker"
              className="h-14 w-14"
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-semibold transition-colors whitespace-nowrap ${
                isActive("/")
                  ? "text-[#91E5F6]"
                  : "text-white hover:text-[#91E5F6]"
              }`}
            >
              Home
            </Link>

            <div className="relative group">
              <Link
                to="/current-releases"
                className={`text-sm font-semibold flex items-center gap-1 transition-colors whitespace-nowrap ${
                  isBooksActive
                    ? "text-[#91E5F6]"
                    : "text-white hover:text-[#91E5F6]"
                }`}
              >
                Current Releases
                <i className="ri-arrow-down-s-line text-base"></i>
              </Link>

              <div
                className="absolute top-full left-0 mt-2 w-64 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                style={{ backgroundColor: "#133C55" }}
              >
                <Link
                  to="/books/keanu-tails"
                  className={`block px-4 py-3 text-sm transition-colors ${
                    isActive("/books/keanu-tails")
                      ? "text-[#91E5F6]"
                      : "text-white hover:text-[#91E5F6]"
                  }`}
                >
                  Keanu Tails
                </Link>
                <Link
                  to="/books/my-neighbors-are-vampires"
                  className={`block px-4 py-3 text-sm transition-colors ${
                    isActive("/books/my-neighbors-are-vampires")
                      ? "text-[#91E5F6]"
                      : "text-white hover:text-[#91E5F6]"
                  }`}
                >
                  My Neighbors are Vampires, I Think!
                </Link>
              </div>
            </div>

            <Link
              to="/merchandise"
              className={`text-sm font-semibold transition-colors whitespace-nowrap ${
                isActive("/merchandise")
                  ? "text-[#91E5F6]"
                  : "text-white hover:text-[#91E5F6]"
              }`}
            >
              Merchandise
            </Link>

            <a
              href="/shop"
              className="text-sm font-semibold transition-colors whitespace-nowrap text-white hover:text-[#91E5F6]"
            >
              Shop
            </a>

            <Link
              to="/blog"
              className={`text-sm font-semibold transition-colors whitespace-nowrap ${
                isBlogActive
                  ? "text-[#91E5F6]"
                  : "text-white hover:text-[#91E5F6]"
              }`}
            >
              Writer&apos;s Hub
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-3">
            {[
              { icon: "ri-instagram-line", href: "https://www.instagram.com/stryker_jennifer/" },
              { icon: "ri-facebook-fill", href: "https://www.facebook.com/jennifer.stryker.2025/" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center text-white hover:text-[#91E5F6] transition-colors"
              >
                <i className={`${item.icon} text-lg`}></i>
              </a>
            ))}
          </div>

          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i
              className={`${
                mobileMenuOpen ? "ri-close-line" : "ri-menu-line"
              } text-2xl text-white`}
            ></i>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className="lg:hidden border-t border-white/20"
          style={{ backgroundColor: "#133C55" }}
        >
          <div className="px-6 py-4 space-y-3">
            <Link
              to="/"
              className={`block text-sm font-semibold transition-colors ${
                isActive("/")
                  ? "text-[#91E5F6]"
                  : "text-white hover:text-[#91E5F6]"
              }`}
            >
              Home
            </Link>

            <Link
              to="/current-releases"
              className={`block text-sm font-semibold transition-colors ${
                isActive("/current-releases")
                  ? "text-[#91E5F6]"
                  : "text-white hover:text-[#91E5F6]"
              }`}
            >
              Current Releases
            </Link>

            <Link
              to="/books/keanu-tails"
              className={`block text-sm font-semibold transition-colors pl-4 ${
                isActive("/books/keanu-tails")
                  ? "text-[#91E5F6]"
                  : "text-white hover:text-[#91E5F6]"
              }`}
            >
              Keanu Tails
            </Link>

            <Link
              to="/books/my-neighbors-are-vampires"
              className={`block text-sm font-semibold transition-colors pl-4 ${
                isActive("/books/my-neighbors-are-vampires")
                  ? "text-[#91E5F6]"
                  : "text-white hover:text-[#91E5F6]"
              }`}
            >
              My Neighbors are Vampires, I Think!
            </Link>

            <Link
              to="/merchandise"
              className={`block text-sm font-semibold transition-colors ${
                isActive("/merchandise")
                  ? "text-[#91E5F6]"
                  : "text-white hover:text-[#91E5F6]"
              }`}
            >
              Merchandise
            </Link>

            <a
              href="/shop"
              className="block text-sm font-semibold transition-colors text-white hover:text-[#91E5F6]"
            >
              Shop
            </a>

            <Link
              to="/blog"
              className={`block text-sm font-semibold transition-colors ${
                isBlogActive
                  ? "text-[#91E5F6]"
                  : "text-white hover:text-[#91E5F6]"
              }`}
            >
              Writer&apos;s Hub
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}