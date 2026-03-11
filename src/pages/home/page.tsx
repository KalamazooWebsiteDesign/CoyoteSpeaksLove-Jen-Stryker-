import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/feature/Navigation";
import Footer from "../../components/feature/Footer";
import { getPosts } from "../../lib/wp";

type WPPost = {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  _embedded?: {
    ["wp:featuredmedia"]?: Array<{
      source_url: string;
    }>;
  };
};

// Custom hook for scroll animations
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
}

export default function HomePage() {
  const [latestPosts, setLatestPosts] = useState<WPPost[]>([]);

  useEffect(() => {
    getPosts(3)
      .then((data) => setLatestPosts(data))
      .catch((err) => console.error(err));
  }, []);

  const heroAnim = useScrollAnimation();
  const aboutAnim = useScrollAnimation();
  const statsAnim = useScrollAnimation();
  const booksAnim = useScrollAnimation();
  const testimonialsAnim = useScrollAnimation();
  const quoteAnim = useScrollAnimation();
  const writerHubAnim = useScrollAnimation();
  const newsletterAnim = useScrollAnimation();

  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "'Montserrat', sans-serif",
        backgroundColor: "#f0f8ff",
      }}
    >
      <Navigation />

      {/* Hero Section */}
      <section
        id="home"
        className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #133C55 0%, #386FA4 60%, #59A5D8 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl"
            style={{ backgroundColor: "#91E5F6" }}
          ></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: "#84D2F6" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              ref={heroAnim.ref}
              className={`space-y-8 transition-all duration-1000 ${
                heroAnim.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div
                className="inline-block px-4 py-2 text-xs font-bold tracking-widest uppercase rounded-full"
                style={{ backgroundColor: "#91E5F6", color: "#133C55" }}
              >
                Award-Winning Author
              </div>
              <h1
                className="text-5xl lg:text-7xl font-bold text-white leading-tight"
                style={{ fontFamily: "'Fugaz One', cursive" }}
              >
                Jen Stryker
              </h1>
              <p
                className="text-lg leading-relaxed max-w-xl"
                style={{ color: "#d0eeff" }}
              >
                Stories, art, and imagination; discover Jen Stryker&apos;s latest
                children&apos;s books, behind-the-scenes creativity, and the worlds
                she&apos;s building for readers of every age.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#books"
                  className="px-8 py-4 font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 whitespace-nowrap cursor-pointer"
                  style={{ backgroundColor: "#91E5F6", color: "#133C55" }}
                >
                  Explore Books
                </a>
                <a
                  href="#about"
                  className="px-8 py-4 font-bold rounded-lg border-2 border-white/40 text-white hover:border-[#91E5F6] hover:text-[#91E5F6] hover:-translate-y-1 transition-all duration-300 whitespace-nowrap cursor-pointer"
                >
                  Learn About Jen
                </a>
              </div>
            </div>
            <div
              className="relative flex items-center justify-center"
              style={{ perspective: "1200px" }}
            >
              <div className="book-container">
                <div className="book-3d">
                  <div className="book-front">
                    <img
                      src="https://static.readdy.ai/image/577c45d6defa6ac02f4bf39c73856fa0/a5f2067f43d678514359b619340cf52e.jpeg"
                      alt="My Neighbors are Vampires I Think"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className="book-spine"
                    style={{ backgroundColor: "#133C55" }}
                  ></div>
                  <div
                    className="book-back"
                    style={{ backgroundColor: "#386FA4" }}
                  ></div>
                  <div className="book-pages"></div>
                </div>
              </div>
              <style>{`
                .book-container {
                  width: 100%;
                  max-width: 500px;
                  height: 520px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  animation: float 6s ease-in-out infinite;
                }

                @keyframes float {
                  0%, 100% {
                    transform: translateY(0px) rotateY(-15deg) rotateX(5deg);
                  }
                  50% {
                    transform: translateY(-20px) rotateY(-20deg) rotateX(8deg);
                  }
                }

                .book-3d {
                  position: relative;
                  width: 420px;
                  height: 420px;
                  transform-style: preserve-3d;
                  transition: transform 0.6s ease;
                  filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.4));
                }

                .book-3d:hover {
                  transform: rotateY(-35deg) rotateX(10deg) scale(1.05);
                }

                .book-front {
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
                }

                .book-front img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  display: block;
                }

                .book-spine {
                  position: absolute;
                  width: 50px;
                  height: 100%;
                  left: 0;
                  transform: rotateY(-90deg) translateX(-25px);
                  transform-origin: left center;
                  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
                }

                .book-back {
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  border-radius: 8px 0 0 8px;
                  transform: translateZ(-26px);
                  box-shadow: -5px 5px 20px rgba(0, 0, 0, 0.3);
                }

                .book-pages {
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
                  .book-container {
                    max-width: 320px;
                    height: 360px;
                  }
                  .book-3d {
                    width: 300px;
                    height: 300px;
                  }
                }
              `}</style>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              ref={aboutAnim.ref}
              className={`relative order-2 lg:order-1 transition-all duration-1000 delay-100 ${
                aboutAnim.isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <div
                className="absolute -top-6 -left-6 w-full h-full border-2 rounded-2xl"
                style={{ borderColor: "#84D2F6" }}
              ></div>
              <img
                src="https://coyotespeakslove.com/staging/9788/wp-content/uploads/2026/03/461306902_864438012541183_7596332984947632977_n-1-1.webp"
                alt="Jen Stryker"
                className="relative w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
            <div
              className={`space-y-6 order-1 lg:order-2 transition-all duration-1000 delay-200 ${
                aboutAnim.isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div
                className="inline-block px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full"
                style={{ backgroundColor: "#d0eeff", color: "#386FA4" }}
              >
                The Face
              </div>
              <h2
                className="text-4xl lg:text-5xl font-bold"
                style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}
              >
                About Jen
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: "#386FA4" }}>
                Hi, my name is Jen Stryker, an artist, photographer, writer, and
                a proud Mom. My heart is filled with stories, and I&apos;m here to
                share my creative journey with you.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 font-bold rounded-lg transition-all duration-300 hover:-translate-y-1 whitespace-nowrap cursor-pointer text-white"
                style={{ backgroundColor: "#133C55" }}
              >
                Learn More About Jen
                <i className="ri-arrow-right-line"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section
        className="py-12"
        style={{
          background: "linear-gradient(135deg, #133C55 0%, #386FA4 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div
            ref={statsAnim.ref}
            className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 ${
              statsAnim.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {[
              { icon: "ri-book-2-line", number: "2", label: "Books Published" },
              { icon: "ri-heart-line", number: "100+", label: "Happy Readers" },
              { icon: "ri-award-line", number: "5★", label: "Average Rating" },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center transition-all duration-700"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div
                  className="w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4"
                  style={{ backgroundColor: "rgba(145,229,246,0.2)" }}
                >
                  <i
                    className={`${stat.icon} text-3xl`}
                    style={{ color: "#91E5F6" }}
                  ></i>
                </div>
                <div
                  className="text-4xl font-bold text-white mb-2"
                  style={{ fontFamily: "'Fugaz One', cursive" }}
                >
                  {stat.number}
                </div>
                <div
                  className="text-sm font-semibold"
                  style={{ color: "#84D2F6" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Work Section */}
      <section
        id="books"
        className="py-16"
        style={{
          background: "linear-gradient(180deg, #f0f8ff 0%, #d0eeff 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div
            ref={booksAnim.ref}
            className={`text-center mb-12 transition-all duration-1000 ${
              booksAnim.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div
              className="inline-block px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full mb-4"
              style={{ backgroundColor: "#91E5F6", color: "#133C55" }}
            >
              Featured
            </div>
            <h2
              className="text-4xl lg:text-5xl font-bold mb-4"
              style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}
            >
              Latest Work
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#386FA4" }}>
              Explore Jen&apos;s newest releases and featured favorites
            </p>
          </div>

          {/* Book 1 */}
          <div className="mb-20">
            <div
              className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 delay-200 ${
                booksAnim.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="space-y-6">
                <div
                  className="inline-block px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full"
                  style={{ backgroundColor: "#d0eeff", color: "#133C55" }}
                >
                  Children&apos;s Book
                </div>
                <h3
                  className="text-3xl lg:text-4xl font-bold"
                  style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}
                >
                  My Neighbors are Vampires, I Think!
                </h3>
                <p className="text-lg leading-relaxed" style={{ color: "#386FA4" }}>
                  When a curious child starts noticing strange things next door.
                  Fluttering bats, mysterious shadows, and neighbors who only
                  come out at night; one big question comes to mind… could they
                  be vampires?
                </p>
                <details className="group">
                  <summary
                    className="flex items-center justify-between cursor-pointer list-none p-4 rounded-lg transition-colors"
                    style={{ backgroundColor: "#e8f4fd" }}
                  >
                    <span className="font-semibold" style={{ color: "#133C55" }}>
                      Read more
                    </span>
                    <i
                      className="ri-arrow-down-s-line text-xl group-open:rotate-180 transition-transform"
                      style={{ color: "#386FA4" }}
                    ></i>
                  </summary>
                  <div
                    className="mt-4 p-6 bg-white border rounded-lg"
                    style={{ borderColor: "#84D2F6" }}
                  >
                    <p className="leading-relaxed" style={{ color: "#386FA4" }}>
                      This playful, heartwarming story blends a touch of spooky
                      fun with an uplifting message about kindness, empathy, and
                      embracing what makes each of us unique. Perfect for young
                      readers, My Neighbors Are Vampires, I Think! reminds us
                      that new friendships can be found in the most unexpected
                      places.
                    </p>
                  </div>
                </details>
                <Link
                  to="/books/my-neighbors-are-vampires"
                  className="inline-flex items-center gap-2 px-6 py-3 font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 whitespace-nowrap cursor-pointer text-white"
                  style={{
                    background: "linear-gradient(135deg, #386FA4, #133C55)",
                  }}
                >
                  Preview
                  <i className="ri-book-open-line"></i>
                </Link>
              </div>
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-3xl blur-2xl opacity-30"
                  style={{
                    background: "linear-gradient(135deg, #59A5D8, #91E5F6)",
                  }}
                ></div>
                <img
                  src="https://coyotespeakslove.com/staging/9788/wp-content/uploads/2026/03/Placeholder-Image-2-1011x1024.jpg"
                  alt="My Neighbors are Vampires"
                  className="relative w-full h-auto rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Book 2 */}
          <div id="keanu-tails">
            <div
              className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 delay-300 ${
                booksAnim.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="relative order-2 lg:order-1">
                <div
                  className="absolute inset-0 rounded-3xl blur-2xl opacity-30"
                  style={{
                    background: "linear-gradient(135deg, #84D2F6, #59A5D8)",
                  }}
                ></div>
                <img
                  src="https://coyotespeakslove.com/staging/9788/wp-content/uploads/2026/03/Placeholder-Image-1-1.jpg"
                  alt="Keanu Tails"
                  className="relative w-full h-auto rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <div
                  className="inline-block px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full"
                  style={{ backgroundColor: "#d0eeff", color: "#133C55" }}
                >
                  Short Stories
                </div>
                <h3
                  className="text-3xl lg:text-4xl font-bold"
                  style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}
                >
                  Keanu Tails
                </h3>
                <p className="text-lg leading-relaxed" style={{ color: "#386FA4" }}>
                  Keanu Tails is a captivating collection of short stories
                  inspired by the spirit of Keanu Reeves and the creative energy
                  of his band, Dogstar. Each story explores love, resilience, and
                  the unexpected turns that shape our lives.
                </p>
                <details className="group">
                  <summary
                    className="flex items-center justify-between cursor-pointer list-none p-4 rounded-lg transition-colors"
                    style={{ backgroundColor: "#e8f4fd" }}
                  >
                    <span className="font-semibold" style={{ color: "#133C55" }}>
                      Read more
                    </span>
                    <i
                      className="ri-arrow-down-s-line text-xl group-open:rotate-180 transition-transform"
                      style={{ color: "#386FA4" }}
                    ></i>
                  </summary>
                  <div
                    className="mt-4 p-6 bg-white border rounded-lg"
                    style={{ borderColor: "#84D2F6" }}
                  >
                    <p className="leading-relaxed" style={{ color: "#386FA4" }}>
                      Through imaginative storytelling and real world inspiration,
                      this collection invites readers into powerful narratives
                      about kindness, courage, and finding meaning in the twists
                      of fate. Perfect for teens and adults, Keanu Tails sparks
                      the imagination while celebrating the quiet strength that
                      lives within us all.
                    </p>
                  </div>
                </details>
                <Link
                  to="/books/keanu-tails"
                  className="inline-flex items-center gap-2 px-6 py-3 font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 whitespace-nowrap cursor-pointer text-white"
                  style={{
                    background: "linear-gradient(135deg, #386FA4, #133C55)",
                  }}
                >
                  Preview
                  <i className="ri-book-open-line"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="py-16 text-white"
        style={{
          background: "linear-gradient(135deg, #133C55 0%, #386FA4 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div
            ref={testimonialsAnim.ref}
            className={`text-center mb-12 transition-all duration-1000 ${
              testimonialsAnim.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div
              className="inline-block px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full mb-4"
              style={{
                backgroundColor: "rgba(145,229,246,0.2)",
                color: "#91E5F6",
              }}
            >
              Real Words
            </div>
            <h2
              className="text-4xl lg:text-5xl font-bold mb-4"
              style={{ fontFamily: "'Fugaz One', cursive" }}
            >
              What The Readers Say
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#84D2F6" }}>
              Real reviews from real readers—kind words, favorite moments, and
              what people loved most about these stories.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                text: `"I found this short story book to be utterly charming. In particular I loved the quote of Keanu's lessons in life which preceded each tale. This is written with love and admiration of a well known person who was the inspiration here and I can't wait for the next collection of Keanu Tails."`,
                name: "Fiona Johnstone",
                location: "Amazon Reviewer, United Kingdom",
              },
              {
                text: `"Hi. I am a therapist and Dr. of Psychology who practices with children. I just received my copies and have shared it with the interns. We all agree that it is a cute book with a great message of empathy and accepting others for their differences."`,
                name: "Robert Willoughby",
                location: "Amazon Reviewer, United States",
              },
              {
                text: `"This book features short stories set within larger stories. They are short, fun snippets designed to spark the imagination. The stories evoke emotions and moods and are often discreet parts of an untold whole left to the reader's imagination."`,
                name: "Kergillian",
                location: "Amazon Reviewer, United States",
              },
            ].map((review, i) => (
              <div
                key={i}
                className={`p-8 rounded-2xl border transition-all duration-700 hover:border-[#91E5F6] hover:-translate-y-2 ${
                  testimonialsAnim.isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  backgroundColor: "rgba(255,255,255,0.07)",
                  borderColor: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(8px)",
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <i
                      key={j}
                      className="ri-star-fill"
                      style={{ color: "#91E5F6" }}
                    ></i>
                  ))}
                </div>
                <p className="leading-relaxed mb-6" style={{ color: "#d0eeff" }}>
                  {review.text}
                </p>
                <div>
                  <p className="font-bold text-white">{review.name}</p>
                  <p className="text-sm" style={{ color: "#84D2F6" }}>
                    {review.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`flex items-center justify-center gap-6 p-6 rounded-2xl border max-w-md mx-auto transition-all duration-1000 delay-300 ${
              testimonialsAnim.isVisible
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            }`}
            style={{
              backgroundColor: "rgba(255,255,255,0.07)",
              borderColor: "rgba(255,255,255,0.12)",
            }}
          >
            <div className="flex -space-x-3">
              {[
                "https://coyotespeakslove.com/staging/9788/wp-content/uploads/2026/03/ionela-mat-s3PJLnFKjnI-unsplash-Large-1-150x150.jpeg",
                "https://coyotespeakslove.com/staging/9788/wp-content/uploads/2026/03/elizeu-dias-2EGNqazbAMk-unsplash-Large-1-150x150.jpeg",
                "https://coyotespeakslove.com/staging/9788/wp-content/uploads/2026/03/morten-pedersen-Z-bgD8pMv30-unsplash-Large-1-150x150.jpeg",
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Reader"
                  className="w-12 h-12 rounded-full border-2 object-cover"
                  style={{ borderColor: "#133C55" }}
                />
              ))}
              <div
                className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-white text-xs font-bold"
                style={{ borderColor: "#133C55", backgroundColor: "#386FA4" }}
              >
                100+
              </div>
            </div>
            <div>
              <p className="font-bold text-white">Loved by</p>
              <p className="text-sm" style={{ color: "#84D2F6" }}>
                100+ happy readers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Quote Section */}
      <section
        className="py-16"
        style={{
          background: "linear-gradient(180deg, #d0eeff 0%, #f0f8ff 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div
            ref={quoteAnim.ref}
            className={`transition-all duration-1000 ${
              quoteAnim.isVisible
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            }`}
          >
            <div
              className="w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6"
              style={{ backgroundColor: "#91E5F6" }}
            >
              <i
                className="ri-double-quotes-l text-3xl"
                style={{ color: "#133C55" }}
              ></i>
            </div>
            <blockquote
              className="text-2xl lg:text-3xl font-bold mb-6 leading-relaxed"
              style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}
            >
              &quot;Every story is a journey, and every reader brings their own magic
              to the page.&quot;
            </blockquote>
            <p className="text-lg font-semibold" style={{ color: "#386FA4" }}>
              — Jen Stryker
            </p>
          </div>
        </div>
      </section>

      {/* Resources / Writer's Hub Section */}
      <section id="writers-hub" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div
            ref={writerHubAnim.ref}
            className={`flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12 transition-all duration-1000 ${
              writerHubAnim.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="max-w-2xl">
              <div
                className="inline-block px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full mb-4"
                style={{ backgroundColor: "#d0eeff", color: "#386FA4" }}
              >
                Writer&apos;s Hub
              </div>
              <h2
                className="text-4xl lg:text-5xl font-bold mb-4"
                style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}
              >
                Resources to Enhance Your Writing Journey
              </h2>
              <p className="text-lg" style={{ color: "#386FA4" }}>
                Get helpful tips and insights from Jen Stryker; updated regularly
                for your convenience and always 100% free.
              </p>
            </div>
            <Link
              to="/writers-hub"
              className="px-8 py-4 font-bold rounded-lg transition-all duration-300 hover:-translate-y-1 whitespace-nowrap cursor-pointer text-white flex-shrink-0"
              style={{ backgroundColor: "#133C55" }}
            >
              All Resources
            </Link>
          </div>

          {/* Blog Post Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {latestPosts.map((post, i) => {
              const image =
                post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";

              return (
                <article
                  key={post.id}
                  className={`rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group border ${
                    writerHubAnim.isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    borderColor: "#d0eeff",
                    transitionDelay: `${i * 100}ms`,
                  }}
                >
                  {image && (
                    <div className="w-full h-52 overflow-hidden">
                      <img
                        src={image}
                        alt={post.title.rendered}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                        style={{ backgroundColor: "#d0eeff", color: "#386FA4" }}
                      >
                        Blog Post
                      </span>
                      <span className="text-xs" style={{ color: "#59A5D8" }}>
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h3
                      className="text-lg font-bold mb-3 leading-snug group-hover:text-[#386FA4] transition-colors"
                      style={{
                        fontFamily: "'Fugaz One', cursive",
                        color: "#133C55",
                      }}
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    <div
                      className="text-sm leading-relaxed mb-5"
                      style={{ color: "#386FA4" }}
                      dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: "#84D2F6" }}>
                        From WordPress
                      </span>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-bold transition-colors whitespace-nowrap cursor-pointer"
                        style={{ color: "#386FA4" }}
                      >
                        Read More <i className="ri-arrow-right-line"></i>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section
        className="py-16"
        style={{
          background: "linear-gradient(135deg, #d0eeff 0%, #91E5F6 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div
            ref={newsletterAnim.ref}
            className={`transition-all duration-1000 ${
              newsletterAnim.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2
              className="text-4xl lg:text-5xl font-bold mb-4"
              style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}
            >
              STAY IN THE CONVERSATION
            </h2>
            <p className="text-lg mb-8" style={{ color: "#386FA4" }}>
              Get new releases, writing tips, and story updates—sent
              occasionally, never spam.
            </p>
            <form
              id="newsletter-form"
              data-readdy-form
              action="https://readdy.ai/api/form/d6legiaqoe30lj0v7uhg"
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const data = new URLSearchParams(
                  new FormData(form) as unknown as Record<string, string>
                );
                try {
                  await fetch("https://readdy.ai/api/form/d6legiaqoe30lj0v7uhg", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: data.toString(),
                  });
                  form.reset();
                  alert("Thank you for subscribing!");
                } catch {
                  alert("Something went wrong. Please try again.");
                }
              }}
            >
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                className="flex-1 px-6 py-4 rounded-lg border-2 focus:outline-none text-sm transition-all duration-300 focus:border-[#386FA4]"
                style={{ borderColor: "#59A5D8", color: "#133C55" }}
                required
              />
              <button
                type="submit"
                className="px-8 py-4 font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 whitespace-nowrap cursor-pointer text-white"
                style={{
                  background: "linear-gradient(135deg, #386FA4, #133C55)",
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}