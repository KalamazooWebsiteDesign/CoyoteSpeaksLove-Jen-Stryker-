import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/feature/Navigation";
import Footer from "../../components/feature/Footer";
import AnimatedDropdown from "../../components/base/AnimatedDropdown";

function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);
  return { ref, isVisible };
}

export default function HomePage() {
  const heroAnim = useScrollAnimation();
  const aboutAnim = useScrollAnimation();
  const statsAnim = useScrollAnimation();
  const booksAnim = useScrollAnimation();
  const testimonialsAnim = useScrollAnimation();
  const quoteAnim = useScrollAnimation();
  const newsletterAnim = useScrollAnimation();

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Montserrat', sans-serif", backgroundColor: "#f0f8ff" }}>
      <Navigation />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #133C55 0%, #386FA4 60%, #59A5D8 100%)" }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl" style={{ backgroundColor: "#91E5F6" }} />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: "#84D2F6" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              ref={heroAnim.ref}
              className={`space-y-7 transition-all duration-1000 ${heroAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div
                className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full"
                style={{ backgroundColor: "#91E5F6", color: "#133C55" }}
              >
                Author &amp; Storyteller
              </div>
              <div>
                <p className="text-sm font-medium tracking-[0.2em] uppercase mb-3" style={{ color: "#84D2F6" }}>
                  Welcome to the world of
                </p>
                <h1
                  className="text-6xl lg:text-8xl font-bold leading-none"
                  style={{ fontFamily: "'Fugaz One', cursive", color: "#FFFFFF" }}
                >
                  JEN
                  <br />
                  STRYKER
                </h1>
              </div>
              <p className="text-base lg:text-lg leading-relaxed max-w-md" style={{ color: "#d0eeff" }}>
                Stories, art, and imagination — discover Jen&apos;s latest children&apos;s books,
                behind-the-scenes creativity, and the worlds she&apos;s building for readers of every age.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#books"
                  className="px-8 py-3.5 font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
                  style={{ backgroundColor: "#91E5F6", color: "#133C55" }}
                >
                  Explore Books
                </a>
                <a
                  href="#about"
                  className="px-8 py-3.5 font-semibold rounded-lg border transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
                  style={{ borderColor: "rgba(255,255,255,0.3)", color: "#FFFFFF" }}
                >
                  About Jen
                </a>
              </div>
            </div>

            {/* 3D Book */}
            <div className="relative flex items-center justify-center" style={{ perspective: "1200px" }}>
              <div className="book-container">
                <div className="book-3d">
                  <div className="book-front">
                    <img
                      src="https://static.readdy.ai/image/577c45d6defa6ac02f4bf39c73856fa0/a5f2067f43d678514359b619340cf52e.jpeg"
                      alt="My Neighbors are Vampires I Think"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="book-spine" style={{ backgroundColor: "#133C55" }} />
                  <div className="book-back" style={{ backgroundColor: "#386FA4" }} />
                  <div className="book-pages" />
                </div>
              </div>
              <style>{`
                .book-container{width:100%;max-width:480px;height:500px;display:flex;align-items:center;justify-content:center;animation:homeFloat 6s ease-in-out infinite;}
                @keyframes homeFloat{0%,100%{transform:translateY(0) rotateY(-15deg) rotateX(5deg);}50%{transform:translateY(-18px) rotateY(-20deg) rotateX(8deg);}}
                .book-3d{position:relative;width:380px;height:420px;transform-style:preserve-3d;transition:transform .6s ease;filter:drop-shadow(0 30px 60px rgba(0,0,0,.5));}
                .book-3d:hover{transform:rotateY(-35deg) rotateX(10deg) scale(1.05);}
                .book-front{position:absolute;width:100%;height:100%;border-radius:0 8px 8px 0;transform:translateZ(26px);overflow:hidden;box-shadow:inset -3px 0 10px rgba(0,0,0,.1),5px 5px 20px rgba(0,0,0,.3);z-index:10;}
                .book-front img{width:100%;height:100%;object-fit:cover;display:block;}
                .book-spine{position:absolute;width:50px;height:100%;left:0;transform:rotateY(-90deg) translateX(-25px);transform-origin:left center;box-shadow:inset 0 0 10px rgba(0,0,0,.3);}
                .book-back{position:absolute;width:100%;height:100%;border-radius:8px 0 0 8px;transform:translateZ(-26px);}
                .book-pages{position:absolute;width:20px;height:calc(100% - 6px);top:3px;right:-20px;background:linear-gradient(to right,#e0e0e0 0%,#f9f9f9 30%,#fff 50%,#f9f9f9 70%,#e0e0e0 100%);border-radius:0 3px 3px 0;transform:translateZ(0) rotateY(90deg) translateX(10px);transform-origin:left center;}
                @media(max-width:1024px){.book-container{max-width:300px;height:360px;}.book-3d{width:280px;height:320px;}}
              `}</style>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────── */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              ref={aboutAnim.ref}
              className={`relative order-2 lg:order-1 transition-all duration-1000 delay-100 ${aboutAnim.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
            >
              <div className="absolute -top-5 -left-5 w-full h-full border-2 rounded-2xl" style={{ borderColor: "#84D2F6" }} />
              <img
                src="https://coyotespeakslove.com/staging/9788/wp-content/uploads/2026/03/461306902_864438012541183_7596332984947632977_n-1-1.webp"
                alt="Jen Stryker"
                className="relative w-full h-auto rounded-2xl"
              />
            </div>
            <div
              className={`space-y-6 order-1 lg:order-2 transition-all duration-1000 delay-200 ${aboutAnim.isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            >
              <div
                className="inline-block px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full"
                style={{ backgroundColor: "#d0eeff", color: "#386FA4" }}
              >
                About the Author
              </div>
              <h2
                className="text-4xl lg:text-5xl font-bold"
                style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}
              >
                Meet Jen
              </h2>
              <p className="text-base lg:text-lg leading-relaxed" style={{ color: "#386FA4" }}>
                Hi, my name is Jen Stryker — an artist, photographer, writer, and a proud Mom.
                My heart is filled with stories, and I&apos;m here to share my creative journey with you.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-white"
                style={{ backgroundColor: "#133C55" }}
              >
                Learn More About Jen
                <i className="ri-arrow-right-line" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BANNER ─────────────────────────────────────────── */}
      <section
        className="py-14"
        style={{ background: "linear-gradient(135deg, #133C55 0%, #386FA4 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div
            ref={statsAnim.ref}
            className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 ${statsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {[
              { icon: "ri-book-2-line", number: "2", label: "Books Published" },
              { icon: "ri-heart-line", number: "100+", label: "Happy Readers" },
              { icon: "ri-award-line", number: "5★", label: "Average Rating" },
            ].map((stat, i) => (
              <div key={i} className="text-center" style={{ transitionDelay: `${i * 100}ms` }}>
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-4"
                  style={{ backgroundColor: "rgba(145,229,246,0.2)" }}
                >
                  <i className={`${stat.icon} text-2xl`} style={{ color: "#91E5F6" }} />
                </div>
                <div className="text-4xl font-bold text-white mb-1" style={{ fontFamily: "'Fugaz One', cursive" }}>
                  {stat.number}
                </div>
                <div className="text-sm font-medium tracking-widest uppercase" style={{ color: "#84D2F6" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKS ────────────────────────────────────────────────── */}
      <section id="books" className="py-20" style={{ background: "linear-gradient(180deg, #f0f8ff 0%, #d0eeff 100%)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div
            ref={booksAnim.ref}
            className={`text-center mb-16 transition-all duration-1000 ${booksAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div
              className="inline-block px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full mb-4"
              style={{ backgroundColor: "#91E5F6", color: "#133C55" }}
            >
              Featured Work
            </div>
            <h2
              className="text-4xl lg:text-5xl font-bold"
              style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}
            >
              Latest Releases
            </h2>
          </div>

          {/* Book 1 — My Neighbors Are Vampires */}
          <div className="mb-24">
            <div
              className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 delay-200 ${booksAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="space-y-5">
                <div
                  className="inline-block px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full"
                  style={{ backgroundColor: "#2D1B69", color: "#D4B8E0" }}
                >
                  Children&apos;s Book
                </div>
                <h3
                  className="text-3xl lg:text-4xl font-bold leading-tight"
                  style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}
                >
                  My Neighbors are Vampires, I Think!
                </h3>
                <p className="text-base leading-relaxed" style={{ color: "#386FA4" }}>
                  When a curious child starts noticing strange things next door — fluttering bats, mysterious
                  shadows, and neighbors who only come out at night — one big question comes to mind&hellip;
                  could they be vampires?
                </p>
                <AnimatedDropdown
                  label="Read more"
                  summaryBg="#e8f4fd"
                  summaryTextColor="#133C55"
                  iconColor="#386FA4"
                  contentBorderColor="#84D2F6"
                >
                  <p className="text-sm leading-relaxed" style={{ color: "#386FA4" }}>
                    This playful, heartwarming story blends a touch of spooky fun with an uplifting message
                    about kindness, empathy, and embracing what makes each of us unique. Perfect for young
                    readers, <em>My Neighbors Are Vampires, I Think!</em> reminds us that new friendships
                    can be found in the most unexpected places.
                  </p>
                </AnimatedDropdown>
                {/* Purchase CTAs */}
                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href="[BOOK_DIRECT_URL]"
                    className="px-5 py-3 font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-white text-sm"
                    style={{ backgroundColor: "#2D1B69" }}
                  >
                    Buy Direct
                  </a>
                  <a
                    href="https://www.amazon.com/My-Neighbors-are-Vampires-Think/dp/B0GJKZNLZ3/ref=sr_1_1?crid=139MPO9S9TUEV&dib=eyJ2IjoiMSJ9.RQjvFUOhW_fZyWSrTXJSqjz_9ASXX91RGaiNA807rnTG8XTMcXaCugf-1DOSpUzjLfGL0pPwZKTCT-N573CR6HRSNefw6n93tzH-cyeF7S4.Goy72i-l4BScr2fmhH8iAAR7tm-CpcruAguTUMOQMFc&dib_tag=se&keywords=My+Neighbors+Are+Vampires%2C+I+Think%21&qid=1773948470&s=books&sprefix=my+neighbors+are+vampires%2C+i+think+%2Cstripbooks%2C271&sr=1-1"
                    className="px-5 py-3 font-semibold rounded-lg border transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-sm"
                    style={{ borderColor: "#2D1B69", color: "#2D1B69", backgroundColor: "transparent" }}
                  >
                    Amazon
                  </a>
                  <a
                    href="https://www.barnesandnoble.com/w/my-neighbors-are-vampires-i-think-kenneth-togonon/1149374154?ean=979827967694"
                    className="px-5 py-3 font-semibold rounded-lg border transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-sm"
                    style={{ borderColor: "#2D1B69", color: "#2D1B69", backgroundColor: "transparent" }}
                  >
                    Barnes &amp; Noble
                  </a>
                  <Link
                    to="/books/my-neighbors-are-vampires"
                    className="px-5 py-3 font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-sm"
                    style={{ backgroundColor: "#e8f4fd", color: "#133C55" }}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="https://coyotespeakslove.com/staging/9788/wp-content/uploads/2026/03/Placeholder-Image-2-1011x1024.jpg"
                  alt="My Neighbors are Vampires"
                  className="w-full h-auto rounded-2xl transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Book 2 — Keanu Tails */}
          <div id="keanu-tails">
            <div
              className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 delay-300 ${booksAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="relative order-2 lg:order-1 rounded-2xl overflow-hidden">
                <img
                  src="https://coyotespeakslove.com/staging/9788/wp-content/uploads/2026/03/Placeholder-Image-1-1.jpg"
                  alt="Keanu Tails"
                  className="w-full h-auto rounded-2xl transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="space-y-5 order-1 lg:order-2">
                <div
                  className="inline-block px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full"
                  style={{ backgroundColor: "#BF6119", color: "#FFF3E0" }}
                >
                  Short Stories
                </div>
                <h3
                  className="text-3xl lg:text-4xl font-bold leading-tight"
                  style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}
                >
                  Keanu Tails
                </h3>
                <p className="text-base leading-relaxed" style={{ color: "#386FA4" }}>
                  A captivating collection of short stories inspired by the spirit of Keanu Reeves and the
                  creative energy of his band, Dogstar. Each story explores love, resilience, and the
                  unexpected turns that shape our lives.
                </p>
                <AnimatedDropdown
                  label="Read more"
                  summaryBg="#e8f4fd"
                  summaryTextColor="#133C55"
                  iconColor="#386FA4"
                  contentBorderColor="#84D2F6"
                >
                  <p className="text-sm leading-relaxed" style={{ color: "#386FA4" }}>
                    Through imaginative storytelling and real-world inspiration, this collection invites
                    readers into powerful narratives about kindness, courage, and finding meaning in the
                    twists of fate. Perfect for teens and adults, <em>Keanu Tails</em> sparks the imagination
                    while celebrating the quiet strength that lives within us all.
                  </p>
                </AnimatedDropdown>
                {/* Purchase CTAs */}
                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href="[BOOK_DIRECT_URL]"
                    className="px-5 py-3 font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-white text-sm"
                    style={{ backgroundColor: "#BF6119" }}
                  >
                    Buy Direct
                  </a>
                  <a
                    href="https://www.amazon.com/Keanu-Tails-exploring-unexpected-Inspired/dp/B0DX1YFNYD"
                    className="px-5 py-3 font-semibold rounded-lg border transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-sm"
                    style={{ borderColor: "#BF6119", color: "#BF6119", backgroundColor: "transparent" }}
                  >
                    Amazon
                  </a>
                  <a
                    href="[BARNES_NOBLE_URL]"
                    className="px-5 py-3 font-semibold rounded-lg border transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-sm"
                    style={{ borderColor: "#BF6119", color: "#BF6119", backgroundColor: "transparent" }}
                  >
                    Barnes &amp; Noble
                  </a>
                  <Link
                    to="/books/keanu-tails"
                    className="px-5 py-3 font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-sm"
                    style={{ backgroundColor: "#e8f4fd", color: "#133C55" }}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #133C55 0%, #386FA4 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div
            ref={testimonialsAnim.ref}
            className={`text-center mb-14 transition-all duration-1000 ${testimonialsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div
              className="inline-block px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full mb-4"
              style={{ backgroundColor: "rgba(145,229,246,0.2)", color: "#91E5F6" }}
            >
              Reader Reviews
            </div>
            <h2
              className="text-4xl lg:text-5xl font-bold text-white"
              style={{ fontFamily: "'Fugaz One', cursive" }}
            >
              What Readers Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                text: `"I found this short story book to be utterly charming. In particular I loved the quote of Keanu's lessons in life which preceded each tale. Written with love and admiration — I can't wait for the next collection."`,
                name: "Fiona Johnstone",
                location: "Amazon Reviewer, United Kingdom",
              },
              {
                text: `"I am a therapist and Dr. of Psychology who practices with children. I just received my copies and have shared them with the interns. We all agree that it is a cute book with a great message of empathy and accepting others for their differences."`,
                name: "Robert Willoughby",
                location: "Amazon Reviewer, United States",
              },
              {
                text: `"This book features short stories designed to spark the imagination. The stories evoke emotions and moods and are often discreet parts of an untold whole left to the reader's imagination."`,
                name: "Kergillian",
                location: "Amazon Reviewer, United States",
              },
            ].map((review, i) => (
              <div
                key={i}
                className={`p-8 rounded-xl border transition-all duration-700 hover:-translate-y-1 ${testimonialsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ backgroundColor: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.12)", transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <i key={j} className="ri-star-fill text-sm" style={{ color: "#91E5F6" }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "#d0eeff" }}>{review.text}</p>
                <div>
                  <p className="font-semibold text-white text-sm">{review.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#84D2F6" }}>{review.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED QUOTE ───────────────────────────────────────── */}
      <section className="py-20" style={{ background: "linear-gradient(180deg, #d0eeff 0%, #f0f8ff 100%)" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <div
            ref={quoteAnim.ref}
            className={`transition-all duration-1000 ${quoteAnim.isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <div
              className="w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-8"
              style={{ backgroundColor: "#91E5F6" }}
            >
              <i className="ri-double-quotes-l text-2xl" style={{ color: "#133C55" }} />
            </div>
            <blockquote
              className="text-2xl lg:text-3xl font-bold mb-6 leading-relaxed"
              style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}
            >
              &ldquo;Every story is a journey, and every reader brings their own magic to the page.&rdquo;
            </blockquote>
            <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#386FA4" }}>
              — Jen Stryker
            </p>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────────── */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #d0eeff 0%, #91E5F6 100%)" }}
      >
        <div className="max-w-xl mx-auto px-6 lg:px-8 text-center">
          <div
            ref={newsletterAnim.ref}
            className={`transition-all duration-1000 ${newsletterAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h2
              className="text-3xl lg:text-4xl font-bold mb-3"
              style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}
            >
              Stay in the Conversation
            </h2>
            <p className="text-sm mb-8" style={{ color: "#386FA4" }}>
              New releases, writing tips, and story updates — sent occasionally, never spam.
            </p>
            <form
              id="newsletter-homepage"
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
                type="email"
                name="email"
                placeholder="Your email address"
                className="flex-1 px-5 py-3.5 rounded-lg text-sm focus:outline-none"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #84D2F6", color: "#133C55" }}
                required
              />
              <button
                type="submit"
                className="px-7 py-3.5 font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-white"
                style={{ backgroundColor: "#133C55" }}
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
