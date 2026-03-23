import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="py-16 text-white"
      style={{ background: "linear-gradient(135deg, #133C55 0%, #386FA4 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-8">
          <img
            src="https://coyotespeakslove.com/staging/9788/wp-content/uploads/2026/03/cropped-cropped-logo-_Jennifer_Stryker-transparent.webp"
            alt="Jen Stryker"
            className="h-16 w-16 opacity-90"
          />

          <div className="flex items-center space-x-5">
            {[
              { icon: "ri-instagram-line", href: "https://www.instagram.com/stryker_jennifer/" },
              { icon: "ri-facebook-fill", href: "https://www.facebook.com/jennifer.stryker.2025/" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white hover:text-[#91E5F6] hover:border-[#91E5F6] transition-all duration-300 cursor-pointer"
              >
                <i className={`${item.icon} text-lg`} />
              </a>
            ))}
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            {[
              { label: "Home", href: "/" },
              { label: "Current Releases", href: "/current-releases" },
              { label: "Keanu Tails", href: "/books/keanu-tails" },
              { label: "My Neighbors are Vampires, I Think!", href: "/books/my-neighbors-are-vampires" },
              { label: "Merchandise", href: "/merchandise" },
              { label: "Kids Corner", href: "/kids-corner" },
              { label: "Writer's Hub", href: "/writers-hub" },
            ].map((link, i) => (
              <Link
                key={i}
                to={link.href}
                className="transition-colors hover:text-[#91E5F6]"
                style={{ color: "#84D2F6" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="w-full max-w-2xl h-px" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />

          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm" style={{ color: "#84D2F6" }}>
            <p>© 2026–Present Jen Stryker</p>
            <span className="hidden sm:inline">•</span>
            <a
              href="https://www.kalamazoowebsitedesign.com"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="hover:text-[#91E5F6] transition-colors"
            >
              Designed by Kalamazoo Website Design
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
