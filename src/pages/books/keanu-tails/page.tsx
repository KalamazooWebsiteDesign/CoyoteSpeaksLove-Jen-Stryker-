import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const reviews = [
  {
    text: '"I found this short story book to be utterly charming. In particular I loved the quote of Keanu\'s lessons in life which preceded each tale. This is written with love and admiration of a well known person who was the inspiration here and I can\'t wait for the next collection of Keanu Tails."',
    name: "Fiona Johnstone",
    location: "Amazon Reviewer, United Kingdom",
    rating: 5
  },
  {
    text: '"This book features short stories set within larger stories. They are short, fun snippets designed to spark the imagination. The stories evoke emotions and moods and are often discreet parts of an untold whole left to the reader\'s imagination."',
    name: "Kergillian",
    location: "Amazon Reviewer, United States",
    rating: 5
  },
  {
    text: '"A beautiful collection of stories that capture the essence of kindness and resilience. Each tale is thoughtfully crafted and leaves you with something to ponder long after you\'ve finished reading."',
    name: "Michael Chen",
    location: "Amazon Reviewer, Canada",
    rating: 5
  }
];

const stories = [
  {
    title: "The Unexpected Journey",
    description: "A tale of resilience and finding strength in the most unexpected moments of life."
  },
  {
    title: "Echoes of Kindness",
    description: "How a simple act of compassion creates ripples that change lives forever."
  },
  {
    title: "The Road Less Traveled",
    description: "A story about choosing your own path and discovering what truly matters."
  },
  {
    title: "Whispers of Hope",
    description: "Finding light in the darkest times through connection and understanding."
  }
];

