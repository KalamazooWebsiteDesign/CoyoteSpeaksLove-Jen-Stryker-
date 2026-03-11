import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const books = [
  {
    id: 1,
    title: "My Neighbors are Vampires, I Think!",
    category: "Children's Book",
    description: "When a curious child starts noticing strange things next door. Fluttering bats, mysterious shadows, and neighbors who only come out at night; one big question comes to mind… could they be vampires?",
    image: "https://coyotespeakslove.com/staging/9788/wp-content/uploads/2026/03/Placeholder-Image-2-1011x1024.jpg",
    slug: "my-neighbors-are-vampires"
  },
  {
    id: 2,
    title: "Keanu Tails",
    category: "Short Stories",
    description: "Keanu Tails is a captivating collection of short stories inspired by the spirit of Keanu Reeves and the creative energy of his band, Dogstar. Each story explores love, resilience, and the unexpected turns that shape our lives.",
    image: "https://coyotespeakslove.com/staging/9788/wp-content/uploads/2026/03/Placeholder-Image-1-1.jpg",
    slug: "keanu-tails"
  }
];

export default function CurrentReleasesPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation on scroll
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

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

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : ''
      }`} style={{ backgroundColor: isScrolled ? '#133C55' : 'transparent' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center">
              <img
                src="https://coyotespeakslove.com/staging/9788/wp-content/uploads/2026/03/cropped-cropped-logo-_Jennifer_Stryker-transparent.webp"
                alt="Jen Stryker"
                className="h-14 w-14"
              />
            </Link>

            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-sm font-semibold text-white hover:text-[#91E5F6] transition-colors whitespace-nowrap">
                Home
              </Link>
              <div className="relative group">
                <button className="text-sm font-semibold text-white flex items-center gap-1 hover:text-[#91E5F6] transition-colors whitespace-nowrap">
                  Current Releases
                  <i className="ri-arrow-down-s-line text-base"></i>
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200" style={{ backgroundColor: '#133C55' }}>
                  <Link to="/books/keanu-tails" className="block px-4 py-3 text-sm text-white hover:text-[#91E5F6] transition-colors">Keanu Tails</Link>
                  <Link to="/books/my-neighbors-are-vampires" className="block px-4 py-3 text-sm text-white hover:text-[#91E5F6] transition-colors">My NAVPIT</Link>
                </div>
              </div>
              <Link to="/merchandise" className="text-sm font-semibold text-white hover:text-[#91E5F6] transition-colors whitespace-nowrap">
                Merchandise
              </Link>
              <Link to="/writers-hub" className="text-sm font-semibold text-white hover:text-[#91E5F6] transition-colors whitespace-nowrap">
                Writer's Hub
              </Link>
            </div>

            <div className="hidden lg:flex items-center space-x-3">
              {['ri-instagram-line', 'ri-facebook-fill', 'ri-twitter-fill', 'ri-tiktok-fill'].map((icon, i) => (
                <a key={i} href="#" className="w-9 h-9 flex items-center justify-center text-white hover:text-[#91E5F6] transition-colors">
                  <i className={`${icon} text-lg`}></i>
                </a>
              ))}
            </div>

            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl text-white`}></i>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/20" style={{ backgroundColor: '#133C55' }}>
            <div className="px-6 py-4 space-y-3">
              <Link to="/" className="block text-sm font-semibold text-white hover:text-[#91E5F6] transition-colors">Home</Link>
              <Link to="/books/keanu-tails" className="block text-sm font-semibold text-white hover:text-[#91E5F6] transition-colors pl-4">Keanu Tails</Link>
              <Link to="/books/my-neighbors-are-vampires" className="block text-sm font-semibold text-white hover:text-[#91E5F6] transition-colors pl-4">My NAVPIT</Link>
              <Link to="/merchandise" className="block text-sm font-semibold text-white hover:text-[#91E5F6] transition-colors">Merchandise</Link>
              <Link to="/writers-hub" className="block text-sm font-semibold text-white hover:text-[#91E5F6] transition-colors">Writer's Hub</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #133C55 0%, #386FA4 60%, #59A5D8 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl" style={{ backgroundColor: '#91E5F6' }}></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: '#84D2F6' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-2 text-xs font-bold tracking-widest uppercase rounded-full mb-6" style={{ backgroundColor: '#91E5F6', color: '#133C55' }}>
            Latest Books
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6" style={{ fontFamily: "'Fugaz One', cursive" }}>
            Current Releases
          </h1>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto" style={{ color: '#d0eeff' }}>
            Explore Jen Stryker's newest books—stories crafted with heart, imagination, and a touch of magic. From children's adventures to heartfelt short stories, there's something here for every reader.
          </p>
        </div>
      </section>

      {/* Books Grid Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {books.map((book, index) => (
              <div key={book.id} className="group scroll-animate hover-lift" style={{ transitionDelay: `${index * 150}ms` }}>
                <div className="relative mb-8 overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, #59A5D8, #91E5F6)' }}></div>
                  <img
                    src={book.image}
                    alt={book.title}
                    className="relative w-full h-auto rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-4">
                  <div className="inline-block px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full" style={{ backgroundColor: '#d0eeff', color: '#133C55' }}>
                    {book.category}
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold" style={{ fontFamily: "'Fugaz One', cursive", color: '#133C55' }}>
                    {book.title}
                  </h3>
                  <p className="text-lg leading-relaxed" style={{ color: '#386FA4' }}>
                    {book.description}
                  </p>
                  <Link 
                    to={`/books/${book.slug}`}
                    className="inline-flex items-center gap-2 px-8 py-4 font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer text-white pulse-glow"
                    style={{ background: 'linear-gradient(135deg, #386FA4, #133C55)' }}
                  >
                    View Book
                    <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Read Section */}
      <section className="py-16" style={{ background: 'linear-gradient(180deg, #f0f8ff 0%, #d0eeff 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 scroll-animate">
            <div className="inline-block px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full mb-4" style={{ backgroundColor: '#91E5F6', color: '#133C55' }}>
              Why Choose These Books
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: "'Fugaz One', cursive", color: '#133C55' }}>Stories That Stay With You</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#386FA4' }}>
              Each book is crafted with care, creativity, and a deep love for storytelling
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'ri-heart-line',
                title: 'Written with Heart',
                description: 'Every story is infused with genuine emotion, empathy, and a passion for connecting with readers of all ages.'
              },
              {
                icon: 'ri-lightbulb-line',
                title: 'Sparks Imagination',
                description: 'From curious children to thoughtful adults, these books inspire creativity and wonder in every reader.'
              },
              {
                icon: 'ri-star-line',
                title: 'Award-Winning Quality',
                description: 'Recognized for excellence in storytelling, illustration, and the ability to touch hearts across generations.'
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl border transition-all duration-300 hover:shadow-xl scroll-animate hover-lift" style={{ backgroundColor: 'white', borderColor: '#d0eeff', transitionDelay: `${i * 100}ms` }}>
                <div className="w-16 h-16 flex items-center justify-center rounded-full mb-6" style={{ backgroundColor: '#d0eeff' }}>
                  <i className={`${feature.icon} text-3xl`} style={{ color: '#386FA4' }}></i>
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Fugaz One', cursive", color: '#133C55' }}>
                  {feature.title}
                </h3>
                <p className="leading-relaxed" style={{ color: '#386FA4' }}>
                  {feature.description}
                </p>
              </div>
            ))}
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
            id="newsletter-form"
            data-readdy-form
            action="https://readdy.ai/api/form/d6legiaqoe30lj0v7uhg"
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
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="flex-1 px-6 py-4 rounded-lg border-2 focus:outline-none text-sm"
              style={{ borderColor: '#59A5D8', color: '#133C55' }}
              required
            />
            <button
              type="submit"
              className="px-8 py-4 font-bold rounded-lg transition-all duration-300 shadow-lg whitespace-nowrap cursor-pointer text-white"
              style={{ background: 'linear-gradient(135deg, #386FA4, #133C55)' }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 text-white" style={{ background: 'linear-gradient(135deg, #133C55 0%, #386FA4 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-8">
            <img
              src="https://coyotespeakslove.com/staging/9788/wp-content/uploads/2026/03/cropped-cropped-logo-_Jennifer_Stryker-transparent.webp"
              alt="Jen Stryker"
              className="h-16 w-16"
            />

            <div className="flex items-center space-x-6">
              {['ri-instagram-line', 'ri-facebook-fill', 'ri-twitter-fill', 'ri-tiktok-fill'].map((icon, i) => (
                <a key={i} href="#" className="w-10 h-10 flex items-center justify-center text-white hover:text-[#91E5F6] transition-colors">
                  <i className={`${icon} text-xl`}></i>
                </a>
              ))}
            </div>

            <nav className="flex flex-wrap justify-center gap-6 text-sm">
              {[
                { label: 'Home', href: '/' },
                { label: 'Current Releases', href: '/current-releases' },
                { label: 'Keanu Tails', href: '/books/keanu-tails' },
                { label: 'My NAVPIT', href: '/books/my-neighbors-are-vampires' },
                { label: 'Merchandise', href: '/merchandise' },
                { label: "Writer's Hub", href: '/writers-hub' },
              ].map((link, i) => (
                <Link key={i} to={link.href} className="transition-colors hover:text-[#91E5F6]" style={{ color: '#84D2F6' }}>
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm" style={{ color: '#84D2F6' }}>
              <p>© 2026-Present</p>
              <span className="hidden sm:inline">•</span>
              <a href="https://www.kalamazoowebsitedesign.com" target="_blank" rel="noopener noreferrer nofollow" className="hover:text-[#91E5F6] transition-colors">
                Designed By Kalamazoo Website Design
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}