export default function KeanuTailsPage() {
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
                <div className="absolute top-full left-0 mt-2 w-56 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200" style={{ backgroundColor: '#133C55' }}>
                  <Link to="/books/keanu-tails" className="block px-4 py-3 text-sm text-white hover:text-[#91E5F6] transition-colors">Keanu Tails</Link>
                  <Link to="/books/my-neighbors-are-vampires" className="block px-4 py-3 text-sm text-white hover:text-[#91E5F6] transition-colors">My Neighbors are Vampires, I Think!</Link>
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
              <Link to="/books/my-neighbors-are-vampires" className="block text-sm font-semibold text-white hover:text-[#91E5F6] transition-colors pl-4">My Neighbors are Vampires, I Think!</Link>
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

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 text-xs font-bold tracking-widest uppercase rounded-full" style={{ backgroundColor: '#91E5F6', color: '#133C55' }}>
                Short Story Collection
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight" style={{ fontFamily: "'Fugaz One', cursive" }}>
                Keanu Tails
              </h1>
              <p className="text-lg leading-relaxed max-w-xl" style={{ color: '#d0eeff' }}>
                Keanu Tails is a captivating collection of short stories inspired by the spirit of Keanu Reeves and the creative energy of his band, Dogstar. Each story explores love, resilience, and the unexpected turns that shape our lives.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="px-8 py-4 font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer" style={{ backgroundColor: '#91E5F6', color: '#133C55' }}>
                  Buy Now
                </a>
                <a href="#preview" className="px-8 py-4 font-bold rounded-lg border-2 border-white/40 text-white hover:border-[#91E5F6] hover:text-[#91E5F6] transition-all duration-300 whitespace-nowrap cursor-pointer">
                  Preview Stories
                </a>
              </div>
            </div>
            <div className="relative flex items-center justify-center" style={{ perspective: '1200px' }}>
              <div className="book-container-kt">
                <div className="book-3d-kt">
                  <div className="book-front-kt">
                    <img
                      src="https://static.readdy.ai/image/577c45d6defa6ac02f4bf39c73856fa0/98866d2c2bb52c84592aa86eee0f4fc0.jpeg"
                      alt="Keanu Tails"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="book-spine-kt" style={{ backgroundColor: '#8B6914' }}></div>
                  <div className="book-back-kt" style={{ backgroundColor: '#C8960C' }}></div>
                  <div className="book-pages-kt"></div>
                </div>
              </div>
              <style>{`
                .book-container-kt {
                  width: 100%;
                  max-width: 500px;
                  height: 560px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  animation: floatKt 6s ease-in-out infinite;
                }

                @keyframes floatKt {
                  0%, 100% {
                    transform: translateY(0px) rotateY(-15deg) rotateX(5deg);
                  }
                  50% {
                    transform: translateY(-20px) rotateY(-20deg) rotateX(8deg);
                  }
                }

                .book-3d-kt {
                  position: relative;
                  width: 380px;
                  height: 480px;
                  transform-style: preserve-3d;
                  transition: transform 0.6s ease;
                  filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.4));
                }

                .book-3d-kt:hover {
                  transform: rotateY(-35deg) rotateX(10deg) scale(1.05);
                }

                .book-front-kt {
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  border-radius: 0 8px 8px 0;
                  transform: translateZ(26px);
                  overflow: hidden;
                  box-shadow: 
                    inset -3px 0 10px rgba(0, 0, 0, 0.1),
                    5px 5px 20px rgba(0, 0, 0, 0.3);
                  z-index: 10;
                  background-color: #C8960C;
                }

                .book-front-kt img {
                  width: 100%;
                  height: 100%;
                  object-fit: contain;
                  display: block;
                }

                .book-spine-kt {
                  position: absolute;
                  width: 50px;
                  height: 100%;
                  left: 0;
                  transform: rotateY(-90deg) translateX(-25px);
                  transform-origin: left center;
                  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
                }

                .book-back-kt {
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  border-radius: 8px 0 0 8px;
                  transform: translateZ(-26px);
                  box-shadow: -5px 5px 20px rgba(0, 0, 0, 0.3);
                }

                .book-pages-kt {
                  position: absolute;
                  width: 20px;
                  height: calc(100% - 6px);
                  top: 3px;
                  right: -20px;
                  background: linear-gradient(
                    to right,
                    #e0e0e0 0%,
                    #f9f9f9 30%,
                    #fff 50%,
                    #f9f9f9 70%,
                    #e0e0e0 100%
                  );
                  border-radius: 0 3px 3px 0;
                  transform: translateZ(0px) rotateY(90deg) translateX(10px);
                  transform-origin: left center;
                }

                @media (max-width: 1024px) {
                  .book-container-kt {
                    max-width: 320px;
                    height: 420px;
                  }
                  .book-3d-kt {
                    width: 280px;
                    height: 360px;
                  }
                }
              `}</style>
            </div>
          </div>
        </div>
      </section>

      {/* About the Book Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -top-6 -left-6 w-full h-full border-2 rounded-2xl" style={{ borderColor: '#84D2F6' }}></div>
              <img
                src="https://static.readdy.ai/image/577c45d6defa6ac02f4bf39c73856fa0/d48e620e5802dbaa8730dddacde4d6ae.jpeg"
                alt="Story Preview"
                className="relative w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <div className="inline-block px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full" style={{ backgroundColor: '#d0eeff', color: '#386FA4' }}>
                About This Collection
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold" style={{ fontFamily: "'Fugaz One', cursive", color: '#133C55' }}>Stories That Inspire</h2>
              <p className="text-lg leading-relaxed" style={{ color: '#386FA4' }}>
                Keanu Tails is a captivating collection of short stories inspired by the spirit of Keanu Reeves and the creative energy of his band, Dogstar. Each story explores love, resilience, and the unexpected turns that shape our lives.
              </p>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer list-none p-4 rounded-lg transition-colors" style={{ backgroundColor: '#e8f4fd' }}>
                  <span className="font-semibold" style={{ color: '#133C55' }}>Read more about the collection</span>
                  <i className="ri-arrow-down-s-line text-xl group-open:rotate-180 transition-transform" style={{ color: '#386FA4' }}></i>
                </summary>
                <div className="mt-4 p-6 bg-white border rounded-lg" style={{ borderColor: '#84D2F6' }}>
                  <p className="leading-relaxed mb-4" style={{ color: '#386FA4' }}>
                    Through imaginative storytelling and real world inspiration, this collection invites readers into powerful narratives about kindness, courage, and finding meaning in the twists of fate. Perfect for teens and adults, Keanu Tails sparks the imagination while celebrating the quiet strength that lives within us all.
                  </p>
                  <p className="leading-relaxed" style={{ color: '#386FA4' }}>
                    Each story is preceded by a thoughtful quote from Keanu Reeves, setting the tone for the tale that follows. These stories are designed to be read independently or as part of a larger narrative tapestry, leaving room for your imagination to fill in the spaces between.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stories Section */}
      <section id="preview" className="py-16" style={{ background: 'linear-gradient(180deg, #f0f8ff 0%, #d0eeff 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full mb-4" style={{ backgroundColor: '#91E5F6', color: '#133C55' }}>
              Inside the Collection
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: "'Fugaz One', cursive", color: '#133C55' }}>Featured Stories</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#386FA4' }}>
              A glimpse into the tales that await you in Keanu Tails
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {stories.map((story, i) => (
              <div key={i} className="p-8 rounded-2xl border transition-all duration-300 hover:shadow-xl" style={{ backgroundColor: 'white', borderColor: '#d0eeff' }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full flex-shrink-0" style={{ backgroundColor: '#d0eeff' }}>
                    <i className="ri-book-open-line text-2xl" style={{ color: '#386FA4' }}></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Fugaz One', cursive", color: '#133C55' }}>
                      {story.title}
                    </h3>
                    <p className="leading-relaxed" style={{ color: '#386FA4' }}>
                      {story.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Themes Section */}
      <section className="py-16" style={{ background: 'linear-gradient(180deg, #f0f8ff 0%, #d0eeff 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full mb-4" style={{ backgroundColor: '#d0eeff', color: '#386FA4' }}>
              Core Themes
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: "'Fugaz One', cursive", color: '#133C55' }}>What You'll Discover</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#386FA4' }}>
              Powerful themes woven throughout each story
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'ri-heart-3-line',
                title: 'Love & Connection',
                description: 'Stories that explore the depths of human relationships and the bonds that tie us together.'
              },
              {
                icon: 'ri-shield-star-line',
                title: 'Resilience',
                description: 'Characters who face adversity with courage and emerge stronger, inspiring readers to do the same.'
              },
              {
                icon: 'ri-compass-3-line',
                title: 'Life\'s Journey',
                description: 'Unexpected twists and turns that mirror the unpredictable nature of our own paths.'
              }
            ].map((theme, i) => (
              <div key={i} className="p-8 rounded-2xl border transition-all duration-300 hover:shadow-xl hover-lift" style={{ backgroundColor: 'white', borderColor: '#d0eeff', transitionDelay: `${i * 100}ms` }}>
                <div className="w-16 h-16 flex items-center justify-center rounded-full mb-6" style={{ backgroundColor: '#d0eeff' }}>
                  <i className={`${theme.icon} text-3xl`} style={{ color: '#386FA4' }}></i>
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Fugaz One', cursive", color: '#133C55' }}>
                  {theme.title}
                </h3>
                <p className="leading-relaxed" style={{ color: '#386FA4' }}>
                  {theme.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 text-white" style={{ background: 'linear-gradient(135deg, #133C55 0%, #386FA4 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full mb-4" style={{ backgroundColor: 'rgba(145,229,246,0.2)', color: '#91E5F6' }}>
              Reader Reviews
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: "'Fugaz One', cursive" }}>What Readers Are Saying</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#84D2F6' }}>
              Real reviews from readers who have been touched by these stories
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <div key={i} className="p-8 rounded-2xl border transition-all duration-300 hover:border-[#91E5F6]" style={{ backgroundColor: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}>
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <i key={j} className="ri-star-fill" style={{ color: '#91E5F6' }}></i>
                  ))}
                </div>
                <p className="leading-relaxed mb-6" style={{ color: '#d0eeff' }}>{review.text}</p>
                <div>
                  <p className="font-bold text-white">{review.name}</p>
                  <p className="text-sm" style={{ color: '#84D2F6' }}>{review.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-white" style={{ background: 'linear-gradient(135deg, #133C55 0%, #386FA4 100%)' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: "'Fugaz One', cursive", color: '#133C55' }}>
            Start Your Journey Today
          </h2>
          <p className="text-lg mb-8" style={{ color: '#386FA4' }}>
            Available in paperback and digital formats
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="px-10 py-5 font-bold rounded-lg transition-all duration-300 shadow-xl whitespace-nowrap cursor-pointer pulse-glow" style={{ backgroundColor: '#91E5F6', color: '#133C55' }}>
              Buy on Amazon
            </a>
            <a href="#" className="px-8 py-4 font-bold rounded-lg border-2 transition-all duration-300 whitespace-nowrap cursor-pointer" style={{ borderColor: '#133C55', color: '#133C55' }}>
              Read Sample Stories
            </a>
          </div>
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
                { label: 'My Neighbors are Vampires, I Think!', href: '/books/my-neighbors-are-vampires' },
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